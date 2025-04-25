import React from 'react';

interface ErrorProps {
  message?: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-red-100 px-4 py-2 text-red-900">
      <h3 className="border-b-[0.5px] border-red-200 pb-1 text-xl font-semibold">
        Ooops.. an error occured
      </h3>
      <p className="text-base">
        <i>Error message:</i>{' '}
        {message ?? 'Unknown error. Try to refresh the page'}
      </p>
    </div>
  );
};
