import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "admin_session";

// Em dev, sem ADMIN_PASSWORD, usa esta senha (com aviso).
export function senhaAdmin(): string {
  const s = process.env.ADMIN_PASSWORD;
  if (!s && process.env.NODE_ENV !== "production") {
    console.warn("[auth] ADMIN_PASSWORD não definida — usando senha de desenvolvimento 'admin123'");
    return "admin123";
  }
  return s ?? "";
}

function assinar(payload: string): string {
  return crypto
    .createHmac("sha256", senhaAdmin())
    .update(payload)
    .digest("base64url");
}

export async function criarSessao(): Promise<string> {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 dias
  const payload = String(exp);
  const token = `${payload}.${assinar(payload)}`;
  return Buffer.from(token, "utf8").toString("base64url");
}

export async function verificarSessao(): Promise<boolean> {
  const valor = (await cookies()).get(COOKIE)?.value;
  if (!valor) return false;
  try {
    const token = Buffer.from(valor, "base64url").toString("utf8");
    const [exp, sig] = token.split(".");
    if (!exp || !sig) return false;
    const esperado = assinar(exp);
    if (sig.length !== esperado.length) return false;
    const ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(esperado));
    return ok && Number(exp) > Date.now();
  } catch {
    return false;
  }
}

export async function apagarSessao(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export function cookieAdminSession(valor: string): string {
  return `${COOKIE}=${valor}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`;
}
