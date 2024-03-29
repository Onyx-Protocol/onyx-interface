import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    root: css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      padding-bottom: 0;

      ${theme.breakpoints.down('xl')} {
        background-color: transparent;
        padding: 0;
        flex-direction: column;
        gap: 15px;
      }
    `,
    checkbox: css`
      margin-right: ${theme.spacing(2)};
    `,
    myTransactions: css`
      display: flex;
      flex-direction: row;
      align-items: center;
    `,
    select: css`
      min-width: 140px;
    `,
    typeSelectLabel: css`
      margin-right: ${theme.spacing(3)};
    `,
    selectGroup: css`
      display: flex;
      align-items: center;
      gap: 20px;
    `,
  };
};
