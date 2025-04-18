import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

import { ITEMS_PER_PAGE_OPTIONS } from '../constants';
import { validateItemsPerPage, validatePage } from '../utils';

interface PaginationProps {
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = validateItemsPerPage(
    Number(searchParams.get('itemsPerPage')),
  );

  const totalPages = Math.ceil(total / Number(itemsPerPage));

  const currentPage = validatePage(
    Number(searchParams.get('page')),
    totalPages,
  );

  const pageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  function handlePageChange(newValue: number) {
    const newPage = validatePage(newValue, totalPages);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
    });
  }

  function handleItemsPerPageChange(newValue: number) {
    const newItemsPerPage = validateItemsPerPage(newValue);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: '1',
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
        >
          {pageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span>of {totalPages} pages</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};
