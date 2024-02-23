import { Box, IconButton, Breadcrumbs, Link, Typography } from "@mui/material";
import { useMemo } from "react";
import { createTheme } from "@mui/material";
import { themeSettings } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";


const Topbar = ({ paginacao }) => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;

    return (
    
        <Box display="flex" justifyContent="flex-end" p={2}>
        
            {/* ICONS */}
            <Box display="flex">
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>

      </Box>

    )
};

export default Topbar;