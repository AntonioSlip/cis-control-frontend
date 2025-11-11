// File: app/api/register/route.ts

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  // 1. Validação de Segurança: Garante que quem está chamando é um admin logado
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  try {
    const { firstName, lastName, email, password } = await req.json();

    // 2. Validação dos Dados
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    // 3. Chamada Segura para o seu Backend Principal (NestJS)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { // Assumindo que a rota de criação de usuário é /users
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // O admin usa seu próprio token para autorizar a criação no backend
        'Authorization': `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Repassa a mensagem de erro do backend para o frontend
      return NextResponse.json({ message: errorData.message || 'Falha ao criar usuário no backend' }, { status: response.status });
    }

    const newUser = await response.json();

    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}