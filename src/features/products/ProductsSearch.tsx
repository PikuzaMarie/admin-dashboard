import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { Search } from '../../components/UI/Search';
import { selectProductsStatus, selectProductsTotal } from './productsSlice';

interface ProductsSearch {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ProductsSearch: React.FC<ProductsSearch> = memo(
  ({ searchTerm, onSearchChange }) => {
    const productsStatus = useSelector(selectProductsStatus);
    const resultsCount = useSelector(selectProductsTotal);

    return (
      <div className="flex flex-col">
        <Search
          placeholder="Search products..."
          onChange={e => onSearchChange(e.target.value)}
        />
        {productsStatus === 'fulfilled' && resultsCount === 0 && (
          <p className="text-sm text-stone-800">
            No results found for
            <span className="text-violet-500"> "{searchTerm}"</span>
          </p>
        )}
      </div>
    );
  },
);
