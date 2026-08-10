import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { verificarSessao } from "@/lib/auth";
import { buscarCatequese, presencasDaCatequese, faltantesDaCatequese } from "@/lib/data";
import AdminNav from "../../admin-nav";
import ExcluirCatequese from "./excluir";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catequese — Presença",
  robots: { index: false, follow: false },
};

export default async function DetalheCatequese({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await verificarSessao())) {
    redirect("/admin/login");
  }
  const { id } = await params;
  const catequese = buscarCatequese(Number(id));
  if (!catequese) notFound();

  const confirmados = presencasDaCatequese(catequese.id);
  const faltantes = faltantesDaCatequese(catequese.id);
  const total = confirmados.length + faltantes.length;
  const pct = total > 0 ? Math.round((confirmados.length / total) * 100) : 0;

  return (
    <div className="admin-shell">
      <AdminNav />
      <main className="admin-main">
        <Link href="/admin" className="admin-back">
          ← Catequeses
        </Link>

        <div className="admin-head">
          <div>
            <p className="admin-overline">Catequese</p>
            <h1 className="admin-title">{catequese.titulo}</h1>
            <p className="admin-sub">
              {catequese.assunto || "Sem assunto"}
              {catequese.data
                ? ` · ${new Date(catequese.data + "T00:00:00").toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}`
                : ""}
            </p>
          </div>
          <div className="admin-catequese-actions">
            <a
              href={`/api/admin/catequeses/${catequese.id}/export`}
              className="admin-btn admin-btn-gold"
            >
              ⬇ Exportar CSV
            </a>
            <ExcluirCatequese id={catequese.id} titulo={catequese.titulo} />
          </div>
        </div>

        <div className="admin-stats">
          <div className="admin-stat">
            <strong>{confirmados.length}</strong>
            <span>Confirmados</span>
          </div>
          <div className="admin-stat">
            <strong>{faltantes.length}</strong>
            <span>Faltantes</span>
          </div>
          <div className="admin-stat">
            <strong>{pct}%</strong>
            <span>Presença</span>
          </div>
        </div>

        {confirmados.length > 0 && (
          <section className="admin-card">
            <h2 className="admin-card-title">Confirmaram presença</h2>
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
                  {confirmados.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{p.email || "—"}</td>
                      <td>{p.telefone || "—"}</td>
                      <td>
                        {new Date(p.confirmado_em + "Z").toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {faltantes.length > 0 && (
          <section className="admin-card">
            <h2 className="admin-card-title">Ainda não confirmaram ({faltantes.length})</h2>
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
                  {faltantes.map((p) => (
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

        {confirmados.length === 0 && faltantes.length === 0 && (
          <p className="admin-empty">
            Nenhum catecúmeno cadastrado ainda. Importe a lista em{" "}
            <Link href="/admin/pessoas" className="admin-link">
              Catecúmenos
            </Link>
            .
          </p>
        )}
      </main>
    </div>
  );
}