import { NextResponse } from "next/server";
import { verificarSessao } from "@/lib/auth";
import { listarCatequeses, criarCatequese } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await verificarSessao())) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }
  return NextResponse.json({ catequeses: listarCatequeses() });
}

export async function POST(req: Request) {
  if (!(await verificarSessao())) {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }
  let body: { titulo?: string; assunto?: string; data?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  const titulo = (body.titulo ?? "").trim();
  if (!titulo) {
    return NextResponse.json({ erro: "Informe o título da catequese." }, { status: 400 });
  }

  const catequese = criarCatequese({
    titulo,
    assunto: body.assunto,
    data: body.data,
  });
  return NextResponse.json({ catequese }, { status: 201 });
}
