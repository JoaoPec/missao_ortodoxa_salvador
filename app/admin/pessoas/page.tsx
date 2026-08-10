import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verificarSessao } from "@/lib/auth";
import { listarPessoas } from "@/lib/data";
import AdminNav from "../admin-nav";
import ImportPessoas from "./import-pessoas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catecúmenos — Presença",
  robots: { index: false, follow: false },
};

export default async function PaginaCatecumenos() {
  if (!(await verificarSessao())) {
    redirect("/admin/login");
  }

  const pessoas = listarPessoas();

  return (
    <div className="admin-shell">
      <AdminNav />
      <main className="admin-main">
        <div className="admin-head">
          <div>
            <p className="admin-overline">Cadastro</p>
            <h1 className="admin-title">Catecúmenos</h1>
            <p className="admin-sub">
              {pessoas.length} cadastrados. A chave de cada pessoa é o e-mail.
            </p>
          </div>
        </div>

        <ImportPessoas />

        <section className="admin-card admin-section" style={{ marginTop: 26 }}>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Cidade</th>
                  <th>Status</th>
                  <th className="num">Presenças</th>
                </tr>
              </thead>
              <tbody>
                {pessoas.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.nome}
                      {p.origem === "auto" && (
                        <span className="admin-tag" style={{ marginLeft: 8 }}>
                          auto
                        </span>
                      )}
                    </td>
                    <td>{p.email || "—"}</td>
                    <td>{p.telefone || "—"}</td>
                    <td>{p.cidade || "—"}</td>
                    <td>{p.status || "—"}</td>
                    <td className="num">{p.presencas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}