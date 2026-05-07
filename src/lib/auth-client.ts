"use client";

import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
  avatarColor: string;
};

type ProfileRow = {
  full_name: string | null;
  role: string | null;
};

const avatarColors = [
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-emerald-500",
  "bg-violet-500",
];

function makeInitials(name: string, email: string) {
  const source = name.trim() || email.split("@")[0] || "Metricly User";
  const initials = source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "MU";
}

function colorFromId(id: string) {
  const index = id
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);

  return avatarColors[index % avatarColors.length];
}

async function getAuthenticatedUser(
  supabase: SupabaseClient,
): Promise<AuthenticatedUser | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  const email = user.email ?? "";
  const name =
    profile?.full_name ??
    (typeof user.user_metadata.full_name === "string"
      ? user.user_metadata.full_name
      : "") ??
    email;

  return {
    id: user.id,
    name: name || email,
    email,
    role: profile?.role ?? "Workspace member",
    initials: makeInitials(name, email),
    avatarColor: colorFromId(user.id),
  };
}

export async function signOutUser() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = "/sign-in";
}

export function useCurrentUser() {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    let isMounted = true;
    const supabase = createClient();

    async function loadUser() {
      const currentUser = await getAuthenticatedUser(supabase);

      if (isMounted) {
        setUser(currentUser);
      }
    }

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadUser();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return user;
}
