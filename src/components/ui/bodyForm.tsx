import { RefObject } from 'react';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { Table, HStack, Fieldset, Input, Heading, Text, createListCollection } from '@chakra-ui/react';
import Datepicker from './ui/datepicker';
import { Field } from '@/components/ui/field';
import { useForm } from "@tanstack/react-form"

interface BodyFormProps {
  dialogRef: RefObject<HTMLDivElement>;
}

export default function BodyForm({ dialogRef}: BodyFormProps) {
  const form = useForm({
    defaultValues: {
      client: '',

    },
    onSubmit: async({value}) => {
      console.log(value)
    }
  })

  return (
    <>
      <Fieldset.Root>
        <Fieldset.Content>
          <HStack align='center' justify='between'>
            <form.Field name="client" children={field => (
              <>
                <Field maxWidth="300px">
                  <SelectRoot
                    collection={dummyData}
                  >
                    <SelectLabel>Cliente</SelectLabel>
                    <SelectTrigger>
                      <SelectValueText />
                    </SelectTrigger>
                    <SelectContent portalRef={dialogRef}>
                      {dummyData.items.map((client) => (
                        <SelectItem item={client} key={client.value}>
                          {client.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>
              </>
            )}
          />
            <Field maxWidth="300px">
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
            <Field maxWidth="300px">
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
              <Field maxWidth="300px">
                <SelectRoot collection={dummyData}>
                  <SelectLabel>Fecha</SelectLabel>
                  <Datepicker />
                </SelectRoot>
              </Field>
              <Field maxWidth="300px">
                <SelectRoot collection={dummyData}>
                  <SelectLabel>Fecha de vencimiento</SelectLabel>
                  <Datepicker />
                </SelectRoot>
              </Field>
            </HStack>
        </Fieldset.Content>
      </Fieldset.Root>
      <Heading mt={5}>Producto/Servicio</Heading>
      <Table.Root mt={5} variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Código</Table.ColumnHeader>
            <Table.ColumnHeader>Descripción</Table.ColumnHeader>
            <Table.ColumnHeader>Observaciones</Table.ColumnHeader>
            <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
            <Table.ColumnHeader>Precio</Table.ColumnHeader>
            <Table.ColumnHeader>Descuento</Table.ColumnHeader>
            <Table.ColumnHeader>Importe</Table.ColumnHeader>
            <Table.ColumnHeader>IVA</Table.ColumnHeader>
            <Table.ColumnHeader>Total</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
              <Table.Cell><Input /></Table.Cell>
              <Table.Cell><Input /></Table.Cell>
              <Table.Cell><Input /></Table.Cell>
              <Table.Cell><Input /></Table.Cell>
              <Table.Cell><Input /></Table.Cell>
              <Table.Cell><Input /></Table.Cell>
              <Table.Cell><Text>N/A</Text></Table.Cell>
              <Table.Cell><Text>N/A</Text></Table.Cell>
              <Table.Cell><Text>N/A</Text></Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table.Root>
      <Heading mt={5}>Percepciones e Impuestos</Heading>
      <Table.Root mt={5} variant="outline" maxWidth="fit-content">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Descripción</Table.ColumnHeader>
            <Table.ColumnHeader>Observaciones</Table.ColumnHeader>
            <Table.ColumnHeader>Importe</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
              <Table.Cell><Input /></Table.Cell>
              <Table.Cell><Input /></Table.Cell>
              <Table.Cell><Text>N/A</Text></Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table.Root>
    </>);
}

const dummyData = createListCollection({
  items: [
    { value: 'A', label: 'Cliente A' },
    { value: 'B', label: 'Cliente B' },
    { value: 'C', label: 'Cliente C' },
  ],
});
