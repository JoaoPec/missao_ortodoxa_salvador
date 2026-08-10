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
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <AdminNav />
      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ink)]" style={{ fontFamily: '"Cinzel", serif' }}>
            Catecúmenos
          </h1>
          <p className="text-sm text-[var(--muted)]">
            {pessoas.length} cadastrados. A chave de cada pessoa é o e-mail.
          </p>
        </div>

        <ImportPessoas />

        <section className="rounded-2xl border border-[var(--line)] p-6" style={{ background: "var(--plaster)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-[var(--muted)]">
                  <th className="pb-2 pr-4 font-semibold">Nome</th>
                  <th className="pb-2 pr-4 font-semibold">E-mail</th>
                  <th className="pb-2 pr-4 font-semibold">Telefone</th>
                  <th className="pb-2 pr-4 font-semibold">Cidade</th>
                  <th className="pb-2 pr-4 font-semibold">Status</th>
                  <th className="pb-2 text-right font-semibold">Presenças</th>
                </tr>
              </thead>
              <tbody>
                {pessoas.map((p) => (
                  <tr key={p.id} className="border-t" style={{ borderColor: "var(--line)" }}>
                    <td className="py-2 pr-4 font-medium text-[var(--ink)]">
                      {p.nome}
                      {p.origem === "auto" && (
                        <span
                          className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                          style={{ background: "var(--paper-2)", color: "var(--muted)" }}
                        >
                          auto
                        </span>
                      )}
                    </td>
                    <td className="py-2 pr-4 text-[var(--muted)]">{p.email || "—"}</td>
                    <td className="py-2 pr-4 text-[var(--muted)]">{p.telefone || "—"}</td>
                    <td className="py-2 pr-4 text-[var(--muted)]">{p.cidade || "—"}</td>
                    <td className="py-2 pr-4 text-[var(--muted)]">{p.status || "—"}</td>
                    <td className="py-2 text-right font-bold text-[var(--crimson)]">{p.presencas}</td>
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
