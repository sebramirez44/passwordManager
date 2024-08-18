import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
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
        const foundUser = await db.user.findFirst({
            where: {
                email: email
            }
        });
        if (foundUser) {
            //buscar que status deberia ser para que el user trato de tener mail existente
            return new NextResponse("Account exists", {status: 405});
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await db.user.create({
                data: {
                    email: email,
                    password: hashedPassword
                }
            });

            return NextResponse.json(result);
        }

    } catch(error) {
        console.log(error);
        return new NextResponse("Internal Error", {status: 500});
    }
}