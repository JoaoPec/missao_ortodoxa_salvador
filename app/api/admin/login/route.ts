import { NextResponse } from "next/server";
import { senhaAdmin, criarSessao, cookieAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let senha = "";
  try {
    const body = await req.json();
    senha = typeof body?.senha === "string" ? body.senha : "";
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  if (!senha || senha !== senhaAdmin()) {
    return NextResponse.json({ erro: "Senha incorreta." }, { status: 401 });
  }

  const token = await criarSessao();
  return NextResponse.json(
    { ok: true },
    { headers: { "Set-Cookie": cookieAdminSession(token) } }
  );
}
