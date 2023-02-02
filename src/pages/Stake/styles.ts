import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    root: css`
      display: grid;
      grid-template-columns: 1fr 1.8fr;
      gap: 10px;
      ${theme.breakpoints.down('xl')} {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    `,
    loader: css`
      height: auto;
      margin-bottom: ${theme.spacing(6)};
    `,
    stakeForm: css`
      display: flex;
      flex-direction: column;
      .header {
        height: 56px;
        background-color: #343a41;
        border-radius: 14px 14px 0px 0px;
        border-bottom: 1px solid white;
        padding: 18px; 22px;
      }
      .content {
        height: 300px;
        background-color: #2a2f36;
        border-radius: 0px 0px 14px 14px;
        padding: 18px 10px;

        ${theme.breakpoints.down('sm')} {
          padding: 18px 10px;
        }

        .info {
          margin: 0 auto;
          max-width: 400px;
          display: grid;
          grid-template-columns: 1fr 1fr 48px;
          gap: 15px 0px;

          .xcn {
            height: 20px;
            font-size: 10px;
            padding-top: 3px;
            background: #1EB9A6;
            border-radius: 70px;
            text-align: center;
          }
        }

        .buttons {
          margin: 20px auto;
          max-width: 400px;

          .button_row {
            display: flex;
            gap: 12px;
            margin-bottom: 10px;
          }

          .button {
            width: 100%;
            height: 36px;
            background: linear-gradient(123.08deg, rgba(29, 185, 166, 0.2) -33.26%, #1DB9A6 88.39%);
            align-items: center;
            justify-content: center;
            display: flex;
            border-radius: 7px;
            cursor: pointer;
          }

          .button.disabled {
            color: rgba(0, 0, 0, 0.25);
          }
        }
      }
    `,
    historyForm: css`
      display: flex;
      flex-direction: column;
      margin-bottom: 50px;
      .header {
        height: 56px;
        background-color: #343a41;
        border-radius: 14px 14px 0px 0px;
        border-bottom: 1px solid white;
        padding: 18px; 22px;
      }
      .content-desktop {
        height: 300px;
        background-color: #2a2f36;
        border-radius: 0px 0px 14px 14px;
        ${theme.breakpoints.down('md')} {
          display: none;
        }

        .table-header {
          display: grid;
          grid-template-columns: 30px 1fr 80px 150px 80px 120px;
          height: 32px;
          align-items: center;
          background-color: #1F242C;
          border-radius: 5px;
          padding: 0px 10px;
          color: #1DB9A6;
          font-size: 14px;

          span:not(:first-child) {
            text-align: center;
          }
        }

        .table-record {
          display: grid;
          grid-template-columns: 30px 1fr 80px 150px 80px 120px;
          height: 32px;
          align-items: center;
          padding: 0px 10px;
          font-size: 12px;
          border-bottom: 1px solid #DADADA;

          .txHash {
            display: flex;
            justify-content: center;
            gap: 25px;
            .actions {
              display: flex;
              gap: 10px;

              img {
                cursor: pointer;
                height: 17px;
              }
            }
          }
          :hover {
            background-color: #7D8288;
            border-radius: 5px;
          }

          span:not(:first-child) {
            text-align: center;
          }

          .usdValue {
            padding-left: 5px;
            color: #1DB9A6;
            font-size: 10px;
          }
        }
      }
      .content-mobile {
        display: none;
        ${theme.breakpoints.down('md')} {
          display: block;
          margin-top: 20px;
        }
        
        .itemList {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          align-items: start;
          overflow: auto;
          height: 150px;
    
          .item {
            width: unset;
            min-width: unset;
            margin-bottom: 10px;
  
            .label {
              font-weight: bold;
              color: unset;
            }
            .value {
              font-size: 13px;
            }
          }

          .item:not(:last-child) {
            margin-right: 12px;
          }
        }
  
        .itemList::-webkit-scrollbar {
          height: 5px;
        }

        .itemList::-webkit-scrollbar-track {
          background-color: #000000;
        }
  
        .itemList::-webkit-scrollbar-thumb {
          background-color: #1db9a6;
        }
      }
    `,
  };
};
