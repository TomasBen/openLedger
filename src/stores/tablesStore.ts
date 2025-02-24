import { Product } from '@/components/inventoryTable';
import { Table } from '@tanstack/react-table';
import { create } from 'zustand';

/* Use general types <T> */
interface TableStore {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
  tableInstance: Table<Product> | undefined;
  updateTableInstance: (table: Partial<Table<Product>>) => void;
  // columnVisibility: VisibilityState;
  // setColumnVisibility: (
  //   updater: VisibilityState | ((old: VisibilityState) => VisibilityState),
  // ) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  isLoading: false,
  setLoading: (newState: boolean) => {
    set(() => ({
      isLoading: newState,
    }));
  },
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
  // columnVisibility: {
  //   name: true,
  //   description: true,
  //   amount: true,
  //   measure_unit: true,
  //   currency: true,
  //   price: true,
  //   storage_unit: true,
  // },
  // setColumnVisibility: async (updater) => {
  //   set((state) => ({
  //     columnVisibility:
  //       typeof updater === 'function'
  //         ? updater(state.columnVisibility)
  //         : updater,
  //   }));
  // },
}));
