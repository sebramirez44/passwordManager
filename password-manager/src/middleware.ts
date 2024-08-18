//middleware para validar que access token sea valida y correcta
//en authorization Header es donde deberia de estar la access token
//definir las rutas que no deberian ser protegidas y no hacer ese middleware en esas
import {NextResponse, type NextRequest} from 'next/server';
//cambiar por jose library
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
    //revisar que la ruta no sea /sign-in, /sign-up
    //ademas revisar que comience con API creo.
    if (!(req.nextUrl.pathname.startsWith('/api/sign-in') || req.nextUrl.pathname.startsWith('/api/sign-up')) && req.nextUrl.pathname.startsWith('/api')) {
        //revisar la JWT que se envio por el client
        //Buscar el authHeader, si no existe error
        //Sacar la parte que es la token del authHeader, despues de Bearer
        //Revisar esa token si es valida, si es valida seguir si no es valida error
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return new NextResponse("No authentication header", {status: 405});
        //     return;
        }
        const token = authHeader.split(' ')[1];
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlYnJhbWlyZXpjb3JkZXJvQGdtYWlsLmNvbSIsImlhdCI6MTcyMzc4MjMwMSwiZXhwIjoxNzIzODY4NzAxfQ.-VRAEqbgRwJAkcJwngQxeiRMd2PAQX1qt37g7TyZxbo"
        //this is the issue

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
            return NextResponse.next();
        } catch(error) {
            console.log("penis");
            console.log(error);
            return new NextResponse("invalid jwt", {status: 405});
        }
        // jwt.verify(
        //     token,
        //     process.env.ACCESS_TOKEN_SECRET as string,
        //     (err, decoded) => {
        //         if (err) return new NextResponse("Invalid jwt", {status: 405});
        //         // en el video hace esto pero yo no puedo cambiar el request body, maybe agregarlo a un hook para obtener
        //         // req.email = decoded.username; no
        //         // se porque quiere que haga esto
        //         return NextResponse.next();
        //     }
        // )

        
        console.log("protected route");
    } else {
        return NextResponse.next();
    }


}