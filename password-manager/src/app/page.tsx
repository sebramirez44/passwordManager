import Image from "next/image";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "@/components/contexts/authContext";
import {cookies} from "next/headers";

export default function Home() {
  console.log("hello");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* incluir el Authprovider en todas las paginas que quiero proteger ig */}
      <AuthProvider>
        <h1>test</h1>
        <h1>AAAAAAAAAAAA</h1>
      </AuthProvider>
    </main>
  );
}
