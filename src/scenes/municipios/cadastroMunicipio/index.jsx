import * as React from "react";
import Header from "../../../components/Header";
import { Box, TextField, Button } from "@mui/material";
import { Formik } from 'formik';
import md5 from "md5";
import * as yup from "yup";
import { useApi } from "../../../hooks/useApi";
import { useState, useEffect, useMemo } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { toast } from "react-toastify";
import { Typography, createTheme } from "@mui/material";
import { themeSettings } from "../../../theme";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const cadastroSchema = yup.object().shape({
    uf: yup.string()
      .required(),
    nome: yup.string()
      .required()
})

const CadastroMunicipio = () => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;

    const api = useApi();
    const auth = useContext(AuthContext);
    const token = auth.cookies.get('authToken');

    const [estados, setEstados] = useState([]);
    const [selectedEstado, setSelectedEstado] = useState('');
    const [cidades, setCidades] = useState([]);
    const [siglaCidade, setSiglaCidade] = useState('');
    const [selectedCidade, setSelectedCidade] = useState('');

    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setEstados(data))
    }, []);

    const getCidades = (uf) => {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => setCidades(data))
    }

    const createPost = (estado, municipio) => {
        const envio = {
            uf: estado,
            nome: municipio
        }
        api.post('interno/administracao/municipios', envio, token)
            .then(response => 
                {if(response.mensagem) 
                    {toast.error(response.mensagem)}
                else if(response.iduu) 
                    {toast.success('Município cadastrado com sucesso!');
                    setSelectedEstado(''); setSiglaCidade('')}
                else {toast(response)}})
            .catch(error => toast.error(error));
    };

    return (
        <Box m="0 20px">
            <Header titulo="Cadastro de Município" show={false} espaco={"25px"} />
            <Formik
                validationSchema={cadastroSchema}
                enableReinitialize={true}
            >
                <form id="municipios" onSubmit={(e) => {e.preventDefault(); createPost(selectedEstado, selectedCidade)}}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                    >
                        <FormControl>
                            <InputLabel id="uf-label">Unidade Federativa</InputLabel>
                            <Select
                                labelId="uf-label"
                                id="uf"
                                value={selectedEstado}
                                label="Unidade Federativa"
                                onChange={(event) => {
                                    setSelectedEstado(event.target.value);
                                    getCidades(event.target.value);
                                }}
                            >
                                {estados.map(estado => (
                                <MenuItem value={estado.sigla} key={estado.id}>{estado.nome}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="municipio-label">Município</InputLabel>
                            <Select
                                labelId="municipio-label"
                                id="municipio"
                                value={siglaCidade}
                                label="Município"
                                onChange={(event) => {
                                    const selectedCity = cidades.find(cidade => (cidade.id === event.target.value));
                                    setSelectedCidade(selectedCity.nome);
                                    setSiglaCidade(selectedCity.id)
                                }}                       
                            >
                                {cidades.map(cidade => (
                                <MenuItem value={cidade.id} key={cidade.id}>{cidade.nome}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box display="flex" justifyContent="start" sx={{ gridColumn: "span 2" }}>
                            <Button type="submit" form="municipios" color="secondary" variant="contained">
                                Criar novo município
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Formik>
        </Box>
    )
}
export default CadastroMunicipio;