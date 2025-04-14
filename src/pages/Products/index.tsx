import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FiEye, FiStar } from 'react-icons/fi';
import { useLoaderData } from 'react-router-dom';

import { Dashboard } from '../../components/Dashboard';
import { Search } from '../../components/Sidebar/Search';
import { COLORS } from '../../constants';
import { Product } from '../../types';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const data: Product[] = useLoaderData();

  const filteredData = data.filter(
    product =>
      product.title.toLocaleLowerCase().includes(searchTerm) ||
      product.description.toLocaleLowerCase().includes(searchTerm),
  );

  return (
    <Dashboard title="Products">
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-md font-semibold text-stone-800">
          All Products List
        </h2>
        <div className="relative">
          <Search
            placeholder="Search products..."
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-y-1 border-stone-300">
          <thead className="border-b-1 border-stone-300">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                Id
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                Image
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                Title
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                Descripton
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                Category
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                Rating
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                Price
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium tracking-wider text-stone-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredData.map(product => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-2 py-2 text-xs font-medium whitespace-nowrap text-stone-800">
                  {product.id}
                </td>
                <td className="block w-25 px-2 py-2 text-xs font-medium whitespace-nowrap">
                  <img src={product.image} alt={product.title} />
                </td>
                <td className="max-w-[100px] overflow-hidden px-2 py-2 text-xs font-medium text-ellipsis whitespace-nowrap text-stone-800">
                  {product.title}
                </td>
                <td className="max-w-[200px] overflow-hidden px-2 py-2 text-xs font-medium text-ellipsis whitespace-nowrap text-stone-800">
                  {product.description.substring(0, 60)}
                </td>
                <td className="px-2 py-2 text-xs whitespace-nowrap text-stone-800">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                      product.category === "women's clothing"
                        ? 'bg-pink-100 text-pink-800'
                        : product.category === "men's clothing"
                          ? 'bg-green-100 text-green-800'
                          : product.category === 'jewelery'
                            ? 'bg-blue-100 text-blue-800'
                            : product.category === 'electronics'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.category}
                  </span>
                </td>
                <td className="px-2 py-2 text-xs text-stone-800">
                  <div className="flex items-center gap-1">
                    <FiStar fill={COLORS.yellow} stroke={COLORS.yellow} />
                    {product.rating.rate}
                  </div>
                </td>
                <td className="px-2 py-2 text-xs whitespace-nowrap text-stone-800">
                  {product.price}
                </td>
                <td className="px-2 py-2 text-xs text-stone-800">
                  <div className="flex items-center gap-0.5">
                    <button
                      className="mr-2 rounded-sm p-1 hover:bg-pink-100"
                      aria-describedby="hint-id"
                    >
                      <FiEye size={18} color={COLORS.purple} />
                    </button>
                    <p id="hint-id" className="textstone-800 text-xs">
                      See details
                    </p>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
          {filteredData.length === 0 && (
            <td colSpan={8}>
              <p className="py-2 text-stone-800">
                No results found for{' '}
                <span className="text-violet-500">"{searchTerm}"</span>
              </p>
            </td>
          )}
        </table>
      </div>
    </Dashboard>
  );
};

export async function loader() {
  const response = await fetch('https://fakestoreapi.com/products');

  if (!response.ok) {
    throw new Error('Could not fetch products');
  }

  return response;
}
