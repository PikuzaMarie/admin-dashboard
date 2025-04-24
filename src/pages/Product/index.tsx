import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEdit,
  FiPlus,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { Loader } from '../../components/Loader';
import {
  ProductHeader,
  ProductHeaderLink,
} from '../../components/ProductHeader';
import { CATEGORY_COLORS, COLORS, ROUTES } from '../../constants';
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

  let content: React.ReactNode;

  useEffect(() => {
    if (Object.keys(product).length === 0) {
      dispatch(fetchCurrentProduct({ productId: Number(productId) }));
    }
  }, [productId, dispatch, product]);

  switch (productStatus) {
    case 'loading': {
      content = <Loader message="Loading product" />;
      break;
    }
    case 'fulfilled': {
      content = (
        <section>
          <ProductHeader backLinkText="All products">
            <ProductHeaderLink to="edit" Icon={FiEdit} linkText="Edit" />
            <ProductHeaderLink
              to={`${ROUTES.products}/new`}
              Icon={FiPlus}
              linkText="Create New"
            />
          </ProductHeader>
          <article className="flex gap-6">
            <section className="flex flex-col gap-2 rounded-xl border border-stone-200">
              <figure className="m-4 w-100 rounded-xl border border-stone-200">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="block w-full"
                />
              </figure>
              {/* TODO: display other images */}
              <div className="mx-4 flex items-center gap-2 rounded-xl border border-stone-200 p-4">
                <FiShoppingBag size={18} />
                <span>{product.brand ?? 'Unknown'}</span>
                <FiCheckCircle size={12} stroke={COLORS.violet} />
              </div>
            </section>
            <section className="flex flex-col gap-8 rounded-xl border border-stone-200 p-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-semibold text-stone-950">
                  {product.title}
                </h2>
                <span className="flex items-center gap-4 text-sm font-semibold text-violet-800">
                  <span className="flex items-center gap-1">
                    <FiStar className="fill-yellow-500 text-yellow-500" />
                    <span className="text-stone-950">{product.rating}</span>
                  </span>
                  <span>
                    {product.reviews.length}
                    <span> reviews</span>
                  </span>
                  <span
                    className={`inline-flex rounded-full px-2 text-xs leading-5 ${CATEGORY_COLORS[product.category]}`}
                  >
                    {product.category}
                  </span>
                </span>
              </div>
              <p className="text-2xl font-bold text-violet-800">
                {formatCurrency(product.price)}
              </p>
              <section className="flex flex-col gap-2">
                <h4 className="text-lg font-medium">Description: </h4>
                <p className="text-stone-700">{product.description}</p>
              </section>
              <section className="flex flex-col gap-2">
                <h4 className="text-lg font-medium">Stock information: </h4>
                <div className="flex gap-4">
                  <p className="text-stone-700">SKU: {product.sku}</p>
                  <p
                    className={`${product.availabilityStatus === 'Low Stock' ? 'bg-red-100 text-red-900' : 'bg-green-100 text-green-900'} w-fit rounded-xl px-2`}
                  >
                    Count: {product.stock}
                  </p>
                </div>
              </section>
              <section className="flex flex-col gap-2">
                <h4 className="text-lg font-medium">Shipping information: </h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4 rounded-xl border border-stone-200 px-4 py-2">
                    <FiTruck size={16} />
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-stone-700">Delivery</span>
                      <span className="text-sm font-semibold">
                        International delivery
                      </span>
                    </div>
                  </div>
                  <div className="flex w-fit items-center gap-4 rounded-xl border border-stone-200 px-4 py-2">
                    <FiTruck size={16} />
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-stone-700">
                        Shipping time
                      </span>
                      <span className="text-sm font-semibold">
                        {product.shippingInformation}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-fit items-center gap-4 rounded-xl border border-stone-200 px-4 py-2">
                    <FiAlertCircle size={16} />
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-stone-700">
                        Return policy
                      </span>
                      <span className="text-sm font-semibold">
                        {product.returnPolicy}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-2">
                <h4 className="text-lg font-medium">Reviews: </h4>
                <div className="flex flex-wrap gap-2">
                  {product.reviews.map(review => (
                    <article
                      key={review.reviewerName + review.comment}
                      className="flex w-full flex-col gap-2 rounded-xl border border-stone-200 p-4"
                    >
                      <div className="flex items-center justify-between text-stone-800">
                        <div>
                          <p className="text-xs font-semibold">
                            {review.reviewerName}
                          </p>
                          <p className="text-[10px] text-stone-500">
                            {review.reviewerEmail}
                          </p>
                        </div>
                        <p className="text-[10px] text-stone-500">
                          {formatStringifiedDate(review.date)}
                        </p>
                      </div>
                      <span className="text-semibold flex items-center gap-1 text-xs">
                        <FiStar className="fill-yellow-500 text-yellow-500" />
                        <span className="text-stone-950">{product.rating}</span>
                      </span>
                      <p className="text-sm text-stone-700">
                        "{review.comment}"
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </section>
          </article>
        </section>
      );
    }
  }

  return <Dashboard title="Product">{content}</Dashboard>;
};
