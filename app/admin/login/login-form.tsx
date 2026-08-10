"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      });
      if (!res.ok) {
        const dados = await res.json().catch(() => ({}));
        setErro(dados.erro || "Senha incorreta.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setErro("Falha de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={entrar}>
      <div className="presenca-field">
        <label htmlFor="senha">Senha do administrador</label>
        <input
          id="senha"
          type="password"
          required
          autoFocus
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      {erro && <p className="presenca-error">{erro}</p>}
      <button type="submit" disabled={carregando} className="button button-primary presenca-submit">
        {carregando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}