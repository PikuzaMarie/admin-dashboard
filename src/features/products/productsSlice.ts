import { createSlice } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '../../app/withTypes';
import {
  PRODUCTS_ENDPOINT,
  PRODUCTS_FIELDS,
  SEARCH_ENDPOINT,
  SERVER_URL,
} from '../../constants';
import { RootState } from '../../store';
import { Product } from '../../types';
import {
  buildURL,
  validatePaginationParams,
  validateSortParams,
} from '../../utils';
import { getToken } from '../auth/helper';

interface ProductsState {
  products: Product[];
  total: number;
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  error: string | undefined;
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  status: 'idle',
  error: undefined,
};

export const fetchProducts = createAppAsyncThunk(
  'products/fetchProducts',
  async (
    {
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
    },
    { getState },
  ) => {
    const token = getToken();

    const state = getState() as RootState;
    const productsTotal = state.products.total;

    const { validatedItemsPerPage, validatedCurrentPage } =
      validatePaginationParams(currentPage, itemsPerPage, productsTotal);

    const skip = (validatedCurrentPage - 1) * validatedItemsPerPage;

    let url: URL;
    switch (type) {
      case 'search': {
        url = buildURL({
          serverURL: SERVER_URL,
          endpoint: PRODUCTS_ENDPOINT + SEARCH_ENDPOINT,
          params: {
            q: searchTerm!,
            limit: validatedItemsPerPage,
            skip,
            select: PRODUCTS_FIELDS.join(','),
          },
        });
        break;
      }
      case 'sort': {
        const { validatedSortBy, validatedOrder } = validateSortParams(
          sortBy,
          order,
        );

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

    return resData;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.status = 'fulfilled';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsTotal = (state: RootState) => state.products.total;
export const selectProductsError = (state: RootState) => state.products.error;
