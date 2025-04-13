import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from './RootLayout';

export const routes = createBrowserRouter([
  { path: '/', element: <RootLayout /> },
]);
