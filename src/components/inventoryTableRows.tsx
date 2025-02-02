import { flexRender, Table } from '@tanstack/react-table';
import { Product } from './inventoryTable';
import { TableCell, TableRow } from './ui/table';
import { DogSVG } from '@/media/dogSVG';

export const InventoryTableRows = function InventoryTableRows({
  table,
}: {
  table: Table<Product>;
}) {
  return (
    <>
      {table.getCoreRowModel().rows.length >= 1 ? (
        table.getCoreRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="max-w-[15vw] truncate">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow key="no-data-row">
          <TableCell
            key="no-data-cell"
            colSpan={table.getAllColumns().length}
            className="py-20 border-t text-xl text-center"
          >
            <DogSVG className="block mx-auto mb-2 w-[40rem] h-auto" />
            <span>No results</span>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
