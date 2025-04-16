import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '../../constants';
import {
  fetchCurrentUser,
  selectAuthError,
  selectAuthStatus,
  selectCurrentUserId,
  userLoggedOut,
} from '../../features/auth/authSlice';
import { getToken, getTokenDuration } from '../../features/auth/helper';
import { selectUserById } from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Loader } from '../Loader';
import { AccountToggle } from './AccountToggle';

export const AccountInfo: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const userId = useAppSelector(selectCurrentUserId);
  const user = useAppSelector(state => selectUserById(state, userId));
  const token = getToken();

  useEffect(() => {
    if (!token) {
      dispatch(userLoggedOut());
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      dispatch(userLoggedOut());
    }, tokenDuration);
  }, [token, dispatch]);

  const authStatus = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);

  if (authError || authStatus === 'rejected' || authStatus === 'loggedOut') {
    return <Navigate to={ROUTES.auth} replace />;
  }

  if (authStatus === 'pending') {
    return <Loader message="Loading current user..." />;
  }

  if (authStatus === 'authorized' && user) {
    return <AccountToggle name={user.username} email={user.email} />;
  }
};
