import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import usersReducer from './features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
