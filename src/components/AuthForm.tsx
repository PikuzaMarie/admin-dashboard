import React, { FormEvent, useState } from 'react';

import { AuthData, User } from '../types';
import { Loader } from './Loader';
import { AccountToggle } from './Sidebar/AccountToggle';

interface LoginPageFormFileds extends HTMLFormControlsCollection {
  username: HTMLSelectElement;
  password: HTMLInputElement;
}

interface LoginPageFormElements extends HTMLFormElement {
  readonly elements: LoginPageFormFileds;
}

interface AuthFormProps {
  users: User[];
  authenticate: (authData: AuthData) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ users, authenticate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(1);
  const user = users.find(user => user.id === selectedUserId);

  function handleSubmit(e: FormEvent<LoginPageFormElements>) {
    e.preventDefault();

    if (user) {
      setIsLoading(true);
      const username = user.username;
      const password = user.password;

      const authData = {
        username,
        password,
      };

      authenticate(authData);
    }
  }

  function switchToNextUser() {
    setSelectedUserId(prevId => (prevId === users.length ? 1 : prevId + 1));
  }

  function switchToPrevUser() {
    setSelectedUserId(prevId => (prevId === 1 ? users.length : prevId - 1));
  }

  if (isLoading) {
    return <Loader message="Authentication in progress..." />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {selectedUserId !== 0 && user && !isLoading && (
          <div className="flex flex-col gap-4">
            <div className="scale-125">
              <AccountToggle
                email={user.email}
                name={user.username}
                handleChevronUpClick={switchToNextUser}
                handleChevronDownCLick={switchToPrevUser}
              />
            </div>
            <button className="w-full rounded-md bg-stone-800 p-2 text-center text-stone-50 hover:bg-purple-700">
              Continue as {user.username}
            </button>
          </div>
        )}
      </form>
    </>
  );
};
