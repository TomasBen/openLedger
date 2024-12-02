import { getCurrentWebview } from '@tauri-apps/api/webview';
import { UserPreferences } from '../user-preferences';

export class Webview {
  static async zoomIn(preferences: UserPreferences, updatePreferences: (updates: Partial<UserPreferences>) => void) {
    if (preferences.scale_factor <= 2) {
      try {
        await getCurrentWebview().setZoom(preferences.scale_factor + 0.1);
        updatePreferences({ scale_factor: preferences.scale_factor + 0.1 });
        console.log('[Webview::zoomIn] Zoom level updated to ' + preferences.scale_factor);
      } catch (error) {
        console.error(error);
        return error as string;
      }
    }
  }

  static async zoomOut(preferences: UserPreferences, updatePreferences: (updates: Partial<UserPreferences>) => void) {
    if (preferences.scale_factor >= 0.5) {
      try {
        await getCurrentWebview().setZoom(preferences.scale_factor - 0.1);
        updatePreferences({ scale_factor: preferences.scale_factor - 0.1 });
        console.log('[Webview::zoomOut] Zoom level updated to ' + preferences.scale_factor);
        return;
      } catch (error) {
        console.error(error);
        return error as string;
      }
    }
  }
}
