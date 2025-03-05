import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { NewProductDialog } from '@/components/newProductDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProductsStore } from '@/stores/tablesStore';
import useDebounce from '@/hooks/useDebounce';
import { createFileRoute } from '@tanstack/react-router';

import { InventoryView } from '@/types/components';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const InventoryTable = lazy(() => import('@/components/inventoryTable'));
const InventoryCards = lazy(() => import('@/components/inventoryCards'));

const SEARCHBAR_SHORTCUT = 'k';
const SEARCH_DEBOUNCE = 200;

export const Route = createFileRoute('/_layout/products/inventory')({
  component: Inventory,
});

function Inventory() {
  const [view, setView] = useState<InventoryView>(
    () => (localStorage.getItem('inventory.View') as InventoryView) ?? 'cards',
  );
  console.log(`current value: ${view}`);

  const handleViewChange = (value: InventoryView) => {
    if (!value) throw new Error('no value passed to handleViewChange');
    console.log(`changing from: ${view} to: ${value}`);
    setView(value);
    localStorage.setItem('inventory.View', value);
  };

  return (
    <div className="w-full h-auto p-4 flex flex-col gap-2">
      <div className="flex flex-none">
        <div className="w-full flex items-center gap-2">
          <SearchBar />
          <Separator orientation="vertical" />
          <NewProductDialog />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Acciones</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem>
                Importar desde CSV
                <DropdownMenuShortcut className="ml-auto">
                  ⌘M
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Importar desde XLS o XLSX
                <DropdownMenuShortcut className="ml-5">⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ToggleGroup
            type="single"
            variant="outline"
            value={view}
            onValueChange={handleViewChange}
          >
            <ToggleGroupItem value="cards" aria-label="Toggle card view">
              Cards
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Toggle table view">
              Table
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <Separator className="my-2" />
      <Suspense fallback={<Skeleton className="h-full" />}>
        {view === 'cards' ? <InventoryCards /> : <InventoryTable />}
      </Suspense>
    </div>
  );
}

function SearchBar() {
  const table = useProductsStore((state) => state.tableInstance);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SEARCHBAR_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const search = useDebounce((value: string) => {
    table?.setGlobalFilter(value);
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
