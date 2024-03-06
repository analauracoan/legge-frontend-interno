import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo_escrita_padrao.svg";
import * as yup from "yup";
import { Formik } from 'formik';
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import md5 from 'md5';
import Dashboard from '../dashboard';
import CheckIcon from '@mui/icons-material/Check';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#025464',
            dark: '#024A58',
        },
        secondary: {
            main: '#E57C23',
        },
        neutral: {
            main: '#D9D9D9',
        },
        background: {
            default: "#E4E4E4",
        },
        black: {
            main: '#000000',
        },
        white: {
            main: '#FFFFFF',
        }
    },
});

const initialValues = {
    login: "",
    senha: "",
}
  
const espacosRegex = /^[^\s\t]+$/;
const maiusculaRegex = /[A-Z]/;
const caractereEspRegex = /[!@#$%^&*(),.?":{}|<>]/;
const numeroRegex = /[0-9]/;
  
const loginSchema = yup.object().shape({
    login: yup.string()
        .required("Obrigatório")
        .max(100, "Deve ter 100 caracteres ou menos")
        .min(4, "Deve ter 3 caracteres ou mais")
        .matches(espacosRegex, "Não pode haver espaços em branco"),
    senha: yup.string()
        .required("Obrigatório")
        .max(100, "Deve ter 100 caracteres ou menos")
        .min(4, "Deve ter 3 caracteres ou mais"),
        // .matches(espacosRegex, "Não pode haver espaços em branco")
        // .matches(maiusculaRegex, "Deve ter ao menos uma letra maiúscula")
        // .matches(caractereEspRegex, "Deve ter ao menos um caractere especial")
        // .matches(numeroRegex, "Deve ter ao menos um número"),
})


function Login() {

    const [mostraSenha, setMostraSenha] = useState(false);
    const handleClickMostraSenha = () => setMostraSenha((show) => !show);
    const handleMouseDownSenha = (event) => {
        event.preventDefault();
    };

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = async (values) => {
        if(values.login && values.senha) {
            const isLogged = await auth.signin(values.login, values.senha);
            if(isLogged){
                navigate('/dashboard');
                window.location.href = window.location.href;
            }
        }
    }

    return (

        <ThemeProvider theme={defaultTheme}>
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CssBaseline />
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'white.main',
                borderRadius: '10px',
                boxShadow: '0 0 15px #D9D9D9',
                width: '30%',
                padding: '2%'
            }}
            >
                <img
                    src={Logo}
                    alt="Logotipo da empresa Legge"
                    style={{ width: '25%', padding: '1rem' }}
                />
                <Typography component="h1" variant="h5">
                    Acesse com seu login
                </Typography>
                <Formik
                    fullWidth
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                >
                    {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit} style={{width: '100%'}}>
                            <Box
                                mt={3}
                                width='100%'
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box m={1}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Login"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.login}
                                        name="login"
                                        error={!!touched.login && !!errors.login}
                                        helperText={touched.login && errors.login}
                                    />
                                </Box>
                                <Box m={1}>
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type={mostraSenha ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickMostraSenha}
                                                    onMouseDown={handleMouseDownSenha}
                                                    edge="end"
                                                >
                                                    {mostraSenha ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                                </InputAdornment>
                                            ),
                                            }}
                                        label="Senha"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.senha}
                                        name="senha"
                                        error={!!touched.senha && !!errors.senha}
                                        helperText={touched.senha && errors.senha}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="center" m={2}>
                                    <Button fullWidth type="submit" color="secondary" variant="contained">
                                        Login
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </div>
        </ThemeProvider>
    );
}

export default Login;