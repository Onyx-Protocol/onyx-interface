import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    root: css``,
    paper: css`
      padding: 12px;
    `,
    table: css`
      background-color: ${theme.palette.background.paper};
      border-radius: 12px;
      table-layout: fixed;
      width: 100%;
    `,
    tableCell: css`
      border: none;
      padding: ${theme.spacing(2)};
      white-space: nowrap;
      font-size: 0.875rem;
    `,
    animatedRow: css`
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: start;
      background-color: ${theme.palette.background.paper};
      transition: ${theme.transitions.create(['background-color'])};
      &:hover {
        background-color: ${theme.palette.action.hover};
      }
    `,
    container: css`
      position: relative;
      overflow: hidden;
      min-height: 200px;
    `,
  };
};
