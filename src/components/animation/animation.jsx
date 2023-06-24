import { keyframes } from '@mui/system';

/**
 * ----------------------------------------
 * animation slide-in-right
 * ----------------------------------------
 */
const slideInRight = keyframes`
  0% {
    -webkit-transform: translateX(50px);
            transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
`;
export default slideInRight;