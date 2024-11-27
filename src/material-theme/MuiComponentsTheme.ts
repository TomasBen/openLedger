import { createTheme } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          cursor: "default",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          cursor: "default",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          cursor: "default",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          cursor: "default",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          cursor: "default",
        },
      },
    },
  },
});

export default theme;
