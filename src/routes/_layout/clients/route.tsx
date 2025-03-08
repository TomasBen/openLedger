import { useEffect, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';
import useDebounce from '@/hooks/useDebounce';
import { useAccountantStore } from '@/stores/accountantStore';
import { createFileRoute } from '@tanstack/react-router';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  Building2,
  User,
  EllipsisVertical,
  Trash,
  Pen,
  Plus,
  Filter,
} from 'lucide-react';

import { Client } from '@/types/components';

const SEARCH_SHORTCUT = 'k';
const SEARCH_DEBOUNCE = 200;

export const Route = createFileRoute('/_layout/clients')({
  component: ClientsPage,
});

function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const accountant = useAccountantStore((state) => state.accountant);

  useEffect(() => {
    const getClients = async () => {
      try {
        const results: Client[] = await invoke('get_clients', {
          entity: accountant?.currently_representing?.name,
        });

        console.log(results);
        setClients(results);
      } catch (error) {
        console.error(error);
        toast.error('Error', {
          description: `${error}`,
        });
      }
    };

    getClients();
  }, [accountant?.currently_representing?.name]);

  return (
    <div className="flex flex-col gap-5 w-full p-3">
      <div className="flex items-center gap-4 p-2">
        <SearchBar />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary">
              <Filter />
              Filter by category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Building2 />
              corporate
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users /> small business
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User /> unipersonal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-4 gap-5 overflow-y-scroll px-2">
        <div className="flex flex-col justify-center items-center gap-4 bg-secondary/15 border border-dashed border-primary/50 rounded-md shadow-md transition-colors hover:bg-secondary/30 hover:border-primary">
          <span className="rounded-full bg-secondary p-4">
            <Plus size={25} />
          </span>
          <span className="text-2xl font-medium">Add new client</span>
          <span className="font-medium text-muted-foreground">
            create a new client entry
          </span>
        </div>
        {clients.map((client) => (
          <ClientCard client={client} />
        ))}
      </div>
    </div>
  );
}

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SEARCH_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const search = useDebounce((value: string) => {
    console.log(value);
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

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="flex flex-col border border-border rounded-md shadow-md">
      <div className="flex justify-between p-3 bg-primary rounded-t-md">
        <div className="flex items-center gap-4 truncate">
          <Avatar className="bg-primary-inverse/30 text-white p-2 rounded-full">
            {client.category === 'corporate' ? (
              <Building2 />
            ) : client.category === 'unipersonal' ? (
              <User />
            ) : (
              <Users />
            )}
          </Avatar>
          <h2 className="text-xl font-medium leading-tight text-primary-foreground truncate">
            {client.name}
          </h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              className="rounded-full text-primary-foreground hover:bg-primary-inverse/30 hover:text-white transition-colors"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Pen /> Edit client
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash />
              Delete client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-6 py-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-primary">ID: {client.id}</h3>
          <p className="text-sm text-muted-foreground">
            {client.industry ?? ''}
          </p>
        </div>

        <div className="space-y-2 text-navy-800">
          <div className="flex items-start gap-2">
            <span className="min-w-24 text-sm font-medium text-gray-500">
              Email:
            </span>
            <span className="text-sm">{client.email ?? 'not provided'}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="min-w-24 text-sm font-medium text-gray-500">
              Phone:
            </span>
            <span className="text-sm">{client.phone ?? 'not provided'}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="min-w-24 text-sm font-medium text-gray-500">
              Address:
            </span>
            <span className="text-sm">{client.address ?? 'not provided'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center p-2 bg-[var(--color-surface)] border-t border-border rounded-b-md">
        <span className="text-muted-foreground font-extralight text-sm">
          since:{' '}
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(client.created_at)}
        </span>
      </div>
    </div>
  );
}
