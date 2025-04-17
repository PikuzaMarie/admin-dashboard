import React, { useEffect, useState } from 'react';

import { Dashboard } from '../../components/Dashboard';
import { Loader } from '../../components/Loader';
import { ProductsTable } from '../../components/ProductsTable';
import { Search } from '../../components/Sidebar/Search';
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
  selectProductsTotal,
} from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const fetchedProducts = useAppSelector(selectProducts);

  const productsTotal = useAppSelector(selectProductsTotal);
  const productsStatus = useAppSelector(selectProductsStatus);
  const productsError = useAppSelector(selectProductsError);

  const filteredData = fetchedProducts.filter(
    product =>
      product.title.toLocaleLowerCase().includes(searchTerm) ||
      product.description.toLocaleLowerCase().includes(searchTerm),
  );

  let content: React.ReactNode;

  switch (productsStatus) {
    case 'loading': {
      content = <Loader message="Loading products..." />;
      break;
    }
    case 'fulfilled': {
      content = (
        <>
          <div className="mb-6 flex items-start justify-between">
            <h2 className="text-md font-semibold text-stone-800">
              All Products List ({productsTotal})
            </h2>
            <div className="relative">
              <Search
                placeholder="Search products..."
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <ProductsTable productsData={filteredData} />
            {filteredData.length === 0 && (
              <div>
                <p className="py-2 text-stone-800">
                  No results found for
                  <span className="text-violet-500">"{searchTerm}"</span>
                </p>
              </div>
            )}
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

  return <Dashboard title="Products">{content}</Dashboard>;
};
