import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: 'Space Mono, Arial',
  },
  palette: {
    mode: 'light',
    text: {
      primary: '#111827',
    },
    primary: {
      main: '#d52d1f',
    },
    secondary: {
      main: '#E33E7F'
    }
  },
});

export default theme;
