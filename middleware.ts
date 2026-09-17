import { NextResponse, type NextRequest } from "next/server";

/**
 * Redirect 301 non-www -> www.
 *
 * O site é canônico em "www.ortodoxabahia.com.br": sitemap, robots, canonical,
 * og:url e JSON-LD apontam todos para lá. Sem redirect, porém, o host sem www
 * responde 200 com conteúdo idêntico — o Google rastreia as duas versões e
 * reporta a sem www como "página alternativa com tag canônica adequada".
 *
 * Consolidar no www evita o rastreamento duplicado e concentra os sinais de
 * ranking em uma única URL.
 */
const CANONICAL_HOST = "www.ortodoxabahia.com.br";
const APEX_HOST = "ortodoxabahia.com.br";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (host !== APEX_HOST) {
    return NextResponse.next();
  }

  // URL montada manualmente: nextUrl herda a porta interna do header host
  // quando atrás de proxy, e a porta vazaria no Location do redirect.
  const redirectUrl = new URL(
    `https://${CANONICAL_HOST}${request.nextUrl.pathname}${request.nextUrl.search}`,
  );
  return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
