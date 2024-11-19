import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App.jsx';
import Layout from './components/layout/index.jsx';
import { lightTheme, darkTheme } from './assets/theme.js'; // Adjust the path if necessary

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}> {/* or darkTheme */}
      <Router>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            {/* Add more routes here */}
            <Route path='/felipe' element={<App />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  </StrictMode>,
);