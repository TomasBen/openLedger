import { useCallback, useEffect, useMemo, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useAccountantStore } from '@/stores/accountantStore';
import { InventoryTableHeaders } from './inventoryTableHeaders';
import { InventoryTableRows } from './inventoryTableRows';
import { ScrollArea } from './ui/scroll-area';
import { Table, TableHeader, TableBody } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from './ui/button';
import { Ellipsis, ArrowUpDown } from 'lucide-react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';
import { useTableStore } from '@/stores/tablesStore';
import { InventoryTablePagination } from './inventoryTablePagination';

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
      },
      {
        id: 'measure_unit',
        accessorKey: 'measure_unit',
        header: () => <div className="text-center">Unit</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('measure_unit')}</div>
        ),
        enableSorting: false,
      },
      {
        id: 'currency',
        accessorKey: 'currency',
        header: () => <div className="text-center">Currency</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('currency')}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="w-full flex justify-end"
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
      },
      {
        accessorKey: 'storage_unit',
        header: 'Storage',
        enableSorting: false,
      },
      {
        id: 'options',
        header: '',
        cell: () => (
          <Button variant="ghost">
            <Ellipsis />
          </Button>
        ),
        enableHiding: false,
        enableSorting: false,
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
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
      <ScrollArea className="flex-1 border rounded-md">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            <InventoryTableHeaders headers={tableInstance?.getHeaderGroups()} />
          </TableHeader>
          <TableBody>
            <InventoryTableRows tableLength={columns.length} />
          </TableBody>
        </Table>
      </ScrollArea>
      <InventoryTablePagination />
    </>
  );
}
