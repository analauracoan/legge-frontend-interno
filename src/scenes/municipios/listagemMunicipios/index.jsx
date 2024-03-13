import * as React from "react";

import { useState, useMemo, useEffect, useContext } from "react";
import { createTheme } from "@mui/material";
import { themeSettings } from "../../../theme";
import { useApi } from "../../../hooks/useApi";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ListagemMunicipios = () => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;

    const api = useApi();
    const auth = useContext(AuthContext);
    const token = auth.cookies.get('authToken');

    const [data, setData] = useState('');


    return (
        <Box m="0 20px">
            <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'}>
            <Header titulo="Municípios" show={false} espaco={"25px"} />
            <Button variant="contained" sx={{height: '50%'}}>
                <Link to={'/municipios/cadastro'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    Cadastrar novo município
                </Link>
            </Button>
            </Box>
        </Box>
    )
}
export default ListagemMunicipios;