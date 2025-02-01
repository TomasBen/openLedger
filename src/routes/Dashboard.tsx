import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col p-4 justify-evenly">
      <div className="flex justify-center gap-4">
        <Button size="lg" variant="default">
          default
        </Button>
        <Button size="lg" variant="secondary">
          secondary
        </Button>
        <Button size="lg" variant="destructive">
          cancel
        </Button>
        <Button size="lg" variant="outline">
          outline
        </Button>
        <Button size="lg" variant="ghost">
          ghost
        </Button>
        <Button size="lg" variant="link">
          link
        </Button>
      </div>
      <div className="flex justify-center gap-4 p-2 border">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search by code, name, description, price and many more... "
          className="max-w-[500px]"
        />
      </div>
      <div className="flex justify-evenly gap-4 p-2 border">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            aria-label="Toggle strikethrough"
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="w-1/2 flex place-self-center">
        <Slider defaultValue={[33]} max={100} step={1} />
      </div>
    </div>
  );
}
