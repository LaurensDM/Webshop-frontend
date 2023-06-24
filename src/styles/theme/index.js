import {
  createTheme,
} from '@mui/material/styles';
import {
  lighten,
} from 'polished';

export const DrawerWidth = 250;

export const Colors = {

  primary: '#FFFFFF',
  secondary: '#EC4842',
  bottom: '#E0433E',
  success: '#4CAF50',
  info: '#00a2ff',
  danger: '#FF5722',
  warning: '#FFC107',
  dark: '#0e1b20',
  light: '#aaa',
  muted: '#abafb3',
  border: '#DDDFE1',
  inverse: '#2F3D4A',
  shaft: '#333',
  link: '#c72a1d',
  /// ////////////
  // Grays
  /// ////////////
  dim_grey: '#696969',
  dove_gray: '#d5d5d5',
  body_bg: '#f3f6f9',
  light_gray: '#f5f5f5',
  /// ////////////
  // Solid Color
  /// ////////////
  white: '#fff',
  black: '#000',

};

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 400,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 700,
    },
    p: {
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: Colors.secondary,
    },
    secondary: {
      main: Colors.primary,
    },

  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Quicksand';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          background: Colors.secondary,
        },
        arrow: {
          color: Colors.primary,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: '150px',
          background: Colors.secondary,
          color: Colors.primary,
          borderRight: `1px solid ${Colors.primary}`,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          // I know this is stupid (hardcoding pixels seems like a bad idea)
          width: 'fit-content',
          borderRight: `1px solid ${Colors.primary}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(0.2, Colors.primary),
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {

        },
      },
    },
    MyShopButton: {
      styleOverrides: {
        root: {
          color: Colors.white,
        },
        primary: {
          background: Colors.primary,
          '&:hover': {
            background: lighten(0.05, Colors.primary),
          },
        },
        secondary: {
          background: `${Colors.secondary}`,
          '&:hover': {
            background: lighten(0.05, Colors.primary),
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: 'black',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'red',
          },
        },
      },
    },

  },
});

export default theme;