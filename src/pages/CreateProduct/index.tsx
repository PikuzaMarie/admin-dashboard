import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { ProductForm } from '../../components/ProductForm';
import { ROUTES } from '../../constants';
import { createProduct } from '../../features/products/productsSlice';
import { useAppDispatch } from '../../hooks';
import { Product } from '../../types';

export const CreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateProduct = (productData: Partial<Product>) => {
    dispatch(createProduct(productData));

    navigate(ROUTES.products);
  };

  return (
    <Dashboard title="Create Product">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <Link to=".." relative="path">
          <button className="flex cursor-pointer items-center gap-1">
            <FiArrowLeft />
            <span>Back</span>
          </button>
        </Link>
      </div>
      <ProductForm onSubmit={handleCreateProduct} />
    </Dashboard>
  );
};
