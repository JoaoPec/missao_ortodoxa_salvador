import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Missão Ortodoxa Grega em Salvador | Igreja Ortodoxa na Bahia",
  description:
    "A Missão Ortodoxa Grega em Salvador (BA) é uma comunidade cristã ortodoxa vinculada ao Patriarcado Ecumênico de Constantinopla. Conheça a fé ortodoxa, participe das liturgias e entre em contato conosco.",
  keywords: [
    "Igreja Ortodoxa Salvador",
    "Igreja Ortodoxa Bahia",
    "Missão Ortodoxa Grega Salvador",
    "Ortodoxia Salvador",
    "Igreja Grega Salvador",
    "Patriarcado Ecumênico Bahia",
    "Liturgia Ortodoxa Salvador",
    "Batismo Ortodoxo Salvador",
    "Casamento Ortodoxo Salvador",
    "Comunidade Ortodoxa Salvador",
  ],
  authors: [{ name: "Missão Ortodoxa Grega em Salvador" }],
  openGraph: {
    title: "Missão Ortodoxa Grega em Salvador",
    description:
      "Comunidade cristã ortodoxa em Salvador, BA. Liturgias, sacramentos e acolhimento para todos que buscam a fé ortodoxa na Bahia.",
    type: "website",
    locale: "pt_BR",
    siteName: "Missão Ortodoxa Grega em Salvador",
  },
  twitter: {
    card: "summary_large_image",
    title: "Missão Ortodoxa Grega em Salvador",
    description: "Igreja Ortodoxa em Salvador, BA - Patriarcado Ecumênico de Constantinopla.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://ortodoxasalvador.org.br",
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
              "@type": "Church",
              name: "Missão Ortodoxa Grega em Salvador",
              alternateName: "Igreja Ortodoxa Grega Salvador",
              description:
                "Comunidade cristã ortodoxa em Salvador, Bahia, vinculada ao Patriarcado Ecumênico de Constantinopla.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Salvador",
                addressRegion: "BA",
                addressCountry: "BR",
              },
              sameAs: [
                "https://www.instagram.com/ortodoxa.salvador/",
                "https://www.facebook.com/ortodoxa.salvador/",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
