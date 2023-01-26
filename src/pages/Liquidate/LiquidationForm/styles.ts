import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    liquidationForm: css`
      position: relative;
      width: 422px;
      background-color: ${theme.palette.background.paper};
      border-radius: 16px;
      padding: 40px;

      .flex-center {
        display: flex;
        align-items: center;
      }

      .justify-end {
        justify-content: flex-end;
      }

      .bold {
        font-weight: bold;
      }

      .closeBtn {
        cursor: pointer;
        display: none;
        position: absolute;
        right: 20px;
        top: 10px;
        ${theme.breakpoints.down('md')} {
          display: block;
        }
      }

      .nftSelectionWrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        min-height: 150px;
        max-height: 300px;
        overflow: auto;
        width: 100%;

        .nftItem {
          position: relative;
          width: 100px;
          margin-bottom: 10px;
          max-width: 160px;
          padding: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          border-radius: 8px;

          .tokenId {
            font-weight: bold;
            font-size: 12px;
            margin-top: 8px;
          }

          .nftImg {
            width: 100%;
            border-radius: 8px;
          }

          .nftCheckMark {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 100;
          }
        }

        .selectedNft {
          .nftImg {
            opacity: 0.5;
          }
        }
      }

      .tokenlist {
        margin-bottom: 16px;

        .tokenItem {
          cursor: pointer;
          padding: 4px;
          &:not(:last-child) {
            margin-bottom: 4px;
          }
          img {
            margin-right: 4px;
          }

          &:hover {
            background-color: #31353d;
          }
        }

        .activeToken {
          background-color: #31353d;
        }
      }
      .btnWrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 16px;
      }
    `,
  };
};
