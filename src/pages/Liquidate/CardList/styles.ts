import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    cardList: css`
      width: 100%;
      max-width: calc(100vw - 310px);

      ${theme.breakpoints.down('lg')} {
        max-width: calc(100vw - 150px);
      }

      ${theme.breakpoints.down('md')} {
        max-width: calc(100vw - 45px);
      }
    `,
    userList: css`
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: ${theme.spacing(2)};

      .noUsers {
        font-size: 20px;
        color: ${theme.palette.text.secondary};
        text-align: center;
      }

      .userCard {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 12px;
        margin: 4px;
        border-bottom: 1px solid #dadada;

        :hover {
          background: #7d8288;
          border-radius: 10px;
        }

        ${theme.breakpoints.down('md')} {
          display: none;
        }
      }

      .userMobileCard {
        display: none;

        ${theme.breakpoints.down('md')} {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 12px;
          margin: 4px;
        }
      }

      .userInfo {
        min-width: 150px;
        margin-right: 12px;
        border-right: 1px solid #1db9a6;
      }

      .action {
        display: flex;
        gap: 10px;
        cursor: pointer;
      }

      .info {
        display: flex;
        justify-content: space-between;
      }

      .address {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-right: 12px;
      }

      .tokenList {
        display: flex;
        align-items: start;
        overflow: auto;
        margin-right: 24px;

        .tokenItem {
          width: 180px;
          min-width: 180px;
          .tokenName {
            font-weight: bold;
            color: #1db9a6;
          }
          .supplyAmount {
            font-size: 13px;
          }
          .borrowAmount {
            font-size: 13px;
          }
        }
        .tokenItem:not(:last-child) {
          margin-right: 12px;
        }
      }
      .tokenList::-webkit-scrollbar {
        height: 5px;
      }

      .tokenList::-webkit-scrollbar-track {
        background-color: #84898f;
      }

      .tokenList::-webkit-scrollbar-thumb {
        background-color: #a3a7ab;
      }

      .tokenList.mobile {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: start;
        overflow: auto;
        max-height: 300px;

        ${theme.breakpoints.down('sm')} {
          grid-template-columns: repeat(2, 1fr);
        }

        .tokenItem {
          width: unset;
          min-width: unset;
          margin-bottom: 10px;

          .tokenName {
            font-weight: bold;
            color: unset;
          }
          .supplyAmount {
            font-size: 13px;
          }
          .borrowAmount {
            font-size: 13px;
          }
        }
        .tokenItem:not(:last-child) {
          margin-right: 12px;
        }
      }

      .tokenList.mobile::-webkit-scrollbar-track {
        background-color: #000;
      }

      .tokenList.mobile::-webkit-scrollbar-thumb {
        background-color: #1db9a6;
      }
    `,
    ethScanLinkContainer: css`
      margin-top: ${theme.spacing(2)};

      ${theme.breakpoints.down('md')} {
        margin: 0 auto ${theme.spacing(8)};
      }
    `,
    center: css`
      text-align: center;
    `,
    btnWrapper: css`
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .button {
        background: linear-gradient(123.08deg, rgba(29, 185, 166, 0.2) -33.26%, #1db9a6 88.39%);
        width: 100px;
        text-align: center;
        color: white;
        border-radius: 4px;
        padding: 4px 15px;
      }
    `,
  };
};
