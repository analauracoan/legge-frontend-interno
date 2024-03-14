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
import { GridToolbar } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from "react-toastify";

const ListagemMunicipios = () => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;

    const api = useApi();
    const auth = useContext(AuthContext);
    const token = auth.cookies.get('authToken');
    const [data, setData] = useState('');
    const novosDados = [];
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setEstados(data))
    }, []);

    useEffect(() => {    
        api.get('interno/administracao/municipios', token).then(response => setData(response.resultados));
    }, []);

    console.log(data);

    const tamanho = data?.length;

    for (let i = 0; i < tamanho; i++) {
      const nome = data[i].nome;
      const iduu = data[i].iduu;
      const uf = data[i].uf;
      const ufAPI = estados.find((estado) => (estado.sigla === uf))
      const nomeUf = ufAPI.nome
      const objeto = {iduu: iduu, nome: nome, uf: `${nomeUf} - ${uf}`}
      novosDados.push(objeto)
    };

    const deleteUser = (iduu) => {
        api.delete(`interno/administracao/municipios/${iduu}`, token)
        .then(response => 
            {if(response.status !== 204) 
                {toast.error(response.mensagem)}
            else if(response.status === 204) 
                {toast.success('Município deletado com sucesso!');
                api.get('interno/administracao/municipios', token).then(response => setData(response.resultados));
                }
            else {toast(response)}
        })
        .catch(error => toast.error(error));
    }

    const columns = [
        { field: "nome", headerName: "Município", width: 425},
        { field: "uf", headerName: "Unidade Federativa", width: 425},
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
                    <IconButton aria-label="apagar" onClick={() => deleteUser(params.row.iduu)} > 
                        <DeleteIcon />
                    </IconButton>
                </div>
              ),
        },
    ]

    return (
        <Box m="0 20px">
            <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'}>
                <Header titulo="Municípios" show={false} espaco={"25px"} />
                <Link to={'/municipios/cadastro'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button variant="contained" sx={{height: '50%'}}>
                        Cadastrar novo município
                    </Button>
                </Link>
            </Box>
            <Box sx={{ "& .MuiDataGrid-columnHeaders": {backgroundColor: theme.palette.neutral.main} }}>
                <DataGrid
                    rows={novosDados}
                    getRowId={(row) => row.nome}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    disableRowSelectionOnClick
                    autoHeight
                    initialState={{
                        pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                        },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>
        </Box>
    )
}
export default ListagemMunicipios;