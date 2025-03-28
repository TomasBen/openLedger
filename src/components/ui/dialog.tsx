import {
  useContext,
  createContext,
  ComponentProps,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from './button';
import { X } from 'lucide-react';

interface DialogContext {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContext>({
  open: false,
  setOpen: () => {},
});

function Dialog({
  value: externalGetter,
  onValueChange: externalSetter,
  closeOnEscape = true,
  children,
  ...props
}: ComponentProps<'div'> & {
  value?: boolean;
  onValueChange?: Dispatch<SetStateAction<boolean>>;
  closeOnEscape?: boolean;
}) {
  const [internalGetter, internalSetter] = useState(false);

  const open = externalGetter !== undefined ? externalGetter : internalGetter;
  const setOpen = externalSetter || internalSetter;

  if (closeOnEscape)
    useKeyboardShortcut('Escape', false, () => setOpen(false), [setOpen]);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <div {...props}>{children}</div>
    </DialogContext.Provider>
  );
}

function DialogTrigger({
  variant,
  size,
  asChild = false,
  children,
  className,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const { setOpen } = useContext(DialogContext);

  if (asChild) {
    return (
      <Slot className={className} onClick={() => setOpen(true)} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <Button
      variant={variant ?? 'default'}
      size={size ?? 'default'}
      className={className}
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </Button>
  );
}

function DialogContent({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  const { open, setOpen } = useContext(DialogContext);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for animation to finish before removing from DOM
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useClickOutside(overlayRef, () => setOpen(false));
  if (!isLoading) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={cn(
        'flex items-center justify-center fixed inset-0 h-screen w-screen bg-black/80 transition-opacity duration-300 z-50',
        isVisible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div
        className={cn(
          'relative max-w-[95%] max-h-[95%] min-w-[20vw] flex flex-col gap-2 py-4 bg-card rounded-lg transition-all duration-300',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        )}
        {...props}
      >
        {children}
        <Button
          variant="ghost"
          className="absolute top-4 right-4 size-6 rounded-sm"
          onClick={() => setOpen(false)}
        >
          <X />
        </Button>
      </div>
    </div>,
    document.body,
  );
}

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col w-full px-4', className)} {...props} />
  );
}

function DialogTitle({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      role="heading"
      className={cn('text-lg font-bold leading-tight', className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-muted-foreground font-medium', className)}
      {...props}
    />
  );
}

function DialogBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2 w-full px-4', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex justify-end gap-4 w-full px-4', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
};
