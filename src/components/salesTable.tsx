import { memo, useRef } from 'react';
import { useAccountantStore } from '@/stores/accountantStore';
import { ScrollArea } from './ui/scroll-area';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableActionBar,
} from '@/components/ui/table';
import {
  flexRender,
  HeaderGroup,
  Table as TableType,
} from '@tanstack/react-table';

import { Sale } from '@/types/components';

const TableHeaders = memo(function TableHeaders({
  headers,
}: {
  headers: HeaderGroup<Sale>[];
}) {
  return (
    <>
      {headers.map((headerGroup) =>
        headerGroup.headers.slice(1).map((header) => (
          <TableHead key={header.id} className="capitalize">
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        )),
      )}
    </>
  );
});

export default function SalesTable({
  table,
  columnsLength,
}: {
  table: TableType<Sale>;
  columnsLength: number;
}) {
  const accountant = useAccountantStore((state) => state.accountant);

  const { rows } = table.getRowModel();
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 15,
    overscan: 2,
  });

  return (
    <>
      <ScrollArea
        type="scroll"
        className="flex-1 border rounded-md"
        ref={parentRef}
      >
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <Table className="border-separate border-spacing-0">
            <TableHeader>
              <TableRow>
                {table
                  .getLeafHeaders()
                  .slice(0, 1)
                  .map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                <TableHeaders headers={table.getHeaderGroups()} />
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountant?.currently_representing && rows.length > 0 ? (
                virtualizer.getVirtualItems().map((virtualRow, index) => {
                  const row = rows[virtualRow.index];
                  return (
                    <TableRow
                      key={row.id}
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="max-w-[15vw] truncate"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <FallbackRow colspan={columnsLength} />
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
      <span className="px-2">showing {table.getRowCount()} results</span>
    </>
  );
}

const FallbackRow = ({ colspan }: { colspan: number }) => {
  return (
    <TableRow key="no-data-row" className="hover:bg-transparent">
      <TableCell
        key="no-data-cell"
        colSpan={colspan}
        className="h-96 text-xl text-center"
      >
        <span>No results.</span>
      </TableCell>
    </TableRow>
  );
};
