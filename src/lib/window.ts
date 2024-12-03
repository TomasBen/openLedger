import { getCurrentWindow } from '@tauri-apps/api/window';

import { UserPreferences, Theme } from '../types/user-preferences';

export const window = getCurrentWindow();

export class Window {
  static async getCurrentTheme(preferences: UserPreferences) {
    if (preferences.Theme === (await window.theme())) {
      return preferences.Theme;
    } else {
      console.error('[Window.ts] preferences.Theme and webview.theme dont match');
    }
  }

  static async setDarkMode(updatePreferences: (updates: Partial<UserPreferences>) => void) {
    try {
      await window.setTheme('dark');
      updatePreferences({ Theme: Theme.Dark });
    } catch (error) {
      return error;
    }
  }

  static async setLightMode(updatePreferences: (updates: Partial<UserPreferences>) => void) {
    try {
      await window.setTheme('light');
      updatePreferences({ Theme: Theme.Light });
    } catch (error) {
      return error;
    }
  }

  /* static async setHighContastMode(preferences: UserPreferences) {
    if (preferences.Theme === Theme.Light) {
      Object.entries(variables).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });
    } else {

    }
  } */
}

/* const variables = {
  '--color-primary': 'rgb(0 32 78)',
  '--color-surface-tint': 'rgb(68 94 145)',
  '--color-on-primary': 'rgb(255 255 255)',
  '--color-primary-container': 'rgb(39 66 115)',
  '--color-on-primary-container': 'rgb(255 255 255)',
  '--color-secondary': 'rgb(55 27 0)',
  '--color-on-secondary': 'rgb(255 255 255)',
  '--color-secondary-container': 'rgb(102 55 1)',
  '--color-on-secondary-container': 'rgb(255 255 255)',
  '--color-tertiary': 'rgb(0 41 15)',
  '--color-on-tertiary': 'rgb(255 255 255)',
  '--color-tertiary-container': 'rgb(20 77 39)',
  '--color-on-tertiary-container': 'rgb(255 255 255)',
  '--color-error': 'rgb(78 0 2)',
  '--color-on-error': 'rgb(255 255 255)',
  '--color-error-container': 'rgb(140 0 9)',
  '--color-on-error-container': 'rgb(255 255 255)',
  '--color-background': 'rgb(249 249 255)',
  '--color-on-background': 'rgb(26 27 32)',
  '--color-surface': 'rgb(249 249 255)',
  '--color-on-surface': 'rgb(0 0 0)',
  '--color-surface-variant': 'rgb(225 226 236)',
  '--color-on-surface-variant': 'rgb(33 36 43)',
  '--color-outline': 'rgb(64 67 75)',
  '--color-outline-variant': 'rgb(64 67 75)',
  '--color-shadow': 'rgb(0 0 0)',
  '--color-scrim': 'rgb(0 0 0)',
  '--color-inverse-surface': 'rgb(47 48 54)',
  '--color-inverse-on-surface': 'rgb(255 255 255)',
  '--color-inverse-primary': 'rgb(230 236 255)',
  '--color-primary-fixed': 'rgb(39 66 115)',
  '--color-on-primary-fixed': 'rgb(255 255 255)',
  '--color-primary-fixed-dim': 'rgb(11 43 92)',
  '--color-on-primary-fixed-variant': 'rgb(255 255 255)',
  '--color-secondary-fixed': 'rgb(102 55 1)',
  '--color-on-secondary-fixed': 'rgb(255 255 255)',
  '--color-secondary-fixed-dim': 'rgb(71 36 0)',
  '--color-on-secondary-fixed-variant': 'rgb(255 255 255)',
  '--color-tertiary-fixed': 'rgb(20 77 39)',
  '--color-on-tertiary-fixed': 'rgb(255 255 255)',
  '--color-tertiary-fixed-dim': 'rgb(0 53 21)',
  '--color-on-tertiary-fixed-variant': 'rgb(255 255 255)',
  '--color-surface-dim': 'rgb(217 217 224)',
  '--color-surface-bright': 'rgb(249 249 255)',
  '--color-surface-container-lowest': 'rgb(255 255 255)',
  '--color-surface-container-low': 'rgb(243 243 250)',
  '--color-surface-container': 'rgb(238 237 244)',
  '--color-surface-container-high': 'rgb(232 231 238)',
  '--color-surface-container-highest': 'rgb(226 226 233)',
}; */
