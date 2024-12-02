import { createTheme } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "0.3em",
          backdropFilter: "blur(10px)",
        },
      },
    },
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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: "none",
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
