import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId: User['id']) =>
  state.users.find(user => user.id === userId);
