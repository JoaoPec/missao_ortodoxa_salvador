import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

// Em produção (Railway) aponte DATABASE_PATH para o volume (ex: /data/presenca.db).
// Em dev, o banco fica em data/presenca.db (pasta ignorada pelo git).
const DB_PATH =
  process.env.DATABASE_PATH || path.join(process.cwd(), "data", "presenca.db");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS pessoas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT,
  telefone TEXT,
  cidade TEXT,
  status TEXT,
  origem TEXT NOT NULL DEFAULT 'csv',
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_pessoas_email
  ON pessoas(email) WHERE email IS NOT NULL AND email <> '';

CREATE TABLE IF NOT EXISTS catequeses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  assunto TEXT,
  data TEXT,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS presencas (
  catequese_id INTEGER NOT NULL REFERENCES catequeses(id) ON DELETE CASCADE,
  pessoa_id INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  confirmado_em TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (catequese_id, pessoa_id)
);
CREATE INDEX IF NOT EXISTS idx_presencas_pessoa ON presencas(pessoa_id);
`;

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    db.exec(SCHEMA);
  }
  return db;
}
