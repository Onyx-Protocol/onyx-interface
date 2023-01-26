import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    switchArea: css`
      color: ${theme.palette.text.primary};
      background-color: ${theme.palette.interactive.switchBack};
      width: 60px;
      height: 36px;
      border-radius: 18px;
      position: relative;
    `,
    icon: css`
      width: 28px;
      height: 28px;
      cursor: pointer;
      position: absolute;
      top: 4px;
      left: 4px;
    `,
    iconRight: css`
      width: 28px;
      height: 28px;
      cursor: pointer;
      position: absolute;
      top: 4px;
      right: 4px;
    `,
  };
};
