import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verificarSessao } from "@/lib/auth";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Entrar — Presença",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await verificarSessao()) {
    redirect("/admin");
  }
  return (
    <main
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--paper)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[var(--line)] p-8 shadow-lg"
        style={{ background: "var(--plaster)" }}
      >
        <h1
          className="mb-1 text-center text-2xl font-bold text-[var(--ink)]"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          Presença
        </h1>
        <p className="mb-6 text-center text-sm text-[var(--muted)]">
          Área do padre — catequeses e relatórios
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
