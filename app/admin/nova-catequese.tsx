"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CopiarLink from "./copiar-link";

export default function NovaCatequese() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [assunto, setAssunto] = useState("");
  const [data, setData] = useState("");
  const [criada, setCriada] = useState<{ url: string } | null>(null);
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
      setCriada({ url: `${window.location.origin}/presenca/${slug}` });
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
    <section className="admin-card">
      <h2 className="admin-card-title">Nova catequese</h2>
      <form onSubmit={criar}>
        <div className="admin-field">
          <label htmlFor="titulo">Título *</label>
          <input
            id="titulo"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Catequese 12 — Os Sacramentos"
          />
        </div>
        <div className="admin-field">
          <label htmlFor="assunto">Assunto (opcional)</label>
          <input
            id="assunto"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Ex: Batismo e Crisma"
          />
        </div>
        <div className="admin-field">
          <label htmlFor="data">Data (opcional)</label>
          <input
            id="data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        {erro && <p className="presenca-error">{erro}</p>}

        <button type="submit" disabled={carregando} className="admin-btn admin-btn-primary">
          {carregando ? "Criando..." : "Criar e gerar link de presença"}
        </button>
      </form>

      {criada && (
        <div className="admin-success" style={{ marginTop: 20 }}>
          <p style={{ margin: "0 0 10px" }}>Link gerado! Compartilhe com os catecúmenos:</p>
          <div className="admin-catequese-actions">
            <code className="admin-catequese-link" style={{ flex: 1, margin: 0 }}>
              {criada.url}
            </code>
            <CopiarLink url={criada.url} rotulo="Copiar" />
          </div>
        </div>
      )}
    </section>
  );
}