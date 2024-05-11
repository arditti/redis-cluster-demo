import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import View from './components/View';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './material-ui/theme';

const appElement = document.getElementById('app');

if (!appElement) {
  throw new Error('app div not found');
}

const root = createRoot(appElement);
root.render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <View />
    </ThemeProvider>
  </StrictMode>,
);
