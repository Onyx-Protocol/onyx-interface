import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    liquidityToggleContainer: css`
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: ${theme.spacing(4)} 20px ${theme.spacing(10)} 20px;

      .MuiSwitch-track {
        background-color: rgba(31, 36, 44, 1) !important;
      }
    `,
    toggleText: css`
      display: inline-block;
      line-height: 1;
      margin-right: 8px;
    `,
  };
};
