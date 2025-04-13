import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from './Home';
import { RootLayout } from './RootLayout';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);
