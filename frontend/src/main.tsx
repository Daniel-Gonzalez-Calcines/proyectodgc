import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import Login from './pages/Login.tsx'
//import './index.css'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0000f9',
      light: '#3b16ff',
      dark: '#0000e8',
    },
    secondary: {
      main: '#00a612',
    },
    error: {
      main: '#ff0000',
    },
    warning: {
      main: '#ff7200',
    },
    info: {
      main: '#0040ff',
    },
    success: {
      main: '#004a1e',
    },
  },
};

const theme = createTheme(themeOptions);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Login />
    </ThemeProvider>
  </StrictMode>,
)