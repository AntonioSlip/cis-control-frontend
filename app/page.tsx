import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-black-50">
           {/* Logo no canto superior esquerdo */}
      <div className="absolute top-6 left-6">
        <Image
          src="/logo.png" // caminho dentro da pasta public
          alt="Logo da empresa"
          width={120}     // ajuste o tamanho conforme necessário
          height={40}
          priority
        />
      </div>
     <LoginForm/>
    </main>
  );
}
