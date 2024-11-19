// styles/theme.ts
import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

const lightThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: blue[700],
        },
        secondary: {
            main: blue[500],
        },
        background: {
            default: grey[100],
            paper: '#ffffff',
        },
        text: {
            primary: grey[900],
            secondary: grey[800],
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
};

const darkThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: blue[200],
        },
        secondary: {
            main: blue[300],
        },
        background: {
            default: grey[900],
            paper: grey[800],
        },
        text: {
            primary: '#ffffff',
            secondary: grey[500],
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);