import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { verificarSessao } from "@/lib/auth";
import { buscarCatequese, presencasDaCatequese, faltantesDaCatequese } from "@/lib/data";
import { urlBase } from "@/lib/url";
import AdminNav from "../../admin-nav";
import CopiarLink from "../../copiar-link";
import ExcluirCatequese from "./excluir";
import PresencasView from "./presencas-view";

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

  const base = await urlBase();
  const urlPresenca = `${base}/presenca/${catequese.slug}`;

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
              ⬇ Exportar Excel
            </a>
            <ExcluirCatequese id={catequese.id} titulo={catequese.titulo} />
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 26 }}>
          <p className="admin-sub" style={{ margin: 0, marginBottom: 10 }}>
            Link desta catequese (envie aos catecúmenos):
          </p>
          <div className="admin-catequese-actions">
            <code className="admin-catequese-link" style={{ flex: 1, margin: 0 }}>
              {urlPresenca}
            </code>
            <CopiarLink url={urlPresenca} />
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

        <PresencasView
          confirmados={confirmados.map((p) => ({ ...p }))}
          faltantes={faltantes.map((p) => ({ ...p }))}
        />
      </main>
    </div>
  );
}