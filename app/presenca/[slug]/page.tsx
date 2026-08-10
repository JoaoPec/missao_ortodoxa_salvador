import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarCatequesePorSlug } from "@/lib/data";
import PresencaForm from "./presenca-form";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const catequese = buscarCatequesePorSlug(slug);
  return {
    title: catequese
      ? `Confirmar presença — ${catequese.titulo}`
      : "Confirmar presença",
    robots: { index: false, follow: false },
  };
}

function CruzOrtodoxa() {
  return (
    <svg viewBox="0 0 48 72" className="mx-auto mb-6 h-12 w-8" aria-hidden="true">
      <path
        d="M21 3h6v14h13v5H27v11h18v6H27v22l10-7 4 5-17 11L7 59l4-5 10 7V39H3v-6h18V22H8v-5h13V3Z"
        fill="var(--crimson)"
      />
    </svg>
  );
}

export default async function PaginaPresenca({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const catequese = buscarCatequesePorSlug(slug);
  if (!catequese) notFound();

  const dataFormatada = catequese.data
    ? new Date(catequese.data + "T00:00:00").toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ background: "var(--paper)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[var(--line)] p-8 shadow-lg"
        style={{ background: "var(--plaster)" }}
      >
        <CruzOrtodoxa />
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
          Catequese
        </p>
        <h1
          className="mb-2 mt-2 text-center text-2xl font-bold text-[var(--ink)] sm:text-3xl"
          style={{ fontFamily: '"Cinzel", serif' }}
        >
          {catequese.titulo}
        </h1>
        {catequese.assunto && (
          <p className="mb-4 text-center text-[var(--muted)]">{catequese.assunto}</p>
        )}
        {dataFormatada && (
          <p className="mb-6 text-center text-sm font-medium capitalize text-[var(--crimson)]">
            {dataFormatada}
          </p>
        )}
        <div className="mb-6 h-px" style={{ background: "var(--line)" }} />
        <PresencaForm slug={slug} titulo={catequese.titulo} />
      </div>
    </main>
  );
}
