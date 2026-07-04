import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Publicacao = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  html: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "publicacoes");

function parseFile(fileName: string): Publicacao {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`Frontmatter ausente em content/publicacoes/${fileName}`);
  }

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    meta[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }

  for (const key of ["title", "description", "date"]) {
    if (!meta[key]) {
      throw new Error(`Campo "${key}" ausente em content/publicacoes/${fileName}`);
    }
  }

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: meta.title,
    description: meta.description,
    date: meta.date,
    updated: meta.updated || meta.date,
    html: marked.parse(match[2], { async: false }),
  };
}

export function getPublicacoes(): Publicacao[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parseFile)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublicacao(slug: string): Publicacao | undefined {
  return getPublicacoes().find((publicacao) => publicacao.slug === slug);
}

export function formatarData(data: string): string {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
    new Date(`${data}T12:00:00`),
  );
}
