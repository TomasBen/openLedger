import { lazy, Suspense, useMemo, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProductsStore } from '@/stores/tablesStore';
import { useDebounce } from '@/hooks/useDebounce';
import { createFileRoute } from '@tanstack/react-router';
import { EllipsisVertical } from 'lucide-react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Sale } from '@/types/components';
import { Checkbox } from '@/components/ui/checkbox';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

const SalesTable = lazy(() => import('@/components/salesTable'));

const SEARCH_SHORTCUT = 'k';
const SEARCH_DEBOUNCE = 200;

export const Route = createFileRoute('/_layout/sales/documents')({
  component: Documents,
});

function Documents() {
  const [data, setData] = useState<Sale[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ['document type']: false,
    ['sale point']: false,
    ['recipient id type']: false,
    ['levied import']: false,
    ['exempt import']: false,
  });

  // const handleColvisChange = (
  //   updater: VisibilityState | ((old: VisibilityState) => VisibilityState),
  // ) => {
  //   setColumnVisibility(updater);
  //   localStorage.setItem(
  //     'sales.documents.colvis',
  //     typeof updater === 'function'
  //       ? console.log('attempting to stringify a function')
  //       : JSON.parse(updater as unknown as string),
  //   );
  // };

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
        id: 'levied amount',
        accessorKey: 'net_levied_amount',
        header: 'levied amount',
        enableGlobalFilter: true,
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: 'exempt amount',
        accessorKey: 'net_exempt_amount',
        header: 'exempt amount',
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
    state: {
      columnVisibility,
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

  return (
    <div className="w-full h-auto p-4 flex flex-col gap-2">
      <div className="flex flex-none">
        <div className="w-full flex items-center gap-2">
          <SearchBar />
          <Separator orientation="vertical" />
          <Button variant="default">Añadir</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem>Import files</DropdownMenuItem>
              <DropdownMenuItem>Export files</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Select columns</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator className="my-2" />
      <Suspense fallback={<Skeleton className="h-full" />}>
        <SalesTable table={table} columnsLength={columns.length} />
      </Suspense>
    </div>
  );
}

function SearchBar() {
  const { tableInstance } = useProductsStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut(SEARCH_SHORTCUT, true, () => inputRef.current?.focus());

  const search = useDebounce((value: string) => {
    tableInstance?.setGlobalFilter(value);
  }, SEARCH_DEBOUNCE);

  return (
    <Input
      ref={inputRef}
      placeholder="search by code, name, price, amount, measure unit, currency..."
      className="flex-1"
      onChange={(e) => search(e.target.value)}
    />
  );
}
