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
    try {
      window.toggleMaximize();
    } catch (error) {
      return error;
    }
  }

  static async toggleFullscreen() {
    if (await window.isFullscreen()) {
      window.setFullscreen(false);
    } else {
      window.setFullscreen(true);
    }
  }
}
