"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      });
      if (!res.ok) {
        const dados = await res.json().catch(() => ({}));
        setErro(dados.erro || "Senha incorreta.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setErro("Falha de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={entrar} className="space-y-4">
      <div>
        <label htmlFor="senha" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
          Senha do administrador
        </label>
        <input
          id="senha"
          type="password"
          required
          autoFocus
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--crimson)] focus:ring-2 focus:ring-[var(--crimson)]/20"
        />
      </div>
      {erro && (
        <p
          className="rounded-lg px-4 py-2.5 text-sm font-medium"
          style={{ background: "rgba(147,20,14,0.08)", color: "var(--crimson)" }}
        >
          {erro}
        </p>
      )}
      <button
        type="submit"
        disabled={carregando}
        className="w-full rounded-lg px-6 py-3.5 font-bold text-white transition hover:brightness-110 disabled:opacity-60"
        style={{ background: "var(--crimson)" }}
      >
        {carregando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
