import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

import { ITEMS_PER_PAGE_OPTIONS } from '../constants';
import {
  currentPageChanged,
  selectCurrentPage,
} from '../features/products/productsSlice';
import {
  validateItemsPerPage,
  validatePage,
} from '../utils/validatePaginationParams';
import { useAppDispatch, useAppSelector } from '../withTypes';

interface PaginationProps {
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useAppSelector(selectCurrentPage);

  const itemsPerPage = validateItemsPerPage(
    Number(searchParams.get('itemsPerPage')),
  );

  const totalPages = Math.ceil(total / Number(itemsPerPage));

  const pageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  function handlePageChange(newValue: number) {
    const newPage = validatePage(newValue, totalPages);

    dispatch(currentPageChanged(newPage));
  }

  function handleItemsPerPageChange(newValue: number) {
    const newItemsPerPage = validateItemsPerPage(newValue);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      itemsPerPage: newItemsPerPage.toString(),
    });
  }

  return (
    <div className="mt-4 flex items-center justify-end gap-8">
      <div>
        <select
          name="itemsPerPage"
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={e => handleItemsPerPageChange(Number(e.target.value))}
          className="rounded-md bg-stone-100 hover:bg-stone-200"
        >
          {ITEMS_PER_PAGE_OPTIONS.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <select
          name="page"
          id="page"
          value={currentPage}
          onChange={e => handlePageChange(Number(e.target.value))}
          className="rounded-md bg-stone-100 hover:bg-stone-200"
        >
          {pageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p>
          of <span className="text-violet-500">{totalPages}</span> pages
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer rounded-xl bg-stone-100 p-1.5 hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-stone-100"
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer rounded-xl bg-stone-100 p-1.5 hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-stone-100"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};
