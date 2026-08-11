"use client";

import { useState } from "react";

type Estado = "email" | "nome" | "feito";

// Máscara de telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
function formatarTelefone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

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
      <div className="presenca-success">
        <div className="presenca-success-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="h-8 w-8">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2>Presença confirmada!</h2>
        <p>
          {nomeConfirmado ? `${nomeConfirmado}, sua presença` : "Sua presença"} em{" "}
          <strong>{titulo}</strong> foi registrada.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={estado === "email" ? confirmarEmail : confirmarNome}>
      <div className="presenca-field">
        <label htmlFor="email">Seu e-mail</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          disabled={estado === "nome"}
        />
      </div>

      {estado === "nome" && (
        <>
          <p className="presenca-note">
            Seu e-mail ainda não está na lista de catecúmenos. Diga seu nome para
            ficar cadastrado e confirmar sua presença.
          </p>
          <div className="presenca-field">
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              required
              autoComplete="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome e sobrenome"
            />
          </div>
          <div className="presenca-field">
            <label htmlFor="telefone">Telefone (opcional)</label>
            <input
              id="telefone"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              value={telefone}
              onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
              placeholder="(71) 99999-9999"
            />
          </div>
        </>
      )}

      {erro && <p className="presenca-error">{erro}</p>}

      <button
        type="submit"
        disabled={carregando}
        className="button button-primary presenca-submit"
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