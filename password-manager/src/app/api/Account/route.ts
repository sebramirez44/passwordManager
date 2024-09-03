//obtener la cookie de la refresh token, checar si existe en la db, si existe regresar el usuario de la refresh token
//refactor esto a no incluir una refresh token, pero ahi no se como 
//protejo mis rutas bien?
//creo que solucion es revisar con access token, obtener el userid asi de la token
//y buscarlo en la base de datos, client-side hacer catch para errores de autenticacion
//y corregirlos haciendo /refresh
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/app/lib/db";
import * as jose from 'jose';

export async function GET(req: Request) {
    try {
        const refreshToken = cookies().get("jwt");
        if (!refreshToken) {
            return new NextResponse("refresh token missing", {status: 401});
        }
        const foundUser = await db.findUserWithRefresh(refreshToken.value);
        const foundUserData = foundUser.data.results[0].response.result.rows;

        if (!foundUserData.length) {
            return new NextResponse("Invalid refresh token", {status: 403});
        }

        try {
            const {payload: jwtData} = await jose.jwtVerify(
                refreshToken.value, new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET as string)
            );
            return NextResponse.json({username: foundUserData[0][1], userid: foundUserData[0][0]});
        } catch(error) {
            return new NextResponse("jwt not verified", {status: 403});
        }

    } catch(error) {
        return new NextResponse("server error", {status: 500});
    }

}