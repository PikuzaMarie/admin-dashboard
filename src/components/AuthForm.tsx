import React, { FormEvent, useState } from 'react';

import { AuthData, User } from '../types';
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
  const [selectedUserId, setSelectedUserId] = useState(1);
  const user = users.find(user => user.id === selectedUserId);

  function handleSubmit(e: FormEvent<LoginPageFormElements>) {
    e.preventDefault();

    if (user) {
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        {selectedUserId !== 0 && user && (
          <>
            <AccountToggle
              email={user.email}
              name={user.username}
              handleChevronUpClick={switchToNextUser}
              handleChevronDownCLick={switchToPrevUser}
            />
            <button>Continue as {user.username}</button>
          </>
        )}
      </form>
    </>
  );
};
