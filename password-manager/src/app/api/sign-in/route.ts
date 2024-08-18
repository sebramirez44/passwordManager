import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import bcrypt from "bcrypt";
//cambiar por jose library
import jwt from "jsonwebtoken";
import {cookies} from 'next/headers';

export async function POST(req: Request) {
    try {
        //obtener el username y password de aqui, checar que username exista en DB
        //checar que password hasheado exista en DB
        //enviar jwt
        const {email, password} = await req.json();
        const foundUser = await db.user.findFirst({
            where: {
                email: email
            }
        });
        if (!foundUser) {
            return new NextResponse("Incorrect email or password", {status: 405});
        } else {
            //checar si la password del usuario encontrado y la password que me dieron es same shit
            if (await bcrypt.compare(password, foundUser.password)) {
                //return jwt
                //crear access token y refresh token y enviarlas al usuario, agregar refresh_token a la base de datos
                const accessToken = jwt.sign(
                    {"email": foundUser.email},
                    process.env.ACCESS_TOKEN_SECRET as string,
                    {expiresIn: '30s'} //cambiar este tiempo para produccion
                )
                const refreshToken = jwt.sign(
                    {"email": foundUser.email},
                    process.env.REFRESH_TOKEN_SECRET as string,
                    {expiresIn: '1d'} //maybe tambien cambiar este idk cuanto es lo normal
                )
                //agregar la refreshToken al usuario en la db
                db.user.update({
                    where: {email: foundUser.email},
                    data: {
                        refresh_token: refreshToken
                    }
                });
                
                //enviar refresh token como http cookie,
                //enviar access_token como json
                cookies().set({name: 'jwt', value: refreshToken, httpOnly: true, maxAge: 24 * 60 * 60 * 100}); //asumiendo que maxAge es en miliseconds
                return NextResponse.json(accessToken);
            } else {
                return new NextResponse("Incorrect email or password", {status: 405});
            }
        }
    } catch(error) {
        console.log(error);
        return new NextResponse("Internal Error", {status: 500})
    }
}