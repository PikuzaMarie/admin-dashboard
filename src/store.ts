import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
  UnknownAction,
} from '@reduxjs/toolkit';

import authReducer, { userLoggedOut } from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import usersReducer from './features/users/usersSlice';
import { sessionStorageMiddleware } from './middleware';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  products: productsReducer,
});

const appReducer = (state: RootState | undefined, action: UnknownAction) => {
  if (userLoggedOut.match(action)) {
    state = undefined;
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sessionStorageMiddleware),
});

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
