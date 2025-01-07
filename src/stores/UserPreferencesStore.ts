import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/core';

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
  })
  .catch((error) => {
    console.error('Failed to load preferences:', error);
  });
