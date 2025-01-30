import { ScrollArea } from '@mantine/core';
import { flexRender, Table } from '@tanstack/react-table';

export interface Product {
  code: string;
  name?: string;
  description?: string;
  amount?: number;
  measure_unit?: string;
  price?: number;
  currency?: string;
  storage_unit?: string;
}

export function InventoryTable({ table }: { table: Table<Product> }) {
  return (
    <ScrollArea>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}
