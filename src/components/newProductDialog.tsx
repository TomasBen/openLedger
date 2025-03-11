import { Dispatch, SetStateAction } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';
import { useAccountantStore } from '@/stores/accountantStore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/schemas/ARCA';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogBody,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function NewProductDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const { accountant } = useAccountantStore();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: '' /* <- add function to auto generate code */,
      currency: 'USD' /* <- should get the preferred currency by the entity */,
    },
  });

  async function onSubmit(values: z.infer<typeof productSchema>) {
    await invoke('create_product', {
      product: {
        ...values,
        entityName: accountant?.currently_representing?.name,
      },
    })
      .then(() => {
        toast.success('', {
          description: 'Product created succesfully',
        });
      })
      .catch((error) => {
        toast.error('', {
          description: `${error}`,
        });
      });
  }

  return (
    <Dialog value={open} onValueChange={onOpenChange}>
      <DialogTrigger>New Product</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Identifier for the product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="measure_unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measure Unit</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="unit" {...field} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="box">boxes</SelectItem>
                          <SelectItem value="pcs">pieces (pcs)</SelectItem>
                          <SelectItem value="dozen">dozen</SelectItem>
                          <SelectItem value="cm">centimeters (cm)</SelectItem>
                          <SelectItem value="gr">grams (gr)</SelectItem>
                          <SelectItem value="mg">miligrams (mg)</SelectItem>
                          <SelectItem value="ml">mililiters (ml)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="currency"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder=" " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="storage_unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="not defined" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogBody>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
