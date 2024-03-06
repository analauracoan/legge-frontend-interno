import { useState, useMemo, useEffect, useContext } from "react";
import { createTheme } from "@mui/material";
import { themeSettings } from "../../../theme";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import { useApi } from "../../../hooks/useApi";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { GridToolbar } from "@mui/x-data-grid";

const ListagemUsuarios = () => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;

    const api = useApi();
    const auth = useContext(AuthContext);
    const token = auth.cookies.get('authToken');

    const [data, setData] = useState('');
    const novosDados = [];

    useEffect(() => {    
        api.get('interno/administracao/usuarios', token).then(response => setData(response.resultados));
    }, []);

    console.log(data);
    const tamanho = data?.length;

    for (let i = 0; i < tamanho; i++) {
      const nome = data[i].nome;
      const objeto = {nome: `${nome}`};
      novosDados.push(objeto);
    };

    const rows = novosDados;

    console.log(novosDados);

    const columns = [
        { field: "nome", headerName: "Nome Completo", width: 500 },
    ]

    return (

        <Box m="0 20px">
            <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'}>
                <Header titulo="Usuários" show={false} espaco={"25px"} />
                <Button variant="contained" sx={{height: '50%'}}>
                    <Link to={'cadastro'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Cadastrar novo usuário
                    </Link>
                </Button>
            </Box>
            <Box sx={{ height: '70%', width: '100%', "& .MuiDataGrid-columnHeaders": {backgroundColor: theme.palette.neutral.main} }}>
                <DataGrid
                    rows={novosDados}
                    getRowId={(row) => row.nome}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                        },
                    }}
                    pageSizeOptions={[5]}
                    slots={{ toolbar: GridToolbar }}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>

    )
}

export default ListagemUsuarios;
