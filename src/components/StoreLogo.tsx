import React from 'react';
import { FiDollarSign } from 'react-icons/fi';

export const StoreLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-3xl bg-violet-500 p-2">
        <FiDollarSign className="text-white" size={12} />
      </div>
      <h2 className="text-sm/tight font-semibold">SalesX Store</h2>
    </div>
  );
};
