"use client";

import { useEffect, useMemo, useState } from "react";

import { dashboardUsers } from "@/lib/project-dashboard-data";
import type { PresenceCursor } from "@/types/project-dashboard";

const CHANNEL_NAME = "metricly-dashboard-presence";
const STALE_CURSOR_MS = 6000;

type PresenceMessage =
  | { type: "cursor"; payload: PresenceCursor }
  | { type: "leave"; payload: { id: string } };

function getSessionUser() {
  if (typeof window === "undefined") {
    const fallbackUser = dashboardUsers[0];

    return {
      id: fallbackUser.id,
      name: fallbackUser.name,
      color: fallbackUser.cursorColor,
    };
  }

  const existing = window.sessionStorage.getItem("metricly-presence-user");

  if (existing) {
    return JSON.parse(existing) as { id: string; name: string; color: string };
  }

  const randomUser =
    dashboardUsers[Math.floor(Math.random() * dashboardUsers.length)];
  const sessionUser = {
    id: `${randomUser.id}-${crypto.randomUUID()}`,
    name: randomUser.name,
    color: randomUser.cursorColor,
  };

  window.sessionStorage.setItem(
    "metricly-presence-user",
    JSON.stringify(sessionUser),
  );

  return sessionUser;
}

export function useRealtimePresence() {
  const [localUser] = useState(getSessionUser);
  const [remoteCursors, setRemoteCursors] = useState<PresenceCursor[]>([]);

  const channel = useMemo(() => {
    if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") {
      return null;
    }

    return new BroadcastChannel(CHANNEL_NAME);
  }, []);

  useEffect(() => {
    if (!channel) {
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

      if (message.payload.id === localUser.id) {
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
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, [channel, localUser.id]);

  useEffect(() => {
    if (!channel || typeof window === "undefined") {
      return;
    }

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        channel.postMessage({
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
      channel.postMessage({
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

      cleanup();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("beforeunload", cleanup);
    };
  }, [channel, localUser]);

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
