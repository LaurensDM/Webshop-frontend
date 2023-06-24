import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Colors } from '../theme';

function getTextAlign(centered) {
  return centered ? 'center' : 'left';
}

const JPaper = styled(Paper)(({ centered = true, theme }) => ({

  margin: '20px auto',
  padding: '20px',
  fontSize: '1em',
  width: '80%',
  borderRight: `1px solid ${Colors.primary}`,
  borderRadius: '10px',
  textAlign: getTextAlign(centered),
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '10px',
  },
  [theme.breakpoints.up('xl')]: {
    width: '60%',
  },
}));

export default JPaper;