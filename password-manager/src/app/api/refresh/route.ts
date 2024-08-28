//importar jwt
//importar db
//cookies (idk si hay que importar?)
//encontrar al user con la refreshToken
//verificar la refreshToken jwt.verify
//creo que en el video obtiene req.user de haber hecho sign-in anteriormente
//cambiar esto a hooks
import { NextResponse } from "next/server";
//remove prisma from db
import { db } from "@/app/lib/db";
//cambiar por jose library
import * as jose from 'jose';
import {cookies} from "next/headers";


export async function GET(req: Request) {
    try {
        const refreshToken = cookies().get('jwt');
        if (!refreshToken) {
            return new NextResponse("Refresh token missing", {status: 401});
        }
        //encontrar user en database utilizando refresh_token
        const foundUser = await db.findUserWithRefresh(refreshToken.value);
        const foundUserData = foundUser.data.results[0].response.result.rows;

        if (!foundUserData.length) {
            return new NextResponse("Invalid refresh token", {status: 403});
        }
        console.log("after finding user");

        //TODO: cambiar refreshToken.value a obtener el valor de la base de datos
        try {
            const {payload: jwtData} = await jose.jwtVerify(
                foundUserData[0][3].value, new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET as string)
            );
            //hacer una nueva access token y hacerle return por json
            const accessToken = await new jose.SignJWT({"email": foundUserData[0][1].value})
                .setProtectedHeader({alg: 'HS256'})
                .setIssuedAt()
                .setExpirationTime('30s')
                .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET as string));

            return NextResponse.json({accessToken});
            // return NextResponse.json({jwt: accessToken, email: foundUserData[0][1].value, user_id: foundUserData[0][0].value});

        } catch(error) {
            console.log(error);
            console.log("jwt not verified");
            return new NextResponse("invalid token", {status: 403});
        }

        
    } catch(error) {
        console.log(error);
        console.log("there was an error");
        return new NextResponse("some error", {status: 500});
    }
}