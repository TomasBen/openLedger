import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { errorHandler } from '@/lib/errorManager';
import { useAccountantStore } from '@/stores/accountantStore';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { useProductsStore } from '@/stores/tablesStore';
import { useDebounce } from '@/hooks/useDebounce';
import { createFileRoute } from '@tanstack/react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

import { Product } from '@/types/components';

import ImportFileDialog from '@/components/importFileDialog';

const NewProductDialog = lazy(() => import('@/components/newProductDialog'));
const InventoryTable = lazy(() => import('@/components/inventoryTable'));
// (const InventoryCards = lazy(() => import('@/components/inventoryCards')); <- unused for now

const SEARCH_SHORTCUT = 'k';
const SEARCH_DEBOUNCE = 200;

export const Route = createFileRoute('/_layout/products/inventory')({
  component: Inventory,
});

function Inventory() {
  const [modalState, setModalState] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const accountant = useAccountantStore((state) => state.accountant);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const results: Product[] = await invoke('get_products', {
          entity: accountant?.currently_representing?.name,
        });

        setData(results);
      } catch (error) {
        errorHandler.handleError(error);
      }
    };

    getProducts();
  }, [accountant?.currently_representing]);

  return (
    <div className="w-full h-auto p-4 flex flex-col gap-2">
      <div className="flex flex-none">
        <div className="w-full flex items-center gap-2">
          <SearchBar />
          <Separator orientation="vertical" />
          <Suspense fallback={<Skeleton className="flex flex-1" />}>
            <NewProductDialog open={modalState} onOpenChange={setModalState} />
          </Suspense>
          <ImportFileDialog />
        </div>
      </div>
      <Separator className="my-2" />
      <Suspense fallback={<Skeleton className="h-full" />}>
        <InventoryTable data={data} />
      </Suspense>
    </div>
  );
}

function SearchBar() {
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
      onChange={(e) => search(e.target.value)}
    />
  );
}
