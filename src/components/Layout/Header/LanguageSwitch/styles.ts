import { css } from '@emotion/react';

export const useStyles = () => ({
  select: css`
    min-width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  itemIcon: css`
    margin-right: 10px;
  `,
  item: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
});
