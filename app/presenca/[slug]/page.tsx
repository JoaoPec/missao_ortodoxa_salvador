import type { Metadata } from "next";
import Image from "next/image";
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
    <main className="presenca-page">
      <div className="presenca-bg" aria-hidden="true">
        <Image
          src="/images/orthodox-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="presenca-shade" aria-hidden="true" />

      <div className="presenca-inner">
        <div className="presenca-brand">
          <Image
            src="/images/selo-patriarcado.png"
            alt=""
            width={44}
            height={44}
            className="seal"
          />
          <span className="presenca-brand-text">
            <strong>Missão Ortodoxa Grega</strong>
            <small>em Salvador</small>
          </span>
        </div>

        <div className="presenca-card">
          <p className="presenca-overline">Catequese</p>
          <h1 className="presenca-title">{catequese.titulo}</h1>
          {catequese.assunto && (
            <p className="presenca-sub">{catequese.assunto}</p>
          )}
          {dataFormatada && (
            <p className="presenca-date">{dataFormatada}</p>
          )}
          <div className="presenca-divider" />
          <PresencaForm slug={slug} titulo={catequese.titulo} />
        </div>
      </div>
    </main>
  );
}