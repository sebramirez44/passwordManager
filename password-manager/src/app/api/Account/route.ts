//obtener la cookie de la refresh token, checar si existe en la db, si existe regresar el usuario de la refresh token
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