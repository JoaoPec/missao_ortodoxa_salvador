import Link from "next/link";

const CONTACT_URL = "https://ig.me/m/ortodoxa.salvador";
const INSTAGRAM_URL = "https://www.instagram.com/ortodoxa.salvador/";
const FACEBOOK_URL = "https://www.facebook.com/ortodoxa.salvador/";

function OrthodoxCross() {
  return (
    <svg viewBox="0 0 48 72" aria-hidden="true">
      <path
        d="M21 3h6v14h13v5H27v11h18v6H27v22l10-7 4 5-17 11L7 59l4-5 10 7V39H3v-6h18V22H8v-5h13V3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function PublicacoesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="pub-header">
        <Link className="brand" href="/" aria-label="Missão Ortodoxa Grega em Salvador — página inicial">
          <OrthodoxCross />
          <span>
            <strong>Missão Ortodoxa Grega</strong>
            <small>em Salvador</small>
          </span>
        </Link>
        <nav aria-label="Navegação das publicações">
          <Link href="/publicacoes">Publicações</Link>
          <a href={CONTACT_URL} target="_blank" rel="noreferrer">
            Contato
          </a>
        </nav>
      </header>
      <main id="conteudo" className="pub-main">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-brand">
          <OrthodoxCross />
          <div>
            <p>Missão Ortodoxa Grega em Salvador</p>
            <span>Patriarcado Ecumênico de Constantinopla</span>
          </div>
        </div>
        <div className="footer-contact">
          <Link className="footer-direct" href="/">
            Página inicial
          </Link>
          <div className="footer-socials">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram da Missão Ortodoxa em Salvador">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="16.7" cy="7.3" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook da Missão Ortodoxa em Salvador">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14.1 8.2h2.2V4.8a11.2 11.2 0 0 0-3.2-.2c-3.1 0-5.2 1.9-5.2 5.4v3H4.5v3.8h3.4v6.7h4.1v-6.7h3.3l.6-3.8H12v-2.6c0-1.1.3-2.2 2.1-2.2Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
