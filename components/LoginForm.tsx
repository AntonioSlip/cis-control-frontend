"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, use } from "react";

export default function LoginForm() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // ✅ Corrigido aqui
    await signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <form
      onSubmit={login}
      className="w-full max-w-md bg-white p-12 rounded-lg shadow-md flex flex-col items-center gap-4"
    >
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Análise de Maturidade CIS Control
        </h1>
        <p className="text-gray-600">Acesso seguro ao sistema</p>
      </div>

      <h2 className="font-bold text-lg text-gray-700">Faça seu Login</h2>

      <input
        name="email"
        type="email"
        placeholder="seu@email.com"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
      />

      <input
        name="password"
        type="password"
        placeholder="digite sua senha"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
      />

      <div className="text-right w-full">
        <button
          type="button"
          className="text-sm text-red-600 hover:text-red-700 hover:underline"
        >
          Esqueci minha senha
        </button>
      </div>

      <button
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md mt-4 transition-colors"
        type="submit"
      >
        Fazer Login
      </button>
      {error === "CredentialsSignin" && (
        <p className="text-red-600 mt-2">Erro no login. Tente novamente.</p>
      )}
    </form>
  );
}
