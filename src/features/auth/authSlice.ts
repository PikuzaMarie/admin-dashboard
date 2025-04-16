import { createSlice } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '../../app/withTypes';
import { RootState } from '../../store';
import { AuthData, User } from '../../types';
import { getToken, removeToken, setToken } from './helper';

interface AuthState {
  userId: User['id'];
  status: 'idle' | 'pending' | 'authorized' | 'rejected' | 'loggedOut';
  error: string | undefined;
}

interface AuthResponse {
  id: User['id'];
  accessToken: string;
}

const initialState: AuthState = {
  userId: 0,
  status: 'idle',
  error: undefined,
};

export const fetchCurrentUser = createAppAsyncThunk(
  'auth/fetchCurrentUser',
  async () => {
    const token = getToken();

    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const user: User = await response.json();
    return user;
  },
);

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

    setToken(data.accessToken);

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
      removeToken();
      return { ...initialState, status: 'loggedOut' };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.status = 'authorized';
        state.error = undefined;
      })
      .addCase(fetchCurrentUser.pending, state => {
        state.status = 'pending';
        state.error = undefined;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.userId = action.payload.id;
        state.status = 'authorized';
        state.error = undefined;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { userLoggedOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserId = (state: RootState) => state.auth.userId;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
