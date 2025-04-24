import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { ProductForm } from '../../components/ProductForm';
import { ProductHeader } from '../../components/ProductHeader';
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
      <ProductHeader backLinkText="All products" />
      <ProductForm onSubmit={handleCreateProduct} />
    </Dashboard>
  );
};
