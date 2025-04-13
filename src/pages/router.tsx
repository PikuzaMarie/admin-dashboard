import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '../constants';
import { HomePage } from './Home';
import { RootLayout } from './RootLayout';

export const routes = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);
