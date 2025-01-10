import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks'
import { Modal, Table, Stack, Group, Menu, Divider, NativeSelect, TextInput, Textarea, Button, ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { DateInput } from '@mantine/dates';
import { CalendarCog, Settings } from 'lucide-react'
import { Field, FieldApi, useForm } from "@tanstack/react-form"
import '@mantine/dates/styles.css';

interface DialogProps {
  trigger: string;
  title: string;
}

export default function NewDocumentDialog({ trigger, title }: DialogProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    defaultValues: {
      client: '',
      document: '',
      documentNr: 0,
      docType: '',
      startDate: '',
      endDate: '',
      prodId: 0,
      prodDesc: '',
      prodPrice: 0,
    },
    onSubmit: async ({ value }) => {
      close();
      console.log(value);
    }
  })

  const handleClose = () => {
    close();
    notifications.show({
      title: 'new notification',
      message: 'the modal was succesfully closed!!',
      withCloseButton: false,
    });
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        size='auto'
        centered
        overlayProps={{
          backgroundOpacity: 0.5,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Stack gap="lg">
            <form.Field
              name='client'
              validators={{
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({value}) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  return (
                    value.includes('error') &&
                    'No "error" allowed in client'
                  )
              }
              }}
            children={(field) => (
              <>
                <NativeSelect
                  label='Cliente'
                  w='fit-content'
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  data={[ 'Cliente A', 'Cliente B', 'Cliente C' ]}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
            <Group>
              <form.Field
                name='document'
                children={(field) => (
                  <>
                    <NativeSelect
                      label='Comprobante'
                      w='fit-content'
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      data={[ 'Factura', 'Nota de Crédito', 'Nota de Débito' ]} />
                    <FieldInfo field={field} />
                  </>
                )}
              />
              <TextInput label='Nro. de comprobante' rightSection={<Settings size='18px' />} />
              <Textarea label='Tipo' variant='filled' placeholder='A' w='5rem' autosize readOnly />
            </Group>
            <Group align='end'>
              <DateInput defaultValue={new Date()} valueFormat='DD/MM/YYYY' label='Fecha' />
              <Menu>
                <Menu.Target>
                  <ActionIcon variant='subtle' mb='0.3em'>
                    <CalendarCog />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>Mismo dia</Menu.Item>
                  <Menu.Item>Fin de mes</Menu.Item>
                  <Menu.Item>Final del siguiente mes</Menu.Item>
                  <Menu.Item>Siguientes 15 dias</Menu.Item>
                  <Menu.Item>Siguientes 30 dias</Menu.Item>
                  <Menu.Item>Siguientes 45 dias</Menu.Item>
                  <Menu.Item>Siguientes 60 dias</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <DateInput defaultValue={new Date()} valueFormat='DD/MM/YYYY' label='Fecha de vencimiento' />
            </Group>
            <Divider />
            <ProductForm />
          </Stack>
          <Group wrap='nowrap' mt='2rem'>
            <Button variant="solid" type='submit'>Crear Documento</Button>
            <Button variant="outline" disabled>Crear y enviar a ARCA</Button>
            <Button variant="outline" disabled>Vista Previa</Button>
            <Button variant="outline" onClick={() => handleClose()}>Cancelar</Button>
          </Group>
        </form>
      </Modal>
      <Button variant='filled' onClick={open}>{trigger}</Button>
    </>
  );
}

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

const ProductForm = () => {
  const [rows, setRows] = useState<number>(1);

  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Identificador</Table.Th>
          <Table.Th>Descripción</Table.Th>
          <Table.Th>Precio</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {[...Array(rows)].map((_, index) => (
          <Table.Tr key={index}>
            <Table.Td><TextInput /></Table.Td>
            <Table.Td><TextInput /></Table.Td>
            <Table.Td><TextInput /></Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
