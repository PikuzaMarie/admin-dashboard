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
import { validateItemsPerPage, validatePage } from '../../utils';
import { getToken } from '../auth/helper';

interface ProductsState {
  products: Product[];
  total: number;
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected' | 'searching';
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
    }: {
      currentPage: number;
      itemsPerPage: number;
    },
    { getState },
  ) => {
    const token = getToken();

    const validatedItemsPerPage = validateItemsPerPage(itemsPerPage);
    const state = getState() as RootState;
    const productsTotal = state.products.total;

    let validatedCurrentPage;

    if (productsTotal > 0) {
      const totalPages = Math.ceil(
        productsTotal / Number(validatedItemsPerPage),
      );
      validatedCurrentPage = validatePage(currentPage, totalPages);
    } else {
      validatedCurrentPage = 1;
    }

    const skip = (validatedCurrentPage - 1) * validatedItemsPerPage;

    const response = await fetch(
      SERVER_URL +
        PRODUCTS_ENDPOINT +
        `?limit=${validatedItemsPerPage}&skip=${skip}&select=${PRODUCTS_FIELDS.join(',')}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Could not fetch products');
    }
    const resData: ProductsResponse = await response.json();

    return resData;
  },
);

export const searchProducts = createAppAsyncThunk(
  'products/searchProducts',
  async (searchTerm: string) => {
    const token = getToken();

    const response = await fetch(
      SERVER_URL +
        PRODUCTS_ENDPOINT +
        SEARCH_ENDPOINT +
        `?q=${searchTerm}&select=${PRODUCTS_FIELDS.join(',')}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Could not fetch products for provided query');
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
      })
      .addCase(searchProducts.pending, state => {
        state.status = 'searching';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.status = 'fulfilled';
      })
      .addCase(searchProducts.rejected, (state, action) => {
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
