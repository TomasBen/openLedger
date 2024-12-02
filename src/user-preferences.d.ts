/* !!! All preference types have to be in uppercase since the rust side enums are as well,
and transforming the strings on every update call isn't ideal */

export enum Language {
  English = 'English',
  Spanish = 'Spanish',
}

export enum Theme {
  Light = 'Light',
  Dark = 'Dark',
}

export type UserPreferencesContextType = {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
};

export interface UserPreferences {
  Language: Language;
  Theme: Theme;
  ScaleFactor: number;
  Fullscreen: boolean;
}
