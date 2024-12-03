import { createTheme } from '@mui/material';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: 'rgb(216 226 255)',
          contrastText: 'rgb(0 26 65)',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: 'rgb(39 66 115)',
          contrastText: 'rgb(255 255 255)',
        },
      },
    },
  },
  components: {
    // components orderder from biggest to smallest. i.e. Container, Paper, Button
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '0.3em',
          backgroundColor: 'var(--color-surface-container-low)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--color-surface-container-low)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--color-primary-container-hover)',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          cursor: 'default',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          cursor: 'default',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: 'none',
          cursor: 'default',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          cursor: 'default',
        },
      },
    },
  },
});

export default theme;
