//quiero que authContext contenga el username, userId
// {
//     username: string,
//     userId: string
// }
//por ahora probar asi a ver si funciona bien el context, luego cambiar el type
"use client"
import { useRouter } from "next/navigation";
import {createContext, useState, useEffect} from "react";

export const AuthContext = createContext<boolean>(false);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const checkAuthStatus = async () => {
            setIsAuthenticated(false);
            if (!isAuthenticated) {
                router.push('/sign-in')
            }
        };
        checkAuthStatus();
    }, []);
    //aqui se puede incluir un loading if (!isAuthenticated)
    if (isAuthenticated) {
        return (
            <AuthContext.Provider value={isAuthenticated}>
                {children}
            </AuthContext.Provider>
        );
    }

}