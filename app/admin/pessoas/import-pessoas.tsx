"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImportPessoas() {
  const router = useRouter();
  const [csv, setCsv] = useState("");
  const [resultado, setResultado] = useState<{
    inseridas: number;
    atualizadas: number;
    total: number;
  } | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function importar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    setResultado(null);
    try {
      const res = await fetch("/api/admin/pessoas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv }),
      });
      const dados = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErro(dados.erro || "Falha ao importar.");
        return;
      }
      setResultado(dados);
      setCsv("");
      router.refresh();
    } catch {
      setErro("Falha de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="rounded-2xl border border-[var(--line)] p-6" style={{ background: "var(--plaster)" }}>
      <h2 className="mb-1 text-lg font-bold text-[var(--ink)]" style={{ fontFamily: '"Cinzel", serif' }}>
        Importar lista do Notion
      </h2>
      <p className="mb-4 text-sm text-[var(--muted)]">
        No Notion, exporte a página de catecúmenos como <strong>CSV</strong> e cole aqui.
        Quem já existe é atualizado; novidades são cadastradas. A chave é o e-mail
        (quem não tem e-mail é casado pelo nome).
      </p>
      <form onSubmit={importar} className="space-y-4">
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          rows={8}
          required
          placeholder={"Nome e sobrenome,E-mail,Local,Status,...\nAdriano Vidal Matos,adrianovidalms@gmail.com,..."}
          className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 font-mono text-xs text-[var(--ink)] outline-none transition focus:border-[var(--crimson)] focus:ring-2 focus:ring-[var(--crimson)]/20"
        />
        {erro && (
          <p className="rounded-lg px-4 py-2.5 text-sm font-medium" style={{ background: "rgba(147,20,14,0.08)", color: "var(--crimson)" }}>
            {erro}
          </p>
        )}
        {resultado && (
          <p className="rounded-lg px-4 py-2.5 text-sm font-bold" style={{ background: "rgba(20,120,60,0.10)", color: "#14783c" }}>
            ✓ {resultado.inseridas} cadastradas, {resultado.atualizadas} atualizadas. Total: {resultado.total}.
          </p>
        )}
        <button
          type="submit"
          disabled={carregando || !csv.trim()}
          className="rounded-lg px-6 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
          style={{ background: "var(--crimson)" }}
        >
          {carregando ? "Importando..." : "Importar CSV"}
        </button>
      </form>
    </section>
  );
}
