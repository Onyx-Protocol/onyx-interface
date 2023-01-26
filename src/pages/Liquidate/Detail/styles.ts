import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    container: css`
      width: 100%;
      margin-top: ${theme.spacing(4)};
      margin-bottom: 20px;
    `,
    contentWrapper: css`
      display: flex;

      .assetInfo {
        flex: 1;
        border: 1px solid grey;
        box-sizing: border-box;
        border-radius: 16px;
        padding: 16px;
        margin-right: 16px;

        .infoDetail {
          table {
            width: 100%;
          }
        }
      }
    `,
    ethScanLinkContainer: css`
      margin-top: ${theme.spacing(2)};

      ${theme.breakpoints.down('md')} {
        margin: 0 auto ${theme.spacing(8)};
      }
    `,
    liquidityManage: css`
      display: none;
      align-items: center;
      justify-content: space-between;
      padding: 30px 24px;

      ${theme.breakpoints.down('md')} {
        display: flex;
      }
    `,
    liquidityForm: css`
      ${theme.breakpoints.down('md')} {
        display: none;
      }
    `,
    liquidityModal: css`
      ${theme.breakpoints.down('md')} {
        position: fixed;
        display: flex;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }
    `,
  };
};
