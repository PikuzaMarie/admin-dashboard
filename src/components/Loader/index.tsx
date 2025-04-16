import './styles.css';

import React from 'react';

interface LoaderProps {
  message?: string;
}
export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4">
      <div className="loader"></div>
      {message && <p className="text-md text-stone-800">{message}</p>}
    </div>
  );
};
