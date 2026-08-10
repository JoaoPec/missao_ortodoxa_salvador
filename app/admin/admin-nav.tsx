"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="admin-nav">
      <Link href="/admin" className="admin-nav-brand" aria-label="Painel de presença">
        <Image src="/images/selo-patriarcado.png" alt="" width={36} height={36} className="seal" />
        <strong>Presença</strong>
      </Link>
      <div className="admin-nav-side">
        <nav className="admin-nav-links" aria-label="Navegação do painel">
          <Link href="/admin" className={pathname === "/admin" ? "is-active" : ""}>
            Catequeses
          </Link>
          <Link href="/admin/pessoas" className={pathname === "/admin/pessoas" ? "is-active" : ""}>
            Catecúmenos
          </Link>
        </nav>
        <button
          type="button"
          className="admin-nav-logout"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
          }}
        >
          Sair
        </button>
      </div>
    </header>
  );
}