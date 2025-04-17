import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '../constants';
import { AuthenticationPage } from './Authentication';
import { HomePage } from './Home';
import { ProductsPage } from './Products';
import { RootLayout } from './RootLayout';

export const routes = createBrowserRouter([
  { path: ROUTES.auth, element: <AuthenticationPage /> },
  {
    path: ROUTES.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: ROUTES.products,
        element: <ProductsPage />,
      },
    ],
  },
]);
