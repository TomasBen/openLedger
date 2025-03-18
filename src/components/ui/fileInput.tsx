import { ComponentProps, DragEvent, useRef, useState } from 'react';
import { Input } from './input';
import { Paperclip } from 'lucide-react';
import { Label } from './label';
import { cn } from '@/lib/utils';

export const FileInput = ({
  dragAndDrop = false,
  accept,
}: ComponentProps<'input'> & { accept: string; dragAndDrop?: Boolean }) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    if (!file) return;

    const filename = file.name;
    const fileExtension = filename.split('.').pop()?.toLowerCase();
    if (!fileExtension) return;

    if (!accept.split(',').includes('.' + fileExtension) && inputRef.current) {
      inputRef.current.value = '';
      return;
    }

    setFile(file);
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log('drop event fired');
    console.log(e);

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      console.log(e.dataTransfer.files[0]);
      const file = e.dataTransfer.files[0];
      validateFile(file);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    // Need to prevent default to allow drop
    e.preventDefault();
  };

  if (dragAndDrop) {
    return (
      <div
        id="fileDropArea"
        className={cn(
          'flex flex-col justify-center items-center gap-2 p-8 border border-dashed rounded-lg',
          file
            ? 'bg-secondary border-primary'
            : 'bg-surface-lowest border-slate-400',
        )}
        onDrop={dropHandler}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <input
          id="fileInput"
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              validateFile(e.target.files[0]);
            }
          }}
        />
        {file ? (
          <>
            <Label className="text-base text-primary font-medium truncate">
              {file.name}
            </Label>
            <span>{(file.size / 1024).toFixed(1)} KB</span>
          </>
        ) : (
          <>
            <Paperclip size={30} />
            <Label className="text-base font-medium">
              Drag & drop your file here
            </Label>
            <span className="text-sm text-muted-foreground cursor-default">
              or click to browse
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <Input
      type="file"
      accept={accept}
      ref={inputRef}
      onChange={() =>
        inputRef.current &&
        inputRef.current.files &&
        validateFile(inputRef.current.files[0])
      }
    />
  );
};
