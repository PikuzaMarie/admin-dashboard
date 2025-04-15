import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthForm } from '../../components/AuthForm';
import { ROUTES } from '../../constants';
import {
  selectAllUsers,
  selectError,
  selectStatus,
} from '../../features/users/usersSlice';
import { useAppSelector } from '../../hooks';
import { AuthData } from '../../types';

export const AuthenticationPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>('');

  const fetchingError = useAppSelector(selectError);
  const fetchingStatus = useAppSelector(selectStatus);
  const fetchedUsers = useAppSelector(selectAllUsers);

  async function handleAuthenticate(authData: AuthData) {
    try {
      const response = await fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate user');
      }
      // TODO: accept and manage token
      navigate(ROUTES.home);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to authenticate user. Check your credentials';
      setError(message);
    }
  }

  let content: React.ReactNode;

  switch (fetchingStatus) {
    case 'loading': {
      content = <p>Loading users...</p>;
      break;
    }
    case 'fulfilled': {
      content = (
        <AuthForm authenticate={handleAuthenticate} users={fetchedUsers} />
      );
      break;
    }
    case 'failed': {
      setError(fetchingError);
      break;
    }
  }

  return (
    <main>
      <h2>Welcome back</h2>
      <p>Select an account to continue with</p>
      {content}
      {error && <p>Error occured: {error}</p>}
    </main>
  );
};
