import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

import imgMark from 'assets/img/mark.svg';

export const SELECTED_MENU_ITEM_CLASSNAME = 'SELECTED_MENU_ITEM_CLASSNAME';
export const useStyles = () => {
  const theme = useTheme();

  return {
    root: ({ isOpen, buttonVariant, showOnlyImage }: { isOpen: boolean; buttonVariant?: boolean; showOnlyImage?: boolean }) => {
      let borderColor = 'transparent';
      if (isOpen) {
        borderColor = theme.palette.interactive.primary;
      } else if (buttonVariant) {
        borderColor = `${theme.palette.button.wallet}60`;
      }

      return css`
        background-color: ${buttonVariant
          ? `${theme.palette.button.wallet}1A`
          : theme.palette.secondary.light};
        border-radius: ${buttonVariant ? '25px' : `${theme.shape.borderRadius.small}px`};
        border: 1px solid ${borderColor};
        width: 100%;
        color: ${buttonVariant ? theme.palette.button.wallet : 'inherit'};
        transition: ${buttonVariant ? 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' : 'none'};
        ${buttonVariant &&
        css`
          box-sizing: border-box;
          ${showOnlyImage && css`
            width: 44px;
            min-width: 44px;
            padding: 0;
            
            > div {
              padding: ${theme.spacing(2)};
              justify-content: center;
            }
          `}
        `}
        > div {
          padding: ${buttonVariant ? theme.spacing(2, 6) : theme.spacing(3, 4)};
          display: flex;
          align-items: center;
          justify-content: ${showOnlyImage ? 'center' : 'flex-start'};
        }

        ${buttonVariant &&
        css`
          :hover {
            background-color: ${theme.palette.button.wallet}30;
            border-color: ${theme.palette.button.wallet}80;
          }
        `}
      `;
    },
    getArrowIcon: ({ isMenuOpened }: { isMenuOpened: boolean }) => css`
      position: absolute;
      right: ${theme.spacing(4)};
      width: ${theme.spacing(3)};
      transition: transform 0.3s;
      transform: rotate(${isMenuOpened ? '180deg' : '0'});
    `,
    image: css`
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 8px;
      object-fit: cover;
    `,
    menuItem: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${theme.palette.text.primary};

      &:active,
      &:hover,
      &:focus {
        background-color: ${theme.palette.background.default};

        ${theme.breakpoints.down('sm')} {
          background-color: ${theme.palette.secondary.light};
        }
      }

      &.${SELECTED_MENU_ITEM_CLASSNAME} {
        background-color: ${theme.palette.background.default}!important;

        ${theme.breakpoints.down('sm')} {
          background-color: ${theme.palette.secondary.light}!important;
        }

        /* check mark for selected item */
        &::after {
          content: '';
          background-image: url(${imgMark});
          background-size: cover;
          width: 12px;
          height: 8px;
        }
      }
      ${theme.breakpoints.down('sm')} {
        padding-top: 0;
      }
    `,
    mobileHeader: css`
      display: none;

      ${theme.breakpoints.down('sm')} {
        padding: ${theme.spacing(6, 4)};
        display: flex;
        align-items: center;
        justify-content: center;
        position: sticky;
        top: 0;
        background-color: ${theme.palette.background.paper};
        z-index: 1;
        border-bottom: 1px solid ${theme.palette.secondary.light};
      }
    `,
    closeMenuButton: css`
      position: absolute;
      right: 0;
    `,

    /* styles passed as MenuProps are not recognized if we pass them as emotion SerializedStyles */
    menuWrapper: {
      backgroundColor: theme.palette.background.paper,
      padding: 0,
      borderRadius: '12px',
      marginTop: theme.spacing(2),
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
      overflow: 'hidden',
      width: '170px',

      [theme.breakpoints.down('sm')]: {
        minWidth: 'calc(100vw)',
        minHeight: 'calc(100% - 56px) !important',
        backgroundColor: theme.palette.background.paper,
        borderRadius: `${theme.shape.borderRadius.large}px`,
        boxShadow: 'none',
        width: 'auto',
      },
    },
  };
};
