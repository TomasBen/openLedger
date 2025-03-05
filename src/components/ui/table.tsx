import * as React from 'react';

import { cn } from '@/lib/utils';
import { ActionButton } from '@/types/components';
import { Button } from './button';
import { createPortal } from 'react-dom';

function TableActionBar({
  rowSelection,
  actionButtons,
  container,
}: {
  rowSelection: number;
  actionButtons: ActionButton[];
  container?: Element | DocumentFragment;
}) {
  return (
    <>
      {rowSelection > 0 &&
        createPortal(
          <div
            data-state={rowSelection > 0 ? 'shown' : 'hidden'}
            className="flex fixed gap-4 z-10 bg-white p-3 m-5 animate-in fade-in slide-in-from-bottom-4 data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=hidden]:slide-out-to-bottom-4 place-self-end border border-sidebar-border rounded-md drop-shadow-lg"
          >
            <div className="p-1 border border-dashed border-sidebar-border rounded-sm">
              {rowSelection} rows selected
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
}

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-muted-foreground h-10 px-2 text-left align-middle font-medium border-b [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableActionBar,
};
