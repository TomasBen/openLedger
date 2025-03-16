import { useRef, useState } from 'react';
import { Input } from './input';
import { Label } from './label';

export const FileInput = ({
  accept,
  label,
}: {
  accept: string;
  label: string;
}) => {
  const [isCSV, setIsCSV] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (input: HTMLInputElement) => {
    const file: File | null = input.files ? input.files[0] : null;
    if (!file) return;
    const filename = file.name;
    const fileExtension = filename.split('.').pop()?.toLowerCase();
    if (!fileExtension) return;
    if (fileExtension === 'csv') setIsCSV(true);

    console.log(accept.split(',').includes('.' + fileExtension));

    if (!accept.split(',').includes('.' + fileExtension)) {
      input.value = '';
    }
  };

  return (
    <>
      <Input
        type="file"
        accept={accept}
        ref={inputRef}
        onChange={() => {
          inputRef.current ? validateFile(inputRef.current) : null;
        }}
      />
      {label ? (
        <Label className="text-sm text-muted-foreground mt-1">{label}</Label>
      ) : null}
      {isCSV ? (
        <div className="flex flex-wrap gap-2 mt-4">
          <Label>separator:</Label>
          <Input
            type="text"
            maxLength={1}
            defaultValue=","
            className="max-w-14"
          />
        </div>
      ) : null}
    </>
  );
};
