import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F0B35D',
    },
    secondary: {
      main: '#6FA5FF',
    },
    background: {
      default: '#121315',
      paper: '#1B1D20',
    },
    text: {
      primary: '#F5EBDD',
      secondary: '#ACA79F',
    },
  },
  typography: {
    fontFamily: '"Outfit Variable", "Avenir Next", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.06em',
    },
    h2: {
      fontWeight: 650,
      letterSpacing: '-0.04em',
    },
    h3: {
      fontWeight: 650,
      letterSpacing: '-0.03em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
  },
});
