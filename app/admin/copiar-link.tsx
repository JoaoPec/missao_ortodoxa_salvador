"use client";

import { useState } from "react";

export default function CopiarLink({ url, rotulo = "Copiar link" }: { url: string; rotulo?: string }) {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopiado(true);
          setTimeout(() => setCopiado(false), 2000);
        } catch {
          // Clipboard indisponível (http, permissão): mostra o link selecionável.
          window.prompt("Copie o link:", url);
        }
      }}
      className="rounded-lg px-3 py-2 text-xs font-bold transition"
      style={{
        background: copiado ? "rgba(20,120,60,0.12)" : "var(--paper-2)",
        color: copiado ? "#14783c" : "var(--ink)",
      }}
    >
      {copiado ? "✓ Copiado!" : rotulo}
    </button>
  );
}
