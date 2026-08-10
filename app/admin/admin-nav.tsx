"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const link = (href: string, rotulo: string) => (
    <Link
      href={href}
      className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
        pathname === href
          ? "bg-white/15 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      {rotulo}
    </Link>
  );

  return (
    <header style={{ background: "var(--ink)" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-bold tracking-wide text-white"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            Presença
          </span>
          <nav className="flex items-center gap-1">
            {link("/admin", "Catequeses")}
            {link("/admin/pessoas", "Catecúmenos")}
          </nav>
        </div>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
          }}
          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
