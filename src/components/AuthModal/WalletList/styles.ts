import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    theme,
    container: css`
      margin: ${theme.spacing(0, 8)};

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
        column-gap: ${theme.spacing(3)};
        margin: ${theme.spacing(4)};
      }
    `,
    logoContainer: css`
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: ${theme.spacing(3)};
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    `,

    getListItem: ({ isActionable }: { isActionable: boolean }) => css`
      box-shadow: none;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 16px;
      padding: ${theme.spacing(1)};
      text-align: center;
      width: 100%;
      height: 125px;
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      svg {
        margin-top: 5px;
        fill: white;
      }
      margin: 0 auto;

      ${theme.breakpoints.down('md')} {
        width: 100%;
        height: 125px;
      }

      ${theme.breakpoints.down('sm')} {
        width: 100%;
        height: 120px;
      }

      ${isActionable &&
      css`
        cursor: pointer;
        transition: all 0.3s ease;

        :hover {
          background: linear-gradient(
            123.08deg,
            rgba(29, 185, 166, 0.1) -33.26%,
            rgba(29, 185, 166, 0.3) 88.39%
          );
          color: white;
          transform: translateY(-2px);

          svg {
            fill: white;
          }
        }
      `}
    `,
    logo: css`
      display: block;
      height: 33px;
      margin: ${theme.spacing(0, 'auto', 4)};
    `,
    logoClosed: css`
      display: none;
      margin: ${theme.spacing(0, 'auto', 4)};
      ${theme.breakpoints.down('lg')} {
        display: block;
        height: 36px;
      }
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
