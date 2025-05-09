import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Error } from '../../components/Error';
import { StoreLogo } from '../../components/StoreLogo';
import { Loader } from '../../components/UI/Loader';
import { ROUTES } from '../../constants';
import { AuthData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../withTypes';
import {
  fetchUsers,
  selectAllUsers,
  selectUsersError,
  selectUsersStatus,
} from '../users/usersSlice';
import { AuthForm } from './AuthForm';
import { authenticateUser } from './authSlice';

export const AuthenticationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchingUsersError = useAppSelector(selectUsersError);
  const fetchingUsersStatus = useAppSelector(selectUsersStatus);
  const fetchedUsers = useAppSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  async function handleAuthenticate(authData: AuthData) {
    await dispatch(authenticateUser(authData));

    navigate(ROUTES.home);
  }

  let content: React.ReactNode;

  switch (fetchingUsersStatus) {
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
      content = <Error message={fetchingUsersError} />;
      break;
    }
  }

  return (
    <main>
      <section className="relative mt-[calc(20vh)] flex flex-col gap-6 justify-self-center rounded-xl border-1 border-stone-100 bg-stone-100 p-20">
        <div className="flex flex-col gap-2">
          <div className="mb-4 flex self-center">
            <StoreLogo />
          </div>
          <h2 className="text-center text-4xl font-semibold text-stone-950">
            Welcome back
          </h2>
          <p className="text-md text-stone-800">
            Select an account to continue with
          </p>
        </div>
        {content}
      </section>
    </main>
  );
};
