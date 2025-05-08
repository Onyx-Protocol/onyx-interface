/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from '@emotion/react';
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

import { Pagination } from './Pagination';
import { useStyles } from './style';

export interface AnimatedTableRowProps {
  children: React.ReactNode;
  rank: number;
  prevRank: number;
}

const AnimatedTableRow: React.FC<AnimatedTableRowProps> = ({ children, rank }) => {
  const styles = useStyles();
  return (
    <Box
      css={[
        styles.animatedRow,
        css`
          top: ${rank * 48}px;
        `,
      ]}
    >
      {children}
    </Box>
  );
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  isPaginated: boolean;
  isLoading?: boolean;
  loadingNumber?: number;
  cellClasses?: SerializedStyles[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  currentPage,
  setCurrentPage,
  totalPage,
  isPaginated,
  isLoading,
  loadingNumber = 10,
  cellClasses = [],
}: DataTableProps<TData, TValue>) {
  const styles = useStyles();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRow = (row: TData) => row as any;

  return (
    <Box css={styles.root}>
      <Paper elevation={2} css={styles.paper}>
        <Table css={styles.table}>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableCell
                    key={header.id}
                    css={[
                      styles.tableCell,
                      css`
                        ${index === 0 ? 'padding-left: 24px;' : ''}
                        ${index === headerGroup.headers.length ? 'padding-right: 24px;' : ''}
                        ${cellClasses[index] || ''}
                      `,
                    ]}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {!isLoading && !table.getRowModel().rows?.length && (
              <TableRow>
                <TableCell
                  css={styles.tableCell}
                  colSpan={columns.length}
                  sx={{ height: '96px', textAlign: 'center' }}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}

            {isLoading &&
              Array.from({ length: loadingNumber }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow key={`row-${index}`}>
                  {
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    Array.from({ length: columns.length }).map((_, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <TableCell key={index} css={styles.tableCell}>
                        <Skeleton variant="rectangular" height={32} />
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {!isLoading && table.getRowModel().rows?.length > 0 && (
          <div css={styles.container}>
            {table.getRowModel().rows.map(row => (
              <AnimatedTableRow
                key={`${getRow(row.original).address}-${getRow(row.original).rank}`}
                rank={getRow(row.original).rank}
                prevRank={getRow(row.original).prevRank}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <div key={cell.id} css={cellClasses[index] || ''}>
                    <Box position="relative">
                      <Box position="relative" zIndex={1}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Box>
                    </Box>
                  </div>
                ))}
              </AnimatedTableRow>
            ))}
          </div>
        )}
      </Paper>

      {isPaginated && (
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        </Box>
      )}
    </Box>
  );
}
