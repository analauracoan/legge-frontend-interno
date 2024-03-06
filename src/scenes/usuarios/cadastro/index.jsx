import Header from "../../../components/Header";
import { Box, TextField, Button } from "@mui/material";
import { Formik } from 'formik';
import md5 from "md5";
import * as yup from "yup";
import { useApi } from "../../../hooks/useApi";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { toast } from "react-toastify";

const initialValues = {
  nome: "",
  autenticacao_login: "",
  autenticacao_senha: "",
}

const espacosRegex = /^[^\s\t]+$/;
const maiusculaRegex = /[A-Z]/;
const caractereEspRegex = /[!@#$%^&*(),.?":{}|<>]/;
const numeroRegex = /[0-9]/;

const cadastroSchema = yup.object().shape({
  nome: yup.string()
    .required("Obrigatório")
    .max(200, "Deve ter 200 caracteres ou menos")
    .min(4, "Deve ter 3 caracteres ou mais"),
  autenticacao_login: yup.string()
    .required("Obrigatório")
    .max(100, "Deve ter 100 caracteres ou menos")
    .min(4, "Deve ter 3 caracteres ou mais")
    .matches(espacosRegex, "Não pode haver espaços em branco"),
  autenticacao_senha: yup.string()
    .required("Obrigatório")
    .max(100, "Deve ter 100 caracteres ou menos")
    .min(4, "Deve ter 3 caracteres ou mais")
    .matches(espacosRegex, "Não pode haver espaços em branco")
    .matches(maiusculaRegex, "Deve ter ao menos uma letra maiúscula")
    .matches(caractereEspRegex, "Deve ter ao menos um caractere especial")
    .matches(numeroRegex, "Deve ter ao menos um número"),
})

const Cadastro = () => {

  const api = useApi();
  const auth = useContext(AuthContext);
  const token = auth.cookies.get('authToken');

  const createPost = (values) => {
    const envio = {
      nome: values.nome,
      autenticacao_login: values.autenticacao_login,
      autenticacao_senha: md5(values.autenticacao_senha)
    }
    api.post('interno/administracao/usuarios', envio, token)
      .then(response => {if(response.mensagem) {toast.error(response.mensagem)} else if(response.iduu) {toast.success('Usuário cadastrado com sucesso!')} else {toast(response)}}).catch(error => toast.error(error))

  } 

  return (
    <Box m="0 20px">
        <Header titulo="Cadastro de Usuário" show={false} espaco={"25px"} />

      <Formik
        onSubmit={createPost}
        initialValues={initialValues}
        validationSchema={cadastroSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
                onChange={handleChange}
                value={values.nome}
                name="nome"
                error={!!touched.nome && !!errors.nome}
                helperText={touched.nome && errors.nome}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Login"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.autenticacao_login}
                name="autenticacao_login"
                error={!!touched.autenticacao_login && !!errors.autenticacao_login}
                helperText={touched.autenticacao_login && errors.autenticacao_login}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Senha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.autenticacao_senha}
                name="autenticacao_senha"
                error={!!touched.autenticacao_senha && !!errors.autenticacao_senha}
                helperText={touched.autenticacao_senha && errors.autenticacao_senha}
                sx={{ gridColumn: "span 1" }}
              />
              <Box display="flex" justifyContent="start" sx={{ gridColumn: "span 2" }}>
                <Button type="submit" color="secondary" variant="contained">
                  Criar novo usuário
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Cadastro;