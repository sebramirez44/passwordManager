//quiero que authContext contenga el username, userId
// {
//     username: string,
//     userId: string
// }
//por ahora probar asi a ver si funciona bien el context, luego cambiar el type
//incluir sesion de axios aqui para autenticacion con interceptors para obtener nueva access token
"use client"
import { axiosInstance } from "@/app/lib/axiosInstance";
import { useRouter } from "next/navigation";
import {createContext, useState, useEffect, useRef} from "react";

interface UserData {
    username: string;
    userid: string;
};

export const AuthContext = createContext<UserData | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const userRef = useRef<UserData | null>(null);
    //en vez de useState que user sea useRef?
    const router = useRouter();
    const requestRef = useRef(false);

    //el useEffect orre dos vees?
    useEffect(() => {
        //revisar la cookie para encontrar la refresh_token X no sse puede
        //pero, si hay un error sobre la refresh token en axios redirigimos al usuario.
        //revisar localStorage?? para la access token
        //si no hay access token, obtenerla del API, llamar refresh
        //no hacer el ultimo de estos, revisar en axios session si hubo un error
        //router, user son dependencies
        //una de las dependencias esta cambiando en cada re-render, probablemente user
        //no entiendo que quiero hacer
        
        const checkAuthStatus = async () => {
            if (requestRef.current) return;
            requestRef.current = true;
                try {
                    //primero checar que sea la primera vez obteniendo access token o nah, checar si existe ylc
                    
                    userRef.current = {username: "seb", userid: "123"};
                    
                    //enviar informacion de esta cuenta al tener la jwt?
                    const accessToken = await axiosInstance.get('/Account', {withCredentials: true});
                    //en /refresh, enviar el username y el userid del usuario 
                    console.log(accessToken.data);
                    setLoading(false);
                    // console.log(user);
                    if (!userRef.current) {
                        router.push('/sign-in');
                    }
                    requestRef.current = true;

                } catch(error) {
                    router.push('/sign-in');
                    console.log(error);
                }
        };
        checkAuthStatus();
    }, [router]);
    //aqui se puede incluir un loading if (!isAuthenticated)
    if (!loading && userRef.current) {
        return (
            <AuthContext.Provider value={userRef.current}>
                {children}
            </AuthContext.Provider>
        );
    }

}