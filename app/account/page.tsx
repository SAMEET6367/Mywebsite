"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Primitives";
import { createClient } from "@/lib/supabase/client";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [nameStatus, setNameStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setName((data.user.user_metadata?.full_name as string) || "");
      setEmail(data.user.email || "");
      setLoading(false);
    });
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function handleNameSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNameStatus("saving");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    });
    setNameStatus(error ? "error" : "saved");
  }

  async function handleEmailSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailStatus("saving");
    setEmailError("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ email });
    if (error) {
      setEmailError(error.message);
      setEmailStatus("error");
    } else {
      setEmailStatus("saved");
    }
  }

  return (
    <main className="bg-ink-950">
      <Nav />

      <section className="py-16 sm:py-24">
        <Container className="mx-auto max-w-md">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-sm text-fog transition-colors hover:text-paper"
          >
            ← Back to home
          </Link>

          {loading ? (
            <p className="text-sm text-fog">Loading…</p>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-bright">
                  Your account
                </p>
                <h1 className="mt-2 font-display text-2xl font-semibold text-paper">
                  {(user?.user_metadata?.full_name as string) || "Welcome"}
                </h1>
              </div>

              {/* Name */}
              <form
                onSubmit={handleNameSave}
                className="rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 shadow-soft"
              >
                <label htmlFor="name" className="text-sm font-medium text-paper">
                  Name
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameStatus("idle");
                    }}
                    className="w-full rounded-lg border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-paper focus:border-violet-bright"
                  />
                  <button
                    type="submit"
                    disabled={nameStatus === "saving"}
                    className="shrink-0 rounded-lg border border-ink-700 px-4 py-3 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-800 disabled:opacity-60"
                  >
                    {nameStatus === "saving" ? "Saving…" : "Save"}
                  </button>
                </div>
                {nameStatus === "saved" && (
                  <p className="mt-2 text-sm text-cyan">Name updated.</p>
                )}
                {nameStatus === "error" && (
                  <p className="mt-2 text-sm text-amber">Couldn&apos;t save — try again.</p>
                )}
              </form>

              {/* Email */}
              <form
                onSubmit={handleEmailSave}
                className="rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 shadow-soft"
              >
                <label htmlFor="email" className="text-sm font-medium text-paper">
                  Email
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailStatus("idle");
                    }}
                    className="w-full rounded-lg border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-paper focus:border-violet-bright"
                  />
                  <button
                    type="submit"
                    disabled={emailStatus === "saving"}
                    className="shrink-0 rounded-lg border border-ink-700 px-4 py-3 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-800 disabled:opacity-60"
                  >
                    {emailStatus === "saving" ? "Saving…" : "Save"}
                  </button>
                </div>
                {emailStatus === "saved" && (
                  <p className="mt-2 text-sm text-cyan">
                    Check your new inbox to confirm the change — it won&apos;t
                    take effect until you click the link there.
                  </p>
                )}
                {emailStatus === "error" && (
                  <p className="mt-2 text-sm text-amber">
                    {emailError || "Couldn't save — try again."}
                  </p>
                )}
              </form>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-full border border-ink-700 bg-ink-900/60 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-800"
              >
                Log out
              </button>
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  );
}
