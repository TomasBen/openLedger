import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import UserPreferencesProvider from './components/layout/UserPreferencesProvider.tsx';
import App from './App.tsx';

import { ThemeProvider } from '@mui/material/styles';
import theme from './material-theme/theme.ts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserPreferencesProvider>
          <App />
        </UserPreferencesProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
