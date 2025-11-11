// File: lib/auth.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // 🔗 Chamada ao seu backend para login
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/email/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          
          if (!response.ok) {
            // Se o backend retornar um erro (ex: 401 Unauthorized), o login falha
            return null;
          }

          const data = await response.json();
          
          // O backend DEVE retornar o usuário com seu ID, nome, email e role.
          if (data && data.user) {
            // ▼▼▼ AJUSTE AQUI ▼▼▼
          // Combina firstName e lastName em um único campo 'name' para a sessão
          const fullName = `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim();

          return {
            id: data.user.id,
            name: fullName || data.user.email, // Usa o nome completo, ou o email como fallback
            email: data.user.email,
            role: data.user.role?.name, // Assumindo que o backend envia o nome da role (ex: 'admin')
            accessToken: data.accessToken,
          };
        }
          
          return null;

        } catch (error) {
          console.error("Erro fatal ao autenticar:", error);
          return null;
        }
      },
    }),
  ],

  // 🔒 Callbacks para injetar os dados no token e na sessão
  callbacks: {
    async jwt({ token, user }) {
      // O 'user' é o objeto retornado pelo 'authorize'
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Passa os dados do token para o objeto da sessão que o cliente usa
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};