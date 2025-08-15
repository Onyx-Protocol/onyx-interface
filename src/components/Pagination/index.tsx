/** @jsxImportSource @emotion/react */
import { SerializedStyles } from '@emotion/react';
import Typography from '@mui/material/Typography';
import React, { ReactElement } from 'react';

import { Button } from '../Button';
import { Icon, IconProps } from '../Icon';
import { useStyles } from './styles';
import { usePagination } from './usePagination';

interface PaginationButtonProps {
  className?: string;
  onClick: () => void;
  children: number | ReactElement | string;
  variant?: 'primary' | 'secondary' | 'text';
  small?: boolean;
  customCss?: SerializedStyles; // Add custom CSS prop with proper type
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  className,
  onClick,
  children,
  variant = 'text',
  small = false,
  customCss,
}) => {
  const styles = useStyles();
  return (
    <Button
      variant={variant}
      css={[styles.button, customCss]}
      className={className}
      onClick={onClick}
      small={small}
    >
      {children}
    </Button>
  );
};

interface PaginationProps {
  itemsCount: number;
  onChange: (newPageIndex: number) => void;
  initialPageIndex?: number;
  itemsPerPageCount?: number;
  className?: string;
  showJumpButtons?: boolean; // New prop to enable/disable +10/-10 buttons
  jumpStep?: number; // Customizable jump step (default 10)
}

export const Pagination = ({
  itemsCount,
  onChange,
  initialPageIndex,
  itemsPerPageCount,
  className,
  showJumpButtons = true,
  jumpStep = 10,
}: PaginationProps) => {
  const {
    pagesCount,
    activePageIndex,
    goToPageByIndex,
    itemsCountString,
    pagesArray,
    minPageIndexToShow,
    maxPageIndexToShow,
  } = usePagination({
    itemsCount,
    onChange,
    initialPageIndex,
    itemsPerPageCount,
  });

  const styles = useStyles();

  if (pagesCount <= 1) {
    return null;
  }

  const iconProps: IconProps = { name: 'arrowRight', color: 'inherit' };

  // Helper functions for jump navigation
  const canJumpBackward = activePageIndex >= jumpStep;
  const canJumpForward = activePageIndex < pagesCount - jumpStep;

  const handleJumpBackward = () => {
    const newPageIndex = Math.max(0, activePageIndex - jumpStep);
    goToPageByIndex(newPageIndex);
  };

  const handleJumpForward = () => {
    const newPageIndex = Math.min(pagesCount - 1, activePageIndex + jumpStep);
    goToPageByIndex(newPageIndex);
  };

  return (
    <div className={className} css={styles.root}>
      <Typography css={styles.itemsCountString}>{itemsCountString}</Typography>

      {/* Jump backward button */}
      {showJumpButtons && canJumpBackward && (
        <PaginationButton onClick={handleJumpBackward} variant="text" small>
          {`-${jumpStep}`}
        </PaginationButton>
      )}

      {/* Previous page button */}
      {activePageIndex > 0 && (
        <PaginationButton onClick={() => goToPageByIndex(activePageIndex - 1)}>
          <Icon css={[styles.iconArrow, styles.iconReverted]} {...iconProps} />
        </PaginationButton>
      )}

      {/* Page number buttons */}
      {pagesArray.map((page, index) => {
        // Skip rendering navigation arrows in the original positions
        if (index === maxPageIndexToShow || index === minPageIndexToShow) {
          return null;
        }

        if (index < minPageIndexToShow || index > maxPageIndexToShow) {
          return null;
        }

        return (
          <PaginationButton
            key={page}
            onClick={() => goToPageByIndex(index)}
            className={index === activePageIndex ? 'active' : ''}
            customCss={styles.getButtonStyles({ isActive: index === activePageIndex })}
          >
            {page}
          </PaginationButton>
        );
      })}

      {/* Next page button */}
      {activePageIndex < pagesCount - 1 && (
        <PaginationButton onClick={() => goToPageByIndex(activePageIndex + 1)}>
          <Icon css={styles.iconArrow} {...iconProps} />
        </PaginationButton>
      )}

      {/* Jump forward button */}
      {showJumpButtons && canJumpForward && (
        <PaginationButton onClick={handleJumpForward} variant="text" small>
          {`+${jumpStep}`}
        </PaginationButton>
      )}
    </div>
  );
};
