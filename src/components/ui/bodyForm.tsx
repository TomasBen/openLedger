import { useState } from 'react';
import { Stack, Group, Table, Menu, TextInput, NativeSelect, Divider, ActionIcon } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { CalendarCog } from 'lucide-react'
import '@mantine/dates/styles.css';
import { FieldApi, useForm } from "@tanstack/react-form"

/* Estructura de un Request al servicio de WSEFV1 de ARCA | SOAP representado en formato JSON
  Auth: {
    Token: string <- Token devuelto por WSAA. Obligatorio
    Sign: string <- Sign devuelto por WSAA. Obligatorio
    Cuit: number <- Cuit contribuyente (representante). Obligatorio
  }
  FeCabReq: {
    CantReg: number <- Cantidad del registro del detalle del comprobante emitido (cantidad de comprobantes iguales a emitir?). Máximo 250. Obligatorio
    CbteTipo: number <- Tipo de comprobante informado, en caso de ser múltiples deberán ser todos del mismo tipo. Obligatorio
    PtoVta: number <- Punto de venta del comprobante informado, en caso de ser múltiples todos llevarán el mismo numero. Obligatorio
  }
  FeDetReq: {
    Concepto: number (1 para 'Productos' pero no esta en los Docs. 2 para 'Servicios' y 3 para 'Productos y Servicios'). Obligatorio
    DocTipo: number <- Código de documento identificatorio del comprador (CUIT, DNI, CUIL). Obligatorio
    DocNro: number <- Nro de identificador del comprador. Obligatorio
    CbteDesde: number <- Nro de comprobante registrado desde Rango 1-99999999. Obligatorio
    CbteHasta: number <- Nro de comprobante registrado hasta Rango 1-99999999. Obligatorio
    CbteFecha: string <- Fecha para el comprobante con formato yyyy/mm/dd. Máximo de 5 dias previos o posteriores a la fecha de la Req para Conceptos 1. Máximo de
      10 dias previos o posteriores para Conceptos 2 y 3. En caso de no ser enviado se usará la fecha de emision del comprobante. Opcional
    ImpTotal: Double <- Importe total del comprobante. Debe ser igual al importe neto no gravado + importe excento + importe neto gravado + IVA + importe de tributos.
      Obligatorio
    ImpTotConc: Double <- Importe neto no gravado. Menor o igual a importe total, no puede ser menor a 0, para comprobantes C debe ser 0. Obligatorio
    ImpNeto: Double <- Importe neto gravado. Menor o igual a importe total, no puede ser menor a 0, para comprobantes C este campo corresponde al Importe SubTotal.
      Obligatorio
    ImpOpEx: Double <- Importe exento. Menor o igual a importe total, no puede ser menor a 0, para comprobantes C debe ser igual a 0. Obligatorio
    ImpIVA: Double <- Suma de los importes del array de IVA. Para comprobantes C debe ser igual a 0. Obligatorio
    ImpTrib: Double <- Suma de los importes del array de tributos. Obligatorio
    FchServDesde: string <- Fecha de inicio del servicio con formato yyyy/mm/dd. Obligatorio para conceptos 2 y 3. Opcional-Condicional
    FchServHasta: string <- Fecha de finalización del servicio con formato yyyy/mm/dd. Obligatorio para conceptos 2 y 3, no puede ser menor a FchServDesde.
      Opcional-Cond
    FchVtoPago: string <- Fecha de vencimiento del pago servicio a facturar. Obligatorio para conceptos 2 y 3 y MiPyMEs. Opcional-Condicional
    MonId: string <- Código de moneda a usar. Consultar método FEParamGetTiposMonedas para valores posibles. Obligatorio
    MonCotiz: double <- Cotización de la moneda a usar. Para pesos argentinos deberá ser 1. Obligatorio
    CbtesAsoc: array <- array para informar comprobantes asociados al actual comprobante. Opcional
    Tributos: array <- array para informar tributos asociados al actual comprobante. Opcional
    IVA: array <- array para informar alícuotas y sus importes asociados a un comprobante. NO informar para comprobante C. Opcional
    Opcionales: array <- array de campos adicionales reservado para el futuro. Adicionales por RG. Opcional
    Compradores: Comprador <- array para informar de múltiples compradores. Opcional
    Periodo: Periodo <- estructura compuesta por fecha desde y hasta del periodo que se quiere identificar. Opcional
    Actividades: Actividad <- array para informar actividades asociadas a un comprobante. Opcional
  }
  CbtesAsoc: [ // Detalle de los comprobantes asociados con el comprobante que se quiere autorizar/informar Tipo array.
    Tipo: number <- codigo de tipo de comprobante. Consultar método FEParamGetTiposCbte. Obligatorio
    PtoVta: number <- numero de punto de venta del comprobante asociado. Obligatorio
    Nro: number(8) <- numero de comprobante asociado. Obligatorio
    Cuit: number(11) <- cuit EMISOR del comprobante asociado. Opcional
    CbteFch: string <- fecha del comprobante asociado. Opcional
  ]
  Tributos: [ // Detalle de tributos relacionados con el comprobante que se solicita autorizar. Tipo array.
    Id: number <- codigo de tributo segun método FEParamGetTiposTributos. Obligatorio
    Desc: string <- descripcion del tributo. Opcional
    BaseImp: double <- base imponible para la determinación del tributo. Obligatorio
    Alic: double <- alícuota. Obligatorio
    Importe: double <- importe del tributo. Obligatorio
  ]
  IVA: [ // Detalle de alícuotas relacionadas con el comprobante que se solicita autorizar. Tipo array.
    Id: number <- Código de tipo de iva. Consultar método FEParamGetTiposIva. Obligatorio
    BaseImp: double <- base imponible para la determinacion de la alícuota. Obligatorio
    Importe: double <- importe. Obligatorio
  ]
  Opcionales: [ TODO ]
  Comprador: [ // Detalle compradores relacionados al comprobante a informar. Tipo array.
    DocTipo: number <- tipo de documento del comprador (CUIT, DNI, CUIL, etc...). Obligatorio
    DocNro: string <- número de documento del comprador. Obligatorio
    Porcentaje: doube <- porcentaje de titularidad que tiene el comprador. Obligatorio
  ]
  Periodo: [ // Tipo 'estructura'. Indagar
    FchDesde: string <- fecha correspondiente al incio del periodo que se informa. Obligatorio
    FchHasta: string <- fecha correspondiente al fin del periodofinal que se informa. Obligatorio
  ]
  Actividad: [ // Detalle de las actividad relacionadas con las actividades que se indican en el comprobante. Tipo Array
    Id: number <- Código actividad según método FEParamGetActividades. Obligatorio
  ]
*/

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

export default function BodyForm() {
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
      console.log(value)
    }
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Stack gap="lg">
        <Group>
        </Group>
        <form.Field
        name='client'
        validators={{
          onChange: ({value}) =>
          !value ? 'a client is required' : undefined,
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
          <NativeSelect label='Comprobante' data={[ 'Factura', 'Nota de Crédito', 'Nota de Débito' ]} />
          <TextInput label='Nro. de comprobante' />
          <TextInput label='Tipo' variant='filled' placeholder='A' />
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
              <Menu.Item>Siguientes 15</Menu.Item>
              <Menu.Item>Siguientes 30</Menu.Item>
              <Menu.Item>Siguientes 45</Menu.Item>
              <Menu.Item>Siguientes 60</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <DateInput defaultValue={new Date()} valueFormat='DD/MM/YYYY' label='Fecha de vencimiento' />
        </Group>
        <Divider />
        <ProductForm />
      </Stack>
    </form>
  );
}

const data = [
  { id: 86, description: 'producto A', price: 18000 },
  { id: 25, description: 'producto B', price: 9000 },
  { id: 91, description: 'producto C', price: 11200 },
]

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
        {[...Array(rows)].map((item, index) => (
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
