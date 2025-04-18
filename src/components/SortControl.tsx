import React, { useCallback } from 'react';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

import { ValidSortFields } from '../types';
import { validateSortParams } from '../utils';

interface SearchControlProps {
  field: ValidSortFields;
}

export const SortControl: React.FC<SearchControlProps> = ({ field }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { validatedOrder, validatedSortBy } = validateSortParams(
    searchParams.get('sortBy'),
    searchParams.get('order'),
  );

  const handleSortParamsChange = useCallback(() => {
    setSearchParams(prevSearchParams => ({
      ...Object.fromEntries(prevSearchParams),
      sortBy: field,
      order: prevSearchParams.get('order') === 'asc' ? 'desc' : 'asc',
    }));
  }, [field, setSearchParams]);

  return (
    <button
      className="flex items-center rounded-md bg-stone-100 p-1 hover:bg-stone-200"
      onClick={handleSortParamsChange}
    >
      {validatedSortBy === field && validatedOrder === 'asc' && (
        <FiArrowUp size={8} />
      )}
      {validatedSortBy === field && validatedOrder === 'desc' && (
        <FiArrowDown size={8} />
      )}
      {validatedSortBy !== field && (
        <>
          <FiArrowUp size={8} />
          <FiArrowDown size={8} />
        </>
      )}
    </button>
  );
};
