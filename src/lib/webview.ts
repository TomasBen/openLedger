import { getCurrentWebview } from "@tauri-apps/api/webview";

export let scaleFactor = 1;

export class Webview {
  static async setZoom(scaleFactor: number) {
    await getCurrentWebview().setZoom(scaleFactor);
    return;
  }

  static async zoomIn() {
    if (scaleFactor >= 0.5 && scaleFactor <= 2) {
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
    if (scaleFactor >= 0.5 && scaleFactor <= 2) {
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
