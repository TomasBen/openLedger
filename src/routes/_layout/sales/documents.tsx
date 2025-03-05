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
import { useProductsStore } from '@/stores/tablesStore';
import useDebounce from '@/hooks/useDebounce';
import { createFileRoute } from '@tanstack/react-router';

const SalesTable = lazy(() => import('@/components/salesTable'));

const SEARCHBAR_SHORTCUT = 'k';
const SEARCH_DEBOUNCE = 200;

export const Route = createFileRoute('/_layout/sales/documents')({
  component: Documents,
});

function Documents() {
  return (
    <div className="w-full h-auto p-4 flex flex-col gap-2">
      <div className="flex flex-none">
        <div className="w-full flex items-center gap-2">
          <SearchBar />
          <Separator orientation="vertical" />
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
        </div>
      </div>
      <Separator className="my-2" />
      <Suspense fallback={<Skeleton className="h-full" />}>
        <SalesTable />
      </Suspense>
    </div>
  );
}

function SearchBar() {
  const { tableInstance } = useProductsStore();

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
      placeholder="search by code, name, price, amount, measure unit, currency..."
      className="flex-1"
      onChange={(e) => search(e.target.value)}
    />
  );
}
