// Parser CSV simples (RFC 4180: aspas, vírgulas internas, CRLF, BOM) —
// suficiente para os exports do Notion que o padre usa.

export function parseCsv(texto: string): string[][] {
  const linhas: string[][] = [];
  let linha: string[] = [];
  let campo = "";
  let emAspas = false;

  // remove BOM
  const txt = texto.charCodeAt(0) === 0xfeff ? texto.slice(1) : texto;

  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (emAspas) {
      if (c === '"') {
        if (txt[i + 1] === '"') {
          campo += '"';
          i++;
        } else {
          emAspas = false;
        }
      } else {
        campo += c;
      }
    } else if (c === '"') {
      emAspas = true;
    } else if (c === ",") {
      linha.push(campo);
      campo = "";
    } else if (c === "\n") {
      linha.push(campo);
      linhas.push(linha);
      linha = [];
      campo = "";
    } else if (c !== "\r") {
      campo += c;
    }
  }
  if (campo !== "" || linha.length > 0) {
    linha.push(campo);
    linhas.push(linha);
  }
  return linhas.filter((l) => l.some((f) => f.trim() !== ""));
}

export interface PessoaCsv {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  status: string;
}

// Mapeia o CSV exportado pelo Notion ("Catecúmenos") para o nosso formato.
export function parsePessoasCsv(texto: string): PessoaCsv[] {
  const linhas = parseCsv(texto);
  if (linhas.length === 0) return [];
  const header = linhas[0].map((h) => h.trim().toLowerCase());

  const col = (nome: string): number => {
    const i = header.indexOf(nome);
    if (i === -1) throw new Error(`Coluna "${nome}" não encontrada no CSV.`);
    return i;
  };

  const iNome = col("nome e sobrenome");
  const iEmail = header.indexOf("e-mail");
  const iContato = header.indexOf("contato");
  const iCidade = header.indexOf("cidade onde mora");
  const iStatus = header.indexOf("status");

  const pessoas: PessoaCsv[] = [];
  for (const linha of linhas.slice(1)) {
    if (!linha[iNome]?.trim()) continue;
    pessoas.push({
      nome: linha[iNome]?.trim() ?? "",
      email: iEmail >= 0 ? (linha[iEmail] ?? "").trim() : "",
      telefone: iContato >= 0 ? (linha[iContato] ?? "").trim() : "",
      cidade: iCidade >= 0 ? (linha[iCidade] ?? "").trim() : "",
      status: iStatus >= 0 ? (linha[iStatus] ?? "").trim() : "",
    });
  }
  return pessoas;
}
