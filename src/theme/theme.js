import { createTheme } from '@mui/material/styles';

// Paleta inspirada em céu e floresta dos filmes
const theme = createTheme({
  palette: {
    primary: { main: '#2f6f62' },
    secondary: { main: '#d98b3a' },
    background: { default: '#eef5f4', paper: '#ffffff' },
    text: { primary: '#1d2b29' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Nunito", system-ui, sans-serif',
    h1: { fontFamily: '"Fraunces", serif', fontWeight: 700 },
    h5: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h6: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
  },
});

export default theme;