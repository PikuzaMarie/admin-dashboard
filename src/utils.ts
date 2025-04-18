import { ITEMS_PER_PAGE_OPTIONS } from './constants';

export function validatePage(newPage: number, totalPages: number) {
  return Math.max(1, Math.min(newPage, totalPages));
}

export function validateItemsPerPage(newValue: number) {
  return ITEMS_PER_PAGE_OPTIONS.includes(newValue)
    ? newValue
    : ITEMS_PER_PAGE_OPTIONS[0];
}

export function validatePaginationParams(
  currentPage: number,
  itemsPerPage: number,
  itemsTotal: number,
) {
  const validatedItemsPerPage = validateItemsPerPage(itemsPerPage);
  let validatedCurrentPage;

  if (itemsTotal > 0) {
    const totalPages = Math.ceil(itemsTotal / Number(validatedItemsPerPage));
    validatedCurrentPage = validatePage(currentPage, totalPages);
  } else {
    validatedCurrentPage = 1;
  }

  return { validatedItemsPerPage, validatedCurrentPage };
}
