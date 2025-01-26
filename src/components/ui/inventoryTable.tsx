import { useState } from "react"
import { Checkbox, ScrollArea, Table } from "@mantine/core"

export interface Product {
  code: string;
  name?: string;
  description?: string;
  amount?: number;
  measureUnit?: string;
  price?: number;
  currency?: string;
  storageUnit?: string;
}

export function InventoryTable({ products }: { products: Product[] }) {
  return (
    <ScrollArea type='scroll'>
    <Table stickyHeader withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Code</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Unit</Table.Th>
          <Table.Th>Currency</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Storage Unit</Table.Th>
          <Table.Td><Checkbox size='md' /></Table.Td>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.map((item, index) => (
          <Table.Tr key={index}>
            <Table.Td>{item.code}</Table.Td>
            <Table.Td style={{ maxWidth: '10vw', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'nowrap' }}>{item.name}</Table.Td>
            <Table.Td style={{ maxWidth: '15vw', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'nowrap' }} >{item.description}</Table.Td>
            <Table.Td>{item.amount}</Table.Td>
            <Table.Td>{item.measureUnit}</Table.Td>
            <Table.Td>{item.currency}</Table.Td>
            <Table.Td>{item.price}</Table.Td>
            <Table.Td>{item.storageUnit}</Table.Td>
            <Table.Td><Checkbox size='md' /></Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
    </ScrollArea>
  )
}
