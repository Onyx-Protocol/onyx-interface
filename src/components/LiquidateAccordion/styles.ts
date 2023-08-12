import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    arrow: (expanded: boolean) => css`
      margin-top: 2px;
      ${!expanded && 'transform: rotate(180deg)'};
    `,
    accountBar: css`
      display: flex;
      justify-content: space-between;
      margin-bottom: ${theme.spacing(1)};
      padding: 0 10px;

      img {
        width: 18px;
      }
    `,
    percentBar: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .percent {
        font-size: 24px;
        font-weight: bold;
      }

      .buttonGroup {
        display: flex;
        gap: 10px;

        svg {
          width: 22px;
          height: 22px;
        }

        img {
          width: 22px;
          height: 22px;
        }
      }
    `,
    accordionRoot: css`
      width: 100%;
      border-radius: 10px;
      padding: 0;
      background-color: #343a41;
      ::before {
        display: none;
      }
      &.Mui-expanded {
        margin: 0;
      }
    `,
    accordionSummary: css`
      .MuiAccordionSummary-content {
        display: flex;
        flex-direction: column;
      }
    `,
    accordionLeft: css`
      display: flex;
      flex-direction: row;
      align-items: center;
    `,
    content: css`
      margin: 0;
      padding: 10px 20px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: #3c4047;
    `,
  };
};
