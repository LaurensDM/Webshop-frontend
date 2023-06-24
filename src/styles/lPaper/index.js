import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Colors } from '../theme';

const LPaper = styled(Paper)(({ theme }) => ({
  margin: '20px auto',
  padding: '20px',
  [theme.breakpoints.up('md')]: {
    margin: '40px auto',
  },

  fontSize: '1em',
  width: 'fit-content',
  backgroundColor: Colors.secondary,
  color: Colors.white,
  borderRight: `1px solid ${Colors.light_gray}`,
  borderRadius: '10px',
}));

export default LPaper;