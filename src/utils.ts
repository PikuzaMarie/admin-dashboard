import { ITEMS_PER_PAGE_OPTIONS } from './constants';
import { Product, ValidOrders, ValidSortFields } from './types';

export function validatePage(newPage: number, totalPages: number) {
  return Math.max(1, Math.min(newPage, totalPages));
}

export function validateItemsPerPage(newValue: number) {
  return ITEMS_PER_PAGE_OPTIONS.includes(newValue)
    ? newValue
    : ITEMS_PER_PAGE_OPTIONS[0];
}

export function validateSortParams(
  sortBy: string | null | undefined,
  order: string | null | undefined,
) {
  const validSortFields: Array<keyof Omit<Product, 'image'>> = [
    'id',
    'sku',
    'title',
    'description',
    'brand',
    'category',
    'price',
    'stock',
    'rating',
  ];
  const validOrders: Array<'asc' | 'desc'> = ['asc', 'desc'];

  const validatedSortBy = validSortFields.includes(sortBy as ValidSortFields)
    ? (sortBy as ValidSortFields)
    : 'id';

  const validatedOrder = validOrders.includes(order as ValidOrders)
    ? (order as ValidOrders)
    : 'asc';

  return { validatedSortBy, validatedOrder };
}

interface BuildURLParams {
  endpoint: string;
  serverURL: string;
  params: Record<string, string | number>;
}

export function buildURL({ serverURL, endpoint, params }: BuildURLParams) {
  const url = new URL(endpoint, serverURL);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, String(value)),
  );

  return url;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatStringifiedDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(date);
}
