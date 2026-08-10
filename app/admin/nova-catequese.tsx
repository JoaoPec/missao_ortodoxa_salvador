"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CopiarLink from "./copiar-link";

export default function NovaCatequese() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [assunto, setAssunto] = useState("");
  const [data, setData] = useState("");
  const [criada, setCriada] = useState<{ slug: string; url: string } | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function criar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    try {
      const res = await fetch("/api/admin/catequeses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, assunto: assunto || undefined, data: data || undefined }),
      });
      const dados = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErro(dados.erro || "Não foi possível criar a catequese.");
        return;
      }
      const slug = dados.catequese.slug as string;
      const url = `${window.location.origin}/presenca/${slug}`;
      setCriada({ slug, url });
      setTitulo("");
      setAssunto("");
      setData("");
      router.refresh();
    } catch {
      setErro("Falha de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="rounded-2xl border border-[var(--line)] p-6" style={{ background: "var(--plaster)" }}>
      <h2 className="mb-4 text-lg font-bold text-[var(--ink)]" style={{ fontFamily: '"Cinzel", serif' }}>
        Nova catequese
      </h2>
      <form onSubmit={criar} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
            Título *
          </label>
          <input
            id="titulo"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Catequese 12 — Os Sacramentos"
            className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--crimson)] focus:ring-2 focus:ring-[var(--crimson)]/20"
          />
        </div>
        <div>
          <label htmlFor="assunto" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
            Assunto (opcional)
          </label>
          <input
            id="assunto"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Ex: Batismo e Crisma"
            className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--crimson)] focus:ring-2 focus:ring-[var(--crimson)]/20"
          />
        </div>
        <div>
          <label htmlFor="data" className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
            Data (opcional)
          </label>
          <input
            id="data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--crimson)] focus:ring-2 focus:ring-[var(--crimson)]/20"
          />
        </div>

        {erro && (
          <p className="rounded-lg px-4 py-2.5 text-sm font-medium" style={{ background: "rgba(147,20,14,0.08)", color: "var(--crimson)" }}>
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-lg px-6 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-60"
          style={{ background: "var(--crimson)" }}
        >
          {carregando ? "Criando..." : "Criar e gerar link de presença"}
        </button>
      </form>

      {criada && (
        <div className="mt-5 rounded-xl px-4 py-3" style={{ background: "rgba(20,120,60,0.10)" }}>
          <p className="mb-2 text-sm font-bold text-[#14783c]">Link gerado! Compartilhe com os catecúmenos:</p>
          <div className="flex flex-wrap items-center gap-2">
            <code className="flex-1 truncate rounded-lg bg-white px-3 py-2 text-xs text-[var(--ink)]">
              {criada.url}
            </code>
            <CopiarLink url={criada.url} rotulo="Copiar" />
          </div>
        </div>
      )}
    </section>
  );
}
