"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CONTACT_URL = "https://ig.me/m/ortodoxa.salvador";
const BOOK_URL = "https://pay.hotmart.com/L103598945N?bid=1780150292559";
const INSTAGRAM_URL = "https://www.instagram.com/ortodoxa.salvador/";
const FACEBOOK_URL = "https://www.facebook.com/ortodoxa.salvador/";
const READ_URL = "https://confissao-ortodoxa.notion.site/in";

const navItems = [
  ["Missão", "#missao"],
  ["Movimento", "#movimento"],
  ["Livro", "#livro"],
  ["Liturgia", "#liturgia"],
  ["Visite-nos", "#contato"],
];

const momentumStats = [
  {
    value: "16–18 mil",
    label: "adultos recebidos em paróquias ortodoxas dos EUA apenas no ciclo pascal de 2026.",
  },
  {
    value: "20–30 mil",
    label: "conversões projetadas para 2026, ante 4 a 5 mil por ano ao longo da década de 2010.",
  },
  {
    value: "2023",
    label: "início da atuação regular da missão em Salvador, com crescimento expressivo desde outubro de 2025.",
  },
  {
    value: "10–15",
    label: "fiéis a cada Divina Liturgia, chegando ao maior número nas grandes festas do calendário litúrgico.",
  },
];

const distinctions = [
  {
    title: "Continuidade Apostólica",
    text: "Mantemos sem interrupção a cadeia de bispos desde os apóstolos, guardando a autenticidade da fé transmitida por Cristo.",
  },
  {
    title: "Divina Liturgia",
    text: "A Liturgia de São João Crisóstomo é celebrada há mais de 1.600 anos: beleza, profundidade e presença real de Cristo.",
  },
  {
    title: "Theosis",
    text: "A ortodoxia não é só doutrina: é transformação. A theosis é a participação real na vida divina, o fim último do ser humano.",
  },
];

const sacraments = ["Batismo", "Crismação", "Divina Eucaristia", "Matrimônio", "Santa Unção", "Confissão", "Ordenação Sacerdotal"];

