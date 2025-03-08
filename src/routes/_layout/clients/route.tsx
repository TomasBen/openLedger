import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';
import { useAccountantStore } from '@/stores/accountantStore';
import { createFileRoute } from '@tanstack/react-router';
import { Badge, Users, Building2, User } from 'lucide-react';
import { CardContent, CardFooter } from '@/components/ui/card';

import { Client } from '@/types/components';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <ScrollArea type="scroll" className="w-full p-2">
      <div className="grid grid-cols-4 gap-6 overflow-y-scroll">
        {clients.map((client) => (
          <ClientCard client={client} />
        ))}
      </div>
    </ScrollArea>
  );
}

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="shadow-md rounded-lg">
      <div className="flex items-center justify-between bg-primary p-4 text-white">
        <div className="flex items-center gap-2">
          <Avatar className="rounded-full bg-black p-2">
            {client.category === 'corporate' ? (
              <Building2 />
            ) : client.category === 'unipersonal' ? (
              <User />
            ) : (
              <Users />
            )}
          </Avatar>
          <span className="font-medium">{client.name}</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-navy-900">ID: {client.id}</h3>
          <p className="text-sm text-muted-foreground">
            {client.industry ?? 'industry not specified'}
          </p>
        </div>

        <div className="space-y-2 text-navy-800">
          <div className="flex items-start gap-2">
            <span className="min-w-24 text-sm font-medium text-gray-500">
              Email:
            </span>
            <span className="text-sm">{client.email}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="min-w-24 text-sm font-medium text-gray-500">
              Phone:
            </span>
            <span className="text-sm">03624-256728</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="min-w-24 text-sm font-medium text-gray-500">
              Address:
            </span>
            <span className="text-sm">{client.address}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex border-t border-gray-100 bg-gray-300 px-6 py-3">
        <p className="text-xs text-gray-500">
          Client since{' '}
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(Date.now())}
        </p>
      </CardFooter>
    </div>
  );
}
