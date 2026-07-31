"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Primitives";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setStatus("error");
        return;
      }

      router.push("/account");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  }

  return (
    <main className="bg-ink-950">
      <Nav />

      <section className="flex min-h-[70vh] items-center py-16 sm:py-24">
        <Container className="mx-auto max-w-md">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-bright">
            Welcome back
          </p>
          <h1 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
            Log in
          </h1>
          <p className="mt-3 text-sm text-fog">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-violet-bright hover:underline">
              Sign up
            </Link>
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 shadow-soft sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-paper">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-paper placeholder:text-fog/60 focus:border-violet-bright"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-paper">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-paper placeholder:text-fog/60 focus:border-violet-bright"
                  placeholder="Your password"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
              >
                {status === "sending" ? "Logging in…" : "Log in"}
              </button>

              {status === "error" && (
                <p className="text-center text-sm text-amber" role="status">
                  {errorMessage || "Something went wrong — try again."}
                </p>
              )}
            </div>
          </form>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
