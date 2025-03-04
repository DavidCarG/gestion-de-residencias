import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import { darkTheme } from "./assets/theme.js";
import { addLocale, locale } from "primereact/api";
import es from "./assets/esPrimeReact.json";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./AppRoutes.jsx";

addLocale("es", es);
locale("es");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <CssBaseline />
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
