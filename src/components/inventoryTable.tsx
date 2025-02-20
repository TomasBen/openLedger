import { useCallback, useEffect, useMemo, useState, memo, useRef } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useAccountantStore } from '@/stores/accountantStore';
import { useTableStore } from '@/stores/tablesStore';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  ColumnDef,
  HeaderGroup,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

export interface Product {
  code: string;
  name?: string;
  description?: string;
  amount?: number;
  measure_unit?: string;
  price?: number;
  currency?: string;
  storage_unit?: string;
}

const TableHeaders = memo(function TableHeaders({
  headers,
}: {
  headers: HeaderGroup<Product>[] | undefined;
}) {
  return (
    <>
      {headers?.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </>
  );
});

export default function InventoryTable() {
  const [data, setData] = useState<Product[]>([]);
  const { tableInstance, updateTableInstance } = useTableStore();
  const { accountant } = useAccountantStore();

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
          const handleCheckedChange = useCallback(
            (value: boolean) => {
              row.toggleSelected(!!value);
            },
            [row],
          );

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
          <div className="capitalize truncate">{row.getValue('code')}</div>
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
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
          <div className="text-muted-foreground truncate">
            {row.getValue('description')}
          </div>
        ),
        sortingFn: 'text',
        enableSorting: false,
      },
      {
        id: 'amount',
        accessorKey: 'amount',
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="w-full flex justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-center truncate">{row.getValue('amount')}</div>
        ),
        sortingFn: 'basic',
      },
      {
        id: 'measure_unit',
        accessorKey: 'measure_unit',
        header: () => <div className="text-center">Unit</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('measure_unit')}</div>
        ),
        sortingFn: 'text',
      },
      {
        id: 'currency',
        accessorKey: 'currency',
        header: () => <div className="text-center">Currency</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('currency')}</div>
        ),
        sortingFn: 'text',
      },
      {
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

          return <div className="text-right">{formatted}</div>;
        },
        sortingFn: 'basic',
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'storage_unit',
        header: 'Storage',
        enableGlobalFilter: false,
        enableSorting: false,
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data,
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

  useEffect(() => {
    const getProducts = async () => {
      const results: Product[] = await invoke('get_products', {
        entity: accountant?.currently_representing?.name,
      });

      setData(results);
      updateTableInstance(table);
    };

    getProducts();
  }, [accountant?.currently_representing]);

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
              <TableHeaders headers={tableInstance?.getHeaderGroups()} />
            </TableHeader>
            <TableBody>
              {rows?.length ? (
                accountant?.currently_representing ? (
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
                  <TableRow key="no-data-row" className="hover:bg-transparent">
                    <TableCell
                      colSpan={columns.length}
                      key="no-data-cell"
                      height={parentRef.current?.clientHeight}
                      className="min-h-0 border-t text-xl text-center"
                    >
                      <span>Select an entity to start</span>
                      <br />
                      <span>
                        Open entity selector
                        <Badge variant="secondary" className="mx-2">
                          Cntrl
                        </Badge>
                        +
                        <Badge variant="secondary" className="mx-2">
                          P
                        </Badge>
                      </span>
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow key="no-data-row" className="hover:bg-transparent">
                  <TableCell
                    colSpan={columns.length}
                    key="no-data-cell"
                    height={parentRef.current?.clientHeight}
                    className="min-h-0 border-t text-xl text-center"
                  >
                    <span>No results.</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
      {accountant?.currently_representing ? (
        <span className="text-center">
          showing {table.getRowCount()} results
        </span>
      ) : (
        <span className="text-center">showing 0 results</span>
      )}
    </>
  );
}
