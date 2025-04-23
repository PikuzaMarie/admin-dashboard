import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import authReducer from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import usersReducer from './features/users/usersSlice';
import { sessionStorageMiddleware } from './middleware';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  products: productsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sessionStorageMiddleware),
});

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
