import { getCurrentWebview } from "@tauri-apps/api/webview";

export let scaleFactor = 1;

export class Webview {
  static async zoomIn() {
    if (scaleFactor <= 2) {
      try {
        await getCurrentWebview().setZoom(scaleFactor + 0.1);
        scaleFactor += 0.1;
        return;
      } catch (error) {
        console.error(error);
        return error as string;
      }
    }
  }

  static async zoomOut() {
    if (scaleFactor >= 0.5) {
      try {
        await getCurrentWebview().setZoom(scaleFactor - 0.1);
        scaleFactor -= 0.1;
        return;
      } catch (error) {
        console.error(error);
        return error as string;
      }
    }
  }
}
