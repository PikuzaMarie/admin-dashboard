import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '../../app/withTypes';
import {
  ADD_ENDPOINT,
  PRODUCTS_ENDPOINT,
  PRODUCTS_FIELDS,
  SEARCH_ENDPOINT,
  SERVER_URL,
} from '../../constants';
import { RootState } from '../../store';
import { ExtendedProduct, Product } from '../../types';
import {
  buildURL,
  validateItemsPerPage,
  validateSortParams,
} from '../../utils';
import { getToken } from '../auth/helper';

interface ProductsState {
  products: Product[];
  currentProduct: ExtendedProduct;
  total: number;
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  error: string | undefined;
  currentPage: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: {} as ExtendedProduct,
  total: 0,
  status: 'idle',
  error: undefined,
  currentPage: 1,
};

export const createProduct = createAppAsyncThunk(
  'product/createProduct',
  async (productData: Partial<Product>) => {
    const token = getToken();

    const url = buildURL({
      serverURL: SERVER_URL,
      endpoint: PRODUCTS_ENDPOINT + ADD_ENDPOINT,
      params: {},
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to create new product');
    }

    const resData: Product = await response.json();

    return resData;
  },
);

export const updateProduct = createAppAsyncThunk(
  'products/updateProduct',
  async ({
    productId,
    updatedProductFields,
  }: {
    productId: Product['id'];
    updatedProductFields: Partial<Product>;
  }) => {
    const token = getToken();

    const url = buildURL({
      serverURL: SERVER_URL,
      endpoint: PRODUCTS_ENDPOINT + '/' + productId,
      params: {},
    });

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProductFields),
    });

    if (!response.ok) {
      throw new Error(`Failed to updated product with id: ${productId}`);
    }

    const resData: ExtendedProduct = await response.json();

    return resData;
  },
);

export const fetchCurrentProduct = createAppAsyncThunk(
  'products/fetchCurrentProduct',
  async ({ productId }: { productId: Product['id'] }) => {
    const token = getToken();

    const url = buildURL({
      serverURL: SERVER_URL,
      endpoint: PRODUCTS_ENDPOINT + '/' + productId,
      params: {},
    });

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product with id: ${productId}`);
    }

    const resData = await response.json();

    return resData;
  },
);

export const fetchProducts = createAppAsyncThunk(
  'products/fetchProducts',
  async ({
    currentPage,
    itemsPerPage,
    type,
    searchTerm,
    sortBy,
    order,
  }: {
    currentPage: number;
    itemsPerPage: number;
    type?: 'search' | 'plain' | 'sort';
    searchTerm?: string;
    sortBy?: string;
    order?: string;
  }) => {
    const token = getToken();

    const validatedItemsPerPage = validateItemsPerPage(itemsPerPage);

    const skip = (currentPage - 1) * validatedItemsPerPage;

    const { validatedSortBy, validatedOrder } = validateSortParams(
      sortBy,
      order,
    );

    let url: URL;
    switch (type) {
      case 'search': {
        url = buildURL({
          serverURL: SERVER_URL,
          endpoint: PRODUCTS_ENDPOINT + SEARCH_ENDPOINT,
          params: {
            q: searchTerm!,
            sortBy: validatedSortBy,
            order: validatedOrder,
            limit: validatedItemsPerPage,
            skip,
            select: PRODUCTS_FIELDS.join(','),
          },
        });
        break;
      }
      case 'sort': {
        url = buildURL({
          serverURL: SERVER_URL,
          endpoint: PRODUCTS_ENDPOINT,
          params: {
            sortBy: validatedSortBy,
            order: validatedOrder,
            limit: validatedItemsPerPage,
            skip,
            select: PRODUCTS_FIELDS.join(','),
          },
        });
        break;
      }
      default: {
        url = buildURL({
          serverURL: SERVER_URL,
          endpoint: PRODUCTS_ENDPOINT,
          params: {
            sortBy: 'id',
            order: 'asc',
            limit: validatedItemsPerPage,
            skip,
            select: PRODUCTS_FIELDS.join(','),
          },
        });
      }
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Could not fetch products');
    }
    const resData: ProductsResponse = await response.json();

    return { ...resData, limit: validatedItemsPerPage };
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    currentPageChanged(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.status = 'fulfilled';
        state.currentPage =
          action.payload.skip > action.payload.total
            ? 1
            : action.payload.skip / action.payload.limit + 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(fetchCurrentProduct.pending, state => {
        state.error = undefined;
        state.status = 'loading';
      })
      .addCase(fetchCurrentProduct.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchCurrentProduct.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.currentProduct = { ...state.currentProduct, ...action.payload };
        state.status = 'fulfilled';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, state => {
        state.status = 'fulfilled';
        state.total += 1;
      });
  },
});

export default productsSlice.reducer;

export const { currentPageChanged } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectCurrentProduct = (state: RootState) =>
  state.products.currentProduct;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsTotal = (state: RootState) => state.products.total;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectCurrentPage = (state: RootState) =>
  state.products.currentPage;
