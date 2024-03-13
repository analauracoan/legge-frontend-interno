import * as React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Login from "../../scenes/login";

export const RequireAuth = ({ children }) => {

    const auth = useContext(AuthContext)

    if(!auth.usuario && !auth.authenticated) {
        return <Login />;
    }

    return children;
}