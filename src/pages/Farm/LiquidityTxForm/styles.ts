import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    tokenTextField: css`
      margin-bottom: ${theme.spacing(2)};

      ${theme.breakpoints.down('md')} {
        margin-bottom: ${theme.spacing(2)};
      }
    `,
    getRow: () => css`
      margin-bottom: ${theme.spacing(2)};

      ${theme.breakpoints.down('md')} {
        margin-bottom: ${theme.spacing(2)};
      }
    `,
    plus: css`
      text-align: center;
      font-size: 24px;
      margin-bottom: ${theme.spacing(2)};
    `,
    approveButtonBar: css`
      display: flex;
      gap: 10px;
      justify-content: space-between;
      margin: ${theme.spacing(3)} 0px;

      button {
        width: 100%;
      }
    `,
  };
};
