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
import { Clock, DollarSign, MapPin, Package, Tag } from 'lucide-react';
import { Product } from '@/types/components';
import { ScrollArea } from './ui/scroll-area';

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
        {data.map((item) => {
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: item.currency,
          }).format(item.price);

          return (
            <div
              className={
                'flex flex-col rounded-xl border border-border shadow-sm'
              }
            >
              <div className="p-5 border-b border-border bg-secondary/30">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="font-medium text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
                      {item.name}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Tag className="mr-1 h-3.5 w-3.5" />
                      <span>{item.code}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Quantity
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <Package className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                      <span>
                        {item.amount ?? 0} {item.measure_unit}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Price
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <span>{formatted}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Location
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-1.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="line-clamp-1">
                        {item.storage_unit ?? 'no location provided'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex h-full p-4 border-t border-border text-xs text-muted-foreground bg-secondary/30">
                <div className="flex items-center">
                  <Clock className="mr-1.5 h-3 w-3" />
                  <span>Last updated {item.description ?? 'never'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <span className="mt-auto">showing {data.length} items</span>
    </>
  );
}
