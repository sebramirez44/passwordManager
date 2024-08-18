import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
//remove prisma from this
import { db } from "@/app/lib/db";

export async function POST(req: Request) {
    try {
        //obtener email y password del request
        //si email ya existe en DB regresar error
        //hashing de la contraseña con bcrypt
        //introducir usuario a la base de datos
        //TODO:
        //validation para passwords y username
        const {email, password} = await req.json();
        //buscar username en db, si ya existe regresar error
        if (!email || !password) {
            return new NextResponse("Incomplete data, include email and password", {status: 405})
        }
        //ejecutar query para encontrar user que tiene el email email
        // const foundUser = await db.execute("SELECT * FROM User WHERE email=")
        // const foundUser = await db.execute(`SELECT * FROM User WHERE email=${email}`);
        console.log("before foundUser");
        const foundUser = await db.getUserByEmail(email);
        console.log("after foundUser");
        // const foundUser = await db.user.findFirst({
        //     where: {
        //         email: email
        //     }
        // });
        //creo que cambiar el return del api a foundUser.data.results[0]/response.result.rows pero idk, igual tener un fail safe o algo por si no es valida la data
        console.log(foundUser.data.results[0].response.result.rows.length);
        if (foundUser.data.results[0].response.result.rows.length) {
            //buscar que status deberia ser para que el user trato de tener mail existente
            return new NextResponse("Account exists", {status: 405});
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("before result");

            const result = db.insertUser(email, hashedPassword);

            return NextResponse.json(result);
        }

    } catch(error) {
        // console.log(error);
        // console.log("fucking error man");
        return new NextResponse("Internal Error", {status: 500});
    }
}