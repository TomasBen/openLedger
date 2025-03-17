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
import { useState } from 'react';
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

/* for dropdown menu trigger and dialog to work together, the former component needs to be encapsulated inside the dialog or else it will catch the click event, not closing the dropdown and interfering with the dialog. Setting the dialog root to modal={false} seems to fix it on radix's dialog but that isn't implemented on mine. See: radi-ui/primitives #1836 https://github.com/radix-ui/primitives/issues/1836 */

export default function ImportFileDialog() {
  const [open, setOpen] = useState(false);

  /* might need utility values in localStorage for last checked fields */

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
          <DialogTrigger asChild>
            <DropdownMenuItem>Import files</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>Export files</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
                <Label htmlFor="file-input" className="text-base">
                  Select CSV file
                </Label>
                <FileInput accept=".csv" />
                <Label htmlFor="separator" className="text-base mt-4">
                  Separator
                </Label>
                <Select defaultValue="comma">
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comma">comma (,)</SelectItem>
                    <SelectItem value="semicolon">semicolon (;)</SelectItem>
                    <SelectItem value="pipe">pipe (|)</SelectItem>
                    <SelectItem value="tab">tab</SelectItem>
                    <SelectItem value="other">other...</SelectItem>
                  </SelectContent>
                  <div className="flex items-center gap-2 mt-4">
                    <Checkbox id="quoted-fields" />
                    <Label htmlFor="quoted-fields" className="text-base">
                      file contains quoted fields
                    </Label>
                  </div>
                </Select>
              </TabsContent>
              <TabsContent value="excel" className="flex flex-col gap-2 p-4">
                <Label htmlFor="file-input" className="text-base">
                  Select any Excel file
                </Label>
                <FileInput accept=".xls, .xlsx, .xlsm, .xlsb, .xla, .xlam, .ods" />
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
    </Dialog>
  );
}
