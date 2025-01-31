import { getCurrentWindow } from '@tauri-apps/api/window';
import { UserPreferences, Theme } from '../types/user-preferences';

export const window = getCurrentWindow();

export class Window {
  static async getCurrentTheme(preferences: UserPreferences) {
    if (preferences.Theme === (await window.theme())) {
      return preferences.Theme;
    } else {
      console.error(
        '[Window.ts] preferences.Theme and webview.theme dont match',
      );
    }
  }

  static async setDarkMode(
    updatePreferences: (updates: Partial<UserPreferences>) => void,
  ) {
    try {
      await window.setTheme('dark');
      updatePreferences({ Theme: Theme.Dark });
    } catch (error) {
      return error;
    }
  }

  static async setLightMode(
    updatePreferences: (updates: Partial<UserPreferences>) => void,
  ) {
    try {
      await window.setTheme('light');
      updatePreferences({ Theme: Theme.Light });
    } catch (error) {
      return error;
    }
  }

  static async toggleMaximize() {
    if (await window.isMaximized()) {
      /* document.documentElement.setAttribute('data-maximize', 'false'); */
      window.toggleMaximize();
    } else {
      /* document.documentElement.setAttribute('data-maximize', 'true'); */
      window.toggleMaximize();
    }
  }
}
