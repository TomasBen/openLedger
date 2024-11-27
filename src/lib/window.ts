import { getCurrentWindow } from "@tauri-apps/api/window";

export const window = getCurrentWindow();

export class Window {
  static async getCurrentTheme() {
    try {
      const theme = await window.theme();

      console.log(theme);
    } catch (error) {
      return error;
    }
  }

  static async setDarkMode() {
    try {
      await window.setTheme("dark");
    } catch (error) {
      return error;
    }
  }

  static async setLightMode() {
    try {
      await window.setTheme("light");
    } catch (error) {
      return error;
    }
  }
}
