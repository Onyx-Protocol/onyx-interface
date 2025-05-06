import { css } from '@emotion/react';
import { alpha, useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  const gradientPrimary = `linear-gradient(
    90deg,
    #214e81,
    #506179,
    #ed5409,
    #ffcb67,
    #ffcb67,
    #ed5409,
    #506179,
    #214e81
  )`;

  const commonContainerStyles = `
    width: 100%;
    min-height: 150px;

    ${theme.breakpoints.up('lg')} {
      max-width: 75%;
    }

    ${theme.breakpoints.up('xl')} {
      min-height: 250px;
      max-width: 66.666667%;
    }
  `;

  const gradientOverlay = `
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    display: block;
    background: linear-gradient(to top, ${theme.palette.background.default}, transparent);
    border-radius: inherit;
  `;

  const roundedXl = `${Number(theme.shape.borderRadius) * 3}px`;

  return {
    container: css`
      width: 100%;
      padding: ${theme.spacing(4)};
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${theme.spacing(4)};
      background: transparent;
    `,
    titleContainer: css`
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing(2)};
    `,

    titleText: css`
      font-size: 40px;
      line-height: 100%;
      font-weight: 700;
    `,

    howToEarnBefore: css`
      ${commonContainerStyles}
      position: relative;
      max-width: 90%;
      padding: ${theme.spacing(0.5)};
      border-radius: ${roundedXl};
      box-shadow: ${theme.shadows[2]};
      background-image: ${gradientPrimary} !important;

      &:before {
        ${gradientOverlay}
      }

      & > * {
        position: relative;
        z-index: 2;
      }
    `,

    howToEarnContainer: css`
      position: relative;
      z-index: 2;
      height: 100%;
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing(4)};
      padding: ${theme.spacing(4)} ${theme.spacing(6)};
      border-radius: ${roundedXl};
      background: ${theme.palette.background.paper};
    `,

    menuMobileButton: css`
      width: min-content;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,

    pointBeforeUserContainer: css`
      ${commonContainerStyles}
      position: relative;
      display: flex;
      border-radius: ${roundedXl};
      background-image: ${gradientPrimary};
    `,

    pointUserContainer: css`
      position: relative;
      display: flex;
      width: 100%;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing(2)};
      padding: ${theme.spacing(2)} ${theme.spacing(6.25)};
      border-radius: ${roundedXl};
      border: 2px solid rgba(255, 255, 255, 0.2);
      background-color: ${alpha(theme.palette.background.default, 0.7)};
      z-index: 2;

      @media (prefers-color-scheme: dark) {
        background-color: ${alpha(theme.palette.background.default, 0.9)};
      }
    `,
    topUserContainer: css`
      ${commonContainerStyles}
    `,
    topUserHeader: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    `,
    buttonStyle: css`
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing(2)};
      white-space: nowrap;
      transition: all 0.2s;
      width: fit-content;
      height: fit-content;
      padding: ${theme.spacing(2)} ${theme.spacing(5)};
      font-size: 16px;
      line-height: 1.5;
      font-weight: 600;
      border-radius: 9999px;
      background-color: white;
      color: black;
      outline: none;
      flex-shrink: 0;

      &:disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      &:focus-visible {
        border-color: var(--ring);
        ring: 3px var(--ring-ring) / 0.5;
      }

      &[aria-invalid='true'] {
        ring: var(--destructive) / 0.2;
        border-color: var(--destructive);
      }

      @media (prefers-color-scheme: dark) {
        &[aria-invalid='true'] {
          ring: var(--destructive) / 0.4;
        }
      }

      & svg {
        pointer-events: none;
        flex-shrink: 0;
        width: 16px;
        height: 16px;
      }

      &:has(> svg) {
        padding-left: ${theme.spacing(3)};
        padding-right: ${theme.spacing(3)};
      }
    `,
  };
};
