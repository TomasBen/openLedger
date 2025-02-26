import { create } from 'zustand';
import { RowSelectionState, Table } from '@tanstack/react-table';
import { Product } from '@/types/components';

interface TableStore<T> {
  tableInstance: Table<T> | undefined;
  setTableInstance: (table: Table<T>) => void;
  rowSelection: RowSelectionState;
  setRowSelection: (
    updater:
      | RowSelectionState
      | ((old: RowSelectionState) => RowSelectionState),
  ) => void;
  // columnVisibility: VisibilityState;
  // setColumnVisibility: (
  //   updater: VisibilityState | ((old: VisibilityState) => VisibilityState),
  // ) => void;
}

export const useProductTableStore = create<TableStore<Product>>((set) => ({
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
  // columnVisibility: {},
  // setColumnVisibility: (updater) => {
  //   set((state) => ({
  //     columnVisibility:
  //       typeof updater === 'function'
  //         ? updater(state.columnVisibility)
  //         : updater,
  //   }));
  // },
}));
