import { Window } from '@/lib/window';
import { Webview } from '@/lib/webview';
import useDebounce from '@/hooks/useDebounce';
import { usePreferencesStore } from '@/stores/userPreferencesStore';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Cog, Shield, Database, Plus, Minus, Moon, Sun } from 'lucide-react';

import { UserPreferences, Language, Theme } from '@/types/user-preferences';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const Route = createFileRoute('/_layout/(app)/settings')({
  component: Settings,
});

function Settings() {
  const { preferences, updatePreferences } = usePreferencesStore();
  console.info(preferences);

  return (
    <div className="flex flex-col w-full items-center py-15 overflow-y-scroll">
      <Tabs defaultValue="general" className="w-2/3">
        <h1 className="text-start w-full scroll-m-20 text-5xl font-extrabold tracking-tight mb-5">
          Settings
        </h1>
        <TabsList className="w-full mb-15">
          <TabsTrigger value="general">
            <Cog />
            General
          </TabsTrigger>
          <TabsTrigger value="security" disabled>
            <Shield />
            Security
          </TabsTrigger>
          <TabsTrigger value="database" disabled>
            <Database />
            Database
          </TabsTrigger>
          <TabsTrigger value="account" disabled>
            Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings
            values={preferences}
            onValueChange={updatePreferences}
          />
        </TabsContent>
        <TabsContent value="security">
          <span>this is the security content</span>
        </TabsContent>
        <TabsContent value="database">
          <span>this is the database content</span>
        </TabsContent>
        <TabsContent value="account">
          <span>this is the account content</span>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GeneralSettings({
  values,
  onValueChange,
}: {
  values: UserPreferences;
  onValueChange: (updates: Partial<UserPreferences>) => void;
}) {
  const handleZoom = useDebounce((operation: 'in' | 'out') => {
    if (operation === 'in') {
      Webview.zoomIn(values, onValueChange);
    } else {
      Webview.zoomOut(values, onValueChange);
    }
  }, 50);

  return (
    <>
      <Card className="mb-5">
        <CardContent>
          <Label className="text-xl text-muted-foreground">Language</Label>
          <section className="flex items-center gap-2 mb-5 mt-2">
            <Select
              disabled
              value={values.Language}
              onValueChange={(value) =>
                onValueChange({ Language: value } as Partial<UserPreferences>)
              }
            >
              <SelectTrigger className="max-w-52">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Language.English}>English</SelectItem>
                <SelectItem value={Language.Spanish}>Spanish</SelectItem>
              </SelectContent>
            </Select>
          </section>
          {/* <section className="flex items-center gap-2 mb-5 mt-2">
            <Checkbox id="fullscreen-mode" checked={values.Fullscreen} />
            <label htmlFor="fullscreen-mode">Fullscreen mode</label>
          </section> */}
          <Label className="text-xl text-muted-foreground">Scale factor</Label>
          <section className="flex items-center mb-5 mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleZoom('out')}
            >
              <Minus />
            </Button>
            <div className="text-lg px-5">{values.ScaleFactor.toFixed(2)}</div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleZoom('in')}
            >
              <Plus />
            </Button>
          </section>
          <Label className="text-xl text-muted-foreground">Accessibility</Label>
          <section className="flex items-center gap-2 mt-2">
            <Checkbox id="high-contrast" disabled />
            <label htmlFor="high-contrast">High contrast colors</label>
          </section>
          <section className="flex items-center gap-2 mb-5 mt-2">
            <Checkbox id="reduced-motion" disabled />
            <label htmlFor="reduced-motion">Reduced motion</label>
          </section>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Label className="text-xl text-muted-foreground">Theme</Label>
          <section className="flex items-center gap-2 mt-2">
            <ToggleGroup
              disabled
              type="single"
              value={values.Theme}
              className="flex gap-2"
            >
              <ToggleGroupItem
                value={Theme.Light}
                onClick={() => Window.setLightMode(onValueChange)}
              >
                <Sun />
                Light
              </ToggleGroupItem>
              <ToggleGroupItem
                value={Theme.Dark}
                onClick={() => Window.setDarkMode(onValueChange)}
              >
                <Moon />
                Dark
              </ToggleGroupItem>
            </ToggleGroup>
          </section>
        </CardContent>
      </Card>
    </>
  );
}
