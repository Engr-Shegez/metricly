"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LogIn } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  authenticateUser,
  getDemoLoginHint,
  useCurrentUser,
} from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const demoLogin = getDemoLoginHint();
  const [email, setEmail] = useState(demoLogin.email);
  const [password, setPassword] = useState(demoLogin.password);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    const result = authenticateUser(email, password);
    setIsSubmitting(false);

    if ("error" in result) {
      toast.error(result.error);
      return;
    }

    toast.success(`Logged in as ${result.user.name}.`);
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-black/8 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 sm:p-8">
        <div className="mb-8">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white">
            <LogIn className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with a demo profile or an account you created locally.
          </p>
        </div>

        {currentUser ? (
          <div className="mb-6 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-200">
            Currently logged in as{" "}
            <span className="font-semibold">{currentUser.name}</span>.
          </div>
        ) : null}

        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              autoComplete="email"
              className="mt-2 w-full rounded-md border border-black/10 bg-white/80 px-4 py-3 text-foreground outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              type="email"
              value={email}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              autoComplete="current-password"
              className="mt-2 w-full rounded-md border border-black/10 bg-white/80 px-4 py-3 text-foreground outline-none transition focus:border-orange-500 dark:border-white/10 dark:bg-white/5"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              value={password}
            />
          </div>

          <Button className="h-11 w-full bg-orange-500 text-white hover:bg-orange-600">
            {isSubmitting ? "Logging in..." : "Login"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="mt-6 rounded-lg border border-black/8 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
          Demo login: <span className="font-semibold">{demoLogin.email}</span>{" "}
          with password{" "}
          <span className="font-semibold">{demoLogin.password}</span>.
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to Metricly?{" "}
          <Link className="font-semibold text-orange-600" href="/register">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
