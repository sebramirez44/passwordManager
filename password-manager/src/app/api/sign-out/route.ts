//elminar la refresh_token del usuario de la db
//ocupo el userid, y la jwt token de autenticacion para verificar que el usuario 
//que hizo el request es el que es dueño de la información
import {headers} from "next/headers"
import { NextResponse } from "next/server";
import * as jose from 'jose';

//obtener el valor de la jwt en el header, obtener el valor de 
export async function DELETE() {
    //obtener la token del header de authorization?
    const headersList = headers()
    const authToken = headersList.get('Authorization');

    //obtener la token como la obtuve antes idk
    if (!authToken) {
        return new NextResponse("No authentication header", {status: 405});
    //     return;
    }
    const token = authToken.split(' ')[1];

    try {
        const {payload: jwtData} = await jose.jwtVerify(
            token, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET as string)
        );
        //jwtData.uid => 'your-data'
        console.log("json web token text: ");
        console.log(jwtData);
        //buscar el usuario con esta refresh token
        //si el userid de la refresh token es la misma que la del usuario encontrado
        //permitir este pedo y eliminar la refresh token
        //si nah le digo que fuck off al motherfucker user man

        

        return NextResponse.json(token);
    } catch(error) {
        console.log(error);
        //jwt validfation failed
        return new NextResponse("error", {status: 403});
    }

}