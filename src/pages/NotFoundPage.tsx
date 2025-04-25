import React from 'react';
import { Link } from 'react-router-dom';

import { Dashboard } from '../components/UI/Dashboard';
import { ROUTES } from '../constants';

export const NotFoundPage: React.FC = () => {
  return (
    <Dashboard title="404 page">
      <h3 className="text-5xl font-bold text-violet-500">404</h3>
      <p className="text-base">
        Couldn't find requested source or page. Return to Home Page, please :)
      </p>
      <Link
        to={ROUTES.home}
        className="flex w-fit items-center rounded-md border border-violet-800 p-2 text-sm font-semibold text-violet-800 hover:bg-violet-800 hover:text-violet-100"
      >
        Home Page
      </Link>
    </Dashboard>
  );
};
