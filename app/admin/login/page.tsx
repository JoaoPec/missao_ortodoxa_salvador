import type { Metadata } from "next";
import Image from "next/image";
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
    <main className="admin-login-wrap">
      <Image
        src="/images/brasao-patriarcado.webp"
        alt=""
        width={560}
        height={560}
        className="admin-login-crest"
        aria-hidden="true"
      />
      <div className="admin-login-card">
        <Image
          src="/images/selo-patriarcado.png"
          alt=""
          width={54}
          height={54}
          className="seal"
        />
        <h1 className="admin-login-title">Presença</h1>
        <p className="admin-login-sub">Área do padre — catequeses e relatórios</p>
        <LoginForm />
      </div>
    </main>
  );
}