import { verificarSessao } from "@/lib/auth";
import {
  buscarCatequese,
  presencasDaCatequese,
  faltantesDaCatequese,
  type Pessoa,
} from "@/lib/data";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

function escCsv(v: string | null | undefined): string {
  const s = (v ?? "").replace(/"/g, '""');
  return `"${s}"`;
}

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await verificarSessao())) {
    return new Response("Não autorizado.", { status: 401 });
  }
  const { id } = await params;
  const catequese = buscarCatequese(Number(id));
  if (!catequese) {
    return new Response("Catequese não encontrada.", { status: 404 });
  }

  const confirmados = presencasDaCatequese(catequese.id);
  const faltantes = faltantesDaCatequese(catequese.id);

  const linhas: string[] = [];
  linhas.push("Nome,E-mail,Telefone,Cidade,Status,Presença,Confirmado em");
  for (const p of confirmados as (Pessoa & { confirmado_em: string })[]) {
    linhas.push(
      [p.nome, p.email, p.telefone, p.cidade, p.status, "Sim", p.confirmado_em]
        .map(escCsv)
        .join(",")
    );
  }
  for (const p of faltantes) {
    linhas.push(
      [p.nome, p.email, p.telefone, p.cidade, p.status, "Não", ""]
        .map(escCsv)
        .join(",")
    );
  }

  // BOM para o Excel (Windows) ler acentos corretamente.
  const csv = "\uFEFF" + linhas.join("\r\n");
  const nomeArquivo = `presenca-${catequese.slug}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${nomeArquivo}"`,
    },
  });
}
