import * as React from 'react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';
import { Button } from './button';
import { ActionButton } from '@/types/components';
import { useProductTableStore } from '@/stores/tablesStore';

/**
 * @param [container] Aptional portal container. Defaults to either main or document body if the former isnt available
 */
const TableActionMenu: React.FC<
  React.HTMLProps<'div'> & {
    actionButtons: ActionButton[];
    container?: Element | DocumentFragment;
  }
> = ({ actionButtons, container }, ref) => {
  const { rowSelection } = useProductTableStore();
  const selectedRows = Object.entries(rowSelection).filter(
    ([_, value]) => value === true,
  ).length;

  return (
    <>
      {selectedRows > 0 &&
        createPortal(
          <div className="flex fixed gap-4 z-10 bg-white p-3 m-5 place-self-end border border-sidebar-border rounded-md drop-shadow-lg">
            <div className="p-1 border border-dashed border-sidebar-border rounded-sm">
              {selectedRows} rows selected
            </div>
            {actionButtons.map((button) => (
              <Button
                variant={button.variant ?? 'outline'}
                onClick={button.action}
              >
                {button.icon ? <button.icon /> : null}
                {button.name}
              </Button>
            ))}
          </div>,
          container || document.getElementById('main-content') || document.body,
        )}
    </>
  );
};
TableActionMenu.displayName = 'TableActionMenu';

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
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableActionMenu,
};
