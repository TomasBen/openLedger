import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { TableRow, TableHead } from './ui/table';
import { Product } from './inventoryTable';

export function InventoryTableHeaders({
  headers,
}: {
  headers: HeaderGroup<Product>[] | undefined;
}) {
  return (
    <>
      {headers?.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </>
  );
}
