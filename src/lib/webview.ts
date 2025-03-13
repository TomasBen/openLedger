import { getCurrentWebview } from '@tauri-apps/api/webview';
import { usePreferencesStore } from '@/stores/userPreferencesStore';

export class Webview {
  static async zoomIn() {
    const preferences = usePreferencesStore.getState().preferences;
    const newFactor = Number((preferences.ScaleFactor + 0.1).toFixed(2));

    const zoomIn = async () => {
      await getCurrentWebview().setZoom(newFactor);
      usePreferencesStore
        .getState()
        .updatePreferences({ ScaleFactor: newFactor });
    };

    if (preferences.ScaleFactor <= 2) {
      zoomIn();
    } else {
      return new Error("can't zoom in any more");
    }
  }

  static async zoomOut() {
    const preferences = usePreferencesStore.getState().preferences;
    const newFactor = Number((preferences.ScaleFactor - 0.1).toFixed(2));

    const zoomOut = async () => {
      await getCurrentWebview().setZoom(newFactor);
      usePreferencesStore
        .getState()
        .updatePreferences({ ScaleFactor: newFactor });
    };

    if (preferences.ScaleFactor >= 0.5) {
      zoomOut();
    } else {
      return new Error("can't zoom out any more");
    }
  }
}
