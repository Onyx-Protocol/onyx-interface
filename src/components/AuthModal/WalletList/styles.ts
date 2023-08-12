import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    theme,
    container: css`
      margin: ${theme.spacing(0, 10)};

      ${theme.breakpoints.down('md')} {
        margin: ${theme.spacing(-2, 4, 0)};
      }
    `,
    walletList: css`
      margin-bottom: ${theme.spacing(8)};
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: ${theme.spacing(4)};
      align-items: start;

      ${theme.breakpoints.down('md')} {
        grid-template-columns: 1fr 1fr;
        row-gap: ${theme.spacing(2)};
        column-gap: ${theme.spacing(0)};
        margin: ${theme.spacing(4)};
      }
    `,
    getListItem: ({ isActionable }: { isActionable: boolean }) => css`
      box-shadow: none;
      border: 0;
      border-radius: ${theme.shape.borderRadius.small}px;
      padding: ${theme.spacing(2)};
      text-align: center;
      width: 200px;
      height: 135px;
      background-color: #eeeff0;
      color: #343a41;
      svg {
        margin-top: 5px;
        fill: #343a41;
      }
      margin: 0 auto;

      ${theme.breakpoints.down('md')} {
        width: 150px;
        height: 125px;
      }

      ${theme.breakpoints.down('sm')} {
        width: 125px;
        height: 120px;
      }

      ${isActionable &&
      css`
        cursor: pointer;

        :hover {
          background: linear-gradient(123.08deg, rgba(29, 185, 166, 0.2) -33.26%, #1db9a6 88.39%);
          color: white;

          svg {
            fill: white;
          }
        }
      `}
    `,
    walletLogo: css`
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      margin: ${theme.spacing(0, 'auto', 1)};
      display: block;

      ${theme.breakpoints.down('md')} {
        width: ${theme.spacing(10)};
      }
    `,
    comingSoonText: css`
      color: ${theme.palette.text.secondary};
    `,
    footer: css`
      text-align: center;
      padding: ${theme.spacing(0, 4)};
    `,
    footerLink: css`
      color: ${theme.palette.button.main};

      :hover {
        color: ${theme.palette.button.medium};
      }

      :active {
        color: ${theme.palette.button.dark};
      }
    `,
  };
};
