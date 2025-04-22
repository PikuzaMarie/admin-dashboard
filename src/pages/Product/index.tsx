import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheckCircle,
  FiEdit,
  FiPlus,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { Loader } from '../../components/Loader';
import {
  fetchCurrentProduct,
  selectCurrentProduct,
  selectProductsStatus,
} from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { formatCurrency, formatStringifiedDate } from '../../utils';

export const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectCurrentProduct);
  const productStatus = useAppSelector(selectProductsStatus);

  useEffect(() => {
    if (Object.keys(product).length === 0 || +productId! !== product.id) {
      dispatch(fetchCurrentProduct({ productId: Number(productId) }));
    }
  }, [productId, dispatch, product]);

  let content: React.ReactNode;

  switch (productStatus) {
    case 'loading': {
      content = <Loader message="Loading product" />;
      break;
    }
    case 'fulfilled': {
      content = (
        <section>
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <Link to=".." relative="path">
              <button className="flex cursor-pointer items-center gap-1">
                <FiArrowLeft />
                <span>All Products</span>
              </button>
            </Link>
            <div className="flex gap-4">
              <Link to="edit">
                <button className="flex cursor-pointer items-center gap-1">
                  <FiEdit /> Edit
                </button>
              </Link>
              <button className="flex cursor-pointer items-center gap-1">
                <FiPlus /> Create new
              </button>
            </div>
          </div>
          <article>
            <section>
              <img src={product.images[0]} alt={product.title} />
              {/* TODO: display other images */}
              <div>
                <FiShoppingBag />
                <span>{product.brand ?? 'Unknown'}</span>
                <FiCheckCircle />
              </div>
            </section>
            <div>
              <h2>{product.title}</h2>
              <span>
                <FiStar />
                <span>{product.rating}</span>
              </span>
              <span>
                {product.reviews.length}
                <span>reviews</span>
              </span>
            </div>
            <p>{formatCurrency(product.price)}</p>
            <section>
              <h4>Description: </h4>
              <p>{product.description}</p>
            </section>
            <section>
              <h4>Stock information: </h4>
              <p>SKU: {product.sku}</p>
              <p
                className={`${product.availabilityStatus === 'Low Stock' ? 'bg-red-100 text-red-900' : 'bg-green-100 text-green-900'}`}
              >
                Count: {product.stock}
              </p>
            </section>
            <section>
              <h4>Shipping information: </h4>
              <div>
                <FiTruck />
                <div>
                  <span>Delivery</span>
                  <span>International delivery</span>
                </div>
              </div>
              <div>
                <FiTruck />
                <div>
                  <span>Shipping time</span>
                  <span>{product.shippingInformation}</span>
                </div>
              </div>
              <div>
                <FiAlertCircle />
                <div>
                  <span>Return policy</span>
                  <span>{product.returnPolicy}</span>
                </div>
              </div>
            </section>
            <section>
              <h4>Reviews: </h4>
              {product.reviews.map(review => (
                <article key={review.reviewerName + review.comment}>
                  <div>
                    <div>
                      <p>{review.reviewerName}</p>
                      <p>{review.reviewerEmail}</p>
                    </div>
                    <p>{formatStringifiedDate(review.date)}</p>
                  </div>
                  <span>
                    <FiStar />
                    <span>{product.rating}</span>
                  </span>
                  <p>{review.comment}</p>
                </article>
              ))}
            </section>
          </article>
        </section>
      );
    }
  }

  return <Dashboard title="Product">{content}</Dashboard>;
};
