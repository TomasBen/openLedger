import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/core';
import { error, info } from '@tauri-apps/plugin-log';

import { Language, Theme, Sidebar, UserPreferences, PreferencesStore } from '@/types/user-preferences';

const defaultPreferences: UserPreferences = {
  Language: Language.English,
  Theme: Theme.Light,
  SidebarSetting: Sidebar.Expanded,
  ScaleFactor: 1.0,
  Fullscreen: false,
};

export const usePreferencesStore = create<PreferencesStore>((set) => ({
  preferences: defaultPreferences,

  updatePreferences: async (update: Partial<UserPreferences>) => {
    set((state) => ({
      preferences: { ...state.preferences, ...update },
    })),
      await invoke('update_preferences', { update });
  },
}));

invoke<UserPreferences>('get_preferences')
  .then((preferences) => {
    usePreferencesStore.setState({ preferences });
    info(`preferences from backend: ${JSON.stringify(preferences)}`);
  })
  .catch((e) => {
    error(`Failed to load preferences: ${e}`);
  });
