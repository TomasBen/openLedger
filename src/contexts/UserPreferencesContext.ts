import { createContext } from 'react';
import { UserPreferences, UserPreferencesContextType } from '../user-preferences';

const UserPreferencesContext = createContext<UserPreferencesContextType>({
  preferences: {} as UserPreferences,
  updatePreferences: () => {},
});

export default UserPreferencesContext;
