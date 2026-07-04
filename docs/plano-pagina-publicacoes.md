# Plano — Página de Publicações

> **Status: planejamento.** Nada aqui está implementado; este documento orienta a implementação futura.

## Objetivo

Criar uma seção de publicações (`/publicacoes`) que sirva dois propósitos:

1. **Pastoral** — reunir traduções, textos de catequese e avisos da missão num só lugar.
2. **SEO** — conteúdo novo e indexável é o principal fator para ranquear em buscas de cauda longa que a home sozinha não alcança. A home disputa "igreja ortodoxa em salvador"; as publicações disputam todo o resto.

## Buscas-alvo (intenções, não keywords para repetir)

Cada publicação deve nascer de uma pergunta real que as pessoas pesquisam. Exemplos priorizados:

| Intenção de busca | Tipo de publicação |
|---|---|
| "o que é a igreja ortodoxa" / "diferença entre católica e ortodoxa" | Artigo de catequese |
| "como se converter à igreja ortodoxa" / "catecúmeno o que é" | Artigo guia (forte para a missão: termina em CTA de contato) |
| "livros ortodoxos em português" / "confissão ortodoxa pedro moguila" | Página da tradução do livro |
| "divina liturgia o que é" / "liturgia de são joão crisóstomo" | Artigo litúrgico |
| "batismo ortodoxo adulto" / "casamento ortodoxo brasil" | Artigos sacramentais |
| "jejum ortodoxo" / "páscoa ortodoxa 2027 quando é" | Artigos de calendário (tráfego sazonal recorrente) |

**Regra anti-repetição:** "Salvador"/"Bahia" só aparece onde é natural (rodapé do artigo, bio do autor, CTA). O corpo do texto responde a pergunta; a localização vem da entidade `Church` já ligada no schema, não de keyword stuffing.

## Estrutura de URLs

```
/publicacoes                  → índice (lista das publicações)
/publicacoes/[slug]           → publicação individual
```

- Slugs curtos, em minúsculas, com hífens, sem stopwords: `/publicacoes/como-se-converter-ortodoxia` (não `/publicacoes/como-eu-posso-me-converter-a-igreja-ortodoxa`).
- Sem categorias/datas na URL — a estrutura rasa evita reindexação se a taxonomia mudar.

## Arquitetura (Next.js App Router)

```
app/
  publicacoes/
    page.tsx                  → índice; metadata própria
    [slug]/
      page.tsx                → generateStaticParams + generateMetadata por slug
content/
  publicacoes/*.md            → uma publicação por arquivo Markdown com frontmatter
```

- Conteúdo em Markdown com frontmatter (`title`, `description`, `date`, `updated`, `slug`) — sem CMS por enquanto; o Pe. Paísios/fiéis editam arquivo, commit publica.
- Páginas estáticas (SSG), como o resto do site.

## SEO por página

Cada `/publicacoes/[slug]` deve ter:

- **`title`**: pergunta/tema primeiro, marca depois — `O que é a Divina Liturgia? | Missão Ortodoxa em Salvador` (≤ 60 caracteres).
- **`description`**: resposta resumida em ~150 caracteres, única por página.
- **`alternates.canonical`**: `/publicacoes/[slug]`.
- **JSON-LD `Article`**: `headline`, `datePublished`, `dateModified`, `inLanguage: "pt-BR"`, `author` (Person: Pe. Paísios) e `publisher: { "@id": "https://ortodoxasalvador.org.br/#igreja" }` — reutiliza a entidade `Church` já declarada na home.
- **`BreadcrumbList`**: Início → Publicações → título.
- **Heading único `<h1>`** = título do artigo; subtítulos em `<h2>/<h3>` respondendo subperguntas (bom para featured snippets).
- **og:image**: imagem própria por artigo quando houver; fallback para a imagem do hero.

## Integrações no site atual (quando implementar)

1. **Sitemap** — adicionar `/publicacoes` e cada slug em `app/sitemap.ts` (ler os arquivos de `content/publicacoes`), com `lastModified` vindo do frontmatter.
2. **Navegação** — item "Publicações" no `navItems` da home e link no rodapé (link interno é sinal de relevância).
3. **Links internos** — a seção do livro na home aponta para `/publicacoes/confissao-ortodoxa` (página própria do livro, que hoje só existe como âncora `#livro`); artigos linkam entre si e sempre terminam com CTA "Visite uma Divina Liturgia".
4. **Schema do livro** — mover o JSON-LD `Book` da home para a página própria do livro quando ela existir, deixando na home apenas a referência.

## Conteúdo de lançamento (sugestão de 5 primeiras publicações)

1. **A Confissão Ortodoxa** — página dedicada da tradução (já há copy pronta na home).
2. **Como visitar uma Divina Liturgia pela primeira vez** — menor concorrência, intenção local, converte visita.
3. **O que é a Igreja Ortodoxa?** — catequese base, maior volume de busca.
4. **Como me tornar ortodoxo? O caminho do catecúmeno** — intenção de conversão, CTA natural.
5. **O calendário litúrgico ortodoxo: jejuns e festas** — tráfego sazonal recorrente.

## Critérios de pronto (por publicação)

- [ ] Responde a pergunta no primeiro parágrafo (sem introdução genérica).
- [ ] `title` e `description` únicos; slug curto.
- [ ] JSON-LD `Article` + `BreadcrumbList` válidos (testar no Rich Results Test).
- [ ] Pelo menos 1 link interno para outra publicação e 1 CTA de contato.
- [ ] Entrada adicionada ao sitemap.
- [ ] `npm run build` passa e página renderiza no preview.
