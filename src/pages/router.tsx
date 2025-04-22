import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '../constants';
import { AuthenticationPage } from './Authentication';
import { CreateProductPage } from './CreateProduct/index.tsx';
import { EditProductPage } from './EditProduct/index.tsx';
import { HomePage } from './Home';
import { ProductPage } from './Product';
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
      { path: ROUTES.products + '/:productId', element: <ProductPage /> },
      {
        path: ROUTES.products + '/:productId' + '/edit',
        element: <EditProductPage />,
      },
      {
        path: ROUTES.products + '/new',
        element: <CreateProductPage />,
      },
    ],
  },
]);
