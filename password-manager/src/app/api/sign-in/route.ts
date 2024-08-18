//TODO: data no siempre es lo que pienso que es aqui, mejorar codigo para que si request regresa algo inesperado aun funciona
//de alguna manera, aunque tire un error

//remove prisma from db
import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import bcrypt from "bcrypt";
import * as jose from 'jose';
import {cookies} from 'next/headers';

export async function POST(req: Request) {
    try {
        //obtener el username y password de aqui, checar que username exista en DB
        //checar que password hasheado exista en DB
        //enviar jwt
        const {email, password} = await req.json();
        const foundUser = await db.getUserByEmail(email);
        const foundUserData = foundUser.data.results[0].response.result.rows;

        if (!foundUserData.length) {
            return new NextResponse("Incorrect email or password", {status: 405});
        } else {
            if (await bcrypt.compare(password, foundUserData[0][2].value)) {

                const accessToken = await new jose.SignJWT({"email": foundUserData[0][1].value})
                    .setProtectedHeader({alg: 'HS256'})
                    .setIssuedAt()
                    .setExpirationTime('30s')
                    .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET as string));

                const refreshToken = await new jose.SignJWT({"email": foundUserData[0][1].value})
                    .setProtectedHeader({alg: 'HS256'})
                    .setIssuedAt()
                    .setExpirationTime('1d')
                    .sign(new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET as string));

                const updatedEmail = await db.updateRefreshToken(refreshToken, foundUserData[0][0].value)
                
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
