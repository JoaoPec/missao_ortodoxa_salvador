import { NextResponse } from "next/server";
import { apagarSessao } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  await apagarSessao();
  return NextResponse.json({ ok: true });
}
