import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProductsStore } from '@/stores/tablesStore';
import { useDebounce } from '@/hooks/useDebounce';
import { createFileRoute } from '@tanstack/react-router';

import { InventoryView, Product } from '@/types/components';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { EllipsisVertical } from 'lucide-react';
import { invoke } from '@tauri-apps/api/core';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { useAccountantStore } from '@/stores/accountantStore';
import { toast } from 'sonner';

const InventoryTable = lazy(() => import('@/components/inventoryTable'));
const InventoryCards = lazy(() => import('@/components/inventoryCards'));

const SEARCH_SHORTCUT = 'k';
const SEARCH_DEBOUNCE = 200;

export const Route = createFileRoute('/_layout/products/inventory')({
  component: Inventory,
});

function Inventory() {
  const [data, setData] = useState<Product[]>([]);
  const [view, setView] = useState<InventoryView>(
    () => (localStorage.getItem('inventory.view') as InventoryView) ?? 'table',
  );
  const accountant = useAccountantStore((state) => state.accountant);

  const handleViewChange = (value: InventoryView) => {
    if (!value) throw new Error('no value passed to handleViewChange');
    setView(value);
    localStorage.setItem('inventory.view', value);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const results: Product[] = await invoke('get_products', {
          entity: accountant?.currently_representing?.name,
        });

        setData(results);
      } catch (error) {
        toast.error('Error', {
          description: `${error}`,
        });
      }
    };

    getProducts();
  }, [accountant?.currently_representing]);

  return (
    <div className="w-full h-auto p-4 flex flex-col gap-2">
      <div className="flex flex-none">
        <div className="w-full flex items-center gap-2">
          <SearchBar currView={view} />
          <Separator orientation="vertical" />
          {/* <NewProductDialog /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem>
                Importar desde CSV
                <DropdownMenuShortcut className="ml-auto">
                  ⌘M
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Importar desde XLS
                <DropdownMenuShortcut className="ml-5">⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Change view</DropdownMenuLabel>
              <ToggleGroup
                type="single"
                orientation="vertical"
                value={view}
                onValueChange={handleViewChange}
                className="w-full"
              >
                <ToggleGroupItem value="cards" aria-label="Toggle card view">
                  Card view
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="table"
                  aria-label="Toggle table view"
                  className="ml-2"
                >
                  Table view
                </ToggleGroupItem>
              </ToggleGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator className="my-2" />
      <Suspense fallback={<Skeleton className="h-full" />}>
        {view === 'cards' ? (
          <InventoryCards data={data} />
        ) : (
          <InventoryTable data={data} />
        )}
      </Suspense>
    </div>
  );
}

function SearchBar({ currView }: { currView: InventoryView }) {
  const table = useProductsStore((state) => state.tableInstance);
  const inputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut(SEARCH_SHORTCUT, true, () => inputRef.current?.focus());

  const search = useDebounce((value: string) => {
    table?.setGlobalFilter(value);
  }, SEARCH_DEBOUNCE);

  return (
    <Input
      ref={inputRef}
      placeholder="search by code, name, price, amount, measure unit, currency..."
      className="flex-1"
      disabled={currView === 'cards'}
      onChange={(e) => search(e.target.value)}
    />
  );
}

// function ColumnSelector() {
//   const columns = useProductsStore((state) =>
//     state.table?.getAllColumns(),
//   );
//   console.log(columns);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline">
//           Columns <ChevronDown />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         {columns
//           ?.filter((column) => column.getCanHide())
//           .map((column) => (
//             <DropdownMenuCheckboxItem
//               key={column.id}
//               checked={column.getIsVisible()}
//               onChange={() => column.toggleVisibility()}
//             >
//               {column.id}
//             </DropdownMenuCheckboxItem>
//           ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
