import {
  alpha,
  Box,
  Breadcrumbs,
  Container,
  IconButton,
  InputBase,
  List,
  ListItem,
  styled,
  Typography,
} from '@mui/material';
import '@fontsource/montez';
import { Colors } from '../theme';

// container
export const AppbarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: Colors.secondary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2px 8px',
  height: '60px',
  color: Colors.primary,
  [(theme.breakpoints.down('lg'))]: {
    height: '60px',
  },
}));

export const PageContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',

}));

// logo_TO BE DECIDED
// export const NavbarLogo = styled('img')(({ src, theme }) => ({

//   src: `${src}`,
//   [(theme.breakpoints.down('lg'))]: {
//     width: '230px',
//     height: '70px',
//   },
// }));

// header
export const AppbarHeader = styled(Typography)(() => ({
  flexGrow: 1,
  fontSize: '2em',
  justifyContent: 'center',
  color: Colors.primary,
}));

// myList (list of tools -> Profile, cart, favorite)
export const MyList = styled(List)(({ type }) => ({
  display: type === 'row' ? 'flex' : 'block',
  flexGrow: 3,
  justifyContent: 'center',
  alignItems: 'center',
}));

// desktop
export const ActionIconsContainerDesktop = styled(Box)(() => ({
  flexGrow: 0,
}));

// mobile
export const ActionIconsContainerMobile = styled(Box)(() => ({
  display: 'flex',
  background: Colors.shaft,
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  alignItems: 'center',
  zIndex: 99,
  borderTop: `1px solid ${Colors.border}`,
}));
// StyleSearchBar
export const StyledInputBase = styled(InputBase)(({ theme }) => ({

  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  color: Colors.black,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: Colors.white,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.99),
  },
  marginLeft: '50px',

  [theme.breakpoints.up('sm')]: {
    '&:focus': {
      width: '100ch',
    },
  },

}));

export const ListItemNavbar = styled(ListItem)(() => ({
  textJustify: 'center',
  width: 'fit-content',
  margin: '0 auto',

}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DrawerCloseButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: -7,
  left: '150px',
  zIndex: 1999,
}));
export const BreadcrumbsDWS = styled(Breadcrumbs)(() => ({

  position: 'absolute',
  top: '80px',
  left: '40px',
  zIndex: 1999,

}));