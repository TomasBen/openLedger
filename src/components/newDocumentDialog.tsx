import { useState, useRef, lazy, Suspense } from 'react';
import { DialogBody, DialogCloseTrigger, DialogActionTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DialogProps {
  trigger: string;
  title: string;
}

const BodyForm = lazy(() => import('./bodyForm.tsx'));

export default function NewDocumentDialog({ trigger, title }: DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false);

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement={'center'} size="cover">
      <DialogTrigger>
        <Button>{trigger}</Button>
      </DialogTrigger>
      <DialogContent ref={contentRef}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Suspense fallback="loading...">
            {open && <BodyForm dialogRef={contentRef} />}
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <Button variant="solid">Crear Documento</Button>
          <Button variant="outline" disabled>Crear y enviar a ARCA</Button>
          <Button variant="outline" disabled>Vista Previa</Button>
          <DialogActionTrigger>
            <Button variant="outline">Cancelar</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
