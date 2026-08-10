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
    <section className="admin-card">
      <h2 className="admin-card-title">Importar lista do Notion</h2>
      <p className="admin-sub" style={{ marginTop: -12, marginBottom: 20 }}>
        No Notion, exporte a página de catecúmenos como <strong>CSV</strong> e cole aqui.
        Quem já existe é atualizado; novidades são cadastradas. A chave é o e-mail
        (quem não tem e-mail é casado pelo nome).
      </p>
      <form onSubmit={importar}>
        <div className="admin-field">
          <label htmlFor="csv">Conteúdo do CSV</label>
          <textarea
            id="csv"
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            rows={8}
            required
            placeholder={"Nome e sobrenome,E-mail,Local,Status,...\nAdriano Vidal Matos,adrianovidalms@gmail.com,..."}
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.8rem" }}
          />
        </div>
        {erro && <p className="presenca-error">{erro}</p>}
        {resultado && (
          <p className="admin-success">
            ✓ {resultado.inseridas} cadastradas, {resultado.atualizadas} atualizadas. Total: {resultado.total}.
          </p>
        )}
        <button type="submit" disabled={carregando || !csv.trim()} className="admin-btn admin-btn-primary">
          {carregando ? "Importando..." : "Importar CSV"}
        </button>
      </form>
    </section>
  );
}