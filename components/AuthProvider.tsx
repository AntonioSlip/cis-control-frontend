// File: components/AuthProvider.tsx

'use client'; // Esta diretiva é essencial para o SessionProvider funcionar

import { SessionProvider } from 'next-auth/react';
import React from 'react';

// Definimos o tipo das props para aceitar 'children'
type Props = {
  children: React.ReactNode;
};

// Este é um componente simples que apenas renderiza o SessionProvider
// envolvendo os 'children' que são passados para ele.
export default function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}