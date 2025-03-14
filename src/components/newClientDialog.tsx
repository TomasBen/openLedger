import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { useAccountantStore } from '@/stores/accountantStore';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema } from '@/schemas/core';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function NewClientDialog() {
  const [open, setOpen] = useState(false);
  const accountant = useAccountantStore((state) => state.accountant);

  useKeyboardShortcut('n', true, () => setOpen(true));

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      industry: '',
      category: 'small business',
      condition: '',
      entity_name: accountant?.currently_representing?.name,
      created_at: '',
    },
  });

  async function onSubmit(values: z.infer<typeof clientSchema>) {
    /* we format the values to pass numbers and undefined values to the sql query instead of empty strings */
    const formattedData = {
      ...values,
      id: values.id === '' ? undefined : Number(values.id),
      email: values.email === '' ? undefined : values.email,
      phone: values.phone === '' ? undefined : Number(values.phone),
      address: values.address === '' ? undefined : values.address,
      industry: values.industry === '' ? undefined : values.industry,
      condition: values.condition === '' ? undefined : values.condition,
      date: undefined,
    };
    console.log(formattedData);
    await invoke('create_client', { client: { ...formattedData } })
      .then(() => {
        toast.success('client created');
      })
      .catch((error) => {
        toast.error('', {
          description: `${error}`,
        });
      })
      .finally(() => setOpen(false));
  }

  return (
    <Dialog value={open} onValueChange={setOpen}>
      <DialogTrigger>New Client</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new client entry</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Form {...form}>
            <form
              id="client-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                name="id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="i.e. 30088345446"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input required placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="i.e. 03624256728" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="industry"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="i.e. IT, Metalurgic, etc..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="small business" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corporate">corporate</SelectItem>
                          <SelectItem value="small business">
                            small business
                          </SelectItem>
                          <SelectItem value="unipersonal">
                            unipersonal
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="client-form">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
