import {
  Dispatch,
  lazy,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { useDebounce } from '@/hooks/useDebounce';
import { useAccountantStore } from '@/stores/accountantStore';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Users, Building2, User, Plus, Filter } from 'lucide-react';

import { Client } from '@/types/components';
import { Skeleton } from '@/components/ui/skeleton';
import { errorHandler } from '@/lib/errorManager';
import { ClientCard } from '@/components/clientCard';

const SEARCH_SHORTCUT = 'k';
const SEARCH_DEBOUNCE = 200;

export const Route = createFileRoute('/_layout/clients')({
  component: ClientsPage,
});

const NewClientDialog = lazy(() => import('@/components/newClientDialog.tsx'));

function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredCliets, setFilteredClients] = useState<Client[] | null>(null);
  const accountant = useAccountantStore((state) => state.accountant);

  useEffect(() => {
    const getClients = async () => {
      try {
        const results: Client[] = await invoke('get_clients', {
          entity: accountant?.currently_representing?.name,
        });

        setClients(results);
      } catch (error) {
        errorHandler.handleError(error, {
          type: 'DatabaseError',
          component: 'clients/route',
          additionalMessage: 'failed to load clients',
        });
      }
    };

    getClients();
  }, [accountant?.currently_representing?.name]);

  const handleFilter = (filter: string) => {
    setFilteredClients(clients.filter((client) => client.category === filter));
  };

  return (
    <div className="flex flex-col gap-5 w-full p-3">
      <div className="flex items-center gap-4 p-2">
        <SearchBar initialData={clients} onSearch={setFilteredClients} />
        <Suspense fallback={<Skeleton className="flex flex-1" />}>
          <NewClientDialog />
        </Suspense>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <Filter />
              Filter by category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleFilter('corporate')}>
              <Building2 />
              corporate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter('small business')}>
              <Users /> small business
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter('unipersonal')}>
              <User /> unipersonal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-4 gap-5 overflow-y-scroll px-2">
        <div
          className="flex flex-col justify-center items-center gap-4 bg-secondary/15 border border-dashed border-primary/50 rounded-md shadow-md aspect-[4/3] transition-colors hover:bg-secondary/30 hover:border-primary"
          onClick={() => {
            const event = new globalThis.KeyboardEvent('keydown', {
              key: 'n',
              ctrlKey: true,
              altKey: false,
              shiftKey: false,
              bubbles: true,
              cancelable: true,
            });
            document.dispatchEvent(event);
          }}
        >
          <span className="rounded-full bg-secondary p-4">
            <Plus size={25} />
          </span>
          <span className="text-2xl font-medium">Add new client</span>
          <span className="font-medium text-muted-foreground">
            create a new client entry
          </span>
        </div>
        {filteredCliets
          ? filteredCliets.map((client) => (
              <ClientCard client={client} key={client.id} />
            ))
          : clients.map((client) => (
              <ClientCard client={client} key={client.id} />
            ))}
      </div>
    </div>
  );
}

function SearchBar({
  initialData,
  onSearch,
}: {
  initialData: Client[];
  onSearch: Dispatch<SetStateAction<Client[] | null>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut(SEARCH_SHORTCUT, true, () => inputRef.current?.focus());

  const search = useDebounce((value: string) => {
    if (!value) onSearch(null);

    onSearch(
      initialData.filter(
        (client) =>
          client.name.toLowerCase().includes(value.toLowerCase()) ||
          String(client.id).toLowerCase().includes(value.toLowerCase()),
      ),
    );
  }, SEARCH_DEBOUNCE);

  return (
    <Input
      ref={inputRef}
      placeholder="search by name or ID"
      className="flex-1"
      onChange={(e) => search(e.target.value)}
    />
  );
}