const welcomePaths = [
  {
    title: "Estou curioso sobre a Ortodoxia",
    text: "Venha visitar uma liturgia. Sem compromisso, sem pressão: apenas venha.",
  },
  {
    title: "Fui batizado ortodoxo, mas me afastei",
    text: "A Igreja sempre te recebe de volta. Fale conosco: estamos aqui.",
  },
  {
    title: "Quero me converter à Ortodoxia",
    text: "Oferecemos catequese personalizada para adultos que desejam receber os sacramentos.",
  },
  {
    title: "Sou ortodoxo e me mudei para Salvador",
    text: "Bem-vindo à sua nova comunidade. Entre em contato para participar das liturgias.",
  },
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function OrthodoxCross({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 72" aria-hidden="true">
      <path
        d="M21 3h6v14h13v5H27v11h18v6H27v22l10-7 4 5-17 11L7 59l4-5 10 7V39H3v-6h18V22H8v-5h13V3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="arrow-icon">
      <path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.7" cy="7.3" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.1 8.2h2.2V4.8a11.2 11.2 0 0 0-3.2-.2c-3.1 0-5.2 1.9-5.2 5.4v3H4.5v3.8h3.4v6.7h4.1v-6.7h3.3l.6-3.8H12v-2.6c0-1.1.3-2.2 2.1-2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={open ? "menu-icon is-open" : "menu-icon"}>
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-label="Redes sociais">
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram da Missão Ortodoxa em Salvador">
        <InstagramIcon />
      </a>
      <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook da Missão Ortodoxa em Salvador">
        <FacebookIcon />
      </a>
    </div>
  );
}

function SectionHeading({
  overline,
  title,
  text,
  light = false,
}: {
  overline: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={light ? "section-heading section-heading-light" : "section-heading"} data-reveal>
      <p>{overline}</p>
      <h2>{title}</h2>
      {text ? <span>{text}</span> : null}
    </div>
  );
}

export default function Home() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <header className="site-header" aria-label="Navegacao principal">
        <a className="brand" href="#top" aria-label="Missão Ortodoxa Grega em Salvador">
          <OrthodoxCross />
          <span>
            <strong>Missão Ortodoxa Grega</strong>
            <small>em Salvador</small>
          </span>
        </a>
        <nav>
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <SocialLinks className="header-socials" />
        <a className="header-action" href={CONTACT_URL} target="_blank" rel="noreferrer">
          Contato
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </header>

      <nav className={menuOpen ? "mobile-menu is-open" : "mobile-menu"} aria-label="Menu de navegacao">
        {navItems.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <a
          className="mobile-menu-action"
          href={CONTACT_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Fale com a gente <ArrowIcon />
        </a>
        <SocialLinks className="mobile-menu-socials" />
      </nav>

      <section id="top" className="hero-section">
        <Image
          src="/images/orthodox-hero.png"
          alt="Sacerdote ortodoxo diante do iconostasio durante a liturgia"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="hero-copy" data-reveal>
            <p className="hero-patriarch">Patriarcado Ecumênico de Constantinopla</p>
            <h1>
              Missão Ortodoxa Grega em Salvador.
            </h1>
            <p>
              A fé dos apóstolos, preservada há dois mil anos.
              <br />
              Agora em Salvador, Bahia.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noreferrer">
                Fale com a gente <ArrowIcon />
              </a>
            </div>
            <div className="hero-social-note">
              <span>Acompanhe a comunidade</span>
              <SocialLinks className="hero-socials" />
            </div>
          </div>
          <a className="hero-book-link" href="#livro" data-reveal>
            <span>Livro em destaque</span>
            <strong>A Confissão Ortodoxa</strong>
            <ArrowIcon />
          </a>
        </div>
        <a className="hero-scroll" href="#missao" aria-label="Rolar para conhecer a missão">
          <span>Role para descobrir</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section id="missao" className="mission-section">
        <div className="mission-copy">
          <SectionHeading
            overline="Quem somos"
            title="A Igreja que Jesus Cristo fundou"
          />
          <div className="mission-body" data-reveal>
            <p>
              A Igreja Ortodoxa é a Igreja fundada por Jesus Cristo e seus Apóstolos.
              Preservamos ininterruptamente a fé, o culto e a vida sacramental ao longo
              de mais de dois mil anos de história: sem adições, sem subtrações.
            </p>
            <p>
              A Missão Ortodoxa Grega em Salvador está sob a jurisdição do Patriarcado
              Ecumênico de Constantinopla, a mais antiga sede cristã em continuidade no
              mundo. Presente na capital baiana há alguns anos, passou a ter atuação
              regular a partir de 2023 e, desde outubro de 2025, vive um crescimento
              expressivo na participação dos fiéis.
            </p>
            <p>
              A iniciativa é liderada pelo Pe. Paísios, Hieromonge (monge-padre), sob o
              omofório do Bispo Auxiliar Melécio e do Arcebispo Dom Iosf, Exarca da
              América do Sul — todos sob a autoridade espiritual do Patriarca Bartolomeu I.
            </p>
            <p>
              Seja você curioso, catecúmeno ou já batizado na ortodoxia: você é
              bem-vindo entre nós.
            </p>
          </div>
        </div>
        <aside className="mission-aside" data-reveal>
          <p className="mission-aside-kicker">Primeira vez?</p>
          <h3>Visite uma Divina Liturgia</h3>
          <p>
            Não é preciso ser ortodoxo nem avisar antes. Venha como visitante,
            observe a beleza da liturgia e converse com a comunidade no seu tempo.
          </p>
          <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noreferrer">
            Fale com a gente <ArrowIcon />
          </a>
          <dl className="mission-aside-facts">
            <div>
              <dt>Jurisdição</dt>
              <dd>Patriarcado Ecumênico de Constantinopla</dd>
            </div>
            <div>
              <dt>Liderança</dt>
              <dd>Pe. Paísios, Hieromonge</dd>
            </div>
            <div>
              <dt>Em Salvador desde</dt>
              <dd>2023</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="distinction-section">
        <SectionHeading
          overline="A Fé Ortodoxa"
          title="O que nos distingue"
          text="A mesma fé dos Apóstolos, expressa nos Símbolos ecumênicos e vivida no mesmo cálice."
          light
        />
        <div className="belief-grid" data-reveal>
          {distinctions.map((item) => (
            <article key={item.title}>
              <span aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="movimento" className="momentum-section">
        <SectionHeading
          overline="Um momento histórico"
          title="O mundo está redescobrindo a Ortodoxia"
          text="O crescimento em Salvador acompanha um movimento mundial de reaproximação com a fé cristã das origens. Cada vez mais jovens chegam à missão pelo estudo pessoal e por conteúdos sobre a Ortodoxia na internet."
        />
        <div className="stat-grid" data-reveal>
          {momentumStats.map((stat) => (
            <article key={stat.value}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
        <figure className="momentum-quote" data-reveal>
          <blockquote>
            O Cristianismo Ortodoxo se define por sua fidelidade às tradições
            litúrgicas e dogmáticas apostólicas da Igreja. Não por acréscimo, nem por
            detrimento delas. A Fé verdadeira se professa em todas as partes, por todos
            os tempos e por todos os fiéis.
          </blockquote>
          <figcaption>Pe. Paísios, Hieromonge — líder da missão em Salvador</figcaption>
        </figure>
        <p className="momentum-source" data-reveal>
          Estimativas do Orthodox Studies Institute (EUA) para o ciclo pascal de 2026,
          analisadas por Matthew Namee e pelo diácono Seraphim Rohlin.
        </p>
      </section>

      <section id="livro" className="book-section">
        <div className="book-media" data-reveal>
          <Image
            src="/images/confissao-kindle.png"
            alt="Kindle exibindo o livro A Confissão Ortodoxa de São Pedro Moguila"
            fill
            sizes="(max-width: 900px) 100vw, 56vw"
            className="book-image"
          />
        </div>
        <div className="book-copy" data-reveal>
          <p className="book-kicker">Livro em destaque</p>
          <h2>A Confissão Ortodoxa</h2>
          <h3>da Igreja Católica Apostólica Oriental</h3>
          <p className="book-author">São Pedro Moguila</p>
          <p>
            Redigida em 1640 e aprovada pelos Patriarcas de Constantinopla, Alexandria
            e Jerusalém, a Confissão Ortodoxa de São Pedro Moguila é um dos grandes
            documentos doutrinários da Igreja Ortodoxa: uma exposição clara e completa
            da fé apostólica em forma de perguntas e respostas.
          </p>
          <p>
            Uma obra essencial para quem deseja compreender o que a Igreja Ortodoxa
            acredita, ensina e confessa.
          </p>
          <div className="translation-note">
            <span>Tradução da missão</span>
            <p>
              Esta tradução foi feita pelo Pe. Paísios, líder da Missão Ortodoxa Grega
              em Salvador-BA, revisada pelos fiéis Lucas Falango e Kelvin Basílio e
              editorada pelo fiel Gabriel Galdino.
            </p>
          </div>
          <div className="book-points" aria-label="Destaques do livro">
            <span>Doutrina</span>
            <span>Catequese</span>
            <span>Tradição</span>
          </div>
          <div className="book-actions">
            <a className="button button-primary" href={BOOK_URL} target="_blank" rel="noreferrer">
              Adquirir por R$ 29,90 <ArrowIcon />
            </a>
            <a className="button button-text" href={READ_URL} target="_blank" rel="noreferrer">
              Ler apresentação <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section id="liturgia" className="liturgy-section">
        <div className="liturgy-panel" data-reveal>
          <SectionHeading
            overline="Sacramentos"
            title="Os Sagrados Mistérios acompanham cada etapa da vida."
            text="A Liturgia de São João Crisóstomo, a Eucaristia, a Confissão, o Batismo e os demais sacramentos não são apenas ritos: são a vida de Cristo comunicada à Igreja."
            light
          />
          <div className="liturgy-actions">
            <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noreferrer">
              Perguntar horários <ArrowIcon />
            </a>
            <a className="social-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="social-link" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
        <div className="sacrament-list" data-reveal>
          <p>Sagrados Mistérios</p>
          <div>
            {sacraments.map((sacrament) => (
              <span key={sacrament}>{sacrament}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="visit-section">
        <div className="visit-copy" data-reveal>
          <OrthodoxCross />
          <p className="visit-kicker">Você é bem-vindo</p>
          <h2>Para quem é a Missão Ortodoxa?</h2>
          <p>
            Você pode chegar como visitante, curioso, catecúmeno ou fiel ortodoxo.
            Mande uma mensagem no direct do nosso Instagram e um membro da comunidade
            responderá para tirar dúvidas, enviar informações ou agendar uma visita.
          </p>
          <div className="welcome-list">
            {welcomePaths.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="visit-card" data-reveal>
          <p>Primeiro passo</p>
          <h3>Dê o primeiro passo</h3>
          <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noreferrer">
            Fale com a gente <ArrowIcon />
          </a>
          <div className="contact-links">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              @ortodoxa.salvador
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
              facebook.com/ortodoxa.salvador
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <OrthodoxCross />
          <div>
            <p>Missão Ortodoxa Grega em Salvador</p>
            <span>Patriarcado Ecumênico de Constantinopla</span>
          </div>
        </div>
        <div className="footer-contact">
          <a className="footer-direct" href={CONTACT_URL} target="_blank" rel="noreferrer">
            Fale com a gente <ArrowIcon />
          </a>
          <SocialLinks className="footer-socials" />
        </div>
      </footer>
    </main>
  );
}
