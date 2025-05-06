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

  const liquidKeyframes = {
    liquid1: `
      @keyframes liquid1 {
        0%, 100% {
          clip-path: polygon(
            0 30%, 15% 28%, 34% 35%, 50% 45%, 
            68% 50%, 85% 45%, 100% 35%, 100% 100%, 0% 100%
          );
        }
        50% {
          clip-path: polygon(
            3% 40%, 17% 50%, 36% 55%, 51% 50%,
            65% 40%, 81% 35%, 99% 30%, 100% 100%, 0% 100%
          );
        }
      }
    `,
    liquid2: `
      @keyframes liquid2 {
        0%, 100% {
          clip-path: polygon(
            0 30%, 15% 28%, 34% 35%, 50% 45%,
            68% 50%, 85% 45%, 100% 35%, 100% 100%, 0% 100%
          );
        }
        50% {
          clip-path: polygon(
            3% 40%, 17% 50%, 36% 55%, 51% 50%,
            65% 40%, 81% 35%, 99% 30%, 100% 100%, 0% 100%
          );
        }
      }
    `,
    liquid3: `
      @keyframes liquid3 {
        0%, 100% {
          clip-path: polygon(
            0 30%, 15% 28%, 34% 35%, 50% 45%,
            68% 50%, 85% 45%, 100% 35%, 100% 100%, 0% 100%
          );
        }
        50% {
          clip-path: polygon(
            3% 40%, 17% 50%, 36% 55%, 51% 50%,
            65% 40%, 81% 35%, 99% 30%, 100% 100%, 0% 100%
          );
        }
      }
    `,
  };

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
    z-index: 0;
    display: block;
    background: linear-gradient(to top, ${theme.palette.background.default}, transparent);
    border-radius: inherit;
  `;

  const roundedXl = `${Number(theme.shape.borderRadius) * 3}px`;

  return {
    container: css`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${theme.spacing(4)};
      background: transparent;
      padding: 0;
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
      padding: ${theme.spacing(0.5)};
      border-radius: ${roundedXl};
      box-shadow: ${theme.shadows[2]};
      background-image: ${gradientPrimary} !important;

      &:before {
        ${gradientOverlay}
      }

      & > * {
        position: relative;
        z-index: 0;
      }
    `,
    leaderBoard: css`
      ${commonContainerStyles}
      position: relative;
    `,

    howToEarnContainer: css`
      position: relative;
      z-index: 0;
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
      padding-right: ${theme.spacing(6.25)};
      padding-left: ${theme.spacing(6.25)};
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing(2)};
      padding: ${theme.spacing(2)} ${theme.spacing(6.25)};
      border-radius: ${roundedXl};
      border: 2px solid rgba(255, 255, 255, 0.2);
      background-color: ${alpha(theme.palette.background.default, 0.7)};
      z-index: 0;

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
    enrollButton: css`
      width: fit-content;
      height: fit-content;
      border-radius: 9999px;
      background-color: white;
      color: black;
    `,
    pointsContainer: css`
      position: relative;
      display: flex;
      min-height: 90px;
      width: 100%;
      min-width: 60px;
      align-items: center;
      justify-content: center;
    `,
    pointsText: css`
      font-size: clamp(20px, 6vw, 40px);
      color: white;
      text-shadow: -1px 1px 0px #183954, -2px 2px 0px #183954, -3px 3px 0px #183954,
        -4px 4px 0px #183954, -9px 9px 10px rgba(0, 0, 0, 0.5), -9px 9px 25px rgba(0, 0, 0, 0.5);
      ${theme.breakpoints.up('md')} {
        font-size: clamp(30px, 5vw, 55px); // tablet/laptop nhỏ
      }
      ${theme.breakpoints.up('lg')} {
        font-size: clamp(45px, 4vw, 70px); // laptop lớn
      }
      ${theme.breakpoints.up('xl')} {
        font-size: clamp(60px, 3.5vw, 90px); // desktop
      }
    `,
    liquidText1: css`
      ${liquidKeyframes.liquid1}
      position: absolute;
      font-size: clamp(20px, 6vw, 40px);
      color: #2196f3;
      opacity: 0.5;
      animation: liquid1 3s ease-in-out infinite;
      ${theme.breakpoints.up('md')} {
        font-size: clamp(30px, 5vw, 55px); // tablet/laptop nhỏ
      }
      ${theme.breakpoints.up('lg')} {
        font-size: clamp(45px, 4vw, 70px); // laptop lớn
      }
      ${theme.breakpoints.up('xl')} {
        font-size: clamp(60px, 3.5vw, 90px); // desktop
      }
    `,
    liquidText2: css`
      ${liquidKeyframes.liquid2}
      position: absolute;
      font-size: clamp(20px, 6vw, 40px);
      color: #2196f3;
      opacity: 0.5;
      animation: liquid2 6s ease-in-out infinite;
      ${theme.breakpoints.up('md')} {
        font-size: clamp(30px, 5vw, 55px); // tablet/laptop nhỏ
      }
      ${theme.breakpoints.up('lg')} {
        font-size: clamp(45px, 4vw, 70px); // laptop lớn
      }
      ${theme.breakpoints.up('xl')} {
        font-size: clamp(60px, 3.5vw, 90px); // desktop
      }
    `,
    liquidText3: css`
      ${liquidKeyframes.liquid3}
      position: absolute;
      font-size: clamp(20px, 6vw, 40px);
      color: #2196f3;
      animation: liquid3 4s ease-in-out infinite;
      ${theme.breakpoints.up('md')} {
        font-size: clamp(30px, 5vw, 55px); // tablet/laptop nhỏ
      }
      ${theme.breakpoints.up('lg')} {
        font-size: clamp(45px, 4vw, 70px); // laptop lớn
      }
      ${theme.breakpoints.up('xl')} {
        font-size: clamp(60px, 3.5vw, 90px); // desktop
      }
    `,
    buttonIconStyle: css`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing(2)};
      color: ${theme.palette.primary.main};
      font-size: ${theme.typography.fontSize * 0.875}px;
      font-weight: 600; // font-semibold

      & > svg {
        height: 16px;
        width: 16px;
      }
    `,
  };
};
