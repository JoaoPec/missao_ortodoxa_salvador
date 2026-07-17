import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = "https://www.ortodoxabahia.com.br";
const CONTACT_URL = "https://ig.me/m/ortodoxa.salvador";
const BOOK_URL = "https://pay.hotmart.com/L103598945N?bid=1780150292559";
const SAMPLE_URL = "https://confissao-ortodoxa.notion.site/in";
const INSTAGRAM_URL = "https://www.instagram.com/ortodoxa.salvador/";

export const metadata: Metadata = {
  title: "A Confissão Ortodoxa de São Pedro Moguila | Missão Ortodoxa em Salvador",
  description:
    "Catecismo Ortodoxo aprovado pelos 4 Patriarcados Orientais. A doutrina da Igreja em perguntas e respostas — adquira por R$ 29,90.",
  keywords: [
    "Confissão Ortodoxa",
    "São Pedro Moguila",
    "catecismo ortodoxo",
    "livro ortodoxo",
    "doutrina ortodoxa",
    "Igreja Ortodoxa",
    "Patriarcado Ecumênico",
  ],
  alternates: { canonical: `${SITE_URL}/confissao-ortodoxa` },
  openGraph: {
    title: "A Confissão Ortodoxa de São Pedro Moguila",
    description:
      "Catecismo Ortodoxo popular revisado e aprovado pelas maiores autoridades da Ortodoxia. Uma exposição completa da fé apostólica em perguntas e respostas.",
    url: `${SITE_URL}/confissao-ortodoxa`,
    type: "article",
    locale: "pt_BR",
    images: [`${SITE_URL}/images/confissao-kindle.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Confissão Ortodoxa de São Pedro Moguila",
    description:
      "Catecismo Ortodoxo popular revisado e aprovado pelas maiores autoridades da Ortodoxia. Uma exposição completa da fé apostólica em perguntas e respostas.",
  },
};

export default function ConfissaoOrtodoxaPage() {
  const url = `${SITE_URL}/confissao-ortodoxa`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "A Confissão Ortodoxa de São Pedro Moguila",
        description:
          "Catecismo Ortodoxo popular revisado e aprovado pelas maiores autoridades da Ortodoxia ao longo dos últimos 5 séculos.",
        datePublished: "2026-07-04",
        dateModified: "2026-07-04",
        inLanguage: "pt-BR",
        mainEntityOfPage: url,
        image: `${SITE_URL}/images/confissao-kindle.png`,
        author: { "@id": `${SITE_URL}/#igreja` },
        publisher: { "@id": `${SITE_URL}/#igreja` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "A Confissão Ortodoxa" },
        ],
      },
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      <section className="book-section book-section-sales" id="top">
        <div className="book-media">
          <Image
            src="/images/confissao-kindle.png"
            alt="Kindle exibindo o livro A Confissão Ortodoxa de São Pedro Moguila"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 56vw"
            className="book-image"
          />
        </div>
        <div className="book-copy">
          <p className="book-kicker">Catecismo digital · Acesso imediato</p>
          <h2>A Confissão Ortodoxa</h2>
          <h3>da Igreja Católica Apostólica Oriental</h3>
          <p className="book-author">São Pedro Moguila</p>
          <p className="book-price-badge" aria-label="Preço">
            Edição digital · <strong>R$ 29,90</strong>
          </p>
          <p>
            O catecismo que resume, em perguntas e respostas, o que a Igreja
            Ortodoxa crê, ensina e confessa — aprovado pelos 4 Patriarcados Orientais.
          </p>
          <p className="book-trust-line">
            Tradução oficial da Missão Ortodoxa em Salvador · Revisado por 3 fiéis
          </p>
          <div className="book-points" aria-label="Destaques do livro">
            <span>4 Patriarcados</span>
            <span>Perguntas e respostas</span>
            <span>3 Partes</span>
            <span>4 Bônus</span>
          </div>
          <div className="book-actions">
            <a className="button button-primary" href={BOOK_URL} target="_blank" rel="noreferrer">
              Adquirir por R$ 29,90
            </a>
            <a className="button button-text" href={SAMPLE_URL} target="_blank" rel="noreferrer">
              Ler a apresentação
            </a>
          </div>
          <ul className="book-reassurances" aria-label="Garantias da compra">
            <li>Pagamento único</li>
            <li>Acesso imediato</li>
            <li>Kindle, tablet ou celular</li>
            <li>Compra segura via Hotmart</li>
          </ul>
        </div>
      </section>

      <section className="trust-strip">
        <div className="trust-strip-inner">
          <div className="trust-item">
            <span className="trust-number">1643</span>
            <span className="trust-label">Aprovado pelos 4 Patriarcados Orientais</span>
          </div>
          <div className="trust-item">
            <span className="trust-number">380+</span>
            <span className="trust-label">Anos de autoridade doutrinária</span>
          </div>
          <div className="trust-item">
            <span className="trust-number">3</span>
            <span className="trust-label">Partes: Fé, Esperança e Caridade</span>
          </div>
          <div className="trust-item">
            <span className="trust-number">4</span>
            <span className="trust-label">Conteúdos bônus de teologia</span>
          </div>
        </div>
      </section>

      <main id="conteudo" className="pub-main">
        <article className="pub-article">
          <nav className="pub-breadcrumb" aria-label="Trilha de navegação">
            <Link href="/">Início</Link>
            <span aria-hidden="true">/</span>
            <Link href="/publicacoes">Publicações</Link>
            <span aria-hidden="true">/</span>
            <span>A Confissão Ortodoxa</span>
          </nav>

          <h1>O catecismo que há 5 séculos explica o que a Igreja Ortodoxa acredita</h1>

          <p className="pub-lead">
            Revisado e aprovado pelos Patriarcas de Constantinopla, Alexandria,
            Antioquia e Jerusalém — a mesma fé apostólica, agora em português.
          </p>

          <div className="pub-body">
            <p>
              A <strong>Confissão Ortodoxa da Igreja Católica Apostólica Oriental</strong> é um livro catequético elaborado pelo Metropolita São Pedro Moguila no século XVII, em um período marcado por intensos debates teológicos e por profundas transformações religiosas na Europa Oriental.
            </p>
            <p>
              Seu surgimento responde à necessidade de apresentar, de forma clara e ordenada, o ensinamento da Igreja Ortodoxa em diálogo com as formulações protestantes e católico-romanas então predominantes. Longe de se limitar à controvérsia, a obra oferece uma exposição sistemática e pastoral da fé ortodoxa, com o objetivo de tornar inteligíveis seus dogmas, práticas e fundamentos teológicos.
            </p>

            <div className="pub-cta-inline">
              <div className="pub-cta-inline-copy">
                <span>Um catecismo para a Igreja inteira</span>
                <p>
                  Escrita para instruir, esclarecer e organizar o conteúdo da fé, a{" "}
                  <strong>Confissão</strong> busca situar a tradição ortodoxa de maneira precisa no cenário cristão mais amplo.
                </p>
              </div>
              <a className="button button-primary" href={BOOK_URL} target="_blank" rel="noreferrer">
                Adquirir por R$ 29,90
              </a>
            </div>

            <h2>Para quem é este livro</h2>

            <div className="pub-audience">
              <article className="pub-audience-item">
                <h3>Quem está conhecendo a Ortodoxia</h3>
                <p>Quer um retrato fiel da doutrina — sem polêmica e sem atalhos.</p>
              </article>
              <article className="pub-audience-item">
                <h3>Catecúmenos</h3>
                <p>Um guia estruturado em perguntas e respostas para a preparação sacramental.</p>
              </article>
              <article className="pub-audience-item">
                <h3>Fiéis e estudantes</h3>
                <p>Aprofunda a fé apostólica com um texto recebido por toda a Igreja.</p>
              </article>
            </div>

            <h2>Confiável, autorizada e recebida por todos os patriarcados</h2>

            <p>
              A autoridade desta Confissão não deriva de um autor isolado. O texto foi examinado e aprovado no Concílio de Kiev (1640), posteriormente revisado no Concílio de Iași (1642) e, por fim, submetido ao juízo dos quatro Patriarcados Orientais — Constantinopla, Alexandria, Antioquia e Jerusalém. Concluindo que ela era a confissão de fé &quot;não apenas dos russos, mas... A Confissão Ortodoxa de todos os Gregos&quot;.
            </p>
            <p>
              Após esse processo de avaliação, correção e confirmação, a Confissão foi formalmente recebida como uma exposição fiel e representativa da fé ortodoxa, oferecendo ao leitor não uma interpretação particular, mas o ensinamento que a Igreja reconheceu como conforme à sua doutrina e à sua Tradição. Até mesmo seus maiores críticos e escrutinizadores no século XX alegaram: &quot;a Confissão acabou sendo Ortodoxa de fato, e não apenas no nome.&quot; (Karmiris. Op. cit. Σσ., 589).
            </p>

            <div className="pub-mockup-wrap">
              <Image
                src="/images/ipad-mockup.webp"
                alt="A Confissão Ortodoxa no iPad — leitura digital do catecismo"
                width={800}
                height={600}
                className="pub-mockup"
              />
            </div>

            <h2>Oriental e Ocidental</h2>

            <p>
              Ao estruturar a Confissão em perguntas e respostas, com definições claras, distinções precisas e vocabulário técnico cuidadosamente escolhido, o Metropolita recorreu ao método catequético então dominante no Ocidente — não por submissão teológica, mas por uma estratégia pastoral e pedagógica. Essa era a linguagem intelectual comum do seu tempo, compreendido tanto por ortodoxos quanto por seus interlocutores protestantes e romanos, e permitia que a fé da Igreja fosse exposta com rigor, clareza e sem ambiguidades.
            </p>
            <p>
              Assim, Moguila utilizou categorias e termos conhecidos para comunicar conteúdos plenamente ortodoxos, apropriando-se da forma para proteger o conteúdo, e demonstrando que a Tradição da Igreja não teme a precisão conceitual quando esta serve à verdade e à instrução dos fiéis.
            </p>

            <h2>A versão final e conciliarmente autorizada</h2>

            <p>
              A Confissão foi redigida originalmente em latim por São Pedro Moguila com a colaboração de seus discípulos mais próximos e apresentada ao Concílio de Kiev (1640), onde recebeu correções iniciais. Em seguida, foi submetida ao Concílio de Iași (1642), convocado justamente para examiná-la à luz da fé da Igreja inteira; nesse contexto, o texto passou por uma revisão conduzida principalmente por Melécio Syrigos, atuando como exarca patriarcal.
            </p>
            <p>
              A versão revista foi então traduzida para o grego, examinada e aprovada formalmente pelos Patriarcas de Constantinopla, Alexandria, Antioquia e Jerusalém em 1643, com atos sinodais que atestam sua conformidade dogmática. A presente edição segue essa tradição textual recebida e autorizada pela Igreja, oferecendo ao leitor não um rascunho histórico, mas a forma amadurecida e oficialmente acolhida da Confissão Ortodoxa.
            </p>

            <p>
              Pressionados por uma maioria protestante e romana um pequeno povo ortodoxo precisa da iluminação catequética da Santa Igreja — esse era o público-alvo de São Pedro Moguila no séc. XVII, muito semelhante ao estado atual da Ortodoxia no Brasil.
            </p>

            <h2>O que você vai encontrar no livro</h2>

            <div className="pub-card-grid">
              <article className="pub-card">
                <span className="pub-card-num">I</span>
                <h3>Parte I — Da Fé</h3>
                <p>
                  Exposição sistemática dos dogmas centrais da fé cristã ortodoxa: a Santíssima Trindade, a criação, a encarnação do Verbo, a obra salvífica de Cristo, a Igreja, os sacramentos, os santos ícones, a veneração dos santos e a autoridade da Tradição e das Escrituras.
                </p>
              </article>
              <article className="pub-card">
                <span className="pub-card-num">II</span>
                <h3>Parte II — Da Esperança</h3>
                <p>
                  Trata da oração, do Pai-Nosso, das bem-aventuranças e da expectativa cristã quanto à ressurreição, ao juízo e à vida futura, articulando a esperança escatológica da Igreja com a vida concreta do fiel.
                </p>
              </article>
              <article className="pub-card">
                <span className="pub-card-num">III</span>
                <h3>Parte III — Da Caridade</h3>
                <p>
                  Aborda a vida moral cristã à luz dos mandamentos de Deus e da Igreja, o amor ao próximo, o arrependimento, a confissão, as boas obras e a vivência prática da fé como resposta concreta à graça divina.
                </p>
              </article>
              <article className="pub-card">
                <span className="pub-card-num">IV</span>
                <h3>+ 4 Conteúdos Bônus</h3>
                <p>
                  Esta edição inclui ensaios complementares sobre a teologia de São Pedro Moguila e apêndices doutrinários sobre o Pecado Ancestral e a Transubstanciação — material extra para quem quer ir além do catecismo.
                </p>
              </article>
            </div>

            <div className="pub-cta-inline">
              <div className="pub-cta-inline-copy">
                <span>Fé, Esperança e Caridade em um só volume</span>
                <p>As três virtudes teologais que estruturam a doutrina ortodoxa — agora em português, com leitura imediata.</p>
              </div>
              <a className="button button-primary" href={BOOK_URL} target="_blank" rel="noreferrer">
                Adquirir por R$ 29,90
              </a>
            </div>

            <h2>4 conteúdos bônus incluídos nesta edição</h2>

            <div className="pub-card-grid">
              <article className="pub-card">
                <span className="pub-card-num">1</span>
                <h3>Para uma avaliação da teologia de São Pedro Moguila</h3>
                <p>
                  Texto analítico que reconstrói o contexto histórico, eclesial e intelectual no qual a Confissão foi produzida, explicando as circunstâncias dramáticas enfrentadas pela Ortodoxia após a queda de Constantinopla e demonstrando por que a obra de Moguila se tornou um marco teológico recebido pela Igreja.
                </p>
              </article>
              <article className="pub-card">
                <span className="pub-card-num">2</span>
                <h3>Sobre a influência ocidental na herança teológica de Moguila</h3>
                <p>
                  Ensaio crítico que examina, com precisão histórica e teológica, as acusações de &quot;latinização&quot; feitas contra Moguila, distinguindo claramente entre empréstimos formais (método, linguagem, estrutura) e fidelidade doutrinária, e mostrando como a Confissão permaneceu plenamente ortodoxa em conteúdo, apesar do uso de categorias compreensíveis no Ocidente.
                </p>
              </article>
              <article className="pub-card">
                <span className="pub-card-num">3</span>
                <h3>Apêndice I — O Pecado Ancestral e o conceito de &quot;culpa&quot;</h3>
                <p>
                  Análise detalhada da diferença entre o ensinamento ortodoxo sobre o pecado ancestral e as formulações ocidentais de culpa herdada, esclarecendo equívocos comuns e demonstrando o que grandes santos e teólogos Ortodoxos afirmaram sobre este ponto sensível da antropologia teológica.
                </p>
              </article>
              <article className="pub-card">
                <span className="pub-card-num">4</span>
                <h3>Apêndice II — A Transubstanciação</h3>
                <p>
                  Esclarecimento doutrinário sobre o uso do termo &quot;transubstanciação&quot; no contexto da tradição ortodoxa, analisando sua origem, seu emprego histórico e o modo como foi compreendido por autores e santos anteriores às controvérsias modernas. O texto explica como esse vocabulário foi utilizado para afirmar a real transformação dos Dons Eucarísticos, sem pressupor a adoção obrigatória de sistemas filosóficos específicos.
                </p>
              </article>
            </div>

            <div className="pub-cta-inline">
              <div className="pub-cta-inline-copy">
                <span>4 conteúdos bônus + o catecismo completo</span>
                <p>
                  Mais de 380 anos de tradição doutrinária — <strong>adquira agora</strong> e comece a aprofundar-se na fé apostólica ainda hoje.
                </p>
              </div>
              <a className="button button-primary" href={BOOK_URL} target="_blank" rel="noreferrer">
                Adquirir por R$ 29,90
              </a>
            </div>

            <div className="translation-note">
              <span>Tradução da missão</span>
              <p>
                Esta tradução foi feita pelo Pe. Paísios, líder da Missão Ortodoxa Grega em Salvador-BA, revisada pelos fiéis Lucas Falango e Kelvin Basílio e editorada pelo fiel Gabriel Galdino.
              </p>
            </div>
          </div>

          <aside className="pub-cta">
            <p>Garanta o seu exemplar digital</p>
            <h2>A Confissão Ortodoxa de São Pedro Moguila</h2>
            <p className="pub-cta-price">
              <strong>R$ 29,90</strong>
              <span>pagamento único</span>
            </p>
            <span>
              Acesso imediato. Leitura no Kindle, tablet ou celular.
              Comece hoje a aprofundar-se na fé apostólica.
            </span>
            <a className="button button-primary" href={BOOK_URL} target="_blank" rel="noreferrer">
              Adquirir por R$ 29,90
            </a>
            <p className="pub-cta-guarantee">
              <span>Compra segura via Hotmart · Acesso vitalício ao arquivo digital</span>
            </p>
          </aside>
        </article>
      </main>

      <div className="book-sticky-bar" aria-label="Compra rápida">
        <div className="book-sticky-copy">
          <strong>Confissão Ortodoxa</strong>
          <span>R$ 29,90 · digital</span>
        </div>
        <a className="button button-primary" href={BOOK_URL} target="_blank" rel="noreferrer">
          Adquirir
        </a>
      </div>

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
          <a className="footer-direct" href={CONTACT_URL} target="_blank" rel="noreferrer">
            Fale com a gente
          </a>
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
