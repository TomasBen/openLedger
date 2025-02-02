import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useAccountantStore } from '@/stores/accountantStore';
import { NewProductDialog } from '@/components/newProductDialog';
import { Product } from '@/components/inventoryTable.tsx';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Ellipsis, ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

const InventoryTable = lazy(() => import('@/components/inventoryTable.tsx'));

export default function Inventory() {
  const [data, setData] = useState<Product[]>([]);
  const { accountant } = useAccountantStore();

  useEffect(() => {
    if (accountant?.currently_representing === undefined) {
      return;
    }

    const getProducts = async () => {
      try {
        let result: Product[] = await invoke('get_products', {
          entity: accountant?.currently_representing?.name,
        });
        setData(result);
        console.log(result);
      } catch (error) {
        console.log(error);
        toast(`an error has ocurred: ${error}`);
      }
    };

    getProducts();
  }, [accountant?.currently_representing]);

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
    getSortedRowModel: getSortedRowModel(),
  });

  console.log(table.getState().sorting);

  return (
    <div className="w-full h-auto m-4 flex flex-col justify-between gap-2">
      <div className="flex flex-none">
        <div className="w-full flex items-center gap-2">
          <Input placeholder="search by code, name..." className="flex-1" />
          <Separator orientation="vertical" />
          <NewProductDialog />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Acciones</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                Importar desde Mis Comprobantes
                <DropdownMenuShortcut className="ml-auto">
                  ⌘M
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Importar desde Comprobantes en línea
                <DropdownMenuShortcut className="ml-5">⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut className="ml-auto">
                  ⌘S
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <ToggleGroup type="single" variant="outline" defaultValue="list">
            <ToggleGroupItem
              value="grid"
              aria-label="Toggle grid view"
              disabled
            >
              <LayoutGrid />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="Toggle list view">
              <List />
            </ToggleGroupItem>
          </ToggleGroup> */}
        </div>
      </div>
      <Separator className="my-2" />
      <Suspense fallback={<p>loading...</p>}>
        <InventoryTable table={table} />
      </Suspense>
    </div>
  );
}
