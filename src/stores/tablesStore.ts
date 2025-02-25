import { Product } from '@/components/inventoryTable';
import { RowSelectionState, Table } from '@tanstack/react-table';
import { create } from 'zustand';

interface TableStore<T> {
  tableInstance: Table<T> | undefined;
  setTableInstance: (table: Table<T>) => void;
  rowSelection: RowSelectionState;
  setRowSelection: (
    updater:
      | RowSelectionState
      | ((old: RowSelectionState) => RowSelectionState),
  ) => void;
}

export const useProductTableStore = create<TableStore<Product>>((set) => ({
  rowSelection: {},
  setRowSelection: (updater) => {
    set((state) => ({
      rowSelection:
        typeof updater === 'function' ? updater(state.rowSelection) : updater,
    }));
  },
  tableInstance: undefined,
  setTableInstance: (table: Table<Product>) => {
    set(() => ({ tableInstance: table }));
  },
}));
