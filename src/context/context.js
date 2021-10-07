import { useState, createContext } from 'react';

const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [logado, setLogado] = useState(!!localStorage.getItem('DelphiReactToken'));

    return (
        <AuthContext.Provider value={{ logado, setLogado }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };