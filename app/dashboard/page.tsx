// File: app/dashboard/page.tsx

import LogoutButton from "@/components/LogoutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  UserPlus,
} from "lucide-react";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const userId = session.user?.id;
  const accessToken = session.accessToken;

  // Busca os dados da avaliação para o usuário que está LOGADO
  const res = await fetch(
    // CORREÇÃO 1: Adicionadas crases (`) para criar a URL dinamicamente
    `${process.env.NEXT_PUBLIC_API_URL}/assessments/by-user/${userId}`,
    {
      cache: "no-store",
      headers: {
        // CORREÇÃO 2: Adicionadas crases (`) para criar o cabeçalho de autorização
        "Authorization": `Bearer ${accessToken}`,
      },
    }
  );

  // Tratamento de erro caso a API falhe ou não retorne dados
  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="p-10 text-center text-gray-700 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-600">Erro ao Carregar Dados</h2>
            <p className="mt-2">Não foi possível buscar as avaliações do servidor.</p>
            <p className="text-sm text-gray-500 mt-2">Status do erro: {res.status}</p>
        </div>
      </div>
    );
  }

  const assessment = await res.json();

  const maturityData = [
    { subject: "IG1 - Básico", A: assessment.maturityIg1 || 0 },
    { subject: "IG2 - Fundacional", A: assessment.maturityIg2 || 0 },
    { subject: "IG3 - Organizacional", A: assessment.maturityIg3 || 0 },
  ];

  const controlsData = [
    { name: "Implementados", value: assessment.implemented || 0, color: "#28a745" },
    { name: "Parciais", value: assessment.partial || 0, color: "#ffc107" },
    { name: "Não Implementados", value: assessment.notImplemented || 0, color: "#D62828" },
  ];
  
  // Dados de exemplo para o histórico, substitua por dados reais da sua API se necessário
  const assessmentsHistory = [
    { id: 1, name: "Avaliação Inicial - Q4 2024", date: "15/12/2024", status: "Concluída", score: 65, color: "green" },
    { id: 2, name: "Reavaliação - Q3 2024", date: "20/09/2024", status: "Concluída", score: 52, color: "yellow" },
    { id: 3, name: "Avaliação de Base - Q2 2024", date: "10/06/2024", status: "Concluída", score: 38, color: "red" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <div className="border-l border-gray-300 pl-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard de Maturidade CIS
            </h1>
            <p className="text-gray-600">Olá, {session.user.name} 👋</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            href="/questionnarie"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" /> Nova Avaliação
          </Link>
          <button className="border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2 text-gray-700 hover:bg-gray-100">
            <FileText className="w-4 h-4" /> Gerar Relatório
          </button>
          {session.user.role === "admin" && (
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Cadastrar Usuário
            </Link>
          )}
          <LogoutButton />
        </div>
      </header>

      {/* Conteúdo */}
      <main className="p-6 space-y-6">
        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Maturidade Média</p>
                <p className="text-3xl font-bold text-gray-900">{assessment.averageScore || 0}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Controles Implementados</p>
                <p className="text-3xl font-bold text-gray-900">{assessment.implemented || 0}/150</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pontos Críticos</p>
                <p className="text-3xl font-bold text-red-600">{assessment.criticalPoints || 0}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Última Avaliação</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(assessment.updatedAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Maturidade por Grupos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4 text-gray-800">Maturidade por Grupos</h3>
            {maturityData.map((item, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{item.subject}</span>
                  <span>{item.A}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${item.A}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Status dos Controles */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4 text-gray-800">Status dos Controles</h3>
            {controlsData.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 mb-2 rounded-lg"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <span className="font-medium">{item.name}</span>
                <span className="font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Histórico de Avaliações */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Histórico de Avaliações
          </h3>
          {assessmentsHistory.map((a) => (
            <div key={a.id} className="flex justify-between items-center border-b border-gray-200 py-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    a.color === "green" ? "bg-green-500" : a.color === "yellow" ? "bg-yellow-500" : "bg-red-500"
                  }`}
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{a.name}</h4>
                  <p className="text-sm text-gray-600">{a.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{a.status}</span>
                <span className="font-bold">{a.score}%</span>
                <button className="border border-gray-300 px-3 py-1 rounded-md text-sm flex items-center gap-2 hover:bg-gray-100">
                  <Download className="w-4 h-4" /> Baixar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}