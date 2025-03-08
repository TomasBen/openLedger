import { useEffect, memo, useRef, useMemo } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useAccountantStore } from '@/stores/accountantStore';
import { useProductsStore } from '@/stores/tablesStore';
import { toast } from 'sonner';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ScrollArea } from './ui/scroll-area';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  HeaderGroup,
  ColumnDef,
} from '@tanstack/react-table';

import { Product } from '@/types/components';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { ArrowUpDown } from 'lucide-react';

const TableHeaders = memo(function TableHeaders({
  headers,
}: {
  headers: HeaderGroup<Product>[];
}) {
  return (
    <>
      {headers.map((headerGroup) =>
        headerGroup.headers
          .slice(1)
          .map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          )),
      )}
    </>
  );
});

export default function InventoryTable({ data }: { data: Product[] }) {
  const { rowSelection, setRowSelection, setTableInstance } =
    useProductsStore();
  const accountant = useAccountantStore((state) => state.accountant);

  useEffect(() => {
    setTableInstance(table);
  }, [data]);

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => {
          const handleCheckedChange = (value: boolean) => {
            row.toggleSelected(!!value);
          };

          return (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={handleCheckedChange}
              aria-label="Select row"
            />
          );
        },
        enableSorting: false,
        enableGlobalFilter: false,
        enableHiding: false,
      },
      {
        id: 'code',
        accessorKey: 'code',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Code
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="capitalize truncate">{row.getValue('code')}</span>
        ),
        sortingFn: 'alphanumeric',
        enableHiding: false,
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown />
          </Button>
        ),
      },
      {
        id: 'description',
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
          let description: string = row.getValue('description') ?? '-';
          return (
            <span className="text-muted-foreground truncate">
              {description}
            </span>
          );
        },
        sortingFn: 'text',
        enableSorting: false,
      },
      {
        id: 'amount',
        accessorKey: 'amount',
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => {
          let value: number = row.getValue('amount') ?? 0;
          return <span className="text-center truncate">{value}</span>;
        },
        sortingFn: 'basic',
      },
      {
        id: 'measure unit',
        accessorKey: 'measure_unit',
        header: () => <div className="text-center">Unit</div>,
        cell: ({ row }) => (
          <span className="text-center">{row.getValue('measure unit')}</span>
        ),
        sortingFn: 'text',
      },
      {
        id: 'currency',
        accessorKey: 'currency',
        header: () => <div className="text-center">Currency</div>,
        cell: ({ row }) => (
          <span className="text-center">{row.getValue('currency')}</span>
        ),
        sortingFn: 'text',
      },
      {
        id: 'price',
        accessorKey: 'price',
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="flex justify-end"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Price
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => {
          let price: number = row.getValue('price');
          const currency: string = row.getValue('currency');

          price === null ? (price = 0) : null;

          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
          }).format(price);

          return <span className="text-right">{formatted}</span>;
        },
        sortingFn: 'basic',
        enableGlobalFilter: false,
      },
      {
        id: 'storage unit',
        accessorKey: 'storage_unit',
        header: 'Storage',
        cell: ({ row }) => {
          let storage: string = row.getValue('storage unit') ?? '-';
          return storage;
        },
        enableGlobalFilter: false,
        enableSorting: false,
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row) => row.code,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
  });

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
                <FallbackRow colspan={columns.length} />
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
