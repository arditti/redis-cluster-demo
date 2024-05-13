// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Palette } from '@mui/material/styles/createPalette';

declare module '*.module.css';
declare module '*.ttf';

declare module '@mui/material/styles' {
  interface Palette {
    github: Palette['primary'];
    linkdin: Palette['primary'];
  }

  interface PaletteOptions {
    github?: PaletteOptions['primary'];
    linkdin?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    github: true;
    linkdin: true;
  }
}
