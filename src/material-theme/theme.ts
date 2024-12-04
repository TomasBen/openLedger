import { createTheme } from '@mui/material';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#445E91',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#336940',
          contrastText: '#FFFFFF',
        },
        error: {
          main: '#BA1A1A',
          contrastText: '#FFFFFF',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#ADC6FF',
          contrastText: '#102F60',
        },
        secondary: {
          main: '#9AD4A2',
          contrastText: '#003517',
        },
        error: {
          main: '#FFB779',
          contrastText: '#690005',
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
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            opacity: 1.1,
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
