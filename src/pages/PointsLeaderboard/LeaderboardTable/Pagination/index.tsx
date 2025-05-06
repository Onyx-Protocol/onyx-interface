/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import SvgChevronLeft from 'components/Icon/icons/chevronLeft';
import SvgChevronRight from 'components/Icon/icons/chevronRight';
import { MoreHorizontalIcon } from 'components/Icon/icons/moreHorizontalIcon';

import { useStyles } from './styles';

// Remove cn import

const PaginationButton = styled(IconButton, {
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  ...(isActive && {
    backgroundColor: 'rgb(30, 185, 166)',
    color: 'rgb(30, 185, 166)',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

const EllipsisContainer = styled('span')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
`;

const SrOnlySpan = styled('span')`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const PaginationList = styled('ul')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const PaginationListItem = styled('li')`
  list-style: none;
`;

function PaginationComponent({ className, ...props }: React.ComponentProps<'nav'>) {
  const styles = useStyles();
  return (
    <nav role="navigation" aria-label="pagination" css={[styles.root, className]} {...props} />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return <PaginationList className={className} {...props} />;
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <PaginationListItem {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  size?: 'small' | 'medium';
} & React.ComponentProps<typeof IconButton>;

function PaginationLink({ className, isActive, size = 'medium', ...props }: PaginationLinkProps) {
  const styles = useStyles();
  return (
    <PaginationButton isActive={isActive} size={size} css={[styles.link, className]} {...props} />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to previous page" className={className} {...props}>
      <SvgChevronLeft />
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" className={className} {...props}>
      <SvgChevronRight />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <EllipsisContainer aria-hidden className={className} {...props}>
      <MoreHorizontalIcon />
      <SrOnlySpan>More pages</SrOnlySpan>
    </EllipsisContainer>
  );
}

const DisabledButton = styled('div')<{ disabled: boolean }>`
  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
      font-size: 0.875rem;
    `}
`;

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  className?: string;
}

export const Pagination = ({ currentPage, setCurrentPage, totalPage, className }: Props) => {
  const renderPageNumbers = () => {
    const pages = [];
    const adjacentPages = 1;

    let startPage = Math.max(1, currentPage - adjacentPages);
    let endPage = Math.min(totalPage, currentPage + adjacentPages);

    if (currentPage === 1) endPage = Math.min(2, totalPage);
    if (currentPage === totalPage) startPage = Math.max(totalPage - 1, 1);

    if (startPage > 1) {
      pages.push(
        <PaginationItem key={0}>
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => setCurrentPage(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPage) {
      pages.push(
        <PaginationItem key={totalPage + 1}>
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }
    return pages;
  };

  return (
    <PaginationComponent className={className}>
      <PaginationContent>
        <PaginationItem>
          <DisabledButton disabled={currentPage === 1}>
            <PaginationPrevious
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
            />
          </DisabledButton>
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <DisabledButton disabled={currentPage === totalPage}>
            <PaginationNext
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage))}
              aria-disabled={currentPage === totalPage}
              tabIndex={currentPage === totalPage ? -1 : undefined}
            />
          </DisabledButton>
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
};

export {
  PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
