import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    products: productsReducer,
  },
});

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
