import { css } from '@emotion/react';

export const useStyles = () => ({
  container: css`
    width: 100%;
    margin-bottom: 20px;
  `,
  punkList: css`
    display: flex;
    flex-wrap: wrap;
    max-height: 380px;
    overflow: auto;
  `,
  nftItem: css`
    position: relative;
    width: 40%;
    max-width: 160px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
  `,
  nftImg: css`
    width: 100%;
    border-radius: 8px 8px 0 0;
  `,
  tokenId: css`
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
    margin-top: 8px;
  `,
  button: css`
    height: 51px;
    margin-top: 10px;
    background: linear-gradient(123.08deg, rgba(29, 185, 166, 0.2) -33.26%, #1db9a6 88.39%);
    border-radius: 10px;
  `,
  topTitle: css`
    font-size: 1.25rem;
    margin-bottom: 15px;
  `,
});
