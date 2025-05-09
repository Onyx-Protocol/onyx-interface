import { css } from '@emotion/react';

export const useStyles = () => ({
  root: css`
    margin: 0 auto;
    display: flex;
    width: 100%;
    justify-content: center;
  `,
  content: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `,
  link: css`
    background-color: rgba(31, 36, 44, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    padding: 0 8px;
    border-radius: 4px;
    transition: all 0.2s;
    font-size: 0.875rem;
  `,
});
