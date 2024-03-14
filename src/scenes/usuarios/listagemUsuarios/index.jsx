import * as React from "react";
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
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";

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

    const tamanho = data?.length;

    for (let i = 0; i < tamanho; i++) {
      const nome = data[i].nome;
      const iduu = data[i].iduu;
      const objeto = {iduu: iduu, nome: `${nome}`};
      novosDados.push(objeto);
    };

    const deleteUser = (iduu) => {
        api.delete(`interno/administracao/usuarios/${iduu}`, token)
        .then(response => 
            {if(response.status !== 204) 
                {toast.error(response.mensagem)}
            else if(response.status === 204) 
                {toast.success('Usuário deletado com sucesso!');
                api.get('interno/administracao/usuarios', token).then(response => setData(response.resultados));
                }
            else {toast(response)}
        })
        .catch(error => toast.error(error));
    }

    const columns = [
        { field: "nome", headerName: "Nome Completo", width: 800 },
        { 
            field: "acoes", 
            headerName: "Ações", 
            width: 200,
            renderCell: (params) => (
                <div>
                    <Link to={`/usuarios/edicao/${params.row.iduu}`}>
                        <IconButton aria-label="editar">
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="apagar" onClick={() => deleteUser(params.row.iduu)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
              ),
        },
    ]

    return (

        <Box m="0 20px" >
            <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'}>
                <Header titulo="Usuários" show={false} espaco={"25px"} />
                <Link to={'cadastro'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button variant="contained" sx={{height: '50%'}}>
                        Cadastrar novo usuário
                    </Button>
                </Link>
            </Box>
            <Box sx={{ "& .MuiDataGrid-columnHeaders": {backgroundColor: theme.palette.neutral.main} }}>
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
                    autoHeight
                />
            </Box>
        </Box>

    )
}

export default ListagemUsuarios;
