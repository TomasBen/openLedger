import { lazy, Suspense, useEffect, useRef } from 'react';
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
import { useProductTableStore } from '@/stores/tablesStore';
import useDebounce from '@/hooks/useDebounce';
import { createFileRoute } from '@tanstack/react-router';

const InventoryTable = lazy(() => import('@/components/inventoryTable'));

const SEARCHBAR_SHORTCUT = 'k';
const SEARCH_DEBOUNCE = 200;

export const Route = createFileRoute('/products/inventory')({
  component: Inventory,
});

function Inventory() {
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
              <DropdownMenuItem disabled>
                Importar desde CSV
                <DropdownMenuShortcut className="ml-auto">
                  ⌘M
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                Importar desde XLS o XLSX
                <DropdownMenuShortcut className="ml-5">⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                Opciones
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
      <Suspense fallback={<Skeleton className="h-full" />}>
        <InventoryTable />
      </Suspense>
    </div>
  );
}

function SearchBar() {
  const { tableInstance } = useProductTableStore();

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
    tableInstance?.setGlobalFilter(value);
  }, SEARCH_DEBOUNCE);

  return (
    <Input
      ref={inputRef}
      placeholder="search by code, name..."
      className="flex-1"
      onChange={(e) => search(e.target.value)}
    />
  );
}

// function ColumnSelector() {
//   const columns = useProductTableStore((state) =>
//     state.tableInstance?.getAllColumns(),
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
