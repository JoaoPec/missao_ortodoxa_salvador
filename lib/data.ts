import crypto from "node:crypto";
import { getDb } from "./db";
import { parsePessoasCsv, type PessoaCsv } from "./csv";

export interface Catequese {
  id: number;
  slug: string;
  titulo: string;
  assunto: string | null;
  data: string | null;
  criado_em: string;
}

export interface Pessoa {
  id: number;
  nome: string;
  email: string | null;
  telefone: string | null;
  cidade: string | null;
  status: string | null;
  origem: "csv" | "auto";
  criado_em: string;
}

export function normalizarEmail(e: string | null | undefined): string | null {
  const t = (e ?? "").trim().toLowerCase();
  return t || null;
}

export function normalizarNome(n: string): string {
  return n.trim().replace(/\s+/g, " ");
}

// ---------------- Pessoas ----------------

export function buscarPessoaPorEmail(email: string): Pessoa | undefined {
  const e = normalizarEmail(email);
  if (!e) return undefined;
  return getDb().prepare("SELECT * FROM pessoas WHERE email = ?").get(e) as
    | Pessoa
    | undefined;
}

export function criarPessoa(dados: {
  nome: string;
  email?: string | null;
  telefone?: string | null;
  origem?: string;
}): number {
  const db = getDb();
  const info = db
    .prepare(
      "INSERT INTO pessoas (nome, email, telefone, origem) VALUES (?,?,?,?)"
    )
    .run(
      normalizarNome(dados.nome),
      normalizarEmail(dados.email ?? null),
      dados.telefone?.trim() || null,
      dados.origem ?? "auto"
    );
  return Number(info.lastInsertRowid);
}

export function listarPessoas(): (Pessoa & { presencas: number })[] {
  return getDb()
    .prepare(
      `SELECT pe.*, (SELECT COUNT(*) FROM presencas pr WHERE pr.pessoa_id = pe.id) AS presencas
       FROM pessoas pe ORDER BY pe.nome`
    )
    .all() as (Pessoa & { presencas: number })[];
}

export function totalCadastrados(): number {
  return (getDb().prepare("SELECT COUNT(*) AS c FROM pessoas").get() as { c: number }).c;
}

export function importarPessoas(textoCsv: string): {
  inseridas: number;
  atualizadas: number;
  total: number;
} {
  const pessoas = parsePessoasCsv(textoCsv);
  const db = getDb();
  const porEmail = db.prepare("SELECT id FROM pessoas WHERE email = ?");
  const porNome = db.prepare("SELECT id FROM pessoas WHERE nome = ? COLLATE NOCASE");
  const inserir = db.prepare(
    "INSERT INTO pessoas (nome, email, telefone, cidade, status, origem) VALUES (?,?,?,?,?,'csv')"
  );
  const atualizar = db.prepare(
    "UPDATE pessoas SET nome = ?, telefone = ?, cidade = ?, status = ? WHERE id = ?"
  );

  const tx = db.transaction((lista: PessoaCsv[]) => {
    let inseridas = 0;
    let atualizadas = 0;
    for (const p of lista) {
      const nome = normalizarNome(p.nome);
      if (!nome) continue;
      const email = normalizarEmail(p.email);
      let id: number | undefined;
      if (email) {
        const linha = porEmail.get(email) as { id: number } | undefined;
        id = linha?.id;
      } else {
        const linha = porNome.get(nome) as { id: number } | undefined;
        id = linha?.id;
      }
      if (id) {
        atualizar.run(nome, p.telefone || null, p.cidade || null, p.status || null, id);
        atualizadas++;
      } else {
        inserir.run(nome, email, p.telefone || null, p.cidade || null, p.status || null);
        inseridas++;
      }
    }
    return { inseridas, atualizadas };
  });

  const resultado = tx(pessoas);
  return { ...resultado, total: totalCadastrados() };
}

// ---------------- Catequeses ----------------

export function criarCatequese(dados: {
  titulo: string;
  assunto?: string;
  data?: string;
}): Catequese {
  const slug = crypto.randomBytes(5).toString("base64url");
  const db = getDb();
  const info = db
    .prepare("INSERT INTO catequeses (slug, titulo, assunto, data) VALUES (?,?,?,?)")
    .run(slug, dados.titulo.trim(), dados.assunto?.trim() || null, dados.data?.trim() || null);
  return buscarCatequese(Number(info.lastInsertRowid))!;
}

export function buscarCatequese(id: number): Catequese | undefined {
  return getDb().prepare("SELECT * FROM catequeses WHERE id = ?").get(id) as
    | Catequese
    | undefined;
}

export function buscarCatequesePorSlug(slug: string): Catequese | undefined {
  return getDb().prepare("SELECT * FROM catequeses WHERE slug = ?").get(slug) as
    | Catequese
    | undefined;
}

export function listarCatequeses(): (Catequese & { confirmados: number })[] {
  return getDb()
    .prepare(
      `SELECT c.*, COUNT(p.pessoa_id) AS confirmados
       FROM catequeses c LEFT JOIN presencas p ON p.catequese_id = c.id
       GROUP BY c.id ORDER BY c.criado_em DESC`
    )
    .all() as (Catequese & { confirmados: number })[];
}

export function excluirCatequese(id: number): void {
  getDb().prepare("DELETE FROM catequeses WHERE id = ?").run(id);
}

// ---------------- Presenças ----------------

export function confirmarPresenca(
  catequeseId: number,
  pessoaId: number
): "nova" | "existente" {
  const info = getDb()
    .prepare("INSERT OR IGNORE INTO presencas (catequese_id, pessoa_id) VALUES (?,?)")
    .run(catequeseId, pessoaId);
  return info.changes > 0 ? "nova" : "existente";
}

export function presencasDaCatequese(
  catequeseId: number
): (Pessoa & { confirmado_em: string })[] {
  return getDb()
    .prepare(
      `SELECT pe.*, pr.confirmado_em FROM presencas pr
       JOIN pessoas pe ON pe.id = pr.pessoa_id
       WHERE pr.catequese_id = ? ORDER BY pr.confirmado_em`
    )
    .all(catequeseId) as (Pessoa & { confirmado_em: string })[];
}

export function faltantesDaCatequese(catequeseId: number): Pessoa[] {
  return getDb()
    .prepare(
      `SELECT pe.* FROM pessoas pe
       WHERE pe.id NOT IN (SELECT pessoa_id FROM presencas WHERE catequese_id = ?)
       ORDER BY pe.nome`
    )
    .all(catequeseId) as Pessoa[];
}

// ---------------- Relatórios ----------------

export function resumoGeral() {
  const db = getDb();
  const totalPessoas = totalCadastrados();
  const totalCatequeses = (db.prepare("SELECT COUNT(*) AS c FROM catequeses").get() as { c: number }).c;
  const totalPresencas = (db.prepare("SELECT COUNT(*) AS c FROM presencas").get() as { c: number }).c;
  const presencasPorPessoa = db
    .prepare(
      `SELECT pe.nome, pe.email, pe.origem, COUNT(pr.pessoa_id) AS presencas
       FROM pessoas pe LEFT JOIN presencas pr ON pr.pessoa_id = pe.id
       GROUP BY pe.id ORDER BY presencas DESC, pe.nome`
    )
    .all() as { nome: string; email: string | null; origem: string; presencas: number }[];
  return {
    totalPessoas,
    totalCatequeses,
    totalPresencas,
    catequeses: listarCatequeses(),
    presencasPorPessoa,
  };
}
