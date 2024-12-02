import { getCurrentWebview } from '@tauri-apps/api/webview';
import { UserPreferences } from '../user-preferences';

export class Webview {
  static async zoomIn(preferences: UserPreferences, updatePreferences: (updates: Partial<UserPreferences>) => void) {
    if (preferences.ScaleFactor <= 2) {
      try {
        await getCurrentWebview().setZoom(preferences.ScaleFactor + 0.1);
        updatePreferences({ ScaleFactor: preferences.ScaleFactor + 0.1 });
      } catch (error) {
        console.error(error);
        return error as string;
      }
    }
  }

  static async zoomOut(preferences: UserPreferences, updatePreferences: (updates: Partial<UserPreferences>) => void) {
    if (preferences.ScaleFactor >= 0.5) {
      try {
        await getCurrentWebview().setZoom(preferences.ScaleFactor - 0.1);
        updatePreferences({ ScaleFactor: preferences.ScaleFactor - 0.1 });
        return;
      } catch (error) {
        console.error(error);
        return error as string;
      }
    }
  }
}
