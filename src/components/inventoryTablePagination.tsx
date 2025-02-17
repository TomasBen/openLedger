import { useAccountantStore } from '@/stores/accountantStore';
import { useTableStore } from '@/stores/tablesStore';

export function InventoryTablePagination() {
  const { accountant } = useAccountantStore();
  const { tableInstance } = useTableStore();

  return (
    <>
      {tableInstance != undefined && accountant?.currently_representing ? (
        <span className="text-center">
          showing {tableInstance.getRowCount()} results
        </span>
      ) : (
        <span className="text-center">showing 0 results</span>
      )}
    </>
  );
}
