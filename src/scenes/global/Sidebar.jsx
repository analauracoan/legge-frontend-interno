import { useState, useMemo, useContext, useEffect } from "react";
import { createTheme } from "@mui/material";
import { themeSettings } from "../../theme";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../../assets/logo_escrita.svg';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ViewListIcon from '@mui/icons-material/ViewList';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { AuthContext } from "../../contexts/Auth/AuthContext";
import ListagemNormas from "../normas/listagemNormas";

const Sidebar = () => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;
    
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMenuNormaOpen, setIsMenuNormaOpen] = useState(true);
    const [isMenuAdmOpen, setIsMenuAdmOpen] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const auth = useContext(AuthContext);
    const nome = auth.cookies.get('usuario');

    useEffect (() => {
        if(nome === "ADMINISTRAÇÃO") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    })


    return (

        <Box
            sx={{
            "& .pro-sidebar-inner": {
                background: `${colors.primary.main} !important`,
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
                color: `${colors.neutral.main} !important`,
            },
            "& .pro-menu-item.active": {
                color: `${colors.neutral.main} !important`,
            },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu>
                    {/* LOGO E ICONE MENU */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="20px"
                            >
                                <img src={logo} alt="Logotipo da empresa Legge" width="40%" />
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon color="neutral" />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* MENU ICONES */}
                    <Box>
                        <MenuItem
                            style={{color: colors.white.main}}
                            icon={<HomeOutlinedIcon />}>
                            <Typography>
                                Dashboard
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            style={{color: colors.white.main, backgroundColor: colors.primary.dark}}
                            icon={isMenuNormaOpen ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon /> }
                            onClick={() => setIsMenuNormaOpen(!isMenuNormaOpen)}>
                            <Typography>
                                Município
                            </Typography>
                        </MenuItem>
                        {isMenuNormaOpen && (
                        <Box>
                            <MenuItem 
                                style={{color: colors.white.main}}
                                icon={<ViewListIcon />}>
                                <Typography>
                                    Normas
                                </Typography>
                                <Link to={"/norma"} />
                            </MenuItem>
                            <MenuItem 
                                style={{color: colors.white.main}}
                                icon={<TypeSpecimenOutlinedIcon />}>
                                <Typography>
                                    Tipos de Normas
                                </Typography>
                                <Link to={"/normas/tipos"} />
                            </MenuItem>        
                        </Box>
                        )}
                        {isAdmin && (
                        <Box>
                            <MenuItem
                                style={{ color: colors.white.main, backgroundColor: colors.primary.dark }}
                                icon={isMenuAdmOpen ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
                                onClick={() => setIsMenuAdmOpen(!isMenuAdmOpen)}
                            >
                                <Typography>
                                Administração
                                </Typography>
                            </MenuItem>
                            {isMenuAdmOpen && (
                            <Box>
                                <MenuItem
                                style={{ color: colors.white.main }}
                                icon={<PublicOutlinedIcon />}
                                >
                                <Typography>
                                    Municípios
                                </Typography>
                                <Link to={"/login"} />
                                </MenuItem>

                                <MenuItem
                                style={{ color: colors.white.main }}
                                icon={<AccountCircleOutlinedIcon />}
                                >
                                <Typography>
                                    Usuários
                                </Typography>
                                <Link to={"/usuarios"} />
                                </MenuItem>
                            </Box>
                            )}
                        </Box>
                        )}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>

    );
};

export default Sidebar;