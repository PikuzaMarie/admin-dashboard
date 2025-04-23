import { Middleware } from 'redux';

import {
  createProduct,
  fetchProducts,
} from './features/products/productsSlice';
import { RootState } from './store';
import { Product } from './types';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const sessionStorageMiddleware: Middleware<{}, RootState> =
  () => next => action => {
    if (createProduct.fulfilled.match(action)) {
      sessionStorage.setItem('newItem', JSON.stringify(action.payload));
    }

    if (fetchProducts.fulfilled.match(action)) {
      const storedNewItem = sessionStorage.getItem('newItem');

      if (storedNewItem && action.payload.total > 0) {
        action.payload.total += 1;

        if (action.payload.skip === 190 && storedNewItem) {
          const product: Product = JSON.parse(storedNewItem);
          action.payload.products.push(product);
        }
      }
    }

    return next(action);
  };
