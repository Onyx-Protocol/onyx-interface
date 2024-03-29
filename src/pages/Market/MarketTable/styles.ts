import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    whiteText: css`
      color: ${theme.palette.text.primary};
    `,
    noWrap: css`
      > span {
        white-space: nowrap;
      }
    `,
    cardContentGrid: css`
      ${theme.breakpoints.down('xxl')} {
        background-color: initial;
        padding-top: 0;
      }

      .table__table-cards__card-content {
        ${theme.breakpoints.down('xxl')} {
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          row-gap: ${theme.spacing(5)};
        }

        ${theme.breakpoints.down('md')} {
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }
      }
    `,
    apyWithXcn: css`
      display: flex;
      align-items: center;
      justify-content: end;
      margin-bottom: 10px;
    `,
    apyWithXcnLabel: css`
      margin-left: ${theme.spacing(2)};
    `,
    tooltip: css`
      display: flex;
    `,
    infoIcon: css`
      cursor: help;
    `,
    toggle: css`
      margin-left: ${theme.spacing(2)};
    `,
  };
};
