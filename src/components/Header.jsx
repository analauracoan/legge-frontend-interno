import { Typography, Box, createTheme, Tooltip, IconButton } from "@mui/material";
import { themeSettings } from "../theme";
import { useMemo } from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Header = ({ titulo, legenda, show, espaco }) => {
    const theme = useMemo(() => createTheme(themeSettings()), []);
    const colors = theme.palette;


    return ( 
    
        <Box mb={espaco} mt={espaco}>
            <Typography 
                variant="h2" 
                color={colors.black.main} 
                fontWeight="bold" 
            >
                {titulo}
                {show && 
                <Tooltip title={legenda} show={show}>
                    <IconButton>
                        <InfoOutlinedIcon />
                    </IconButton>
                </Tooltip>}
            </Typography>
        </Box>

    )
}

export default Header;