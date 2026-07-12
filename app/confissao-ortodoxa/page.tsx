import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = "https://www.ortodoxabahia.com.br";
const CONTACT_URL = "https://ig.me/m/ortodoxa.salvador";
const BOOK_URL = "https://pay.hotmart.com/L103598945N?bid=1780150292559";
const INSTAGRAM_URL = "https://www.instagram.com/ortodoxa.salvador/";

export const metadata: Metadata = {
  title: "A Confissão Ortodoxa | Missão Ortodoxa em Salvador",
  description:
    "Catecismo Ortodoxo popular revisado e aprovado pelas maiores autoridades da Ortodoxia ao longo dos últimos 5 séculos. Conheça a Confissão Ortodoxa de São Pedro Moguila.",
  alternates: { canonical: `${SITE_URL}/confissao-ortodoxa` },
  openGraph: {
    title: "A Confissão Ortodoxa de São Pedro Moguila",
    description:
      "Catecismo Ortodoxo popular revisado e aprovado pelas maiores autoridades da Ortodoxia. Uma exposição completa da fé apostólica em perguntas e respostas.",
    type: "article",
    locale: "pt_BR",
    images: [`${SITE_URL}/images/confissao-kindle.png`],
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

      <section className="book-section" id="top">
        <div className="book-media">
          <Image
            src="/images/confissao-kindle.png"
            alt="Kindle exibindo o livro A Confissão Ortodoxa de São Pedro Moguila"
            fill
            sizes="(max-width: 900px) 100vw, 56vw"
            className="book-image"
          />
        </div>
        <div className="book-copy">
          <p className="book-kicker">Catecismo Ortodoxo</p>
          <h2>A Confissão Ortodoxa</h2>
          <h3>da Igreja Católica Apostólica Oriental</h3>
          <p className="book-author">São Pedro Moguila</p>
          <p>
            Uma ponte construída há séculos, mas que ainda serve de passagem
            para aqueles que querem entender o que é e o que ensina a Igreja
            Ortodoxa.
          </p>
          <div className="book-points" aria-label="Destaques do livro">
            <span>Doutrina</span>
            <span>Catequese</span>
            <span>Tradição</span>
          </div>
          <div className="book-actions">
            <a className="button button-primary" href={BOOK_URL} target="_blank" rel="noreferrer">
              Adquirir por R$ 29,90
            </a>
            <Link className="button button-text" href="/publicacoes/confissao-ortodoxa">
              Saiba mais sobre o livro
            </Link>
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

          <h1>Catecismo Ortodoxo popular revisado e aprovado pelas maiores autoridades da Ortodoxia ao longo dos últimos 5 séculos</h1>

          <div className="pub-body">
            <p>
              A <strong>Confissão Ortodoxa da Igreja Católica Apostólica Oriental</strong> é um livro catequético elaborado pelo Metropolita São Pedro Moguila no século XVII, em um período marcado por intensos debates teológicos e por profundas transformações religiosas na Europa Oriental.
            </p>
            <p>
              Seu surgimento responde à necessidade de apresentar, de forma clara e ordenada, o ensinamento da Igreja Ortodoxa em diálogo com as formulações protestantes e católico-romanas então predominantes.
            </p>
            <p>
              Longe de se limitar à controvérsia, a obra oferece uma exposição sistemática e pastoral da fé ortodoxa, com o objetivo de tornar inteligíveis seus dogmas, práticas e fundamentos teológicos.
            </p>
            <p>
              Escrita para instruir, esclarecer e organizar o conteúdo da fé, a <strong>Confissão</strong> busca situar a tradição ortodoxa de maneira precisa no cenário cristão mais amplo, preservando sua coerência interna e oferecendo ao leitor um acesso direto ao que a Igreja Ortodoxa crê, ensina e confessa.
            </p>

            <h2>Confiável, autorizada e recebida por todos os patriarcados</h2>

            <p>
              A autoridade desta Confissão não deriva de um autor isolado. O texto foi examinado e aprovado no Concílio de Kiev (1640), posteriormente revisado no Concílio de Iași (1642) e, por fim, submetido ao juízo dos quatro Patriarcados Orientais — Constantinopla, Alexandria, Antioquia e Jerusalém. Concluindo que ela era a confissão de fé "não apenas dos russos, mas... A Confissão Ortodoxa de todos os Gregos".
            </p>
            <p>
              Após esse processo de avaliação, correção e confirmação, a Confissão foi formalmente recebida como uma exposição fiel e representativa da fé ortodoxa, oferecendo ao leitor não uma interpretação particular, mas o ensinamento que a Igreja reconheceu como conforme à sua doutrina e à sua Tradição. Até mesmo seus maiores críticos e escrutinizadores no século XX alegaram: "a Confissão acabou sendo Ortodoxa de fato, e não apenas no nome." (Karmiris. Op. cit. Σσ., 589).
            </p>

            <h2>Oriental e Ocidental</h2>

            <p>
              A forma e a linguagem adotadas por São Pedro Moguila não foram acidentais.
            </p>
            <p>
              Ao estruturar a Confissão em perguntas e respostas, com definições claras, distinções precisas e vocabulário técnico cuidadosamente escolhido, o Metropolita recorreu ao método catequético então dominante no Ocidente — não por submissão teológica, mas por uma estratégia pastoral e pedagógica.
            </p>
            <p>
              Essa era a linguagem intelectual comum do seu tempo, compreendido tanto por ortodoxos quanto por seus interlocutores protestantes e romanos, e permitia que a fé da Igreja fosse exposta com rigor, clareza e sem ambiguidades.
            </p>
            <p>
              Assim, Moguila utilizou categorias e termos conhecidos para comunicar conteúdos plenamente ortodoxos, apropriando-se da forma para proteger o conteúdo, e demonstrando que a Tradição da Igreja não teme a precisão conceitual quando esta serve à verdade e à instrução dos fiéis.
            </p>

            <h2>A versão final e conciliarmente autorizada</h2>

            <p>
              A Confissão foi redigida originalmente em latim por São Pedro Moguila com a colaboração de seus discípulos mais próximos e apresentada ao Concílio de Kiev (1640), onde recebeu correções iniciais.
            </p>
            <p>
              Em seguida, foi submetida ao Concílio de Iași (1642), convocado justamente para examiná-la à luz da fé da Igreja inteira; nesse contexto, o texto passou por uma revisão conduzida principalmente por Melécio Syrigos, atuando como exarca patriarcal, cujo trabalho teve como objetivo remover ambiguidades e eliminar qualquer formulação que pudesse ser lida como estranha à doutrina ortodoxa.
            </p>
            <p>
              A versão revista foi então traduzida para o grego, examinada e aprovada formalmente pelos Patriarcas de Constantinopla, Alexandria, Antioquia e Jerusalém em 1643, com atos sinodais que atestam sua conformidade dogmática.
            </p>
            <p>
              A partir dessa recepção patriarcal, consolidou-se a chamada "versão grega", que passou a ser considerada normativa, sendo posteriormente publicada em edições bilíngues grego-latinas e traduzida para diversas línguas.
            </p>
            <p>
              A presente edição segue essa tradição textual recebida e autorizada pela Igreja, incorporando as revisões conciliares, a recepção patriarcal e o trabalho filológico posterior, oferecendo ao leitor não um rascunho histórico, mas a forma amadurecida e oficialmente acolhida da Confissão Ortodoxa.
            </p>

            <p>
              Pressionados por uma maioria protestante e romana um pequeno povo ortodoxo precisa da iluminação catequética da Santa Igreja — esse era o público-alvo de São Pedro Moguila no séc. XVII, muito semelhante ao estado atual da Ortodoxia no Brasil.
            </p>

            <h2>Conteúdo da Confissão</h2>

            <h3>Parte I: Da Fé</h3>
            <p>
              Exposição sistemática dos dogmas centrais da fé cristã ortodoxa: a Santíssima Trindade, a criação, a encarnação do Verbo, a obra salvífica de Cristo, a Igreja, os sacramentos, os santos ícones, a veneração dos santos e a autoridade da Tradição e das Escrituras.
            </p>

            <h3>Parte II: Da Esperança</h3>
            <p>
              Trata da oração, do Pai-Nosso, das bem-aventuranças e da expectativa cristã quanto à ressurreição, ao juízo e à vida futura, articulando a esperança escatológica da Igreja com a vida concreta do fiel.
            </p>

            <h3>Parte III: Da Caridade</h3>
            <p>
              Aborda a vida moral cristã à luz dos mandamentos de Deus e da Igreja, o amor ao próximo, o arrependimento, a confissão, as boas obras e a vivência prática da fé como resposta concreta à graça divina.
            </p>

            <h2>Conteúdos bônus: explicações para maior compreensão do contexto e da teologia da obra</h2>

            <h3>Para uma avaliação da teologia de São Pedro Moguila</h3>
            <p>
              Texto analítico que reconstrói o contexto histórico, eclesial e intelectual no qual a Confissão foi produzida, explicando as circunstâncias dramáticas enfrentadas pela Ortodoxia após a queda de Constantinopla e demonstrando por que a obra de Moguila se tornou um marco teológico recebido pela Igreja.
            </p>

            <h3>Sobre a questão da influência ocidental na herança teológica do Santo Hierarca Pedro Moguila</h3>
            <p>
              Ensaio crítico que examina, com precisão histórica e teológica, as acusações de "latinização" feitas contra Moguila, distinguindo claramente entre empréstimos formais (método, linguagem, estrutura) e fidelidade doutrinária, e mostrando como a Confissão permaneceu plenamente ortodoxa em conteúdo, apesar do uso de categorias compreensíveis no Ocidente.
            </p>

            <h3>Apêndice I: O Pecado Ancestral e o conceito de "culpa"</h3>
            <p>
              Análise detalhada da diferença entre o ensinamento ortodoxo sobre o pecado ancestral e as formulações ocidentais de culpa herdada, esclarecendo equívocos comuns e demonstrando o que grandes santos e teólogos Ortodoxos afirmaram sobre este ponto sensível da antropologia teológica.
            </p>

            <h3>Apêndice II: A Transubstanciação</h3>
            <p>
              Esclarecimento doutrinário sobre o uso do termo "transubstanciação" no contexto da tradição ortodoxa, analisando sua origem, seu emprego histórico e o modo como foi compreendido por autores e santos anteriores às controvérsias modernas. O texto explica como esse vocabulário foi utilizado para afirmar a real transformação dos Dons Eucarísticos, ao mesmo tempo em que delimita cuidadosamente seu significado, sem pressupor a adoção obrigatória de sistemas filosóficos específicos, permitindo assim uma compreensão mais precisa do ensinamento eucarístico da Igreja Ortodoxa.
            </p>

            <div className="translation-note">
              <span>Tradução da missão</span>
              <p>
                Esta tradução foi feita pelo Pe. Paísios, líder da Missão Ortodoxa Grega em Salvador-BA, revisada pelos fiéis Lucas Falango e Kelvin Basílio e editorada pelo fiel Gabriel Galdino.
              </p>
            </div>
          </div>

          <aside className="pub-cta">
            <p>Adquira o livro</p>
            <h2>A Confissão Ortodoxa de São Pedro Moguila</h2>
            <span>
              Disponível em formato digital. Leia no Kindle, tablet ou celular e
              aprofunde-se na fé apostólica preservada por dois mil anos.
            </span>
            <a className="button button-primary" href={BOOK_URL} target="_blank" rel="noreferrer">
              Adquirir por R$ 29,90
            </a>
          </aside>
        </article>
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
