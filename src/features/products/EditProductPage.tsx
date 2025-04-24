import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ProductForm } from '../../components/ProductForm';
import { Dashboard } from '../../components/UI/Dashboard';
import { ProductHeader } from '../../components/UI/ProductHeader';
import { Product } from '../../types';
import { useAppDispatch, useAppSelector } from '../../withTypes';
import { selectCurrentProduct, updateProduct } from './productsSlice';

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
