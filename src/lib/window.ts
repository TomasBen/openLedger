import { getCurrentWindow } from '@tauri-apps/api/window';
import { Theme } from '../types/user-preferences';
import { usePreferencesStore } from '@/stores/userPreferencesStore';

export const window = getCurrentWindow();

export class Window {
  static async getCurrentTheme() {
    const preferences = usePreferencesStore.getState().preferences;

    if (preferences.Theme === (await window.theme())) {
      return preferences.Theme;
    } else {
      return new Error(
        '[Window.ts] preferences.Theme and webview.theme dont match',
      );
    }
  }

  static async setDarkMode() {
    try {
      await window.setTheme('dark');
      usePreferencesStore.getState().updatePreferences({ Theme: Theme.Dark });
    } catch (error) {
      return error;
    }
  }

  static async setLightMode() {
    try {
      await window.setTheme('light');
      usePreferencesStore.getState().updatePreferences({ Theme: Theme.Light });
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

  // static async toggleFullscreen() {
  //   if (await window.isFullscreen()) {
  //     window.setFullscreen(false);
  //   } else {
  //     window.setFullscreen(true);
  //   }
  // }
}
