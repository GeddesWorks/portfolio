import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#165DFF',
    },
    secondary: {
      main: '#FF7A59',
    },
    background: {
      default: '#F6F3EC',
      paper: '#FFFDF8',
    },
    text: {
      primary: '#122033',
      secondary: '#4E5E74',
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          boxShadow: '0 24px 70px rgba(18, 32, 51, 0.08)',
        },
      },
    },
  },
});
