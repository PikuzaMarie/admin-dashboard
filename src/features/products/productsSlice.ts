import { createSlice } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '../../app/withTypes';
import {
  PRODUCTS_ENDPOINT,
  PRODUCTS_FIELDS,
  SERVER_URL,
} from '../../constants';
import { RootState } from '../../store';
import { Product } from '../../types';
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
  status: 'loading',
  error: undefined,
};

export const fetchProducts = createAppAsyncThunk(
  'products/fetchProducts',
  async () => {
    const token = getToken();

    const response = await fetch(
      SERVER_URL + PRODUCTS_ENDPOINT + `?select=${PRODUCTS_FIELDS.join(',')}`,
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
