import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    appBar: css`
      background-image: none;
      background-color: transparent;
      box-shadow: none;
      padding: 0;
    `,
    toolbar: css`
      padding: ${theme.spacing(8, 10, 0)} !important;
      justify-content: space-between;
      display: flex;

      ${theme.breakpoints.down('lg')} {
        padding-left: ${theme.spacing(6)} !important;
        padding-right: ${theme.spacing(6)} !important;
      }

      ${theme.breakpoints.down('md')} {
        padding: ${theme.spacing(6, 4, 0)} !important;
      }
    `,
    ctaContainer: css`
      display: flex;
      align-items: center;
      margin-left: auto;
      gap: 16px;
      flex-shrink: 0;

      ${theme.breakpoints.down('md')} {
        display: none;
      }
    `,
    priceInfo: css`
      display: flex;
      align-items: center;
      gap: 10px;

      .divider {
        border-left: 1px solid ${theme.palette.text.secondary};
        height: 36px;
      }

      .item {
        display: flex;
        flex-direction: column;

        .label {
          color: ${theme.palette.text.secondary};
          line-height: 18px;
        }

        .value {
          line-height: 15px;
          color: ${theme.palette.text.primary};
        }
      }
    `,
  };
};
