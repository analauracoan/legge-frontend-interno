import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useContext } from "react";
import { Typography, createTheme } from "@mui/material";
import { themeSettings } from "../../../theme";
import { useApi } from "../../../hooks/useApi";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Header from "../../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import md5 from "md5";
import { toast } from "react-toastify";

const espacosRegex = /^[^\s\t]+$/;
const maiusculaRegex = /[A-Z]/;
const caractereEspRegex = /[!@#$%^&*(),.?":{}|<>]/;
const numeroRegex = /[0-9]/;

const cadastroSchema = yup.object().shape({
    nome: yup.string()
      .max(200, "Deve ter 200 caracteres ou menos")
      .min(4, "Deve ter 3 caracteres ou mais"),
    autenticacao_login: yup.string()
      .max(100, "Deve ter 100 caracteres ou menos")
      .min(4, "Deve ter 3 caracteres ou mais")
      .matches(espacosRegex, "Não pode haver espaços em branco"),
    autenticacao_senha: yup.string()
      .max(100, "Deve ter 100 caracteres ou menos")
      .min(4, "Deve ter 3 caracteres ou mais")
      .matches(espacosRegex, "Não pode haver espaços em branco")
      .matches(maiusculaRegex, "Deve ter ao menos uma letra maiúscula")
      .matches(caractereEspRegex, "Deve ter ao menos um caractere especial")
      .matches(numeroRegex, "Deve ter ao menos um número"),
})

const EditarUsuario = () => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;

    const api = useApi();
    const auth = useContext(AuthContext);
    const token = auth.cookies.get('authToken');

    const [toggle, setToggle] = useState(false);
    const [dados, setDados] = useState({
        nome: '',
        autenticacao_login: '',
        autenticacao_senha: ''
    });

    const { userIduu } = useParams();
    const iduu = userIduu;

    useEffect(() => {
        api.get(`interno/administracao/usuarios/${iduu}`, token)
            .then(response => 
                {setDados({
                    nome: response.nome,
                    autenticacao_login: response.autenticacao_login,
                    autenticacao_senha: ''
                })});
    }, [iduu, token]);

    const createPatch = (values, { resetForm }) => {
        const envio = {
            nome: values.nome,
            autenticacao_login: values.autenticacao_login,
            ...(toggle ? { autenticacao_senha: md5(values.autenticacao_senha) } : {})
        }

        api.patch(`interno/administracao/usuarios/${iduu}`, envio, token)
            .then(response => 
                {if(response.status !== 204) 
                    {toast.error(response.mensagem)}
                else if(response.status === 204) 
                    {toast.success('Usuário alterado com sucesso!');
                    resetForm({ values: '' })
                    api.get(`interno/administracao/usuarios/${iduu}`, token)
                    .then(response => 
                        {setDados({
                            nome: response.nome,
                            autenticacao_login: response.autenticacao_login,
                            autenticacao_senha: ''
                        })});
                    }
                else {toast(response)}})
            .catch(error => toast.error(error));
    }

    return (
        <Box m="30px">
            <Header titulo="Editar usuário" show={false} espaco={"25px"} />
            <Typography pb={4} variant="h4"><strong>Usuário: </strong>{dados.nome}</Typography>
            <Formik
                onSubmit={createPatch}
                initialValues={{
                    nome: dados.nome,
                    autenticacao_login: dados.autenticacao_login,
                    autenticacao_senha: dados.autenticacao_senha,
                    toggle: toggle,
                }}
                validationSchema={cadastroSchema}
                enableReinitialize={true}
            >
                {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                validateOnChange
                }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Nome Completo"
                            onBlur={handleBlur}
                            name="nome"
                            onChange={handleChange}
                            error={!!touched.nome && !!errors.nome}
                            helperText={touched.nome && errors.nome}
                            sx={{ gridColumn: "span 2" }}
                            value={values.nome}
                        />
                        <TextField
                            variant="filled"
                            type="text"
                            label="Login"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="autenticacao_login"
                            error={!!touched.autenticacao_login && !!errors.autenticacao_login}
                            helperText={touched.autenticacao_login && errors.autenticacao_login}
                            sx={{ gridColumn: "span 1" }}
                            value={values.autenticacao_login}
                        />
                        <label>
                            <Checkbox checked={toggle} onChange={e => {handleChange(e);setToggle(!toggle);}} name="senha" />
                            Deseja trocar a senha? {toggle ? "Sim" : "Não"}
                        </label>
                        {toggle && <TextField
                            variant="filled"
                            type="text"
                            label="Senha"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="autenticacao_senha"
                            error={!!touched.autenticacao_senha && !!errors.autenticacao_senha}
                            helperText={touched.autenticacao_senha && errors.autenticacao_senha}
                            sx={{ gridColumn: "span 1" }}
                            value={values.autenticacao_senha}
                        />
                        }
                    
                        <Box display="flex" justifyContent="start" sx={{ gridColumn: "span 2" }}>
                            <Button type="submit" color="secondary" variant="contained">
                                Alterar dados de usuário
                            </Button>
                        </Box>
                    </Box>
                </form>
                )}
            </Formik>
        </Box>
    )

}
export default EditarUsuario;