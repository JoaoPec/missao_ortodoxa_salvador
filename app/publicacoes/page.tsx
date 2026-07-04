import type { Metadata } from "next";
import Link from "next/link";
import { formatarData, getPublicacoes } from "@/lib/publicacoes";

export const metadata: Metadata = {
  title: "Publicações | Missão Ortodoxa Grega em Salvador",
  description:
    "Artigos de catequese, guias para visitantes e traduções da Missão Ortodoxa Grega em Salvador: fé ortodoxa, Divina Liturgia, sacramentos e calendário litúrgico.",
  alternates: { canonical: "/publicacoes" },
  openGraph: {
    title: "Publicações | Missão Ortodoxa Grega em Salvador",
    description:
      "Artigos de catequese, guias para visitantes e traduções da Missão Ortodoxa Grega em Salvador.",
    type: "website",
    locale: "pt_BR",
    images: ["/images/orthodox-hero.png"],
  },
};

export default function PublicacoesPage() {
  const publicacoes = getPublicacoes();

  return (
    <section className="pub-index">
      <p className="pub-kicker">Publicações</p>
      <h1>Catequese, guias e traduções</h1>
      <p className="pub-lead">
        Textos da Missão Ortodoxa Grega em Salvador para quem deseja conhecer a
        fé ortodoxa, visitar uma celebração ou aprofundar a vida na Igreja.
      </p>
      <div className="pub-list">
        {publicacoes.map((publicacao) => (
          <article key={publicacao.slug}>
            <time dateTime={publicacao.date}>{formatarData(publicacao.date)}</time>
            <h2>
              <Link href={`/publicacoes/${publicacao.slug}`}>{publicacao.title}</Link>
            </h2>
            <p>{publicacao.description}</p>
            <Link className="pub-more" href={`/publicacoes/${publicacao.slug}`}>
              Ler publicação
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
