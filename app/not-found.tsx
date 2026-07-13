import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada | Missão Ortodoxa Grega em Salvador",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main style={{
      display: "grid",
      placeItems: "center",
      minHeight: "100svh",
      padding: "40px 24px",
      textAlign: "center",
      background: "var(--paper)",
      color: "var(--ink)",
      fontFamily: "'Plus Jakarta Sans', Arial, sans-serif",
    }}>
      <div>
        <p style={{
          margin: "0 0 12px",
          color: "var(--gold)",
          fontSize: "0.72rem",
          fontWeight: 900,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          404
        </p>
        <h1 style={{
          margin: "0",
          fontFamily: "'Libre Baskerville', Georgia, serif",
          fontSize: "clamp(2rem, 4.8vw, 3.6rem)",
          fontWeight: 400,
          lineHeight: 1.1,
        }}>
          Página não encontrada
        </h1>
        <p style={{
          maxWidth: 480,
          margin: "20px auto 32px",
          color: "var(--muted)",
          fontFamily: "'Libre Baskerville', Georgia, serif",
          fontSize: "1.05rem",
          lineHeight: 1.75,
        }}>
          O conteúdo que você procura pode ter sido movido ou não estar mais disponível.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 48,
            padding: "14px 28px",
            color: "var(--ink)",
            background: "linear-gradient(135deg, #b77920, var(--gold-2))",
            fontSize: "0.76rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 18px 40px rgba(196, 139, 42, 0.22)",
          }}
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
