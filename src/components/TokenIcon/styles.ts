import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    icon: css`
      margin-top: -2px;
      width: ${theme.shape.iconSize.large}px;
      height: ${theme.shape.iconSize.large}px;
    `,
    lptoken: css`
      display: flex;
      align-items: center;

      img:last-child {
        margin-left: -5px;
        margin-right: 10px;
      }
    `,
  };
};
