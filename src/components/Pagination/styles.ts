import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    root: css`
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: ${theme.spacing(5)} 0;
      ${theme.breakpoints.down('sm')} {
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
    itemsCountString: css`
      margin-right: ${theme.spacing(2)};
      white-space: nowrap;
      ${theme.breakpoints.down('sm')} {
        width: 100%;
        margin-right: 0;
        margin-bottom: ${theme.spacing(2)};
        text-align: center;
      }
    `,
    button: css`
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      padding: 0;
      background-color: ${theme.palette.background.paper};
      color: ${theme.palette.text.secondary};
      margin-left: ${theme.spacing(1)};
      margin-right: ${theme.spacing(1)};
      transition: color 0.3s;
      border-radius: ${theme.shape.borderRadius.verySmall}px;

      &:hover {
        color: ${theme.palette.text.primary}!important;
      }
    `,
    getButtonStyles: ({ isActive }: { isActive: boolean }) => css`
      color: ${isActive ? '#1db9a6' : theme.palette.text.secondary};
      background-color: ${isActive ? 'rgba(29, 185, 166, 0.1)' : theme.palette.background.paper};
      font-weight: ${isActive ? 600 : 400};

      &:hover {
        color: ${isActive ? '#1db9a6' : theme.palette.text.primary}!important;
        background-color: ${isActive ? 'rgba(29, 185, 166, 0.15)' : theme.palette.background.paper};
      }
    `,
    iconArrow: css`
      width: ${theme.shape.iconSize.xLarge}px;
      height: ${theme.shape.iconSize.xLarge}px;
    `,
    iconReverted: css`
      transform: rotate(180deg);
    `,
    dots: css`
      color: ${theme.palette.text.secondary};
      margin-left: ${theme.spacing(1)};
      margin-right: ${theme.spacing(1)};
    `,
  };
};
