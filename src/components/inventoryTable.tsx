import { useCallback, useEffect, useMemo, useState, memo, useRef } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useAccountantStore } from '@/stores/accountantStore';
import { useProductTableStore } from '@/stores/tablesStore';
import { toast } from 'sonner';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';
import { ArrowUpDown } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableActionMenu,
} from '@/components/ui/table';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  HeaderGroup,
} from '@tanstack/react-table';

import { ActionButton } from '@/types/components';
import { FileDown, Trash2 } from 'lucide-react';

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

export default function InventoryTable() {
  const [data, setData] = useState<Product[]>([]);
  const { rowSelection, setRowSelection, setTableInstance } =
    useProductTableStore();
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
        id: 'description',
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
            className="text-center"
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
        id: 'measure unit',
        accessorKey: 'measure_unit',
        header: () => <div className="text-center">Unit</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('measure unit')}</div>
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

          return <div className="text-right">{formatted}</div>;
        },
        sortingFn: 'basic',
        enableGlobalFilter: false,
      },
      {
        id: 'storage unit',
        accessorKey: 'storage_unit',
        header: 'Storage',
        enableGlobalFilter: false,
        enableSorting: false,
      },
    ],
    [],
  );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const results: Product[] = await invoke('get_products', {
          entity: accountant?.currently_representing?.name,
        });

        setData(results);
        setTableInstance(table);
      } catch (error) {
        toast.error('Error', {
          richColors: true,
          description: `${error}`,
        });
      }
    };

    getProducts();
  }, [accountant?.currently_representing]);

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

  const actionButtons: ActionButton[] = [
    {
      name: 'export rows',
      icon: FileDown,
      action: () => console.log('export rows'),
    },
    {
      name: 'delete rows',
      icon: Trash2,
      action: () => console.log('delete rows'),
    },
  ];

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
              {accountant?.currently_representing ? (
                rows.length > 0 ? (
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
                  <NoDataRow
                    colspan={columns.length}
                    height={parentRef.current?.clientHeight}
                  />
                )
              ) : (
                <NoEntitySelectedRow
                  colspan={columns.length}
                  height={parentRef.current?.clientHeight}
                />
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
      <span className="px-2">showing {table.getRowCount()} results</span>
      <TableActionMenu actionButtons={actionButtons} />
    </>
  );
}

const NoDataRow = ({
  colspan,
  height,
}: {
  colspan: number;
  height: number | undefined;
}) => {
  return (
    <TableRow key="no-data-row" className="hover:bg-transparent">
      <TableCell
        colSpan={colspan}
        key="no-data-cell"
        height={height}
        className="min-h-24 border-t text-xl text-center"
      >
        <span>No results.</span>
      </TableCell>
    </TableRow>
  );
};

const NoEntitySelectedRow = ({
  colspan,
  height,
}: {
  colspan: number;
  height: number | undefined;
}) => {
  return (
    <TableRow key="no-data-row" className="hover:bg-transparent">
      <TableCell
        colSpan={colspan}
        key="no-data-cell"
        height={height}
        className="min-h-24 border-t text-xl text-center"
      >
        <span>Select an entity to start</span>
      </TableCell>
    </TableRow>
  );
};
