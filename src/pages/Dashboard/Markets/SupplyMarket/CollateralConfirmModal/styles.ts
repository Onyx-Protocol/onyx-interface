import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    collateralCell: css`
      display: flex;
      justify-content: flex-end;
      padding-right: 24px;
    `,
    loadingIcon: css`
      height: 68px;
      width: 68px;
    `,
    collateralModalContainer: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .logo {
        width: 300px;

        ${theme.breakpoints.down('sm')} {
          width: 200px;
        }
      }
    `,
  };
};
