"use client";

import Image from "next/image";
import { useEffect } from "react";

const CONTACT_URL = "https://docs.google.com/forms/d/e/SEU_FORM_ID/viewform";
const BOOK_URL = "https://pay.hotmart.com/L103598945N?bid=1780150292559";
const INSTAGRAM_URL = "https://www.instagram.com/ortodoxa.salvador/";
const FACEBOOK_URL = "https://www.facebook.com/ortodoxa.salvador/";
const READ_URL = "https://confissao-ortodoxa.notion.site/in";

const navItems = [
  ["Missão", "#missao"],
  ["Livro", "#livro"],
  ["Liturgia", "#liturgia"],
  ["Visite-nos", "#contato"],
];

const beliefs = [
  {
    title: "Fé apostólica",
    text: "A mesma fé recebida dos Apóstolos, confessada nos concílios e vivida na liturgia.",
  },
  {
    title: "Vida sacramental",
    text: "Batismo, Crismação, Eucaristia, Confissão, Matrimônio, Unção e acompanhamento pastoral.",
  },
  {
    title: "Comunidade em Salvador",
    text: "Uma missão aberta a ortodoxos, catecúmenos e pessoas que desejam conhecer a Igreja.",
  },
];

const sacraments = ["Batismo", "Crisma", "Eucaristia", "Confissão", "Matrimônio", "Santa Unção"];

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
      </header>

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
            <h1>
            A fé dos Apóstolos.
              <br />
              A tradição da Igreja.
              <br />
              A vida em Cristo.
            </h1>
            <p>
              A Missão Ortodoxa Grega em Salvador acolhe quem busca a beleza da fé
              ortodoxa, a vida sacramental e a comunhão com a Igreja de Cristo.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#livro">
                Conhecer o livro <ArrowIcon />
              </a>
              <a className="button button-ghost" href={CONTACT_URL} target="_blank" rel="noreferrer">
                Visitar a missão
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
      </section>

      <section id="missao" className="mission-section">
        <div className="mission-copy">
          <SectionHeading
            overline="Sobre a missão"
            title="Uma Igreja viva, em comunhão com todo o Corpo de Cristo."
            text="Sob a tradição do Patriarcado Ecumênico de Constantinopla, a missão existe para reunir, formar e acolher fiéis ortodoxos e interessados na Bahia."
          />
        </div>
        <div className="belief-grid" data-reveal>
          {beliefs.map((item) => (
            <article key={item.title}>
              <span />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
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
            e Jerusalém, esta obra apresenta a fé ortodoxa em perguntas e respostas,
            com clareza catequética e profunda fidelidade à Tradição.
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
            overline="Vida liturgica"
            title="A beleza da Igreja não é enfeite. É caminho."
            text="Na Divina Liturgia, a fé se torna canto, gesto, incenso, comunhão e vida concreta. É ali que aprendemos a ser Igreja."
            light
          />
          <div className="liturgy-actions">
            <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noreferrer">
              Perguntar horarios <ArrowIcon />
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
          <h2>Venha conhecer a Missão Ortodoxa em Salvador.</h2>
          <p>
            Você pode chegar como visitante, curioso, catecúmeno ou fiel ortodoxo. A
            comunidade entra em contato para orientar sobre próximas liturgias,
            encontros e catequese.
          </p>
        </div>
        <div className="visit-card" data-reveal>
          <p>Salvador, Bahia</p>
          <h3>Primeiro contato</h3>
          <a className="button button-primary" href={CONTACT_URL} target="_blank" rel="noreferrer">
            Enviar mensagem <ArrowIcon />
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
        <div>
          <OrthodoxCross />
          <p>Missão Ortodoxa Grega em Salvador</p>
        </div>
        <span>Patriarcado Ecumênico de Constantinopla</span>
      </footer>
    </main>
  );
}
