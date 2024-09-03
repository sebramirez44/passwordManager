"use client"
import { LockKeyhole } from "lucide-react";
import { BookUser } from "lucide-react";
import { Star } from "lucide-react";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// maybe change the divs with onClick to be buttons in the future

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    return(
        <div className="w-1/5 m-4 shadow rounded-b">
            <div className="bg-[#EF233C] p-4 rounded-t">
                <h1 className="text-white font-bold">Main Menu</h1>
            </div>
            <button type="button" onClick={() => {router.push("/")}} className={`w-full flex flex-row p-4 cursor-pointer hover:bg-slate-100 transition ${pathname==="/" ? "bg-slate-100" : ""}`}>
                <LockKeyhole/>
                <h2 className="ml-2">Passwords</h2>
            </button>
            <button type="button" onClick={() => {router.push("/websites")}} className={`w-full flex flex-row p-4 cursor-pointer hover:bg-slate-100 transition ${pathname==="/websites" ? "bg-slate-100" : ""}`}>
                <BookUser/>
                <h2 className="ml-2">Websites</h2>
            </button>
            <button type="button" onClick={() => {router.push("/favorites")}} className={`w-full flex flex-row p-4 cursor-pointer hover:bg-slate-100 transition ${pathname==="/favorites" ? "bg-slate-100" : ""}`}>
                <Star/>
                <h2 className="ml-2">Favorites</h2>
            </button>
            <button type="button" onClick={() => {router.push("/trash")}} className={`w-full flex flex-row p-4 cursor-pointer hover:bg-slate-100 transition ${pathname==="/trash" ? "bg-slate-100" : ""}`}>
                <Trash2/>
                <h2 className="ml-2">Trash</h2>
            </button>
        </div>
    );
};