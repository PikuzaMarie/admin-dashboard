import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductForm } from '../../components/ProductForm';
import { Dashboard } from '../../components/UI/Dashboard';
import { ProductHeader } from '../../components/UI/ProductHeader';
import { ROUTES } from '../../constants';
import { Product } from '../../types';
import { useAppDispatch } from '../../withTypes';
import { createProduct } from './productsSlice';

export const CreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateProduct = (productData: Partial<Product>) => {
    dispatch(createProduct(productData));

    navigate(ROUTES.products);
  };

  return (
    <Dashboard title="Create Product">
      <ProductHeader backLinkText="All products" />
      <ProductForm onSubmit={handleCreateProduct} />
    </Dashboard>
  );
};
