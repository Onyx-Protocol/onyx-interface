import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useApyStyles = () => {
  const theme = useTheme();
  return {
    container: css`
      width: 100%;
    `,
    row: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    header: css`
      margin-bottom: ${theme.spacing(6)};
      padding: ${theme.spacing(2)} 0;
    `,
    apyWithXcn: css`
      display: flex;
      align-items: center;
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
    labelListItem: css`
      display: block;
      margin-bottom: ${theme.spacing(1)};
    `,
    inline: css`
      display: inline-block;
    `,
    netApyContainer: css`
      margin-bottom: ${theme.spacing(4)};
    `,
    netApy: css`
      display: flex;
      align-items: center;
      margin-bottom: ${theme.spacing(1)};
    `,
    netApyLabel: css`
      margin-right: ${theme.spacing(2)};
    `,
    list: css`
      padding-left: 0;
      display: flex;
      margin-bottom: ${theme.spacing(6)};
      justify-content: space-between;

      .divider {
        border-right: 1px solid ${theme.palette.secondary.light};
      }

      ${theme.breakpoints.down('sm')} {
        flex-direction: column;

        .divider {
          display: none;
        }
      }
    `,
    item: css`
      list-style: none;
      padding-left: ${theme.spacing(8)};
      padding-right: ${theme.spacing(8)};

      ${theme.breakpoints.down('sm')} {
        border-right: none;
        padding: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;

        & + & {
          margin-top: ${theme.spacing(2)};
        }
      }

      :first-of-type {
        border-left: none;
        padding-left: 0;
      }
      :last-child {
        border-right: none;
        padding-right: 0;
      }
    `,
    inlineLabel: css`
      margin-right: ${theme.spacing(1)};
    `,
    progressBar: css`
      margin-bottom: ${theme.spacing(3)};
    `,
    shieldIcon: css`
      margin-right: ${theme.spacing(2)};
    `,
    safeLimit: css`
      margin-right: ${theme.spacing(2)};
    `,
    bottom: css`
      display: flex;
      justify-content: flex-end;
      align-items: center;
    `,
  };
};
