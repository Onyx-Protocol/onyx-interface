import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    slideWrapper: css`
      position: relative;
      max-width: calc(100vw - 350px);
      margin: ${theme.spacing(4)} 20px ${theme.spacing(10)} 20px;

      ${theme.breakpoints.down('lg')} {
        max-width: calc(100vw - 170px);
      }

      ${theme.breakpoints.down('md')} {
        max-width: calc(100vw - 80px);
      }

      .priceCard {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-right: 24px;
        padding: 16px 10px;
        background: #7c8087;
        border-radius: 10px;
        min-width: 150px;

        img {
          width: 40px;
          height: 40px;
        }

        .symbol {
          font-weight: 700;
          font-size: 12px;
        }

        .price {
          font-weight: 400;
          font-size: 12px;
        }
      }
    `,
    overlay: css`
      position: absolute;
      width: 100%;
      height: 72px;
      top: 0;
      background: linear-gradient(90deg, #575C63 0%, #50565F 2%, rgba(80, 86, 95, 0) 5%, rgba(80, 86, 95, 0) 95%, #50565F 98%, #575C63 100%);
      z-index: 2;
    `,
  };
};
