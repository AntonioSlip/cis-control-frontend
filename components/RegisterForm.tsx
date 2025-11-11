// File: components/RegisterForm.tsx

"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function RegisterForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function register(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const roleId = formData.get("roleId");     // <-- Pega o novo campo
    const statusId = formData.get("statusId"); // <-- Pega o novo campo

    if (!firstName || !lastName || !email || !password || !roleId || !statusId) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const accessToken = session?.accessToken;

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        // ▼▼▼ Envia os novos campos no corpo da requisição ▼▼▼
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email, 
          password, 
          roleId: Number(roleId),     // Converte para número
          statusId: Number(statusId)  // Converte para número
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Ocorreu um erro no registro.');

      setSuccess(`Usuário "${firstName}" registrado com sucesso!`);
      (e.target as HTMLFormElement).reset();

    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <form
      onSubmit={register}
      className="w-full max-w-md bg-white p-12 rounded-lg shadow-md flex flex-col items-center gap-4"
    >
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Cadastrar Novo Usuário</h1>
        <p className="text-gray-600">Preencha os dados da nova conta</p>
      </div>

      <div className="flex gap-4 w-full">
        <input name="firstName" type="text" placeholder="Nome" className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600" />
        <input name="lastName" type="text" placeholder="Sobrenome" className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600" />
      </div>

      <input name="email" type="email" placeholder="email@do-usuario.com" className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600" />
      <input name="password" type="password" placeholder="Crie uma senha forte" className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600" />

      {/* ▼▼▼ NOVOS CAMPOS DE SELEÇÃO ▼▼▼ */}
      <div className="flex gap-4 w-full">
        <select name="roleId" defaultValue="" className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600">
          <option value="" disabled>Selecione a Permissão</option>
          <option value="1">Admin</option>
          <option value="2">Usuário</option>
        </select>
        <select name="statusId" defaultValue="" className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600">
          <option value="" disabled>Selecione o Status</option>
          <option value="1">Ativo</option>
          <option value="2">Inativo</option>
        </select>
      </div>

      <div className="flex gap-4 w-full mt-4">
        <button onClick={() => router.push('/dashboard')} type="button" className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-md transition-colors">Voltar</button>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-colors" type="submit">Registrar Usuário</button>
      </div>

      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
    </form>
  );
}