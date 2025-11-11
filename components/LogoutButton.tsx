"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  async function handleLogout() {
    try {
      // Recupera token JWT salvo (exemplo: em localStorage)
      const token = localStorage.getItem("access_token");

      if (token) {
        await fetch("http://localhost:3000/api/v1/auth/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
      }

      // Encerra sessão local do NextAuth
      await signOut({ callbackUrl: "/" });

      // Limpa token
      localStorage.removeItem("access_token");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
    >
      Sair
    </button>
  );
}

