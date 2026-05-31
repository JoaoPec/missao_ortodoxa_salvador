"use client";

import { useEffect } from "react";

// ── TROQUE pela URL real do seu Google Form ──────────────────────────────────
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/SEU_FORM_ID/viewform";

// ── Link do produto na Hotmart ───────────────────────────────────────────────
const HOTMART_URL = "https://pay.hotmart.com/L103598945N?bid=1780150292559";

// ── Scroll reveal ────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Small helpers ────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="divider-gold flex-1" />
      <span style={{ color: "var(--gold)", fontSize: 10, opacity: 0.7 }}>✦</span>
      <div className="divider-gold flex-1" />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-display inline-block tracking-widest border rounded-full px-3 py-1"
      style={{ color: "var(--gold)", borderColor: "rgba(201,168,76,0.3)", fontSize: 10, letterSpacing: "0.22em" }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="reveal font-display text-center mb-4"
      style={{
        fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)",
        color: "var(--cream)",
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </h2>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  useReveal();

  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ background: "var(--navy)" }}
      >
        {/* Radial gold glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 38%, rgba(201,168,76,0.08) 0%, transparent 68%)",
          }}
        />

        {/* Thin top line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
          style={{ height: 72, background: "linear-gradient(to bottom, rgba(201,168,76,0.55), transparent)" }}
        />

        {/* Orthodox cross SVG */}
        <svg
          className="animate-fade-in mb-10"
          width="52" height="52" viewBox="0 0 52 52" fill="none"
          style={{ color: "var(--gold)", opacity: 0.9 }}
        >
          <rect x="23" y="3" width="6" height="46" rx="1" fill="currentColor" />
          <rect x="3" y="19" width="46" height="6" rx="1" fill="currentColor" />
          <rect x="11" y="13" width="30" height="2" rx="1" fill="currentColor" opacity="0.3" />
        </svg>

        {/* Eyebrow */}
        <p
          className="animate-fade-up delay-100 font-display uppercase mb-6"
          style={{ color: "var(--gold)", letterSpacing: "0.28em", fontSize: 10 }}
        >
          Patriarcado Ecumênico de Constantinopla
        </p>

        {/* H1 */}
        <h1
          className="animate-fade-up delay-200 font-display font-semibold leading-tight mb-5"
          style={{
            fontSize: "clamp(2.2rem, 6.5vw, 4.4rem)",
            color: "var(--cream)",
            letterSpacing: "0.025em",
            maxWidth: "16ch",
          }}
        >
          Missão Ortodoxa{" "}
          <span style={{ color: "var(--gold)" }}>Grega em Salvador</span>
        </h1>

        {/* Subheading */}
        <p
          className="animate-fade-up delay-300 italic max-w-md mx-auto mb-10"
          style={{ color: "var(--text-muted)", fontSize: "1.2rem" }}
        >
          A fé dos apóstolos, preservada há dois mil anos.
          <br />
          Agora em Salvador, Bahia.
        </p>

        <Divider />

        {/* CTAs */}
        <div className="animate-fade-up delay-500 mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center items-center">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-glow-pulse font-display tracking-widest px-9 py-4 transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
              color: "var(--navy)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.14em",
              borderRadius: 2,
            }}
          >
            ENTRAR EM CONTATO
          </a>
          <a
            href="#sobre"
            className="font-display tracking-widest px-9 py-4 border transition-all duration-300 hover:border-yellow-400 hover:text-yellow-300"
            style={{
              borderColor: "rgba(201,168,76,0.3)",
              color: "var(--text-muted)",
              fontSize: 12,
              letterSpacing: "0.14em",
              borderRadius: 2,
            }}
          >
            CONHECER A MISSÃO
          </a>
          <a
            href="#livro"
            className="font-display tracking-widest px-9 py-4 border transition-all duration-300 hover:border-yellow-400 hover:text-yellow-300"
            style={{
              borderColor: "rgba(201,168,76,0.15)",
              color: "rgba(138,154,176,0.6)",
              fontSize: 12,
              letterSpacing: "0.14em",
              borderRadius: 2,
            }}
          >
            VER LIVRO
          </a>
        </div>

        {/* Scroll cue */}
        <div
          className="animate-fade-in delay-700 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.35 }}
        >
          <div
            className="w-px"
            style={{ height: 44, background: "linear-gradient(to bottom, transparent, var(--gold))" }}
          />
          <span className="font-display" style={{ color: "var(--gold)", fontSize: 8, letterSpacing: "0.3em" }}>ROLAR</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SOBRE
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="sobre"
        className="relative px-6 py-24"
        style={{ background: "var(--navy-mid)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal mb-8"><Tag>Quem Somos</Tag></div>
          <SectionTitle>A Igreja que Jesus Cristo fundou</SectionTitle>
          <Divider />
          <div
            className="reveal mt-8 space-y-5"
            style={{ color: "var(--cream)", opacity: 0.85, fontSize: "1.12rem", lineHeight: 1.8 }}
          >
            <p>
              A Igreja Ortodoxa é a Igreja fundada por Jesus Cristo e seus Apóstolos.
              Preservamos ininterruptamente a fé, o culto e a vida sacramental ao longo
              de mais de dois mil anos de história — sem adições, sem subtrações.
            </p>
            <p>
              A{" "}
              <strong style={{ color: "var(--gold-light)" }}>
                Missão Ortodoxa Grega em Salvador
              </strong>{" "}
              está sob a jurisdição do{" "}
              <strong style={{ color: "var(--gold-light)" }}>
                Patriarcado Ecumênico de Constantinopla
              </strong>
              , a mais antiga sede cristã em continuidade no mundo, e acolhe
              a todos que buscam a fé ortodoxa na Bahia.
            </p>
            <p>
              Seja você curioso, catecúmeno ou já batizado na ortodoxia —
              você é bem-vindo entre nós.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          O QUE NOS DISTINGUE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-24" style={{ background: "var(--navy)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-8"><Tag>A Fé Ortodoxa</Tag></div>
          <SectionTitle>O que nos distingue</SectionTitle>

          <div className="grid gap-5 sm:grid-cols-2 mt-12">
            {[
              {
                icon: "☩",
                titulo: "Continuidade Apostólica",
                texto:
                  "Mantemos sem interrupção a cadeia de bispos desde os apóstolos, garantindo a autenticidade da fé transmitida por Cristo.",
              },
              {
                icon: "✝",
                titulo: "Divina Liturgia",
                texto:
                  "A Liturgia de São João Crisóstomo é celebrada há mais de 1.600 anos. Beleza, profundidade e presença real de Cristo.",
              },
              {
                icon: "⁜",
                titulo: "Theosis",
                texto:
                  "A ortodoxia não é só doutrina — é transformação. A theosis é a participação real na vida divina, o fim último do ser humano.",
              },
              {
                icon: "✦",
                titulo: "Unidade na Diversidade",
                texto:
                  "Grega, árabe, romena, brasileira — uma única fé em dezenas de culturas, unidas pela mesma doutrina e pelo mesmo cálice.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`reveal delay-${(i + 1) * 100}`}
                style={{
                  background: "rgba(201,168,76,0.04)",
                  border: "1px solid rgba(201,168,76,0.14)",
                  borderRadius: 2,
                  padding: "1.75rem 1.5rem",
                }}
              >
                <div
                  className="font-display text-3xl mb-3"
                  style={{ color: "var(--gold)" }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-display mb-2"
                  style={{ color: "var(--cream)", fontSize: "0.95rem", letterSpacing: "0.06em" }}
                >
                  {item.titulo}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.65 }}>
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SACRAMENTOS
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="sacramentos"
        className="relative px-6 py-24"
        style={{ background: "var(--navy-mid)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-8"><Tag>Sacramentos</Tag></div>
          <SectionTitle>Os Sagrados Mistérios</SectionTitle>
          <p
            className="reveal text-center italic mb-10"
            style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}
          >
            Acompanhamos cada etapa da sua vida com os sacramentos da Igreja.
          </p>
          <Divider />

          <div className="reveal mt-10 grid gap-3 sm:grid-cols-3">
            {[
              "Batismo & Crismação",
              "Divina Eucaristia",
              "Matrimônio",
              "Santa Unção",
              "Confissão",
              "Ordenação Sacerdotal",
            ].map((s, i) => (
              <div
                key={i}
                className="text-center py-5 px-3"
                style={{
                  border: "1px solid rgba(201,168,76,0.18)",
                  borderRadius: 2,
                  background: "rgba(201,168,76,0.02)",
                }}
              >
                <span
                  className="font-display"
                  style={{ color: "var(--gold-light)", letterSpacing: "0.05em", fontSize: "0.85rem" }}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          LIVRO — SEÇÃO PERGAMINHO (inversão de fundo)
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="livro"
        className="relative px-6 py-28 overflow-hidden"
        style={{ background: "var(--cream)" }}
      >
        {/* Grain texture no fundo claro */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            opacity: 0.06,
          }}
        />
        {/* Vinheta escura nas bordas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(13,27,42,0.12) 100%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Letra capitular iluminada */}
          <div className="reveal text-center mb-2">
            <span
              className="font-display"
              style={{
                fontSize: "clamp(5rem, 14vw, 9rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px var(--gold-dim)",
                lineHeight: 1,
                opacity: 0.35,
                display: "block",
                letterSpacing: "0.02em",
              }}
            >
              ✦
            </span>
          </div>

          <div className="reveal text-center mb-6">
            <span
              className="font-display inline-block tracking-widest border px-3 py-1 rounded-full"
              style={{
                color: "var(--navy)",
                borderColor: "rgba(13,27,42,0.25)",
                fontSize: 10,
                letterSpacing: "0.22em",
              }}
            >
              LITERATURA ORTODOXA
            </span>
          </div>

          {/* Título do livro */}
          <h2
            className="reveal font-display text-center leading-tight mb-3"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              color: "var(--navy)",
              letterSpacing: "0.04em",
            }}
          >
            A Confissão Ortodoxa
            <br />
            <span style={{ color: "var(--gold-dim)", fontStyle: "italic" }}>
              da Igreja Católica Apostólica Oriental
            </span>
          </h2>

          {/* Subtítulo autoral */}
          <p
            className="reveal font-display text-center mb-8"
            style={{ color: "var(--gold-dim)", fontSize: "0.85rem", letterSpacing: "0.15em" }}
          >
            SÃO PEDRO MOGUILA
          </p>

          {/* Divisória ornamental */}
          <div className="reveal flex items-center gap-4 mb-10">
            <div
              className="flex-1"
              style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(13,27,42,0.2))" }}
            />
            <span style={{ color: "var(--gold-dim)", fontSize: 14 }}>✦</span>
            <div
              className="flex-1"
              style={{ height: 1, background: "linear-gradient(to left, transparent, rgba(13,27,42,0.2))" }}
            />
          </div>

          {/* Corpo */}
          <div
            className="reveal text-center max-w-xl mx-auto space-y-4 mb-12"
            style={{ color: "var(--navy)", opacity: 0.75, fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            <p>
              Redigida em 1640 e aprovada pelos Patriarcas de Constantinopla, Alexandria e
              Jerusalém, a <em>Confissão Ortodoxa</em> de São Pedro Moguila é um dos grandes
              documentos doutrinários da Igreja Ortodoxa — uma exposição clara e completa
              da fé apostólica em forma de perguntas e respostas.
            </p>
            <p>
              Uma obra essencial para quem deseja compreender o que a Igreja Ortodoxa
              acredita, ensina e confessa.
            </p>
          </div>

          {/* Card preço + CTA */}
          <div className="reveal flex flex-col items-center gap-6">
            {/* Selo de preço */}
            <div
              className="flex flex-col items-center justify-center"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: "2px solid var(--gold-dim)",
                background: "var(--cream-dark)",
                boxShadow: "0 4px 24px rgba(13,27,42,0.12), inset 0 1px 0 rgba(201,168,76,0.3)",
              }}
            >
              <span
                className="font-display"
                style={{ color: "var(--navy)", fontSize: "0.65rem", letterSpacing: "0.18em", opacity: 0.5 }}
              >
                APENAS
              </span>
              <span
                className="font-display font-bold"
                style={{ color: "var(--navy)", fontSize: "1.6rem", letterSpacing: "0.02em" }}
              >
                R$&nbsp;29
                <span style={{ fontSize: "0.9rem" }}>,90</span>
              </span>
              <span
                className="font-display"
                style={{ color: "var(--gold-dim)", fontSize: "0.6rem", letterSpacing: "0.14em" }}
              >
                DIGITAL
              </span>
            </div>

            {/* Botão Hotmart */}
            <a
              href={HOTMART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display tracking-widest px-10 py-4 transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--navy)",
                color: "var(--gold-light)",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.14em",
                borderRadius: 2,
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              ADQUIRIR O LIVRO
            </a>

            <p
              style={{
                color: "var(--navy)",
                opacity: 0.4,
                fontSize: "0.82rem",
                fontStyle: "italic",
              }}
            >
              Pagamento via Pix, boleto ou cartão em até 4×
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PARA QUEM É
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-24" style={{ background: "var(--navy)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="reveal text-center mb-8"><Tag>Você é Bem-Vindo</Tag></div>
          <SectionTitle>Para quem é a Missão Ortodoxa?</SectionTitle>

          <div className="reveal mt-10 space-y-5">
            {[
              {
                q: "Estou curioso sobre a Ortodoxia",
                r: "Venha visitar uma liturgia. Sem compromisso, sem pressão — apenas venha.",
              },
              {
                q: "Fui batizado ortodoxo, mas me afastei",
                r: "A Igreja sempre te recebe de volta. Fale conosco — estamos aqui.",
              },
              {
                q: "Quero me converter à Ortodoxia",
                r: "Oferecemos catequese personalizada para adultos que desejam receber os sacramentos.",
              },
              {
                q: "Sou ortodoxo e me mudei para Salvador",
                r: "Bem-vindo à sua nova comunidade. Entre em contato para participar das liturgias.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  borderLeft: "2px solid var(--gold)",
                  paddingLeft: "1.25rem",
                  paddingTop: "0.4rem",
                  paddingBottom: "0.4rem",
                  opacity: 0.95,
                }}
              >
                <p
                  className="font-display mb-1"
                  style={{ color: "var(--gold-light)", fontSize: "0.92rem", letterSpacing: "0.03em" }}
                >
                  {item.q}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.65 }}>{item.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="contato"
        className="relative px-6 py-28 text-center overflow-hidden"
        style={{ background: "var(--navy-mid)" }}
      >
        {/* Large decorative cross bg */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display pointer-events-none select-none"
          style={{ fontSize: "28rem", color: "var(--gold)", opacity: 0.025, lineHeight: 1 }}
        >
          ✝
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="reveal mb-8"><Tag>Primeiro Passo</Tag></div>

          <h2
            className="reveal font-display mb-5"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              color: "var(--cream)",
              letterSpacing: "0.04em",
            }}
          >
            Dê o primeiro passo
          </h2>

          <p
            className="reveal mb-10 max-w-md mx-auto"
            style={{ color: "var(--text-muted)", fontSize: "1.15rem", lineHeight: 1.75 }}
          >
            Preencha nosso formulário e um membro da comunidade entrará em contato.
            Seja para tirar dúvidas, receber informações ou agendar uma visita.
          </p>

          <Divider />

          <div className="reveal mt-10">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-glow-pulse font-display inline-block tracking-widest px-12 py-5 transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, var(--gold-dim), var(--gold), var(--gold-light), var(--gold))",
                backgroundSize: "300% 300%",
                color: "var(--navy)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.18em",
                borderRadius: 2,
              }}
            >
              PREENCHER FORMULÁRIO DE CONTATO
            </a>

            <p
              className="reveal mt-7 italic"
              style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}
            >
              Também nos encontre no Instagram:{" "}
              <a
                href="https://www.instagram.com/ortodoxa.salvador/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-yellow-300"
                style={{ color: "var(--gold)" }}
              >
                @ortodoxa.salvador
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer
        className="text-center px-6 py-12"
        style={{ background: "var(--navy)", borderTop: "1px solid rgba(201,168,76,0.1)" }}
      >
        <p
          className="font-display mb-3"
          style={{ color: "var(--gold)", fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase" }}
        >
          ✦ &nbsp; Missão Ortodoxa Grega em Salvador &nbsp; ✦
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Patriarcado Ecumênico de Constantinopla · Salvador, Bahia · Brasil
        </p>
        <div className="divider-gold max-w-xs mx-auto my-5" />
        <p style={{ color: "rgba(138,154,176,0.35)", fontSize: "0.78rem" }}>
          © {new Date().getFullYear()} Missão Ortodoxa Grega em Salvador
        </p>
      </footer>
    </main>
  );
}
