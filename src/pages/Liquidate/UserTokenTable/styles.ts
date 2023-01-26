import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    tokenTableWrapper: css`
      margin: ${theme.spacing(4)} 20px ${theme.spacing(10)} 20px;
    `,
    token: css`
      cursor: pointer;

      &:hover {
        background-color: ${theme.palette.background.paper};
      }
    `,
    noAllowed: css`
      cursor: not-allowed;
    `,
    activeToken: css`
      span {
        color: rgba(30, 185, 166, 1);
      }
    `,
  };
};
