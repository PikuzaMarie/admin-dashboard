import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

import { ITEMS_PER_PAGE_OPTIONS } from '../constants';
import { validateNewItemsPerPage, validateNewPage } from '../utils';

interface PaginationProps {
  total: number;
  onPageChange: (page: number, itemsPerPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  onPageChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 10;

  const totalPages = Math.ceil(total / Number(itemsPerPage));

  const pageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  function handlePageChange(newValue: number) {
    const newPage = validateNewPage(newValue, totalPages);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString(),
    });

    onPageChange(newPage, itemsPerPage);
  }

  function handleItemsPerPageChange(newValue: number) {
    const newItemsPerPage = validateNewItemsPerPage(
      newValue,
      pageOptions.length,
    );

    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: '1',
      itemsPerPage: newItemsPerPage.toString(),
    });

    onPageChange(1, newItemsPerPage);
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
