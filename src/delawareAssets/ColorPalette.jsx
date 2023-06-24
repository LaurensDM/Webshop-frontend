import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const delawareColorPalette = createTheme({
  palette: {
    primary: {
      main: red[300],
    },
    header: {
      height: '115px',
      top: {
        color: 'white',
        background: '#EC4842',
      },
      bottom: {
        color: 'white',
        background: '#E0433E',
      },
    },
    footer: {
      height: '50px',
      top: {
        color: 'black',
        background: '#F8FAFB',
      },
      bottom: {
        color: 'black',
        background: '#f0f2f3',
      },
    },
    body: {
      background: 'white',
      color: 'black',
      title: 'black',
      subtitle: 'darkgray',
    },
    sides: {
      background: 'white',
      enabled: false,
    },
    button: {
      primary: {
        color: 'white',
        background: '#EC4842',
      },
      secondary: {
        color: 'white',
        background: '#5e27cd',
      },
    },
    icon: {
      static: {
        color: 'green',
        pdf: 'red',
      },
      radio: {
        active: 'red',
        normal: 'black',
      },
      carousel: {
        active: 'red',
        normal: 'white',
      },
      link: 'blue',
      pdf: 'red',
    },
    tag: {
      promo: {
        background: 'blue',
        color: 'white',
      },
      new: {
        background: 'red',
        color: 'yellow',
      },
    },
    cart: {
      border: '#EDF1F3',
      side: {
        background: '#F8FAFB',
      },
      info: {
        background: '#F8FAFB',
        iconColor: '#32B2E3',
      },
      success: {
        background: '#2FCC71',
        color: '#fff',
      },
      error: {
        background: 'red',
        color: '#fff',
      },
    },
  },
});

export default delawareColorPalette;