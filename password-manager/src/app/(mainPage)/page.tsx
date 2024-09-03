import { LockKeyhole } from "lucide-react";
import { BookUser } from "lucide-react";
import { Star } from "lucide-react";
import { Trash2 } from "lucide-react";
export default function Home() {
  return (
    <div className="flex">
      {/*  */}
      <div className="w-3/12 m-4 shadow">
        <div className="bg-[#EF233C] p-4 rounded-t">
          <h1 className="text-white">Main Menu</h1>
        </div>
        <div className="flex flex-row p-4">
          <LockKeyhole/>
          <h2>Passwords</h2>
        </div>
        <div className="flex flex-row p-4">
          <BookUser/>
          <h2>Websites</h2>
        </div>
        <div className="flex flex-row p-4">
          <Star/>
          <h2>Favorites</h2>
        </div>
        <div className="flex flex-row p-4">
          <Trash2/>
          <h2>Trash</h2>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}
