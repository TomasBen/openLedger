import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';
import { useAccountantStore } from '@/stores/accountantStore';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Client } from '@/types/components';

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
    <div className="w-full grid grid-cols-4 grid-rows-3 p-2">
      {clients.map((client) => (
        <Card key={client.id} className="w-full">
          <CardHeader>
            <CardTitle className="truncate text-xl">{client.name}</CardTitle>
            <CardDescription>{client.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-2xl">{client.email}</span>
            <span className="text-muted-foreground">{client.condition}</span>
          </CardContent>
          <CardFooter className="gap-2">
            <MapPin />
            {client.address ?? 'no location specified'}
            <span className="text-muted-foreground">
              {String(client.created_at)}
            </span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
