import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { Loader } from '../../components/Loader';
import {
  fetchCurrentProduct,
  selectCurrentProduct,
  selectProductsStatus,
} from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectCurrentProduct);
  const productStatus = useAppSelector(selectProductsStatus);

  useEffect(() => {
    dispatch(fetchCurrentProduct({ productId: Number(productId) }));
  }, [productId, dispatch]);

  let content: React.ReactNode;

  switch (productStatus) {
    case 'loading': {
      content = <Loader message="Loading product" />;
      break;
    }
    case 'fulfilled': {
      content = <div>{product.title}</div>;
    }
  }

  return <Dashboard title="Product">{content}</Dashboard>;
};
