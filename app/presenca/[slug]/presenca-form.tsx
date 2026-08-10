"use client";

import { useState } from "react";

type Estado = "email" | "nome" | "feito";

export default function PresencaForm({
  slug,
  titulo,
}: {
  slug: string;
  titulo: string;
}) {
  const [estado, setEstado] = useState<Estado>("email");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [nomeConfirmado, setNomeConfirmado] = useState("");

  async function enviar(payload: Record<string, string>) {
    setCarregando(true);
    setErro("");
    try {
      const res = await fetch(`/api/presenca/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const dados = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErro(dados.erro || "Não foi possível confirmar. Tente novamente.");
        return;
      }
      if (dados.status === "precisa_nome") {
        setEstado("nome");
        return;
      }
      setNomeConfirmado(dados.nome || "");
      setEstado("feito");
    } catch {
      setErro("Falha de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  function confirmarEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setErro("Informe seu e-mail.");
      return;
    }
    void enviar({ email });
  }

  function confirmarNome(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro("Informe seu nome.");
      return;
    }
    void enviar({ email, nome, telefone });
  }

  if (estado === "feito") {
    return (
      <div className="text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "var(--paper-2)", color: "var(--crimson)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-8 w-8">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-bold" style={{ fontFamily: '"Cinzel", serif' }}>
          Presença confirmada!
        </h2>
        <p className="text-[var(--muted)]">
          {nomeConfirmado ? `${nomeConfirmado}, sua presença` : "Sua presença"} em{" "}
          <strong className="text-[var(--ink)]">{titulo}</strong> foi registrada.
        </p>
        <p className="mt-4 text-sm text-[var(--muted)]">Nos vemos na catequese! ☦️</p>
      </div>
    );
  }

  return (
    <form onSubmit={estado === "email" ? confirmarEmail : confirmarNome} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
          Seu e-mail
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          disabled={estado === "nome"}
          className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--crimson)] focus:ring-2 focus:ring-[var(--crimson)]/20 disabled:opacity-60"
        />
      </div>

      {estado === "nome" && (
        <>
          <div className="rounded-lg px-4 py-3 text-sm" style={{ background: "var(--paper-2)" }}>
            Seu e-mail ainda não está na lista de catecúmenos. Diga seu nome para
            ficar cadastrado e confirmar sua presença.
          </div>
          <div>
            <label htmlFor="nome" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              required
              autoComplete="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome e sobrenome"
              className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--crimson)] focus:ring-2 focus:ring-[var(--crimson)]/20"
            />
          </div>
          <div>
            <label htmlFor="telefone" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
              Telefone (opcional)
            </label>
            <input
              id="telefone"
              type="tel"
              autoComplete="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(71) 99999-9999"
              className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--crimson)] focus:ring-2 focus:ring-[var(--crimson)]/20"
            />
          </div>
        </>
      )}

      {erro && (
        <p className="rounded-lg px-4 py-2.5 text-sm font-medium" style={{ background: "rgba(147,20,14,0.08)", color: "var(--crimson)" }}>
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={carregando}
        className="w-full rounded-lg px-6 py-3.5 font-bold text-white transition hover:brightness-110 disabled:opacity-60"
        style={{ background: "var(--crimson)" }}
      >
        {carregando
          ? "Confirmando..."
          : estado === "email"
            ? "Confirmar presença"
            : "Cadastrar e confirmar"}
      </button>
    </form>
  );
}
