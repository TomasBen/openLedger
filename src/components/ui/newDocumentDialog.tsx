import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks'
import { Modal, Table, Stack, Group, Menu, Divider, NativeSelect, TextInput, Textarea, Button, ActionIcon, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { DatePickerInput } from '@mantine/dates';
import { CalendarCog, Settings } from 'lucide-react'
import { FieldApi, useForm } from "@tanstack/react-form"
import { factura } from '@/schema/newDocumentSchema.ts'
import dayjs from 'dayjs';

interface DialogProps {
  trigger: string;
  title: string;
}

export default function NewDocumentDialog({ trigger, title }: DialogProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    defaultValues: {
      client: '',
      concept: 1, // 1 | 2 | 3 para Producto, Servicios o 'Productos y Servicios'
      condition: 'Contado', // Cuenta Corriente, Contado, Tarjeta de Cŕedito/Débito, Cheque, Ticket?, otros
      docType: 0,
      docNum: 0, // crear funcion para generar numeros de comprobantes siguiendo determinados formatos
      startDate: new Date(),
      endDate: new Date(),
      prodId: 0,
      prodDesc: '',
      prodPrice: 0,
    },
    onSubmit: async ({ value }) => {
      close();

      let transformed = {
        ...value,
        startDate: dayjs(value.startDate).format('YYYY/MM/DD'),
        endDate: dayjs(value.endDate).format('YYYY/MM/DD'),
      }

      console.log(transformed)
    },
    validators: {
      onChange: factura,
    }
  })

  const handleDateChange = (option: string) => {
    const startDate = form.getFieldValue('startDate');
    switch (option) {
      case 'same':
        form.setFieldValue('endDate', startDate)
        break;
      case 'same month':
        form.setFieldValue('endDate', dayjs(startDate).endOf('month').toDate())
        break;
      case 'next month':
        form.setFieldValue('endDate', dayjs(startDate).add(1, 'month').endOf('month').toDate())
        break;
      case 'net 15':
        form.setFieldValue('endDate', dayjs(startDate).add(15, 'day').toDate())
        break;
      case 'net 30':
        form.setFieldValue('endDate', dayjs(startDate).add(30, 'day').toDate())
        break;
      case 'net 45':
        form.setFieldValue('endDate', dayjs(startDate).add(45, 'day').toDate())
        break;
      case 'net 60':
        form.setFieldValue('endDate', dayjs(startDate).add(60, 'day').toDate())
        break;
      default:
        form.setFieldValue('endDate', startDate)
        break;
    }
  }

  const handleClose = () => {
    close();
    notifications.show({
      title: 'new notification',
      message:
        <>
          <p>the modal was cancelled succesfully</p>
          <Button onClick={() => open()}>Open again</Button>
        </>,
      withCloseButton: false,
    });
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={700} size='lg'>{title}</Text>}
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
              children={(field) => (
                  <NativeSelect
                    required
                    label='Cliente'
                    w='50%'
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    data={[ 'Cliente A', 'Cliente B', 'Cliente C' ]}
                  >
                    <option value='Cliente A'>Cliente A, 30479478256</option>
                    <option value='Cliente B'>Cliente B, 30479478256</option>
                    <option value='Cliente C'>Cliente C, 30479478256</option>
                  </NativeSelect>
              )}
            />
            <Group>
              <form.Field
                name='concept'
                children={field => (
                    <NativeSelect
                      label='Concepto'
                      w='40%'
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      onBlur={field.handleBlur}
                    >
                      <option value={1}>Productos</option>
                      <option value={2}>Servicios</option>
                      <option value={3}>Productos y Servicios</option>
                    </NativeSelect>
                )}
              />
              <form.Field
                name='condition'
                children={field => (
                    <NativeSelect
                      label='Condición de venta'
                      w='40%'
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    >
                      <option>Cuenta corriente</option>
                      <option>Contado</option>
                      <option>Transferencia bancaria</option>
                      <option>Tarjeta de cŕedito</option>
                      <option>Tarjeta de débito</option>
                      <option>Cheque</option>
                    </NativeSelect>
                )}
              />
            </Group>
            <Group align='end'>
              <form.Field
                name='docType'
                children={(field) => (
                    <NativeSelect
                      required
                      label='Comprobante'
                      w='30%'
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      onBlur={field.handleBlur}
                    >
                      <option value={0}>Factura</option>
                      <option value={8}>Nota de débito</option>
                      <option value={20}>Nota de cŕedito</option>
                    </NativeSelect>
                )}
              />
              <Textarea defaultValue='A' w='2rem' variant='filled' autosize readOnly />
              <form.Field
                name='docNum'
                children={field => (
                    <TextInput
                      label='Nro. de comprobante'
                      flex='1'
                      rightSection={<Settings size='18px' />}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      onBlur={field.handleBlur}
                    />
                )}
              />
            </Group>
            <Group align='end'>
              <form.Field
                name='startDate'
                children={(field) => (
                    <DatePickerInput
                      label='Fecha'
                      flex='1'
                      name={field.name}
                      value={field.state.value}
                      valueFormat='YYYY/MM/DD'
                      onChange={(e) => field.handleChange(dayjs(e).toDate())}
                      onBlur={field.handleBlur}
                    />
                )}
              />
              <Menu>
                <Menu.Target>
                  <ActionIcon variant='subtle' mb='0.3em'>
                    <CalendarCog />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => handleDateChange('same')}>Mismo dia</Menu.Item>
                  <Menu.Item onClick={() => handleDateChange('same month')}>Fin de mes</Menu.Item>
                  <Menu.Item onClick={() => handleDateChange('next month')}>Final del siguiente mes</Menu.Item>
                  <Menu.Item onClick={() => handleDateChange('net 15')}>Siguientes 15 dias</Menu.Item>
                  <Menu.Item onClick={() => handleDateChange('net 30')}>Siguientes 30 dias</Menu.Item>
                  <Menu.Item onClick={() => handleDateChange('net 45')}>Siguientes 45 dias</Menu.Item>
                  <Menu.Item onClick={() => handleDateChange('net 60')}>Siguientes 60 dias</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <form.Field
                name='endDate'
                children={field => (
                    <DatePickerInput
                      label='Fecha de vencimiento'
                      flex='1'
                      name={field.name}
                      value={field.state.value}
                      valueFormat='YYYY/MM/DD'
                      onChange={(e) => field.handleChange(dayjs(e).toDate())}
                      onBlur={field.handleBlur}
                    />
                )}
              />
            </Group>
            <Divider />
            <ProductForm />
            <Group>
              <Stack>
                <Text>Total bruto</Text>
                <TextInput variant='filled' />
              </Stack>
              <Stack>
                <Text>IVA</Text>
                <TextInput variant='filled' />
              </Stack>
              <Stack>
                <Text>Total neto</Text>
                <TextInput variant='filled' />
              </Stack>
            </Group>
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
