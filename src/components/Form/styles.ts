import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    switchButton: css`
      :not(:disabled) {
        background-color: ${theme.palette.secondary.light};
        border-color: ${theme.palette.secondary.light};
      }

      :hover:not(:disabled),
      :active:not(:disabled) {
        background-color: ${theme.palette.secondary.light};
        border-color: ${theme.palette.text.secondary};
      }

      > span {
        display: flex;
        align-items: center;
      }
      margin-right: 5px;
      height: 39px;
    `,
    token: css`
      > span {
        font-size: ${theme.typography.small1.fontSize};
        font-weight: ${theme.typography.small1.fontWeight};
      }
    `,
  };
};
