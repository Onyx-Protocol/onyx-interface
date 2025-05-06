import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    link: css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: start;
      gap: ${theme.spacing(2)};
      color: ${theme.palette.primary.main};
      font-size: 0.875rem;
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    `,
    container: css`
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: row;
      gap: ${theme.spacing(2)};
    `,
    address: css`
      min-width: 80px;
      text-align: justify;
      color: #1db9a6;
    `,
  };
};
