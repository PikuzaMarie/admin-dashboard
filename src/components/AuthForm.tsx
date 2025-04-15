import React, { FormEvent, useState } from 'react';

import { AuthData, User } from '../types';

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
  const [selectedUserId, setSelectedUserId] = useState(0);

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select
          id="username"
          name="username"
          onChange={e => setSelectedUserId(Number(e.target.value))}
        >
          <option value="">select account</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        {selectedUserId !== 0 && user && (
          <button>Continue as {user.username}</button>
        )}
      </form>
    </>
  );
};
