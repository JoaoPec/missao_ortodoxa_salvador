import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const GA4_ID = "G-S23J6N6R4H";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c0805",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ortodoxabahia.com.br"),
  title: "Igreja Ortodoxa em Salvador, Bahia | Missão Ortodoxa Grega",
  description:
    "Igreja Ortodoxa em Salvador, Bahia: Divinas Liturgias, catequese para adultos e acolhida a visitantes. Missão do Patriarcado Ecumênico de Constantinopla.",
  authors: [{ name: "Missão Ortodoxa Grega em Salvador" }],
  keywords: [
    "Igreja Ortodoxa Salvador",
    "Missão Ortodoxa Bahia",
    "Divina Liturgia Salvador",
    "Patriarcado Ecumênico Constantinopla",
    "catequese ortodoxa",
    "Igreja Ortodoxa Grega",
    "Ortodoxia Salvador Bahia",
  ],
  verification: {
    google: "INSIRA_SEU_CODIGO_AQUI",
  },
  openGraph: {
    title: "Igreja Ortodoxa em Salvador, Bahia | Missão Ortodoxa Grega",
    description:
      "Divinas Liturgias, catequese para adultos e acolhida a visitantes em Salvador, BA. Missão do Patriarcado Ecumênico de Constantinopla.",
    url: "https://www.ortodoxabahia.com.br",
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
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
                  hasMap: "https://maps.app.goo.gl/DDMpYk1BrgpFcB7o7",
                  sameAs: [
                    "https://www.instagram.com/ortodoxa.salvador/",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full">
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
