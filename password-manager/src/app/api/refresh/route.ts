//importar jwt
//importar db
//cookies (idk si hay que importar?)
//encontrar al user con la refreshToken
//verificar la refreshToken jwt.verify
//creo que en el video obtiene req.user de haber hecho sign-in anteriormente
//cambiar esto a hooks
import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
//cambiar por jose library
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

interface JwtPayload {
    email: string;
}

export async function GET(req: Request) {
    try {
        // const refreshToken = cookies().get('jwt');
        // if (!refreshToken) {
            // return new NextResponse("Refresh token missing", {status: 401});
        // }
        //encontrar user en database utilizando refresh_token
        // const foundUser = await db.user.findFirst({
        //     where: {
        //         refresh_token: refreshToken.value
        //     }
        // })

        // if (!foundUser) {
            // return new NextResponse("Invalid refresh token", {status: 403});
        // }

        // jwt.verify(
        //     refreshToken.value,
        //     process.env.REFRESH_TOKEN_SECRET as string,
        //     //arreglar el typing the decoded, por ahora me vale chile alch
        //     (err, decoded:any) => {
        //         if (err || !decoded || foundUser.email !== decoded.email) return new NextResponse("error validating refresh token", {status: 403});
        //         const accessToken = jwt.sign(
        //             {"email": decoded.email},
        //             process.env.ACCESS_TOKEN_SECRET as string,
        //             {expiresIn: '30s'}
        //         );
        //         // return NextResponse.json({accessToken});
        //     }
        // )
        return new NextResponse("valid request", {status: 200});

        
    } catch(error) {
        // return new NextResponse("some error", {status: 500});

    }
}