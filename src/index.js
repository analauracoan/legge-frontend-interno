import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from "./scenes/dashboard";
import CadastroUsuario from "./scenes/usuarios/cadastroUsuario/index.jsx";
import ErrorPage from './scenes/errorPage';
import ListagemUsuarios from './scenes/usuarios/listagemUsuarios';
import { AuthProvider } from './contexts/Auth/AuthProvider.jsx';
import { RequireAuth } from './contexts/Auth/RequireAuth.jsx';
import Login from "./scenes/login" 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import EditarUsuario from './scenes/usuarios/editarUsuario/index.jsx';
import ListagemMunicipios from './scenes/municipios/listagemMunicipios/index.jsx';
import CadastroMunicipio from './scenes/municipios/cadastroMunicipio/index.jsx';

const interno = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><App /></RequireAuth>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/municipios",
        element: <ListagemMunicipios />,
      },
      {
        path: "/municipios/cadastro",
        element: <CadastroMunicipio />,
      },
      {
        path: "/usuarios",
        element: <ListagemUsuarios />,
      },
      {
        path: "/usuarios/cadastro",
        element: <CadastroUsuario />,
      },
      {
        path: "/usuarios/edicao/:userIduu",
        element: <EditarUsuario />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
      <AuthProvider>
        <RouterProvider router={interno}/>
      </AuthProvider>
  </React.StrictMode>
);


