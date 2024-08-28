import Image from "next/image";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "@/components/contexts/authContext";
import PasswordManagerIconSecond from "@/icons/lock-second";
import SearchComponent from "@/components/search";
import Avatar from "@/components/avatar";
export default function Home() {
  console.log("hello");
  return (
    <AuthProvider>
      <div className="bg-[#EF233C] p-4 pt-3 flex flex-row justify-between px-10 items-center">
        {/* Cargar el SVG del lock, luego el search, luego el boton del perfil y ya es todo */}
        <PasswordManagerIconSecond size={5} />
        <SearchComponent />
        <Avatar/>
      </div>
    </AuthProvider>
  );
}
