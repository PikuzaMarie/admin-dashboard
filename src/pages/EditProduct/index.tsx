import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { ProductForm } from '../../components/ProductForm';
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
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <Link to=".." relative="path">
          <button className="flex cursor-pointer items-center gap-1">
            <FiArrowLeft />
            <span>Back</span>
          </button>
        </Link>
      </div>
      <ProductForm onSubmit={handleUpdateProduct} product={product} />
    </Dashboard>
  );
};
