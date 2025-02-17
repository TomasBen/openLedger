import { Product } from '@/components/inventoryTable';
import { Table } from '@tanstack/react-table';
import { create } from 'zustand';

/* Use general types <T> */
interface TableStore {
  tableInstance: Table<Product> | undefined;
  updateTableInstance: (table: Partial<Table<Product>>) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  tableInstance: undefined,
  updateTableInstance: async (update: Partial<Table<Product>>) => {
    set((state) => ({
      tableInstance: state.tableInstance
        ? {
            ...state.tableInstance,
            update,
          }
        : (update as Table<Product>),
    }));
  },
}));
