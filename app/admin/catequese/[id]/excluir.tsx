"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExcluirCatequese({ id, titulo }: { id: number; titulo: string }) {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  return (
    <button
      type="button"
      disabled={carregando}
      onClick={async () => {
        if (!window.confirm(`Excluir "${titulo}"? As presenças desta catequese serão apagadas.`)) return;
        setCarregando(true);
        await fetch(`/api/admin/catequeses/${id}`, { method: "DELETE" });
        router.push("/admin");
        router.refresh();
      }}
      className="rounded-lg px-3 py-2 text-xs font-bold transition hover:brightness-110 disabled:opacity-60"
      style={{ background: "rgba(147,20,14,0.10)", color: "var(--crimson)" }}
    >
      {carregando ? "Excluindo..." : "Excluir"}
    </button>
  );
}
