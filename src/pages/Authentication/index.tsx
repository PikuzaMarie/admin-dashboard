import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthForm } from '../../components/AuthForm';
import { Loader } from '../../components/Loader';
import { ROUTES } from '../../constants';
import { authenticateUser } from '../../features/auth/authSlice';
import {
  selectAllUsers,
  selectError,
  selectStatus,
} from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthData } from '../../types';

export const AuthenticationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>('');

  const fetchingError = useAppSelector(selectError);
  const fetchingStatus = useAppSelector(selectStatus);
  const fetchedUsers = useAppSelector(selectAllUsers);

  async function handleAuthenticate(authData: AuthData) {
    try {
      await dispatch(authenticateUser(authData)).unwrap();

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
      content = <Loader message="Loading users..." />;
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
      <section className="relative mt-[calc(20vh)] flex flex-col gap-6 justify-self-center rounded-xl border-1 border-stone-100 bg-stone-100 p-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-4xl font-semibold text-stone-950">
            Welcome back
          </h2>
          <p className="text-md text-stone-800">
            Select an account to continue with
          </p>
        </div>
        {content}
        {error && <p>Error occured: {error}</p>}
      </section>
    </main>
  );
};
