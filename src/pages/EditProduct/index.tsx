import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { ProductForm } from '../../components/ProductForm';
import { ProductHeader } from '../../components/ProductHeader';
import {
  selectCurrentProduct,
  updateProduct,
} from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Product } from '../../types';

export const EditProductPage: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const product = useAppSelector(selectCurrentProduct);

  const handleUpdateProduct = (productData: Partial<Product>) => {
    dispatch(
      updateProduct({
        productId: Number(productId),
        updatedProductFields: productData,
      }),
    );

    navigate('..', { relative: 'path' });
  };
  return (
    <Dashboard title="Edit Product">
      <ProductHeader backLinkText="Back" />
      <ProductForm onSubmit={handleUpdateProduct} product={product} />
    </Dashboard>
  );
};
