import { NextResponse } from "next/server";
import { verificarSessao } from "@/lib/auth";
import { listarPessoas, importarPessoas } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await verificarSessao())) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }
  return NextResponse.json({ pessoas: listarPessoas() });
}

export async function POST(req: Request) {
  if (!(await verificarSessao())) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }
  let csv = "";
  try {
    const body = await req.json();
    csv = typeof body?.csv === "string" ? body.csv : "";
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }
  if (!csv.trim()) {
    return NextResponse.json({ erro: "Cole o CSV exportado do Notion." }, { status: 400 });
  }
  try {
    const resultado = importarPessoas(csv);
    return NextResponse.json({ ok: true, ...resultado });
  } catch (e) {
    return NextResponse.json(
      { erro: e instanceof Error ? e.message : "Falha ao importar o CSV." },
      { status: 400 }
    );
  }
}
