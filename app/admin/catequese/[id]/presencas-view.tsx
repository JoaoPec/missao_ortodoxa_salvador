"use client";

import { useMemo, useState } from "react";

export interface PessoaLinha {
  id: number;
  nome: string;
  email: string | null;
  telefone: string | null;
  cidade: string | null;
  status: string | null;
  confirmado_em?: string;
}

export default function PresencasView({
  confirmados,
  faltantes,
}: {
  confirmados: PessoaLinha[];
  faltantes: PessoaLinha[];
}) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    const filtro = (p: PessoaLinha) =>
      !q ||
      [p.nome, p.email, p.cidade, p.telefone].some(
        (v) => v && v.toLowerCase().includes(q)
      );
    return {
      confirmados: confirmados.filter(filtro),
      faltantes: faltantes.filter(filtro),
    };
  }, [busca, confirmados, faltantes]);

  return (
    <>
      <div className="admin-actions" style={{ marginBottom: 20 }}>
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome, e-mail, cidade ou telefone..."
          aria-label="Buscar catecúmeno"
          style={{ flex: 1, minWidth: 220 }}
          className="admin-field"
        />
      </div>

      {busca.trim() && (
        <p className="admin-sub" style={{ marginTop: -10, marginBottom: 20 }}>
          {filtrados.confirmados.length + filtrados.faltantes.length} resultado(s)
          para “{busca.trim()}”
        </p>
      )}

      {filtrados.confirmados.length > 0 && (
        <section className="admin-card">
          <h2 className="admin-card-title">
            Confirmaram presença ({filtrados.confirmados.length})
          </h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Quando</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.confirmados.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.email || "—"}</td>
                    <td>{p.telefone || "—"}</td>
                    <td>
                      {p.confirmado_em
                        ? new Date(p.confirmado_em + "Z").toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {filtrados.faltantes.length > 0 && (
        <section className="admin-card">
          <h2 className="admin-card-title">
            Ainda não confirmaram ({filtrados.faltantes.length})
          </h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Cidade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.faltantes.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.email || "—"}</td>
                    <td>{p.cidade || "—"}</td>
                    <td>{p.status || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {filtrados.confirmados.length === 0 &&
        filtrados.faltantes.length === 0 && (
          <p className="admin-empty">
            {busca.trim()
              ? "Nada encontrado para esta busca."
              : "Nenhum catecúmeno cadastrado ainda. Importe a lista em " +
                "Catecúmenos."}
          </p>
        )}
    </>
  );
}
