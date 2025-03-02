import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import '@/styles/App.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

window.addEventListener('error', (err) => {
  const { message, filename, lineno, colno, error } = err;

  toast.info(`${error}`, {
    description: `${message}, at ${lineno}:${colno}, ${filename}`,
  });
});

// useEffect(() => {
//   if (sessionStorage.getItem('isFirstBoot')) {
//     // run startup functions (database, userPreferences and such)
//   } else {
//     // do nothing
//   }
// }, []);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
