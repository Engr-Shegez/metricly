"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { AuthenticatedUser } from "@/lib/auth-client";
import type { PresenceCursor } from "@/types/project-dashboard";

const CHANNEL_NAME = "metricly-dashboard-presence";
const STALE_CURSOR_MS = 6000;

type PresenceMessage =
  | { type: "cursor"; payload: PresenceCursor }
  | { type: "leave"; payload: { id: string } };

function getPresenceUser(user: AuthenticatedUser | null) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    color: "text-emerald-500",
  };
}

export function useRealtimePresence(user: AuthenticatedUser | null) {
  const localUser = useMemo(() => getPresenceUser(user), [user]);
  const [remoteCursors, setRemoteCursors] = useState<PresenceCursor[]>([]);

  const channel = useMemo(() => {
    if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") {
      return null;
    }

    return new BroadcastChannel(CHANNEL_NAME);
  }, []);

  const postPresenceMessage = useCallback(
    (message: PresenceMessage) => {
      if (!channel) {
        return;
      }

      try {
        channel.postMessage(message);
      } catch {
        // Ignore teardown races when React unmounts effects in a different order.
      }
    },
    [channel],
  );

  useEffect(() => {
    if (!channel || !localUser) {
      return;
    }

    const handleMessage = (event: MessageEvent<PresenceMessage>) => {
      const message = event.data;

      if (!message) {
        return;
      }

      if (message.type === "leave") {
        setRemoteCursors((current) =>
          current.filter((cursor) => cursor.id !== message.payload.id),
        );
        return;
      }

      if (!localUser || message.payload.id === localUser.id) {
        return;
      }

      setRemoteCursors((current) => {
        const next = current.filter((cursor) => cursor.id !== message.payload.id);
        next.push(message.payload);
        return next;
      });
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      postPresenceMessage({
        type: "leave",
        payload: { id: localUser.id },
      });
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, [channel, localUser, postPresenceMessage]);

  useEffect(() => {
    if (!channel || !localUser || typeof window === "undefined") {
      return;
    }

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        postPresenceMessage({
          type: "cursor",
          payload: {
            id: localUser.id,
            name: localUser.name,
            color: localUser.color,
            x: event.clientX,
            y: event.clientY,
            lastSeen: Date.now(),
          },
        } satisfies PresenceMessage);
      });
    };

    const cleanup = () => {
      postPresenceMessage({
        type: "leave",
        payload: { id: localUser.id },
      } satisfies PresenceMessage);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("beforeunload", cleanup);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("beforeunload", cleanup);
    };
  }, [channel, localUser, postPresenceMessage]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemoteCursors((current) =>
        current.filter((cursor) => Date.now() - cursor.lastSeen < STALE_CURSOR_MS),
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return { localUser, remoteCursors };
}
