import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const neutral = {
  25: '#0D1117',
  50: '#111927',
  100: '#1C2536',
  200: '#2F3746',
  300: '#4D5761',
  400: '#6C737F',
  500: '#9DA4AE',
  600: '#D2D6DB',
  700: '#E5E7EB',
  800: '#1C2536',
  900: '#F8F9FA'
};

export const indigo = withAlphas({
  lightest: '#312E81',
  light: '#4338CA',
  main: '#6366F1',
  dark: '#EBEEFE',
  darkest: '#F5F7FF',
  contrastText: '#FFFFFF'
});

export const success = withAlphas({
  lightest: '#134E48',
  light: '#0B815A',
  main: '#10B981',
  dark: '#3FC79A',
  darkest: '#F0FDF9',
  contrastText: '#FFFFFF'
});

export const info = withAlphas({
  lightest: '#164C63',
  light: '#0E7090',
  main: '#06AED4',
  dark: '#CFF9FE',
  darkest: '#ECFDFF',
  contrastText: '#FFFFFF'
});

export const warning = withAlphas({
  lightest: '#7A2E0E',
  light: '#B54708',
  main: '#F79009',
  dark: '#FEF0C7',
  darkest: '#FFFAEB',
  contrastText: '#FFFFFF'
});

export const error = withAlphas({
  lightest: '#7A271A',
  light: '#B42318',
  main: '#F04438',
  dark: '#FEE4E2',
  darkest: '#FEF3F2',
  contrastText: '#FFFFFF'
});