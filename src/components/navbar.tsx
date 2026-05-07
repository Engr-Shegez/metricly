"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOutUser, useCurrentUser } from "@/lib/auth-client";

function subscribe() {
  return () => {};
}

export function MarketingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const currentUser = useCurrentUser();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#f1e6d3]/90 px-2 py-2 backdrop-blur-md dark:bg-slate-950/90 sm:px-4">
      <div className="mx-auto max-w-7xl px-6 pt-2">
        <div className="relative rounded-full border border-black/6 bg-[#f8efe0]/78 px-4 py-3 shadow-[0_18px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:shadow-[0_18px_80px_rgba(0,0,0,0.28)]">
          <div className="flex items-center justify-between gap-4">
            {/* <Link
              href="/"
              className="text-xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white"
            >
              Metricly
            </Link> */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/metricly-logo.png"
                alt="Metricly Logo"
                width={200}
                height={100}
                priority
              />
            </Link>

            {/* LINKS */}
            <div className="hidden ml-20 md:flex items-center gap-8 text-lg text-gray-900 dark:text-gray-200">
              <a href="#" className="hover:text-black dark:hover:text-white">
                Home
              </a>
              <a
                href="#features"
                className="hover:text-black dark:hover:text-white"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="hover:text-black dark:hover:text-white"
              >
                Pricing
              </a>
              <a
                href="/dashboard"
                className="hover:text-black dark:hover:text-white"
              >
                Dashboard
              </a>
              <a
                href="#about"
                className="hover:text-black dark:hover:text-white"
              >
                About
              </a>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              {mounted ? (
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-black/8 bg-zinc-50 text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                >
                  {theme === "dark" ? (
                    <Sun className="size-4" />
                  ) : (
                    <Moon className="size-4" />
                  )}
                </button>
              ) : null}
              {currentUser ? (
                <>
                  <Link
                    className="max-w-44 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                    href="/dashboard"
                    title={`Logged in as ${currentUser.name}`}
                  >
                    {currentUser.name}
                  </Link>
                  <Button
                    aria-label="Log out"
                    className="border border-black/8 bg-zinc-50 px-3 text-zinc-900 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                    onClick={signOutUser}
                    variant="ghost"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    className="border border-black/8 bg-zinc-50 px-4 text-zinc-900 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                  >
                    <Link href="/sign-in">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-zinc-950 px-4 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            <button
              type="button"
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="inline-flex size-10 items-center justify-center rounded-full border border-black/8 bg-zinc-50 text-zinc-900 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 md:hidden"
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="mt-3 h-50 overflow-hidden rounded-3xl border border-black/8 bg-[#faf8f3] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-zinc-950/95 md:hidden"
              >
                <div className="mt-4 grid gap-3">
                  {mounted ? (
                    <button
                      type="button"
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="inline-flex h-11  items-center justify-center rounded-2xl border border-black/8 bg-zinc-50 text-zinc-900 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                    >
                      {theme === "dark" ? "Light mode" : "Dark mode"}
                    </button>
                  ) : null}
                  {currentUser ? (
                    <>
                      <Link
                        className="rounded-2xl border border-black/8 bg-zinc-50 px-4 py-3 text-center text-sm font-semibold text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100"
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                      >
                        Logged in as {currentUser.name}
                      </Link>
                      <Button
                        className="justify-center border border-black/8 bg-zinc-50 text-zinc-900 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                        onClick={() => {
                          signOutUser();
                          setIsOpen(false);
                        }}
                        variant="ghost"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="ghost"
                        className="justify-center border border-black/8 bg-zinc-50 text-zinc-900 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                      >
                        <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="justify-center bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                      >
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
