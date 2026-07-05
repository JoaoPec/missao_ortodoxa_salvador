import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ortodoxabahia.com.br"),
  title: "Igreja Ortodoxa em Salvador, Bahia | Missão Ortodoxa Grega",
  description:
    "Igreja Ortodoxa em Salvador, Bahia: Divinas Liturgias, catequese para adultos e acolhida a visitantes. Missão do Patriarcado Ecumênico de Constantinopla.",
  authors: [{ name: "Missão Ortodoxa Grega em Salvador" }],
  openGraph: {
    title: "Igreja Ortodoxa em Salvador, Bahia | Missão Ortodoxa Grega",
    description:
      "Divinas Liturgias, catequese para adultos e acolhida a visitantes em Salvador, BA. Missão do Patriarcado Ecumênico de Constantinopla.",
    type: "website",
    locale: "pt_BR",
    siteName: "Missão Ortodoxa Grega em Salvador",
    images: ["/images/orthodox-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Igreja Ortodoxa em Salvador, Bahia | Missão Ortodoxa Grega",
    description:
      "Divinas Liturgias, catequese para adultos e acolhida a visitantes em Salvador, BA.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.ortodoxabahia.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Church",
                  "@id": "https://www.ortodoxabahia.com.br/#igreja",
                  name: "Missão Ortodoxa Grega em Salvador",
                  alternateName: [
                    "Igreja Ortodoxa em Salvador",
                    "Igreja Ortodoxa Grega Salvador",
                  ],
                  url: "https://www.ortodoxabahia.com.br",
                  image: "https://www.ortodoxabahia.com.br/images/orthodox-hero.png",
                  description:
                    "Comunidade cristã ortodoxa em Salvador, Bahia, vinculada ao Patriarcado Ecumênico de Constantinopla. Divinas Liturgias, catequese para adultos e acolhida a visitantes.",
                  foundingDate: "2023",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Salvador",
                    addressRegion: "BA",
                    addressCountry: "BR",
                  },
                  sameAs: [
                    "https://www.instagram.com/ortodoxa.salvador/",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
