import { Box, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import { useContext, useMemo } from "react";
import { createTheme } from "@mui/material";
import { themeSettings } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


const Topbar = ({ paginacao }) => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signout();
        window.location.href = window.location.href;
    }

    return (
    
        <Box display="flex" justifyContent="flex-end" p={2} bgcolor='neutral.main'>

            {/* ICONS */}
            <Box display="flex">
                <Box display={'flex'}>
                    <Typography variant="p" display={'flex'} alignItems={'center'} fontWeight={'bold'} >
                        {auth.cookies.get('usuario')}
                    </Typography>
                    <IconButton>
                        <PersonOutlinedIcon />
                    </IconButton>
                </Box>
                <IconButton onClick={handleLogout} >
                    <LogoutOutlinedIcon />
                </IconButton>
            </Box>

      </Box>

    )
};

export default Topbar;