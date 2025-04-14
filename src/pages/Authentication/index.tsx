import React from 'react';

import { AuthForm } from '../../components/AuthForm';

export const AuthenticationPage: React.FC = () => {
  return (
    <main>
      <h2>Welcome back</h2>
      <p>Select an account to continue with</p>
      <AuthForm />
    </main>
  );
};
