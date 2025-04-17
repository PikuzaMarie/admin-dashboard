import { createSlice } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '../../app/withTypes';
import { SERVER_URL, USERS_ENDPOINT, USERS_LIMIT } from '../../constants';
import { RootState } from '../../store';
import { User } from '../../types';

interface UsersResponse {
  users: User[];
}

const initialState: {
  users: User[];
  error: string | undefined;
  status: 'idle' | 'loading' | 'fulfilled' | 'failed';
} = {
  users: [],
  error: undefined,
  status: 'idle',
};

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(
    SERVER_URL + USERS_ENDPOINT + `?limit=${USERS_LIMIT}`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: UsersResponse = await response.json();
  return data.users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (_, action) => {
        return { users: action.payload, error: undefined, status: 'fulfilled' };
      })
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUserById = (state: RootState, userId: User['id']) =>
  state.users.users.find(user => user.id === userId);
export const selectError = (state: RootState) => state.users.error;
export const selectStatus = (state: RootState) => state.users.status;
