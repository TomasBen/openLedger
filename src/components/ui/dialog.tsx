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
import { VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { Button, buttonVariants } from './button';

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
  children,
  ...props
}: ComponentProps<'div'> & {
  value?: boolean;
  onValueChange?: Dispatch<SetStateAction<boolean>>;
}) {
  const [internalGetter, internalSetter] = useState(false);

  const open = externalGetter !== undefined ? externalGetter : internalGetter;
  const setOpen = externalSetter || internalSetter;

  useEffect(() => {
    const handleKeydown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [setOpen]);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <div {...props}>{children}</div>
    </DialogContext.Provider>
  );
}

function DialogTrigger({
  variant,
  size,
  children,
  className,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  const { setOpen } = useContext(DialogContext);

  return (
    <Button
      variant={variant ?? 'default'}
      size={size ?? 'default'}
      {...props}
      onClick={() => setOpen(true)}
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
  const modalContentRef = useRef<HTMLDivElement>(null);
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

  useClickOutside(modalContentRef, () => setOpen(false));
  if (!isLoading) return null;

  return createPortal(
    <div
      className={cn(
        'flex items-center justify-center fixed inset-0 h-screen w-screen bg-black/80 transition-opacity duration-300 z-50',
        isVisible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div
        ref={modalContentRef}
        className={cn(
          'relative max-w-[95%] max-h-[95%] min-w-[20vw] flex flex-col gap-4 bg-card p-2 rounded-lg transition-all duration-300',
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
    <div className={cn('flex flex-col w-full p-4', className)} {...props} />
  );
}

function DialogTitle({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      role="heading"
      className={cn('text-2xl font-bold leading-tight', className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-lg text-muted-foreground font-medium', className)}
      {...props}
    />
  );
}

function DialogBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2 w-full p-4', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex justify-end gap-4 w-full p-4', className)}
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
