import { getCurrentWebview } from '@tauri-apps/api/webview';
import { UserPreferences } from '@/types/user-preferences';

export class Webview {
  static async zoomIn(
    preferences: UserPreferences,
    updatePreferences: (updates: Partial<UserPreferences>) => void,
  ) {
    if (preferences.ScaleFactor <= 2) {
      try {
        const newFactor = Number((preferences.ScaleFactor + 0.1).toFixed(2));
        await getCurrentWebview().setZoom(newFactor);
        updatePreferences({ ScaleFactor: newFactor });
      } catch (error) {
        console.error(error);
        return error as string;
      }
    }
  }

  static async zoomOut(
    preferences: UserPreferences,
    updatePreferences: (updates: Partial<UserPreferences>) => void,
  ) {
    if (preferences.ScaleFactor >= 0.5) {
      try {
        const newFactor = Number((preferences.ScaleFactor - 0.1).toFixed(2));
        await getCurrentWebview().setZoom(newFactor);
        updatePreferences({ ScaleFactor: newFactor });
        return;
      } catch (error) {
        console.error(error);
        return error as string;
      }
    }
  }
}
