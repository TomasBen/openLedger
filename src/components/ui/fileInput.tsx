import { ComponentProps, useRef } from 'react';
import { Input } from './input';

export const FileInput = ({
  accept,
}: ComponentProps<'input'> & { accept: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (input: HTMLInputElement) => {
    const file: File | null = input.files ? input.files[0] : null;
    if (!file) return;
    const filename = file.name;
    const fileExtension = filename.split('.').pop()?.toLowerCase();
    if (!fileExtension) return;

    if (!accept.split(',').includes('.' + fileExtension)) {
      input.value = '';
    }
  };

  return (
    <Input
      type="file"
      accept={accept}
      ref={inputRef}
      onChange={() => {
        inputRef.current ? validateFile(inputRef.current) : null;
      }}
    />
  );
};
