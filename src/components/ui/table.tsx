import * as React from 'react';
import { cn } from '@/lib/utils';
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
import { Table as TableType } from '@tanstack/react-table';
import { Product } from '../inventoryTable';

interface TableContext {
  virtualizer: Virtualizer<HTMLDivElement, Element> | undefined;
  setVirtualizer: React.Dispatch<
    React.SetStateAction<Virtualizer<HTMLDivElement, Element> | undefined>
  >;
  tableInstance: TableType<Product> | undefined;
}

const TableContext = React.createContext<TableContext | null>(null);

function useTable() {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error('TableContext must be used within a TableProvider');
  }

  return context;
}

const TableProvider: React.FC<React.ComponentProps<'div'> & TableContext> = (
  { children },
  props,
) => {
  const [virtualizer, setVirtualizer] = React.useState<
    Virtualizer<HTMLDivElement, Element> | undefined
  >(undefined);

  const contextValue = React.useMemo<TableContext>(
    () => ({
      virtualizer,
      setVirtualizer,
      tableInstance: undefined,
    }),
    [],
  );

  return (
    <TableContext.Provider value={contextValue} {...props}>
      {children}
    </TableContext.Provider>
  );
};
TableProvider.displayName = 'TableProvider';

const TableVirtualizer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    overscan?: number;
    parentRef: React.RefObject<HTMLDivElement>;
    rowCount: number;
  }
>(
  (
    { className, children, parentRef, overscan = 5, rowCount, ...props },
    ref,
  ) => {
    const { setVirtualizer } = useTable();

    const virtualizer = useVirtualizer({
      count: rowCount,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 15,
      overscan: overscan,
    });
    setVirtualizer(virtualizer);

    return (
      <div
        style={{ height: `${virtualizer.getTotalSize()}px` }}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TableVirtualizer.displayName = 'TableVirtualizer';

const LoadingOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<'div'> & {
    isLoading: boolean;
  }
>(({ isLoading, children }) => {
  if (isLoading) {
    return <div className="loader flex-1 border rounded-md " />;
  } else {
    return <>{children}</>;
  }
});
LoadingOverlay.displayName = 'LoadingOverlay';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className,
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className,
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  LoadingOverlay,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
