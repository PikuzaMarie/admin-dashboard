import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  fetchProducts,
  searchProducts,
  selectProductsStatus,
  selectProductsTotal,
} from '../features/products/productsSlice';
import { useAppDispatch } from '../hooks';
import { useDebounce } from '../hooks/useDebounce';
import { Search } from './Search';

export const ProductsSearch: React.FC = () => {
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 1000 });

  const productsStatus = useSelector(selectProductsStatus);
  const resultsCount = useSelector(selectProductsTotal);

  useEffect(() => {
    if (
      debouncedSearchTerm.trim() &&
      productsStatus !== 'searching' &&
      productsStatus !== 'loading'
    ) {
      dispatch(searchProducts(debouncedSearchTerm));
    } else if (!debouncedSearchTerm.trim() && productsStatus === 'fulfilled') {
      dispatch(fetchProducts());
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <div className="flex flex-col">
      <Search
        placeholder="Search products..."
        onChange={e => setSearchTerm(e.target.value)}
      />
      {debouncedSearchTerm && resultsCount === 0 && (
        <p className="text-sm text-stone-800">
          No results found for
          <span className="text-violet-500">"{searchTerm}"</span>
        </p>
      )}
    </div>
  );
};
