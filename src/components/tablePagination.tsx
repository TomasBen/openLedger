import { memo } from 'react';
import { Button } from './ui/button';
import { Table } from '@tanstack/react-table';
import { Product } from './inventoryTable';
import { Separator } from './ui/separator';

export const TablePagination = memo(function TablePagination({
  table,
}: {
  table: Table<Product>;
}) {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous Page
      </Button>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next Page
      </Button>
      <Separator orientation="vertical" />
      <span>
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </span>
    </div>
  );
});
