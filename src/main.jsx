import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App.jsx';
import Layout from './components/layout/index.jsx';
// import { lightTheme, darkTheme } from './assets/theme.js'; add once you have the light theme
import { darkTheme } from './assets/theme.js';
import ReportsView from './views/Reports/index.jsx';
import UsersView from './views/Users/index.jsx';
import ProjectsView from './views/Projects/index.jsx';
import { addLocale, locale } from 'primereact/api';
import es from './assets/esPrimeReact.json';
import Login from './views/Auth/index.jsx';
import Register from './views/Auth/Register.jsx';
import { Provider } from 'react-redux';
import store from './store';

addLocale('es', es);
locale('es');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        {/* or darkTheme */}
        <Router>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<App />} />
            <Route path="/proyectos" element={<ProjectsView />} />
            <Route path="/usuarios" element={<UsersView />} />
            <Route path="/reportes" element={<ReportsView />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
