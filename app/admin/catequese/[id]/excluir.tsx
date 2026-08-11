"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExcluirCatequese({ id, titulo }: { id: number; titulo: string }) {
  const router = useRouter();
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  async function excluir() {
    setCarregando(true);
    await fetch(`/api/admin/catequeses/${id}`, { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="admin-btn admin-btn-danger"
      >
        Excluir
      </button>

      {aberto && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-excluir-titulo"
          onClick={(e) => {
            if (e.target === e.currentTarget) setAberto(false);
          }}
        >
          <div className="modal-card">
            <h2 id="modal-excluir-titulo" className="modal-title">
              Excluir catequese?
            </h2>
            <p className="modal-text">
              <strong>{titulo}</strong> e todas as <strong>presenças</strong>{" "}
              confirmadas nela serão apagadas. Esta ação não pode ser desfeita.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="admin-btn admin-btn-soft"
                onClick={() => setAberto(false)}
                disabled={carregando}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={excluir}
                disabled={carregando}
              >
                {carregando ? "Excluindo..." : "Sim, excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
