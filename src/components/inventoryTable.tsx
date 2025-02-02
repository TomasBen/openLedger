import { InventoryTableHeaders } from './inventoryTableHeaders';
import { InventoryTableRows } from './inventoryTableRows';
import { Table, TableHeader, TableBody } from '@/components/ui/table';
import { Table as TableType } from '@tanstack/react-table';
import { ScrollArea } from './ui/scroll-area';

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

export default function InventoryTable({
  table,
}: {
  table: TableType<Product>;
}) {
  return (
    <ScrollArea className="flex-1">
      <Table className="h-auto h-max-full border border-separate rounded-md">
        <TableHeader>
          <InventoryTableHeaders headers={table.getHeaderGroups()} />
        </TableHeader>
        <TableBody>
          <InventoryTableRows table={table} />
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
