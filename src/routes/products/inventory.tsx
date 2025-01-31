import { invoke } from '@tauri-apps/api/core';
import { useCallback, useEffect, useState } from 'react';
import { useAccountantStore } from '@/stores/accountantStore';
import { NewProductDialog } from '@/components/ui/newProductDialog';
import { InventoryTable } from '@/components/ui/inventoryTable.tsx';
import { LayoutGrid, Package, List, Ellipsis } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { Product } from '@/components/ui/inventoryTable.tsx';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';

const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
];

export default function Inventory() {
  const [data, setData] = useState<Product[]>([]);
  const { accountant } = useAccountantStore();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        let result: Product[] = await invoke('get_products', {
          entity: accountant?.currently_representing?.name,
        });
        setData(result);
        console.log(data);
      } catch (error) {
        console.log(error);
        notifications.show({
          color: 'red',
          title: 'error when getting the products',
          message: `error: ${error}`,
        });
      }
    };

    getProducts();
  }, [accountant?.currently_representing]);

  return (
    <div className="w-full h-auto m-4 flex flex-col justify-between">
      <div className="flex flex-none justify-between">
        <div className="flex items-center gap-2">
          <Package size="50px" />
          <h1 className="text-4xl font-extrabold tracking-tight">Inventario</h1>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="search by code, name..." />
          <Separator orientation="vertical" />
          <NewProductDialog />
          <div className="flex bg-slate-200 p-1 rounded-md">
            <ToggleGroup type="single" variant="outline" defaultValue="list">
              <ToggleGroupItem
                value="grid"
                aria-label="Toggle grid view"
                disabled
              >
                <LayoutGrid />
                Grid
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="Toggle list view">
                <List />
                List
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <InventoryTable table={table} />
    </div>
  );
}
