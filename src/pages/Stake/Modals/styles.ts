import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      // margin-top: ${theme.spacing(10)};
      ${theme.breakpoints.down('md')} {
        // margin-top: ${theme.spacing(8)};
      }
    `,
    input: css`
      margin-bottom: ${theme.spacing(1)};
    `,
    greyLabel: css`
      color: ${theme.palette.text.secondary};
    `,
    whiteLabel: css`
      color: ${theme.palette.text.primary};
    `,
    totalAndLimit: css`
      display: flex;
      justify-content: space-between;
    `,
    notice: css`
      margin-top: ${theme.spacing(3)};
      padding: ${theme.spacing(4)};
    `,
    getRow: ({ isLast }: { isLast: boolean }) => css`
      margin-bottom: ${theme.spacing(isLast ? 8 : 3)};

      ${theme.breakpoints.down('md')} {
        margin-bottom: ${theme.spacing(isLast ? 6 : 3)};

        span {
          font-size: ${theme.typography.small1.fontSize};
        }
      }
    `,
    nftContent: css`
      width: 100%;
      display: flex;
      align-items: center;
    `,
    nftSelectionWrap: css`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;

      .nftItem {
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 10px;
        margin-bottom: 10px;

        .nftImg {
          width: 100px;
          height: 100px;
          border-radius: 8px;
        }

        .tokenId {
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.palette.text.primary};
          font-size: 12px;
          margin-top: 8px;
        }

        .nftCheckMark {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 100;
        }
      }

      .selectedNft {
        .nftImg {
          opacity: 0.5;
        }
      }
    `,
    nftConfirmBtnWrap: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;

      .lightgrey {
        color: lightgrey;
        font-size: 14px;
      }
      .totalSelectedNft {
        font-weight: 500;
        font-size: 16px;
        color: ${theme.palette.button.main};
        cursor: pointer;
      }
    `,
    btnWrap: css`
      width: 100%;
      margin-top: 20px;
      button {
        width: 100%;
      }
    `,
  };
};
