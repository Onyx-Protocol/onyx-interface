import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    root: css`
      padding: 0;

      svg {
        height: ${theme.spacing(6)};
        width: ${theme.spacing(6)};
      }
      :hover {
        svg {
          color: #1DB9A6;
        }
      }
    `,
  };
};

export default useStyles;
