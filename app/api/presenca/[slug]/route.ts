import { NextResponse } from "next/server";
import {
  buscarCatequesePorSlug,
  buscarPessoaPorEmail,
  criarPessoa,
  confirmarPresenca,
  normalizarEmail,
  normalizarNome,
} from "@/lib/data";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Ctx = { params: Promise<{ slug: string }> };

// Informações públicas da catequese (sem lista de quem confirmou).
export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  const catequese = buscarCatequesePorSlug(slug);
  if (!catequese) {
    return NextResponse.json({ erro: "Catequese não encontrada." }, { status: 404 });
  }
  return NextResponse.json({
    titulo: catequese.titulo,
    assunto: catequese.assunto,
    data: catequese.data,
  });
}

export async function POST(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const catequese = buscarCatequesePorSlug(slug);
  if (!catequese) {
    return NextResponse.json({ erro: "Catequese não encontrada." }, { status: 404 });
  }

  let body: { email?: string; nome?: string; telefone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  const email = normalizarEmail(body.email ?? "");
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ erro: "Informe um e-mail válido." }, { status: 400 });
  }

  const pessoa = buscarPessoaPorEmail(email);

  // E-mail não está no cadastro: primeiro pedimos o nome (e opcionalmente telefone).
  if (!pessoa) {
    const nome = normalizarNome(body.nome ?? "");
    if (!nome) {
      return NextResponse.json({ status: "precisa_nome", email });
    }
    const id = criarPessoa({ nome, email, telefone: body.telefone });
    const resultado = confirmarPresenca(catequese.id, id);
    return NextResponse.json({
      status: resultado === "nova" ? "confirmado" : "ja_confirmado",
      nome,
      titulo: catequese.titulo,
    });
  }

  const resultado = confirmarPresenca(catequese.id, pessoa.id);
  return NextResponse.json({
    status: resultado === "nova" ? "confirmado" : "ja_confirmado",
    nome: pessoa.nome,
    titulo: catequese.titulo,
  });
}
