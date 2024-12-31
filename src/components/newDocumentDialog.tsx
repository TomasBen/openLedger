import { useState } from 'react';
import { DialogBody, DialogCloseTrigger, DialogActionTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger } from '@/components/ui/select';
import { HStack, Fieldset, createListCollection } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

interface DialogProps {
  trigger: string;
  title: string;
}

export default function NewDocumentDialog({ trigger, title }: DialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={'center'}>
      <DialogTrigger>
        <Button>{trigger}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <BodyForm />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger>
            <Button variant="outline">Cancelar</Button>
          </DialogActionTrigger>
          <Button variant="solid">Crear Documento</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

function BodyForm() {
  {/* const [date, setDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState(new Date()); */}

  return (
    <Fieldset.Root>
      <Fieldset.Content>
        <HStack align='center' justify='between'>
          <Field>
            <SelectRoot collection={dummyData}>
              <SelectLabel>Cliente</SelectLabel>
              <SelectTrigger />
              <SelectContent style={{ zIndex: 1500 }} >
                {dummyData.items.map((client) => (
                  <SelectItem item={client} key={client.value}>
                    {client.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>
          <Field>
            <SelectRoot collection={dummyData}>
              <SelectLabel>Punto de Venta</SelectLabel>
              <SelectTrigger />
              <SelectContent>
                {dummyData.items.map((client) => (
                  <SelectItem item={client} key={client.value}>
                    {client.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>
        </HStack>
          <Field>
            <SelectRoot collection={dummyData}>
              <SelectLabel>Comprobante</SelectLabel>
              <SelectTrigger />
              <SelectContent>
                {dummyData.items.map((client) => (
                  <SelectItem item={client} key={client.value}>
                    {client.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>
          <HStack>
            <Field>
              <SelectRoot collection={dummyData}>
                <SelectLabel>Fecha</SelectLabel>
                  <DatePicker />
              </SelectRoot>
            </Field>
            <Field>
            </Field>
          </HStack>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}

const dummyData = createListCollection({
  items: [
    { value: 'A', label: 'Cliente A' },
    { value: 'B', label: 'Cliente B' },
    { value: 'C', label: 'Cliente C' },
  ],
});
