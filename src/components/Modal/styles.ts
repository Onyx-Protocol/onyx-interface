import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import React from 'react';

import { ThemeContext } from 'context/ThemeContext';

export const useModalStyles = ({
  hasTitleComponent,
  noHorizontalPadding,
}: {
  hasTitleComponent: boolean;
  noHorizontalPadding?: boolean;
}) => {
  const theme = useTheme();
  const { mode: themeMode } = React.useContext(ThemeContext);

  return {
    modal: css`
      background: ${themeMode === 'dark'
        ? `linear-gradient(
        115.84deg,
        rgba(30, 62, 78, 0.51) -25.32%,
        rgba(255, 255, 255, 0.16) 110.71%
      );`
        : 'linear-gradient(115.84deg, rgba(30, 62, 78, 0.51) -25.32%, rgba(255, 255, 255, 0.16) 110.71%);'};
      backdrop-filter: blur(35px);
    `,
    box: css`
      position: absolute;
      top: 50%;
      left: calc(50% + ${theme.shape.drawerWidthDesktop});
      transform: translate(calc(-50% - (${theme.shape.drawerWidthDesktop}) / 2), -50%);
      ${theme.breakpoints.down('lg')} {
        left: calc(50% + ${theme.shape.drawerWidthTablet});
        transform: translate(calc(-50% - (${theme.shape.drawerWidthTablet}) / 2), -50%);
      }
      ${theme.breakpoints.down('md')} {
        left: 50%;
        transform: translate(-50%, -50%);
      }
      width: calc(100% - ${theme.spacing(8)});
      max-width: ${theme.spacing(136)};
      border-radius: ${theme.spacing(6)};
      overflow: auto;
      max-height: calc(100% - ${theme.spacing(8)});
    `,
    titleWrapper: css`
      padding-left: ${theme.spacing(6)};
      padding-right: ${theme.spacing(6)};
      padding-top: ${theme.spacing(6)};
      padding-bottom: ${hasTitleComponent ? theme.spacing(6) : 0};
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: start;
    `,
    backAction: css`
      position: absolute;
      left: ${theme.spacing(6)};
      padding: 0;
      min-width: auto;
      background-color: transparent;

      :hover {
        background-color: transparent;
      }
    `,
    backArrow: css`
      transform: rotate(180deg);
      height: ${theme.shape.iconSize.xLarge}px;
      width: ${theme.shape.iconSize.xLarge}px;
      color: ${theme.palette.text.primary};
    `,
    titleComponent: css`
      align-self: center;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: ${theme.shape.iconSize.xLarge}px;
      padding-left: ${theme.shape.iconSize.xLarge}px;
      padding-right: ${theme.shape.iconSize.xLarge}px;
      font-size: ${theme.typography.h4.fontSize};
      font-weight: ${theme.typography.h4.fontWeight};
      margin-top: 25px;
    `,
    closeIcon: css`
      right: ${theme.spacing(6)};
      top: ${theme.spacing(6)};
      position: absolute;
      height: ${theme.shape.iconSize.xLarge}px;
      width: ${theme.shape.iconSize.xLarge}px;
      margin-left: auto;
      min-width: 0;
      padding: 0;
      background-color: transparent;

      :hover {
        background-color: transparent;
      }
    `,
    contentWrapper: css`
      padding-bottom: ${theme.spacing(10)};
      padding-left: ${noHorizontalPadding ? 0 : theme.spacing(10)};
      padding-right: ${noHorizontalPadding ? 0 : theme.spacing(10)};
      ${theme.breakpoints.down('md')} {
        padding-bottom: ${theme.spacing(4)};
        padding-left: ${noHorizontalPadding ? 0 : theme.spacing(4)};
        padding-right: ${noHorizontalPadding ? 0 : theme.spacing(4)};
      }
    `,
  };
};
