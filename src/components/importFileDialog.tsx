import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { FileInput } from './ui/fileInput';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Dispatch, SetStateAction, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Import, EllipsisVertical } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

/* for dropdown menu trigger and dialog to work together, the former component needs to be encapsulated inside the dialog or else it will catch the click event, not closing the dropdown and interfering with the dialog. Setting the dialog root to modal={false} seems to fix it on radix's dialog but that isn't implemented on mine. See: radi-ui/primitives #1836 https://github.com/radix-ui/primitives/issues/1836 */

export default function ImportFileDialog() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'import' | 'export'>('import');

  /* possible improvements:
   *
   * own input field that supports adding suffixes and prefixes without relying on placeholders for filename
   * localStorage object for preserving last checked items
   * selection of text encoding (dont know how useful this would be in real practice)
   * ability to select date formatting (would implicate transforming the date values before writting the file)
   */

  const handleViewChange = (value: 'import' | 'export') => {
    setView(value);
    setOpen(true);
  };

  return (
    <Dialog
      value={open}
      onValueChange={setOpen}
      closeOnEscape={false}
      className="p-0"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onClick={() => handleViewChange('import')}>
            Import files
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleViewChange('export')}>
            Export files
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {view === 'import' ? (
        <ImportDialogContent setOpen={setOpen} />
      ) : (
        <ExportDialogContent setOpen={setOpen} />
      )}
    </Dialog>
  );
}

const ExportDialogContent = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="py-2 text-center text-2xl font-bold">
          Export File
        </DialogTitle>
      </DialogHeader>
      <DialogBody className="p-0">
        <div className="w-[20vw]">
          <Tabs defaultValue="csv" className="flex w-full">
            <TabsList
              defaultValue="csv"
              className="flex w-full h-auto p-1 rounded-none"
            >
              <TabsTrigger value="csv" className="text-base">
                CSV
              </TabsTrigger>
              <TabsTrigger value="excel" className="text-base">
                Excel
              </TabsTrigger>
            </TabsList>
            <TabsContent value="csv" className="flex flex-col gap-2 p-4">
              <Label htmlFor="file-name" className="text-base">
                File name
              </Label>
              <Input id="file-name" type="text" placeholder="products.csv" />
              <Label className="text-base mt-4">Separator</Label>
              <Select defaultValue="comma">
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comma">comma (,)</SelectItem>
                  <SelectItem value="semicolon">semicolon (;)</SelectItem>
                  <SelectItem value="pipe">pipe (|)</SelectItem>
                  <SelectItem value="tab">tab</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 mt-4">
                <Checkbox id="headers-row" defaultChecked />
                <Label htmlFor="headers-row" className="text-base">
                  Include headers row
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="encrypted-file" defaultChecked />
                <Label htmlFor="encrypted-file" className="text-base">
                  Export file unencrypted
                </Label>
              </div>
            </TabsContent>
            <TabsContent value="excel" className="flex flex-col gap-2 p-4">
              <Label className="text-base">File format</Label>
              <RadioGroup defaultValue="xls" className="flex items-center">
                <div className="flex gap-2">
                  <RadioGroupItem id="xls" value="xls" />
                  <Label htmlFor="xls">.xls</Label>
                </div>
                <div className="flex gap-2">
                  <RadioGroupItem id="xlsx" value="xlsx" />
                  <Label htmlFor="xlsx">.xlsx</Label>
                </div>
                <div className="flex gap-2">
                  <RadioGroupItem id="odt" value="odt" />
                  <Label htmlFor="odt">.odt</Label>
                </div>
              </RadioGroup>
              <Label htmlFor="file-name" className="text-base mt-4">
                Sheet name
              </Label>
              <Input id="file-name" type="text" placeholder="products.csv" />
              <div className="flex items-center gap-2 mt-4">
                <Checkbox id="headers-row" defaultChecked />
                <Label htmlFor="headers-row" className="text-base">
                  Include headers row
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="encrypted-file" defaultChecked />
                <Label htmlFor="encrypted-file" className="text-base">
                  Export file unencrypted
                </Label>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="default" disabled>
          <Import />
          Export
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

const ImportDialogContent = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="py-2 text-center text-2xl font-bold">
          Import File
        </DialogTitle>
      </DialogHeader>
      <DialogBody className="p-0">
        <div className="w-[20vw]">
          <Tabs defaultValue="csv" className="flex w-full">
            <TabsList
              defaultValue="csv"
              className="flex w-full h-auto p-1 rounded-none"
            >
              <TabsTrigger value="csv" className="text-base">
                CSV
              </TabsTrigger>
              <TabsTrigger value="excel" className="text-base">
                Excel
              </TabsTrigger>
            </TabsList>
            <TabsContent value="csv" className="flex flex-col gap-2 p-4">
              <Label className="text-base">Select CSV file</Label>
              <FileInput accept=".csv" dragAndDrop />
              <Label className="text-base mt-4">Separator</Label>
              <Select defaultValue="comma">
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comma">comma (,)</SelectItem>
                  <SelectItem value="semicolon">semicolon (;)</SelectItem>
                  <SelectItem value="pipe">pipe (|)</SelectItem>
                  <SelectItem value="tab">tab</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 mt-4">
                <Checkbox id="quoted-fields" />
                <Label htmlFor="quoted-fields" className="text-base">
                  File contains quoted fields
                </Label>
              </div>
            </TabsContent>
            <TabsContent value="excel" className="flex flex-col gap-2 p-4">
              <Label className="text-base">Select any Excel file</Label>
              <FileInput
                accept=".xls, .xlsx, .xlsm, .xlsb, .xla, .xlam, .ods"
                dragAndDrop
              />
              <Label className="text-sm text-muted-foreground">
                .xls, .xlsx, .xlsm, .xlsb, .xla, .xlam, .ods
              </Label>
              <Label className="text-base mt-4">Select sheets</Label>
              <Input type="text" defaultValue="1" />
              <Label className="text-sm text-muted-foreground">
                select sheets: 1, 2, 3... or 1-3
              </Label>
              <div className="flex items-center gap-2 mt-4">
                <Checkbox id="header-rows" defaultChecked />
                <Label htmlFor="header-rows" className="text-base">
                  First row contains headers
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="empty-rows" defaultChecked />
                <Label htmlFor="empty-rows" className="text-base">
                  Skip empty rows
                </Label>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="default" disabled>
          <Import />
          Import
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
