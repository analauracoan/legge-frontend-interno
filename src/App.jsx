import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {

  const theme = useMemo(() => createTheme(themeSettings()), []);
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar isSidebar={isSidebar}/>
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Outlet />  
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
