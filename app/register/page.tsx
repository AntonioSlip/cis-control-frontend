// File: app/register/page.tsx

import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function RegisterPage() {
  // Verificação de segurança: Apenas administradores podem ver esta página.
  // Se um usuário não-admin tentar acessá-la diretamente pela URL, ele é redirecionado.
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect("/"); // Redireciona para a página de login
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <RegisterForm />
    </main>
  );
}