import { createTheme } from '@mui/material/styles';

const { palette } = createTheme();

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
    },
    github: palette.augmentColor({
      color: {
        main: '#000000',
      },
      name: 'github',
    }),
    linkdin: palette.augmentColor({
      color: {
        main: '#0b66c2',
      },
      name: 'linkdin',
    }),
  },
});

export default theme;
