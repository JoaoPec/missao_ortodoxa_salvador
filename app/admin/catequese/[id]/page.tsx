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
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <AdminNav />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Link href="/admin" className="text-sm font-semibold text-[var(--crimson)] hover:underline">
              ← Catequeses
            </Link>
            <h1 className="mt-1 text-2xl font-bold text-[var(--ink)]" style={{ fontFamily: '"Cinzel", serif' }}>
              {catequese.titulo}
            </h1>
            <p className="text-sm text-[var(--muted)]">
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
          <div className="flex items-center gap-2">
            <a
              href={`/api/admin/catequeses/${catequese.id}/export`}
              className="rounded-lg px-3 py-2 text-xs font-bold text-white transition hover:brightness-110"
              style={{ background: "var(--gold)" }}
            >
              ⬇ Exportar CSV
            </a>
            <ExcluirCatequese id={catequese.id} titulo={catequese.titulo} />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-center">
          <div className="flex-1 rounded-2xl border border-[var(--line)] p-4" style={{ background: "var(--plaster)" }}>
            <p className="text-3xl font-bold text-[var(--crimson)]">{confirmados.length}</p>
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Confirmados</p>
          </div>
          <div className="flex-1 rounded-2xl border border-[var(--line)] p-4" style={{ background: "var(--plaster)" }}>
            <p className="text-3xl font-bold text-[var(--ink)]">{faltantes.length}</p>
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Faltantes</p>
          </div>
          <div className="flex-1 rounded-2xl border border-[var(--line)] p-4" style={{ background: "var(--plaster)" }}>
            <p className="text-3xl font-bold text-[var(--gold)]">{pct}%</p>
            <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Presença</p>
          </div>
        </div>

        {confirmados.length > 0 && (
          <section className="rounded-2xl border border-[var(--line)] p-6" style={{ background: "var(--plaster)" }}>
            <h2 className="mb-4 text-lg font-bold text-[var(--ink)]" style={{ fontFamily: '"Cinzel", serif' }}>
              Confirmaram presença
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-[var(--muted)]">
                    <th className="pb-2 pr-4 font-semibold">Nome</th>
                    <th className="pb-2 pr-4 font-semibold">E-mail</th>
                    <th className="pb-2 pr-4 font-semibold">Telefone</th>
                    <th className="pb-2 font-semibold">Quando</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmados.map((p) => (
                    <tr key={p.id} className="border-t" style={{ borderColor: "var(--line)" }}>
                      <td className="py-2 pr-4 font-medium text-[var(--ink)]">{p.nome}</td>
                      <td className="py-2 pr-4 text-[var(--muted)]">{p.email || "—"}</td>
                      <td className="py-2 pr-4 text-[var(--muted)]">{p.telefone || "—"}</td>
                      <td className="py-2 text-[var(--muted)]">
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
          <section className="rounded-2xl border border-[var(--line)] p-6" style={{ background: "var(--plaster)" }}>
            <h2 className="mb-4 text-lg font-bold text-[var(--ink)]" style={{ fontFamily: '"Cinzel", serif' }}>
              Ainda não confirmaram ({faltantes.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-[var(--muted)]">
                    <th className="pb-2 pr-4 font-semibold">Nome</th>
                    <th className="pb-2 pr-4 font-semibold">E-mail</th>
                    <th className="pb-2 pr-4 font-semibold">Cidade</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {faltantes.map((p) => (
                    <tr key={p.id} className="border-t" style={{ borderColor: "var(--line)" }}>
                      <td className="py-2 pr-4 font-medium text-[var(--ink)]">{p.nome}</td>
                      <td className="py-2 pr-4 text-[var(--muted)]">{p.email || "—"}</td>
                      <td className="py-2 pr-4 text-[var(--muted)]">{p.cidade || "—"}</td>
                      <td className="py-2 text-[var(--muted)]">{p.status || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {confirmados.length === 0 && faltantes.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--muted)]">
            Nenhum catecúmeno cadastrado ainda. Importe a lista em{" "}
            <Link href="/admin/pessoas" className="font-semibold text-[var(--crimson)] hover:underline">
              Catecúmenos
            </Link>
            .
          </p>
        )}
      </main>
    </div>
  );
}
