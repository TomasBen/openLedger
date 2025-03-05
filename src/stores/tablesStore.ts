import { create } from 'zustand';
import { RowSelectionState, Table } from '@tanstack/react-table';
import { Product, Sale } from '@/types/components';

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

export const useProductsStore = create<TableStore<Product>>((set) => ({
  tableInstance: undefined,
  setTableInstance: (table: Table<Product>) => {
    set(() => ({ tableInstance: table }));
  },
  rowSelection: {},
  setRowSelection: (updater) => {
    set((state) => ({
      rowSelection:
        typeof updater === 'function' ? updater(state.rowSelection) : updater,
    }));
  },
}));

export const useSalesStore = create<TableStore<Sale>>((set) => ({
  tableInstance: undefined,
  setTableInstance: (table: Table<Sale>) => {
    set(() => ({ tableInstance: table }));
  },
  rowSelection: {},
  setRowSelection: (updater) => {
    set((state) => ({
      rowSelection:
        typeof updater === 'function' ? updater(state.rowSelection) : updater,
    }));
  },
}));
