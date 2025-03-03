import { usePreferencesStore } from '@/stores/userPreferencesStore';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings as SettingsIcon, Database, Keyboard } from 'lucide-react';

import { Language } from '@/types/user-preferences';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_layout/(app)/settings')({
  component: Settings,
});

function Settings() {
  const { preferences, updatePreferences } = usePreferencesStore();

  return (
    <div className="flex w-full">
      <nav className="flex flex-col gap-5 w-1/3 px-20 pt-20">
        <Button variant="link" className="w-fit gap-2 text-2xl font-bold">
          <SettingsIcon />
          General
        </Button>
        <Button variant="link" className="w-fit gap-2 text-2xl font-bold">
          <Keyboard />
          Keyboard Shortcuts
        </Button>
        <Button variant="link" className="w-fit gap-2 text-2xl font-bold">
          <Database />
          Database
        </Button>
      </nav>
      <ScrollArea
        type="scroll"
        className="flex justify-center w-2/3 bg-[var(--color-surface-dim)] px-30 pt-15"
      >
        <Label className="text-3xl font-bold">General</Label>
        <Card className="w-full mt-3 mb-10">
          <CardContent className="flex flex-col gap-2">
            <Label className="text-lg text-muted-foreground">Language</Label>
            <Select value={preferences.Language}>
              <SelectTrigger className="max-w-64">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Language.English}>English</SelectItem>
                <SelectItem value={Language.Spanish}>Spanish</SelectItem>
              </SelectContent>
            </Select>
            <Separator className="my-5" />
            <Label className="text-lg text-muted-foreground">Window</Label>
            <section className="flex items-center gap-2">
              {/* functionality not implemented */}
              <Checkbox checked={preferences.Fullscreen} id="fullscreen-mode" />
              <label htmlFor="fullscreen-mode">Fullscreen window</label>
            </section>
          </CardContent>
        </Card>
        <Label className="text-3xl font-bold">Window</Label>
        <Card className="w-full mt-3 mb-10">
          <CardContent className="flex flex-col gap-2">
            <Label className="text-lg text-muted-foreground">soon...</Label>
          </CardContent>
        </Card>
        <Label className="text-3xl font-bold">Appearance and Colors</Label>
        <Card className="w-full mt-3 mb-10">
          <CardContent className="flex flex-col gap-2">
            <Label className="text-lg text-muted-foreground">soon...</Label>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
}
