"use client";

import { useSyncExternalStore } from "react";

import {
  currentDashboardUser,
  dashboardUsers,
} from "@/lib/project-dashboard-data";
import type { DashboardUser } from "@/types/project-dashboard";

const SESSION_KEY = "metricly.currentUser";
const REGISTERED_USERS_KEY = "metricly.registeredUsers";
const AUTH_EVENT = "metricly:auth-changed";
const DEMO_PASSWORD = "metricly123";

type StoredRegisteredUser = DashboardUser & {
  password: string;
};

const avatarColors = [
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-emerald-500",
  "bg-violet-500",
];

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function makeInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "MU";
}

function notifyAuthChanged() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

function readRegisteredUsers(): StoredRegisteredUser[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(REGISTERED_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeRegisteredUsers(users: StoredRegisteredUser[]) {
  window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

function toSessionUser({ password, ...user }: StoredRegisteredUser) {
  void password;
  return user;
}

function storeSession(user: DashboardUser) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  notifyAuthChanged();
}

export function getCurrentUser(): DashboardUser | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function getDemoLoginHint() {
  return {
    email: currentDashboardUser.email,
    password: DEMO_PASSWORD,
  };
}

export function authenticateUser(
  email: string,
  password: string,
): { user: DashboardUser; error?: never } | { user?: never; error: string } {
  const normalizedEmail = normalizeEmail(email);
  const registeredUser = readRegisteredUsers().find(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );

  if (registeredUser) {
    if (registeredUser.password !== password) {
      return { error: "That password does not match this account." };
    }

    const user = toSessionUser(registeredUser);
    storeSession(user);
    return { user };
  }

  const demoUser = dashboardUsers.find(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );

  if (!demoUser) {
    return { error: "We could not find an account for that email." };
  }

  if (password !== DEMO_PASSWORD) {
    return { error: "Use the demo password shown on this page." };
  }

  storeSession(demoUser);
  return { user: demoUser };
}

export function registerAndLoginUser({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const normalizedEmail = normalizeEmail(email);
  const existingDemoUser = dashboardUsers.find(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );

  if (existingDemoUser) {
    storeSession(existingDemoUser);
    return existingDemoUser;
  }

  const registeredUsers = readRegisteredUsers();
  const existingIndex = registeredUsers.findIndex(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );
  const color = avatarColors[registeredUsers.length % avatarColors.length];
  const registeredUser: StoredRegisteredUser = {
    id:
      existingIndex >= 0
        ? registeredUsers[existingIndex].id
        : `local-${Date.now()}`,
    name: fullName.trim(),
    role: "Workspace member",
    email: normalizedEmail,
    initials: makeInitials(fullName),
    avatarColor: color,
    cursorColor: "text-emerald-500",
    focusHours: "09:00 - 17:00",
    password,
  };

  if (existingIndex >= 0) {
    registeredUsers[existingIndex] = registeredUser;
  } else {
    registeredUsers.push(registeredUser);
  }

  writeRegisteredUsers(registeredUsers);
  const sessionUser = toSessionUser(registeredUser);
  storeSession(sessionUser);
  return sessionUser;
}

export function signOutUser() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
  notifyAuthChanged();
}

export function useCurrentUser() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (!isBrowser()) {
        return () => {};
      }

      window.addEventListener(AUTH_EVENT, onStoreChange);
      window.addEventListener("storage", onStoreChange);

      return () => {
        window.removeEventListener(AUTH_EVENT, onStoreChange);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    getCurrentUser,
    () => null,
  );
}
