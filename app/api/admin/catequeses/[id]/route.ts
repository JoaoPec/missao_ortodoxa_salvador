import { NextResponse } from "next/server";
import { verificarSessao } from "@/lib/auth";
import {
  buscarCatequese,
  presencasDaCatequese,
  faltantesDaCatequese,
  excluirCatequese,
} from "@/lib/data";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  if (!(await verificarSessao())) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }
  const { id } = await params;
  const catequese = buscarCatequese(Number(id));
  if (!catequese) {
    return NextResponse.json({ erro: "Catequese não encontrada." }, { status: 404 });
  }
  return NextResponse.json({
    catequese,
    confirmados: presencasDaCatequese(catequese.id),
    faltantes: faltantesDaCatequese(catequese.id),
  });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await verificarSessao())) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }
  const { id } = await params;
  const catequese = buscarCatequese(Number(id));
  if (!catequese) {
    return NextResponse.json({ erro: "Catequese não encontrada." }, { status: 404 });
  }
  excluirCatequese(catequese.id);
  return NextResponse.json({ ok: true });
}
