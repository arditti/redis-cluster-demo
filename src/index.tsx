import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import View from "./components/View";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './material-ui/theme';
import Typography from "@mui/material/Typography";

const appElement = document.getElementById('app');

if (!appElement) {
  throw new Error('app div not found');
}

const root = createRoot(appElement);
root.render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <Typography align="center" variant="h4" my={4}>Redis Cluster data sharding</Typography>
      <CssBaseline />
      <View />
    </ThemeProvider>
  </StrictMode>,
);
