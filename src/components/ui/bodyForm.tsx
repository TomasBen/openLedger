import { Stack, Group, TextInput, NativeSelect } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useForm } from "@tanstack/react-form"

export default function BodyForm() {
  const form = useForm({
    defaultValues: {
      client: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    }
  })

  return (
    <>
      <Stack gap="lg">
        <Group>
          <NativeSelect label='Cliente' data={[ 'Cliente A', 'Cliente B', 'Cliente C' ]} />
          <NativeSelect label='Comprobante' data={[ 'Factura', 'Nota de Crédito', 'Nota de Débito' ]} />
        </Group>
        <Group>
          <TextInput />
          <TextInput />
        </Group>
        <Group>
          <DateInput defaultValue={new Date()} valueFormat='DD/MM/YYYY' label='Fecha' />
          <DateInput defaultValue={new Date()} valueFormat='DD/MM/YYYY' label='Fecha de vencimiento' />
        </Group>
      </Stack>
    </>
  );
}
