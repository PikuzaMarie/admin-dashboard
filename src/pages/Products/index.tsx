import React, { useEffect } from 'react';

import { Dashboard } from '../../components/Dashboard';
import { Loader } from '../../components/Loader';
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

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
    case 'searching': {
      content = <Loader message="Searching for products..." />;
      break;
    }
    case 'fulfilled': {
      content = (
        <>
          <div className="overflow-x-auto">
            <ProductsTable productsData={fetchedProducts} />
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
        <ProductsSearch />
      </div>
      {content}
    </Dashboard>
  );
};
