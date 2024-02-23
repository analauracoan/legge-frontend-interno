import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Listagem from "./scenes/listagem";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/dashboard";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/pie";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar";
import { Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme";
import { useMemo } from "react";

function App() {

  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/listagem" element={<Listagem />} />
            {/* <Route path="/norma/:tipo:numero:ano" element={<DetalhesNormas />} */}
            {/* <Route path="/contacts" element={<Contacts />} /> */}
            {/* <Route path="/invoices" element={<Invoices />} /> */}
            {/* <Route path="/form" element={<Form />} /> */}
            {/* <Route path="/bar" element={<Bar />} /> */}
            {/* <Route path="/pie" element={<Pie />} /> */}
            {/* <Route path="/line" element={<Line />} /> */}
            {/* <Route path="/faq" element={<FAQ />} /> */}
            {/* <Route path="/geography" element={<Geography />} /> */}
            {/* <Route path="/calendar" element={<Calendar />} /> */}
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
