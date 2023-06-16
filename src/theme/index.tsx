import { ThemeOptions, createTheme as createMuiTheme } from '@mui/material';
import { createLightComponents } from './light/create-components';
import { createLightPalette } from './light/create-palette';
import { createLightShadows } from './light/create-shadows';
import { createDarkComponents } from './dark/create-components';
import { createDarkPalette } from './dark/create-palette';
import { createDarkShadows } from './dark/create-shadows';
import { createDarkTypography } from './dark/create-typography';
import { createLightTypography } from './light/create-typography';

export function createTheme(paletteMode: string) {
  
  const palette = paletteMode === 'light' ? createLightPalette() : createDarkPalette()
  const components = paletteMode === 'light' ? createLightComponents({ palette }) : createDarkComponents({ palette })
  const shadows = paletteMode === 'light' ? createLightShadows() : createDarkShadows()
  const typography = paletteMode === 'light' ? createLightTypography({ palette }) : createDarkTypography({ palette })

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,      // Extra small devices (phones)
        sm: 600,    // Small devices (phones - landscape, tablets)
        md: 960,    // Medium devices (tablets, small laptops)
        lg: 1280,   // Large devices (laptops, desktops)
        xl: 1920,   // Extra large devices (large desktops, high-resolution screens)
      },
    },
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography
  } as ThemeOptions);
}
