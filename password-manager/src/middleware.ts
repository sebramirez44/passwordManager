//middleware para validar que access token sea valida y correcta
//en authorization Header es donde deberia de estar la access token
//definir las rutas que no deberian ser protegidas y no hacer ese middleware en esas
import {NextResponse, type NextRequest} from 'next/server';
//cambiar por jose library
import * as jose from 'jose';

export async function middleware(req: NextRequest) {
    //revisar que la ruta no sea /sign-in, /sign-up
    //ademas revisar que comience con API creo.
    if (!(req.nextUrl.pathname.startsWith('/api/sign-in') || req.nextUrl.pathname.startsWith('/api/sign-up') || req.nextUrl.pathname.startsWith('/api/refresh')) && req.nextUrl.pathname.startsWith('/api')) {
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

        try {
            const {payload: jwtData} = await jose.jwtVerify(
                token, new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET as string)
            );
            //jwtData.uid => 'your-data'
            console.log("jwt verified man")
            return NextResponse.next();
        } catch(error) {
            console.log(error);
            //jwt validfation failed
            return new NextResponse("error", {status: 403});
        }

        
    } else {
        return NextResponse.next();
    }


}