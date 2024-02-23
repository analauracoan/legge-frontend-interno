import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { themeSettings } from "../../theme";
import { useMemo } from "react";
import { createTheme } from "@mui/material";
import { mockNormas } from '../../data/mockNormas'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Header from "../../components/Header";

const Listagem = () => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;

    const goToDetails = () => {

    }


    const columns = [
        { field: "tipo", headerName: "Tipo", flex: 1, cellClassName: "name-column--cell" },
        { field: "numero", headerName: "Numeração" },
        { field: "ano", headerName: "Ano" },
        { field: "municipio", headerName: "Município", flex: 1 },
        { field: "ementa", headerName: "Ementa", flex: 2 },
        { field: "dataCompleta", headerName: "Data da Sanção" },
        {  
            field: "detalhes", 
            headerName: "Detalhes", 
            renderCell: ({ row: { detalhes } }) => { 
                return ( 
                    <Box backgroundColor='primary.main' sx={{borderRadius: "5px"}}>
                        <Tooltip 
                            title={"Detalhes"}
                            arrow
                        >
                            <IconButton onClick={goToDetails}>
                                <MoreHorizOutlinedIcon color='neutral' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )},
        }
    ]

    return (

        <Box ml="20px">
            <Header title="Listagem de normas" />

            <Box m="40px 20px 0 0" height="80vh">
                <DataGrid
                    rows={mockNormas}
                    columns={columns}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            borderColor: 'neutral.main',
                        },
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'neutral.main',
                        },
                    }}
                >

                </DataGrid>
            </Box>
        </Box>

    )
}

export default Listagem;