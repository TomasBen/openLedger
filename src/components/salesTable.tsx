import { useEffect, useMemo, useState, memo, useRef } from 'react';
import { useAccountantStore } from '@/stores/accountantStore';
import { useSalesStore } from '@/stores/tablesStore';
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
  TableActionBar,
} from '@/components/ui/table';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  HeaderGroup,
  VisibilityState,
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

export default function SalesTable() {
  const [data, setData] = useState<Sale[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ['document type']: false,
    ['sale point']: false,
    ['recipient id type']: false,
    ['levied import']: false,
    ['exempt import']: false,
  });
  const { rowSelection, setRowSelection, setTableInstance } = useSalesStore();
  const { accountant } = useAccountantStore();

  const columns = useMemo<ColumnDef<Sale>[]>(
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
        id: 'date',
        accessorKey: 'date',
        header: 'date',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'doc id',
        accessorKey: 'doc_id',
        header: 'document number',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: 'document type',
        accessorKey: 'doc_type',
        header: 'document type',
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'sale point',
        accessorKey: 'sale_point',
        header: 'sale point',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'recipient id type',
        accessorKey: 'recipient_id_type',
        header: 'recipient ID',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'recipient id number',
        accessorKey: 'recipient_id_number',
        header: 'recipient ID number',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'recipient name',
        accessorKey: 'recipient_name',
        header: 'recipient name',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'currency',
        accessorKey: 'currency',
        header: 'currency',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'levied import',
        accessorKey: 'net_levied_import',
        header: 'levied import',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'exempt import',
        accessorKey: 'net_exempt_import',
        header: 'exempt import',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'total taxes',
        accessorKey: 'total_taxes',
        header: 'total taxes',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
    ],
    [],
  );

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const results: Product[] = await invoke('get_products', {
  //         entity: accountant?.currently_representing?.name,
  //       });

  //       setData(results);
  //       setTableInstance(table);
  //     } catch (error) {
  //       toast.error('Error', {
  //         description: `${error}`,
  //       });
  //     }
  //   };

  //   getProducts();
  // }, [accountant?.currently_representing]);

  const table = useReactTable({
    columns,
    data,
    initialState: {
      columnVisibility,
    },
    state: {
      rowSelection,
    },
    enableHiding: true,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row) => row.doc_id,
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
