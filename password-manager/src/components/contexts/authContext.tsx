import {useContext, createContext, useState} from "react";

const AuthContext = createContext<boolean>(false);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return <AuthContext.Provider value={isAuthenticated}>{children}</AuthContext.Provider>;
}