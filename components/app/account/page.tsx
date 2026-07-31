"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Primitives";
import { createClient } from "@/lib/supabase/client";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="bg-ink-950">
      <Nav />

      <section className="flex min-h-[70vh] items-center py-16 sm:py-24">
        <Container className="mx-auto max-w-md">
          {loading ? (
            <p className="text-sm text-fog">Loading…</p>
          ) : (
            <div className="rounded-xl2 border border-ink-700 bg-ink-900/60 p-6 shadow-soft sm:p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-bright">
                Your account
              </p>
              <h1 className="font-display text-2xl font-semibold text-paper">
                {(user?.user_metadata?.full_name as string) || "Welcome"}
              </h1>
              <p className="mt-2 text-sm text-fog">{user?.email}</p>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-8 w-full rounded-full border border-ink-700 bg-ink-900/60 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-violet-bright/60 hover:bg-ink-800"
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
