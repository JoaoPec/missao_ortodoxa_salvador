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
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <AdminNav />
      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-[var(--ink)]" style={{ fontFamily: '"Cinzel", serif' }}>
              Catequeses
            </h1>
            <p className="text-sm text-[var(--muted)]">
              Crie uma catequese, compartilhe o link e acompanhe as presenças.
            </p>
          </div>
          <div className="flex gap-6 text-center">
            {[
              [String(r.totalCatequeses), "catequeses"],
              [String(r.totalPresencas), "presenças"],
              [String(r.totalPessoas), "catecúmenos"],
            ].map(([n, rotulo]) => (
              <div key={rotulo}>
                <p className="text-2xl font-bold text-[var(--crimson)]">{n}</p>
                <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{rotulo}</p>
              </div>
            ))}
          </div>
        </div>

        <NovaCatequese />

        {r.catequeses.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
            Nenhuma catequese ainda. Crie a primeira acima.
          </p>
        ) : (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-[var(--ink)]" style={{ fontFamily: '"Cinzel", serif' }}>
              Catequeses criadas
            </h2>
            {r.catequeses.map((c) => {
              const url = `${base}/presenca/${c.slug}`;
              const pct = total > 0 ? Math.round((c.confirmados / total) * 100) : 0;
              return (
                <article
                  key={c.id}
                  className="rounded-2xl border border-[var(--line)] p-5"
                  style={{ background: "var(--plaster)" }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-[var(--ink)]">{c.titulo}</h3>
                      <p className="text-sm text-[var(--muted)]">
                        {c.assunto || "Sem assunto"}
                        {c.data ? ` · ${new Date(c.data + "T00:00:00").toLocaleDateString("pt-BR")}` : ""}
                      </p>
                      <code className="mt-1 block truncate text-xs text-[var(--crimson)]">{url}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <CopiarLink url={url} />
                      <Link
                        href={`/admin/catequese/${c.id}`}
                        className="rounded-lg px-3 py-2 text-xs font-bold text-white transition hover:brightness-110"
                        style={{ background: "var(--crimson)" }}
                      >
                        Ver detalhe
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs font-semibold text-[var(--muted)]">
                      <span>
                        {c.confirmados} de {total} confirmados
                      </span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--paper-2)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: "var(--crimson)" }}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {r.presencasPorPessoa.length > 0 && (
          <section className="rounded-2xl border border-[var(--line)] p-6" style={{ background: "var(--plaster)" }}>
            <h2 className="mb-4 text-lg font-bold text-[var(--ink)]" style={{ fontFamily: '"Cinzel", serif' }}>
              Presença geral dos catecúmenos
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-[var(--muted)]">
                    <th className="pb-2 pr-4 font-semibold">Nome</th>
                    <th className="pb-2 pr-4 font-semibold">E-mail</th>
                    <th className="pb-2 text-right font-semibold">Presenças</th>
                  </tr>
                </thead>
                <tbody>
                  {r.presencasPorPessoa.map((p) => (
                    <tr key={p.email ?? p.nome} className="border-t" style={{ borderColor: "var(--line)" }}>
                      <td className="py-2 pr-4 font-medium text-[var(--ink)]">
                        {p.nome}
                        {p.origem === "auto" && (
                          <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase" style={{ background: "var(--paper-2)", color: "var(--muted)" }}>
                            auto
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-4 text-[var(--muted)]">{p.email || "—"}</td>
                      <td className="py-2 text-right font-bold text-[var(--crimson)]">{p.presencas}</td>
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
