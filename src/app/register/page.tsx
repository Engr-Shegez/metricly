"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromQuery = searchParams.get("email") ?? "";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(emailFromQuery);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (emailFromQuery) setEmail(emailFromQuery);
  }, [emailFromQuery]);

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      // No backend/auth is configured yet in this repo.
      // Treat this as a "professional sign-up UI" and redirect for now.
      toast.success("Account details saved. Redirecting...");
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 ">
      <div className="max-w-xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-zinc-900/30 p-6 w-full sm:p-8 shadow-2xl">
          <div className="absolute inset-0 bg-orange-500/10 blur-3xl" />

          <div className="relative">
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-white/70">
              Sign up with your details to get access to Metricly.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-medium">Full name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 w-full  border border-black/10 px-4 py-3 rounded-md"
                  placeholder="e.g., Alex Johnson"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border border-black/10 px-4 py-3 rounded-md"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full  border border-black/10 px-4 py-3 rounded-md"
                  placeholder="Create a password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 w-full  border border-black/10 px-4 py-3 rounded-md"
                  placeholder="Re-enter your password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold transition disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create account"}
              </button>

              <p className="text-xs text-white/60 text-center pt-2">
                By continuing, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
