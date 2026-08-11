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
            <div className="admin-card">
              <h2 className="admin-card-title">Como funciona</h2>
              <p className="admin-sub" style={{ marginTop: -14, marginBottom: 0 }}>
                São só três passos. Em minutos você tem o link pronto para enviar:
              </p>
              <div className="admin-steps">
                <div className="admin-step">
                  <span className="admin-step-num">1</span>
                  <h3>Crie a catequese</h3>
                  <p>Preencha o título, o assunto e a data (a data já vem com o dia de hoje).</p>
                </div>
                <div className="admin-step">
                  <span className="admin-step-num">2</span>
                  <h3>Envie o link</h3>
                  <p>Copie o link gerado e mande para os catecúmenos no WhatsApp ou e-mail.</p>
                </div>
                <div className="admin-step">
                  <span className="admin-step-num">3</span>
                  <h3>Acompanhe as presenças</h3>
                  <p>Veja quem confirmou, quem faltou e baixe a lista em Excel.</p>
                </div>
              </div>
            </div>
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
                          Ver presenças
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
            <p className="admin-sub" style={{ marginTop: -14, marginBottom: 20 }}>
              Frequência = presenças ÷ {r.totalCatequeses}{" "}
              {r.totalCatequeses === 1 ? "catequese" : "catequeses"} realizadas.
            </p>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th className="num">Presenças</th>
                    <th style={{ minWidth: 180 }}>Frequência</th>
                  </tr>
                </thead>
                <tbody>
                  {r.presencasPorPessoa.map((p) => {
                    const freq =
                      r.totalCatequeses > 0
                        ? Math.round((p.presencas / r.totalCatequeses) * 100)
                        : 0;
                    return (
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
                        <td>
                          <div className="admin-progress-label" style={{ marginTop: 0 }}>
                            <span>{freq}%</span>
                          </div>
                          <div className="admin-progress" style={{ marginTop: 4 }}>
                            <i style={{ width: `${freq}%` }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}