import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useAccountantStore } from '@/stores/accountantStore';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Product } from '@/types/components';

export default function InventoryCard() {
  const [data, setData] = useState<Product[]>([]);
  const { accountant } = useAccountantStore();

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
    <>
      <div className="grid grid-cols-4 gap-5 overflow-y-scroll">
        {data.map((item) => (
          <Card key={item.code} className="w-full">
            <CardHeader>
              <CardTitle className="truncate text-xl">{item.name}</CardTitle>
              <CardDescription>{item.code}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-5xl">{item.amount ?? 0}</span>
              <span className="text-muted-foreground">{item.measure_unit}</span>
            </CardContent>
            <CardFooter className="gap-2">
              <MapPin />
              {item.storage_unit ?? 'no location specified'}
            </CardFooter>
          </Card>
        ))}
      </div>
      <span className="mt-auto">showing {data.length} items</span>
    </>
  );
}
