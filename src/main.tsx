import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import UserPreferencesProvider from './components/layout/UserPreferencesProvider.tsx';
import theme from './material-theme/theme.ts';
import App from './App.tsx';

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
