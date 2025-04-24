import React from 'react';
import { FiEye, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { CATEGORY_COLORS, PRODUCTS_TABLE_HEADERS, ROUTES } from '../constants';
import { fetchCurrentProduct } from '../features/products/productsSlice';
import { Product, ValidSortFields } from '../types';
import { formatCurrency } from '../utils';
import { useAppDispatch } from '../withTypes';
import { SortControl } from './SortControl';

interface ProductsTableProps {
  productsData: Product[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  productsData,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoToProductPage = (productId: number) => {
    dispatch(fetchCurrentProduct({ productId }));
    navigate(ROUTES.products + '/' + productId);
  };

  return (
    <table className="min-w-full border-y-1 border-stone-300">
      <thead className="border-b-1 border-stone-300">
        <tr>
          {Object.values(PRODUCTS_TABLE_HEADERS).map(header => (
            <th
              key={header}
              className="cursor-pointer px-2 py-1 text-left text-xs font-medium tracking-wider text-stone-500 uppercase"
            >
              <div className="flex gap-1">
                <span>{header}</span>
                {header !== 'Image' && (
                  <SortControl
                    field={header.toLocaleLowerCase() as ValidSortFields}
                  />
                )}
              </div>
            </th>
          ))}
          <th className="px-2 py-1 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-stone-200">
        {productsData.map(product => (
          <tr key={product.id} className="cursor-pointer hover:bg-stone-50">
            <td className="px-2 py-1 text-xs font-medium whitespace-nowrap text-stone-800">
              {product.id}
            </td>
            <td className="px-2 py-1 text-xs font-medium whitespace-nowrap text-stone-800">
              {product.sku}
            </td>
            <td className="block w-25 px-2 py-1 text-xs font-medium whitespace-nowrap">
              <img src={product.thumbnail} alt={product.title} />
            </td>
            <td className="max-w-[100px] overflow-hidden px-2 py-1 text-xs font-medium text-ellipsis whitespace-nowrap text-stone-800">
              {product.title}
            </td>
            <td className="max-w-[200px] overflow-hidden px-2 py-1 text-xs font-medium text-ellipsis whitespace-nowrap text-stone-800">
              {product.description.substring(0, 60)}
            </td>
            <td className="max-w-[200px] overflow-hidden px-2 py-1 text-xs font-medium text-ellipsis whitespace-nowrap text-stone-800">
              {product.brand ?? 'unknown'}
            </td>
            <td className="px-2 py-1 text-xs whitespace-nowrap">
              <span
                className={`inline-flex rounded-full px-2 text-xs leading-5 ${CATEGORY_COLORS[product.category]}`}
              >
                {product.category}
              </span>
            </td>
            <td className="px-2 py-1 text-xs whitespace-nowrap text-stone-800">
              {formatCurrency(product.price)}
            </td>
            <td className="px-2 py-1 text-xs whitespace-nowrap text-stone-800">
              {product.stock}
            </td>
            <td className="px-2 py-1 text-xs text-stone-800">
              <div className="flex items-center gap-1">
                <FiStar className="fill-yellow-500 text-yellow-500" />
                {product.rating}
              </div>
            </td>

            <td className="px-2 py-1 text-xs text-stone-800">
              <div className="flex items-center gap-0.5">
                <button
                  className="mr-2 flex items-center gap-1 rounded-sm p-1 hover:bg-violet-100"
                  aria-describedby="hint-id"
                  onClick={() => handleGoToProductPage(product.id)}
                >
                  <FiEye size={18} className="text-violet-500" />
                  <p id="hint-id" className="textstone-800 text-xs">
                    See details
                  </p>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
