import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatarData, getPublicacao, getPublicacoes } from "@/lib/publicacoes";

const SITE_URL = "https://www.ortodoxabahia.com.br";
const CONTACT_URL = "https://ig.me/m/ortodoxa.salvador";
const BOOK_URL = "https://pay.hotmart.com/L103598945N?bid=1780150292559";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublicacoes().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const publicacao = getPublicacao(slug);
  if (!publicacao) return {};

  return {
    title: `${publicacao.title} | Missão Ortodoxa em Salvador`,
    description: publicacao.description,
    alternates: { canonical: `/publicacoes/${publicacao.slug}` },
    openGraph: {
      title: publicacao.title,
      description: publicacao.description,
      type: "article",
      locale: "pt_BR",
      publishedTime: publicacao.date,
      modifiedTime: publicacao.updated,
      images: ["/images/orthodox-hero.png"],
    },
  };
}

export default async function PublicacaoPage({ params }: Props) {
  const { slug } = await params;
  const publicacao = getPublicacao(slug);
  if (!publicacao) notFound();

  const url = `${SITE_URL}/publicacoes/${publicacao.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: publicacao.title,
        description: publicacao.description,
        datePublished: publicacao.date,
        dateModified: publicacao.updated,
        inLanguage: "pt-BR",
        mainEntityOfPage: url,
        image: `${SITE_URL}/images/orthodox-hero.png`,
        author: { "@id": `${SITE_URL}/#igreja` },
        publisher: { "@id": `${SITE_URL}/#igreja` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Publicações", item: `${SITE_URL}/publicacoes` },
          { "@type": "ListItem", position: 3, name: publicacao.title },
        ],
      },
      ...(publicacao.slug === "confissao-ortodoxa"
        ? [
            {
              "@type": "Book",
              name: "A Confissão Ortodoxa da Igreja Católica Apostólica Oriental",
              author: { "@type": "Person", name: "São Pedro Moguila" },
              inLanguage: "pt-BR",
              translator: { "@type": "Person", name: "Pe. Paísios, Hieromonge" },
              publisher: { "@id": `${SITE_URL}/#igreja` },
              image: `${SITE_URL}/images/confissao-kindle.png`,
              offers: {
                "@type": "Offer",
                price: "29.90",
                priceCurrency: "BRL",
                url: BOOK_URL,
                availability: "https://schema.org/InStock",
              },
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="pub-article">
        <nav className="pub-breadcrumb" aria-label="Trilha de navegação">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/publicacoes">Publicações</Link>
        </nav>
        <h1>{publicacao.title}</h1>
        <p className="pub-meta">
          <time dateTime={publicacao.date}>{formatarData(publicacao.date)}</time>
          {" · Missão Ortodoxa Grega em Salvador"}
        </p>
        <div className="pub-body" dangerouslySetInnerHTML={{ __html: publicacao.html }} />
        <aside className="pub-cta">
          <p>Primeiro passo</p>
          <h2>Visite uma Divina Liturgia</h2>
          <span>
            Não é preciso ser ortodoxo nem avisar antes. Fale com a comunidade e
            saiba as datas das próximas celebrações em Salvador.
          </span>
          <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noreferrer">
            Fale com a gente
          </a>
        </aside>
      </article>
    </>
  );
}
