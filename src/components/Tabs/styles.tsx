import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const styles = () => {
  const theme = useTheme();

  return {
    getContainer: ({ hasTitle }: { hasTitle: boolean }) => css`
      display: flex;
      margin-bottom: ${theme.spacing(8)};
      width: 100%;

      ${hasTitle &&
      css`
        align-items: center;

        ${theme.breakpoints.down('sm')} {
          display: block;
        }
      `}
    `,
    headerTitle: css`
      flex: 0 1 auto;
      margin-right: auto;
      padding-right: ${theme.spacing(4)};

      ${theme.breakpoints.down('sm')} {
        width: 100%;
        padding-right: 0;
        margin-bottom: ${theme.spacing(6)};
      }
    `,
    getButtonsContainer: ({ fullWidth }: { fullWidth: boolean }) => css`
      display: flex;
      align-items: center;

      ${theme.breakpoints.down('sm')} {
        width: 100%;
      }

      ${fullWidth &&
      css`
        width: 100%;
      `}
    `,
    getButton: ({ active, fullWidth }: { active: boolean; fullWidth: boolean }) => css`
      :hover:not(:disabled),
      :active:not(:disabled) {
        background-color: transparent;
        border-color: transparent;
        border-bottom: 1px solid ${theme.palette.text.primary};
        color: ${theme.palette.text.primary};
      }

      background-color: transparent;
      border-color: transparent;
      border-radius: 0;
      border-bottom: 1px solid #29a696;

      ${fullWidth &&
      css`
        flex: 1;
      `}

      ${!active &&
      css`
        background-color: transparent;
        border-color: transparent;

        :not(:hover, :active) {
          color: ${theme.palette.text.secondary};
        }

        :hover {
          color: ${theme.palette.text.secondary};
        }

        border-bottom: 1px solid #8f9195;
      `};

      ${theme.breakpoints.down('sm')} {
        flex: 1;
      }
    `,
  };
};

export default styles;
