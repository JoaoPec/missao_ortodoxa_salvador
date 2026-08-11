import ExcelJS from "exceljs";
import { verificarSessao } from "@/lib/auth";
import {
  buscarCatequese,
  presencasDaCatequese,
  faltantesDaCatequese,
  type Pessoa,
} from "@/lib/data";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// Paleta da identidade visual do site.
const INK = "FF1C0805";
const CRIMSON = "FF93140E";
const GOLD = "FFC48B2A";
const PAPER = "FFFBF6EC";
const PLASTER = "FFF1EADB";
const VERDE = "FF1F7A4D";
const VERDE_BG = "FFE4F0E8";
const VERMELHO_BG = "FFF7E4E2";

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

  const wb = new ExcelJS.Workbook();
  wb.creator = "Missão Ortodoxa Grega em Salvador";
  const ws = wb.addWorksheet("Presença");

  // --- Cabeçalho: título da catequese ---
  ws.mergeCells("A1:G1");
  const t = ws.getCell("A1");
  t.value = catequese.titulo;
  t.font = { bold: true, size: 16, color: { argb: PAPER }, name: "Arial" };
  t.fill = { type: "pattern", pattern: "solid", fgColor: { argb: INK } };
  t.alignment = { vertical: "middle", horizontal: "left" };
  ws.getRow(1).height = 34;

  // --- Subtítulo: assunto · data ---
  ws.mergeCells("A2:G2");
  const s = ws.getCell("A2");
  const dataTexto = catequese.data
    ? new Date(catequese.data + "T00:00:00").toLocaleDateString("pt-BR")
    : "";
  s.value = [catequese.assunto || "Catequese", dataTexto].filter(Boolean).join(" · ");
  s.font = { italic: true, size: 10, color: { argb: "FF7A776D" }, name: "Arial" };
  ws.getRow(2).height = 22;

  // --- Tabela ---
  const HEADER_ROW = 4;
  const colunas = [
    { header: "Nome", width: 34 },
    { header: "E-mail", width: 36 },
    { header: "Telefone", width: 20 },
    { header: "Cidade", width: 26 },
    { header: "Status", width: 22 },
    { header: "Presença", width: 12 },
    { header: "Confirmado em", width: 20 },
  ];
  // Só larguras; os headers são escritos manualmente na linha HEADER_ROW
  // (definir ws.columns com header sobrescreveria o título em A1).
  ws.columns = colunas.map((c) => ({ width: c.width }));

  const headerRow = ws.getRow(HEADER_ROW);
  colunas.forEach((c, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = c.header;
    cell.font = { bold: true, size: 11, color: { argb: PAPER }, name: "Arial" };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: CRIMSON } };
    cell.alignment = { vertical: "middle" };
    cell.border = {
      bottom: { style: "medium", color: { argb: GOLD } },
    };
  });
  headerRow.height = 26;

  const linhaPresenca = (
    p: Pessoa & { confirmado_em?: string },
    presente: boolean
  ) => {
    const row = ws.addRow([
      p.nome,
      p.email || "—",
      p.telefone || "—",
      p.cidade || "—",
      p.status || "—",
      presente ? "Sim" : "Não",
      p.confirmado_em
        ? new Date(p.confirmado_em + "Z").toLocaleString("pt-BR")
        : "",
    ]);
    const presencaCell = row.getCell(6);
    presencaCell.font = {
      bold: true,
      size: 11,
      color: { argb: presente ? VERDE : CRIMSON },
    };
    presencaCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: presente ? VERDE_BG : VERMELHO_BG },
    };
    presencaCell.alignment = { horizontal: "center" };
    row.eachCell((cell) => {
      cell.font = { ...cell.font, name: "Arial", size: 10 };
    });
    return row;
  };

  for (const p of confirmados) {
    const row = linhaPresenca(p, true);
    row.getCell(6).value = "Sim";
  }
  for (const p of faltantes) {
    const row = linhaPresenca(p, false);
    row.getCell(6).value = "Não";
  }

  // --- Filtro automático + congelamento + zebra ---
  const lastRow = ws.rowCount;
  ws.autoFilter = { from: `A${HEADER_ROW}`, to: `G${lastRow}` };
  ws.views = [{ state: "frozen", ySplit: HEADER_ROW }];
  for (let r = HEADER_ROW + 1; r <= lastRow; r++) {
    const row = ws.getRow(r);
    if ((r - HEADER_ROW) % 2 === 0) {
      row.eachCell((cell) => {
        const c = cell as unknown as {
          fill?: { type?: string; fgColor?: { argb?: string } };
        };
        if (!c.fill || c.fill.type !== "pattern" || !c.fill.fgColor) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: PLASTER },
          };
        }
      });
    }
  }

  // --- Rodapé com resumo ---
  const resumoRow = ws.addRow([
    `Total: ${confirmados.length + faltantes.length} catecúmenos — ${confirmados.length} confirmados (${Math.round(
      ((confirmados.length / Math.max(1, confirmados.length + faltantes.length)) * 100)
    )}%)`,
  ]);
  ws.mergeCells(`A${resumoRow.number}:G${resumoRow.number}`);
  resumoRow.getCell(1).font = { bold: true, size: 10, color: { argb: INK }, name: "Arial" };

  const buffer = await wb.xlsx.writeBuffer();
  const nomeArquivo = `presenca-${catequese.slug}.xlsx`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${nomeArquivo}"`,
    },
  });
}
