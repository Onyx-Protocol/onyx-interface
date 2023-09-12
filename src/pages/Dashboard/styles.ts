import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  const gap = theme.spacing(8);

  return {
    row: css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;

      .padding {
        margin: 20px 0;
      }

      ${theme.breakpoints.down('xl')} {
        flex-direction: column;
        margin-bottom: 0;
      }
    `,
    rowWithPadding: css`
      display: flex;
      flex-direction: row;
      justify-content: end;
      margin-bottom: ${gap};
      padding: 0 40px;
    `,
    column: css`
      width: calc(50% - ${gap} / 2);

      ${theme.breakpoints.down('xl')} {
        width: 100%;
        margin-bottom: ${gap};
      }
    `,
    toggle: css`
      margin-left: ${theme.spacing(2)};
    `,
    link: css`
      margin: auto;
      display: flex;
      align-items: center;
      color: ${theme.palette.text.primary};
      :hover {
        color: ${theme.palette.text.primary};
        cursor: pointer;
      }
    `,
    mobileArrow: css`
      height: ${theme.spacing(6)};
      width: ${theme.spacing(6)};
    `,
    notification: css`
      padding: 24px;
      margin-bottom: 32px;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 24px;
      display: flex;
      align-items: start;
      gap: 12px;

      a {
        color: rgb(30, 185, 166);
      }
    `,
    infoIcon: css`
      margin-top: 3px;
      color: rgb(58, 120, 255);
      min-width: 16px !important;
      min-height: 16px !important;
    `,
  };
};
