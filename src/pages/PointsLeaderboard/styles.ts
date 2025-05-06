import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    userContainer: css`
      width: 100% !important;
      gap: ${theme.spacing(2)};
    `,
    tooltip: css`
      font-size: 0.875rem;
    `,
  };
};
