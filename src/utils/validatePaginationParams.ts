import { ITEMS_PER_PAGE_OPTIONS } from '../constants';

export function validatePage(newPage: number, totalPages: number) {
  return Math.max(1, Math.min(newPage, totalPages));
}

export function validateItemsPerPage(newValue: number) {
  return ITEMS_PER_PAGE_OPTIONS.includes(newValue)
    ? newValue
    : ITEMS_PER_PAGE_OPTIONS[0];
}
