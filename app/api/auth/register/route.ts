// File: app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== 'admin') {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 403 });
  }

  try {
    // ▼▼▼ Pega os novos campos do corpo da requisição ▼▼▼
    const { firstName, lastName, email, password, roleId, statusId } = await req.json();

    // Chamada para o seu Backend Principal (NestJS)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/email/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`,
      },
      // ▼▼▼ Envia os novos campos para o NestJS ▼▼▼
      body: JSON.stringify({ 
        firstName, 
        lastName, 
        email, 
        password,
        role: { id: roleId }, // O boilerplate espera um objeto
        status: { id: statusId } // O boilerplate espera um objeto
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.message || 'Falha ao criar usuário no backend' }, { status: response.status });
    }

    const newUser = await response.json();
    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}