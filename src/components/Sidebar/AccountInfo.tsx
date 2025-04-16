import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '../../constants';
import {
  fetchCurrentUser,
  selectAuthError,
  selectAuthStatus,
  selectCurrentUserId,
} from '../../features/auth/authSlice';
import { selectUserById } from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AccountToggle } from './AccountToggle';

export const AccountInfo: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const userId = useAppSelector(selectCurrentUserId);
  const user = useAppSelector(state => selectUserById(state, userId));
  const authStatus = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);

  if (authError || authStatus === 'rejected') {
    return <Navigate to={ROUTES.auth} replace />;
  }

  if (authStatus === 'pending') {
    return <p>Loading current user...</p>;
  }

  if (authStatus === 'authorized' && user) {
    return <AccountToggle name={user.username} email={user.email} />;
  }
};
