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
        margin: 20px 0px;
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
      padding: 0px 40px;
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
  };
};
