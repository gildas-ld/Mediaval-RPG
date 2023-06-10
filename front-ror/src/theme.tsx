import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            'url("https://gildasld.github.io/static-images/images/ror-bg.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
        },
        button: {
          backGroundColor: "#577581",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#2e5846",
    },
    secondary: {
      main: "#007398",
    },
    error: {
      main: "#bd4d2e",
    },
    warning: {
      main: "#283e51",
    },
    info: {
      main: "#0090c4",
    },
    success: {
      main: "#4a8548",
    },
  },
});
export default theme;
