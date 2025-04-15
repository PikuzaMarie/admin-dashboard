import { createSlice } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '../../app/withTypes';
import { RootState } from '../../store';
import { AuthData, User } from '../../types';

export interface AuthState {
  username: User['username'] | null;
  token: string | null;
  expiresIn: number;
}

interface AuthResponse {
  username: User['username'];
  token: string;
}

const initialState: AuthState = {
  username: null,
  token: null,
  expiresIn: 0,
};

export const authenticateUser = createAppAsyncThunk(
  'auth/authenticateUser',
  async (authData: AuthData) => {
    const response = await fetch('https://dummyjson.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: AuthResponse = await response.json();

    const now = new Date();
    const expiresIn = now.setTime(now.getHours() + 1);

    return { ...data, expiresIn };
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedOut() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(authenticateUser.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const { userLoggedOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUsername = (state: RootState) => state.auth.username;
export const selectToken = (state: RootState) => state.auth.token;
