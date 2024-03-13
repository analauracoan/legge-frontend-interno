import * as React from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useApi } from "../../hooks/useApi";
import md5 from "md5";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

export const AuthProvider = ({ children }) => {
    const api = useApi();
    const [authenticated, setAuthenticated] = useState(false);
    const cookies = new Cookies(null, { path: '/' });

    const signin = async (login, senha) => {
        senha = md5(senha)
        const data = await api.signin(login, senha);
        if(data.usuario?.nome && data.autenticacao?.token) {
            setUsuario(data.usuario?.nome);
            setToken(data.autenticacao?.token);
            toast.success('Login efetuado com sucesso!');
            return true;
        }
        toast.error(data.mensagem);
        return false;
    }

    const signout = async () => {
        setUsuario('');
        setToken('');
        await api.logout();
    }

    const setToken = (token) => {
        cookies.set('authToken', token);
    };

    const setUsuario = (usuario) => {
        cookies.set('usuario', usuario);
    }

    const token = cookies.get('authToken');

    useEffect(() => {
        if(token) {
            setAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ cookies, signin, signout, authenticated }}>
            {children}
        </AuthContext.Provider>
    )
}