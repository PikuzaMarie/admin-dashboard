import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductsSearch } from '../../components/ProductsSearch';
import { ProductsTable } from '../../components/ProductsTable';
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
  selectProductsTotal,
} from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useDebounce } from '../../hooks/useDebounce';

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 10;
  const currentPage = Number(searchParams.get('page')) || 1;

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 1000 });

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const fetchProductsForPage = useCallback(
    (currentPage: number, itemsPerPage: number, searchTerm?: string) => {
      dispatch(
        fetchProducts({
          currentPage,
          itemsPerPage,
          type: searchTerm ? 'search' : 'plain',
          searchTerm,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    fetchProductsForPage(currentPage, itemsPerPage, debouncedSearchTerm);
  }, [
    dispatch,
    currentPage,
    itemsPerPage,
    fetchProductsForPage,
    debouncedSearchTerm,
  ]);

  const fetchedProducts = useAppSelector(selectProducts);

  const productsTotal = useAppSelector(selectProductsTotal);
  const productsStatus = useAppSelector(selectProductsStatus);
  const productsError = useAppSelector(selectProductsError);

  let content: React.ReactNode;

  switch (productsStatus) {
    case 'loading': {
      content = <Loader message="Loading products..." />;
      break;
    }
    case 'fulfilled': {
      content = (
        <>
          <div className="overflow-x-auto">
            <ProductsTable productsData={fetchedProducts} />
            <Pagination total={productsTotal} />
          </div>
        </>
      );
      break;
    }
    case 'rejected': {
      content = <p>Error occured while fetching products:{productsError}</p>;
      break;
    }
    default: {
      content = <p>Nothing to show :(</p>;
    }
  }

  return (
    <Dashboard title="Products">
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-md font-semibold text-stone-800">
          All Products List ({productsTotal})
        </h2>
        <ProductsSearch onSearchChange={handleSearchChange} />
      </div>
      {content}
    </Dashboard>
  );
};
