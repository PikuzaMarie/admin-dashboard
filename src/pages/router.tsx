import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '../constants';
import { HomePage } from './Home';
import { loader as productsLoader, ProductsPage } from './Products';
import { RootLayout } from './RootLayout';

export const routes = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ROUTES.products,
        element: <ProductsPage />,
        loader: productsLoader,
      },
    ],
  },
]);
