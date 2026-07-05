import Image from "next/image";
import Link from "next/link";

const CONTACT_URL = "https://ig.me/m/ortodoxa.salvador";
const INSTAGRAM_URL = "https://www.instagram.com/ortodoxa.salvador/";

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
          <Image src="/images/selo-patriarcado.png" alt="" width={46} height={46} className="seal" />
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
          <Image src="/images/selo-patriarcado.png" alt="" width={40} height={40} className="seal" />
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
          </div>
        </div>
      </footer>
    </>
  );
}
