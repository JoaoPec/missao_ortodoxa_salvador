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
          window.prompt("Copie o link:", url);
        }
      }}
      className={`admin-btn ${copiado ? "admin-btn-copied" : "admin-btn-soft"}`}
    >
      {copiado ? "✓ Copiado!" : rotulo}
    </button>
  );
}