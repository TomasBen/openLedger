import { useTableStore } from '@/stores/tablesStore';
import { flexRender } from '@tanstack/react-table';
import { TableCell, TableRow } from './ui/table';
import { DogSVG } from '@/media/dogSVG';
import { useAccountantStore } from '@/stores/accountantStore';

export const InventoryTableRows = function InventoryTableRows({
  tableLength,
}: {
  tableLength: number;
}) {
  const { accountant } = useAccountantStore();
  const { tableInstance } = useTableStore();

  return (
    <>
      {tableInstance != undefined && accountant?.currently_representing ? (
        tableInstance.getCoreRowModel().rows.map((row) => (
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
            colSpan={tableLength}
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
