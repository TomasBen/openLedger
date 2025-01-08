import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

import { Provider } from './components/ui/provider.tsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './material-theme/theme.ts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider >
          <MantineProvider>
            <App />
          </MantineProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
