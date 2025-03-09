import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';

function Dialog({
  open,
  onOpenChange,
  children,
  ...props
}: ComponentProps<'div'> & {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
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

  useClickOutside(modalContentRef, () => onOpenChange((prev) => !prev));
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
          'relative max-w-[95%] max-h-[95%] flex gap-4 bg-white p-6 rounded-lg transition-all duration-300',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        )}
        {...props}
      >
        {children}
        <Button
          variant="ghost"
          className="absolute top-4 right-4 size-6 rounded-full"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </Button>
      </div>
    </div>,
    document.body,
  );
}

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex flex-col w-full', className)} {...props} />;
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

function DialogContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col flex-1 gap-2 w-full overflow-y-scroll',
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex w-full', className)} {...props} />;
}

export {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
};
