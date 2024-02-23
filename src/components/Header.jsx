import { Typography, Box, createTheme } from "@mui/material";
import { themeSettings } from "../theme";
import { useMemo } from "react";

const Header = ({ title }) => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;


    return ( 
    
        <Box>
            <Typography 
                variant="h2" 
                color={colors.black.main} 
                fontWeight="bold" 
            >
                {title}
            </Typography>
        </Box>

    )
}

export default Header;