import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';
import { useAccountantStore } from '@/stores/accountantStore';
import { createFileRoute } from '@tanstack/react-router';
import {
  Users,
  Building2,
  User,
  EllipsisVertical,
  Trash,
  Pen,
} from 'lucide-react';

import { Client } from '@/types/components';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    <ScrollArea type="scroll" className="w-full">
      <div className="grid grid-cols-4 gap-5 p-5">
        {clients.map((client) => (
          <ClientCard client={client} />
        ))}
      </div>
    </ScrollArea>
  );
}

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="flex flex-col border border-border rounded-md shadow-md">
      <div className="flex justify-between p-3 bg-primary rounded-t-md">
        <div className="flex items-center gap-4 truncate">
          <Avatar className="bg-[var(--color-inverse-primary)]/25 text-white p-2 rounded-full">
            {client.category === 'corporate' ? (
              <Building2 />
            ) : client.category === 'unipersonal' ? (
              <User />
            ) : (
              <Users />
            )}
          </Avatar>
          <h2 className="text-xl font-medium leading-tight text-[var(--color-on-primary)] truncate">
            {client.name}
          </h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              className="rounded-full text-[var(--color-on-primary)] hover:bg-[var(--color-inverse-primary)]/25 hover:text-white transition-colors"
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
