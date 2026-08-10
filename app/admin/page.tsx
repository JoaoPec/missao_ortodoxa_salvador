import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verificarSessao } from "@/lib/auth";
import { resumoGeral, totalCadastrados } from "@/lib/data";
import { urlBase } from "@/lib/url";
import AdminNav from "./admin-nav";
import NovaCatequese from "./nova-catequese";
import CopiarLink from "./copiar-link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Presença — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  if (!(await verificarSessao())) {
    redirect("/admin/login");
  }

  const base = await urlBase();
  const r = resumoGeral();
  const total = totalCadastrados();

  return (
    <div className="admin-shell">
      <AdminNav />
      <main className="admin-main">
        <div className="admin-head">
          <div>
            <p className="admin-overline">Painel do padre</p>
            <h1 className="admin-title">Catequeses</h1>
            <p className="admin-sub">
              Crie uma catequese, compartilhe o link e acompanhe as presenças.
            </p>
          </div>
          <div className="admin-stats" style={{ marginBottom: 0 }}>
            {[
              [String(r.totalCatequeses), "catequeses"],
              [String(r.totalPresencas), "presenças"],
              [String(r.totalPessoas), "catecúmenos"],
            ].map(([n, rotulo]) => (
              <div key={rotulo} className="admin-stat">
                <strong>{n}</strong>
                <span>{rotulo}</span>
              </div>
            ))}
          </div>
        </div>

        <NovaCatequese />

        <section className="admin-section" style={{ marginTop: 26 }}>
          <h2 className="admin-card-title" style={{ marginBottom: 16 }}>
            Catequeses criadas
          </h2>
          {r.catequeses.length === 0 ? (
            <p className="admin-empty">
              Nenhuma catequese ainda. Crie a primeira acima.
            </p>
          ) : (
            <div>
              {r.catequeses.map((c) => {
                const url = `${base}/presenca/${c.slug}`;
                const pct = total > 0 ? Math.round((c.confirmados / total) * 100) : 0;
                return (
                  <article key={c.id} className="admin-catequese">
                    <div className="admin-catequese-head">
                      <div>
                        <h3 className="admin-catequese-title">{c.titulo}</h3>
                        <p className="admin-catequese-meta">
                          {c.assunto || "Sem assunto"}
                          {c.data
                            ? ` · ${new Date(c.data + "T00:00:00").toLocaleDateString("pt-BR")}`
                            : ""}
                        </p>
                        <code className="admin-catequese-link">{url}</code>
                      </div>
                      <div className="admin-catequese-actions">
                        <CopiarLink url={url} />
                        <Link href={`/admin/catequese/${c.id}`} className="admin-btn admin-btn-primary">
                          Ver detalhe
                        </Link>
                      </div>
                    </div>
                    <div className="admin-progress-label">
                      <span>
                        {c.confirmados} de {total} confirmados
                      </span>
                      <span>{pct}%</span>
                    </div>
                    <div className="admin-progress">
                      <i style={{ width: `${pct}%` }} />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {r.presencasPorPessoa.length > 0 && (
          <section className="admin-card admin-section" style={{ marginTop: 26 }}>
            <h2 className="admin-card-title">Presença geral dos catecúmenos</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th className="num">Presenças</th>
                  </tr>
                </thead>
                <tbody>
                  {r.presencasPorPessoa.map((p) => (
                    <tr key={p.email ?? p.nome}>
                      <td>
                        {p.nome}
                        {p.origem === "auto" && (
                          <span className="admin-tag" style={{ marginLeft: 8 }}>
                            auto
                          </span>
                        )}
                      </td>
                      <td>{p.email || "—"}</td>
                      <td className="num">{p.presencas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}