import { CATEGORIES, ITEMS_PER_PAGE_OPTIONS } from './constants';
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

export function validateTitle(title: string) {
  const trimmedTitleLength = title.trim().length;
  const isValid = trimmedTitleLength >= 2 && trimmedTitleLength <= 200;
  return isValid ? '' : 'Title should have length between 2 and 200 characters';
}

export function validateDescription(description: string) {
  const trimmedDescriptionLength = description.trim().length;
  const isValid =
    trimmedDescriptionLength >= 2 && trimmedDescriptionLength <= 500;
  return isValid
    ? ''
    : 'Description should have length between 2 and 500 characters';
}

export function validateThumbnailURL(thumbnailURL: string) {
  const trimmedURL = thumbnailURL.trim();

  try {
    new URL(trimmedURL);
    return '';
  } catch {
    return 'Incorrect URL. It should start with http:// or https://';
  }
}

export function validateCategory(category: string) {
  const trimmedCategory = category.trim();

  return CATEGORIES.includes(trimmedCategory) ? '' : 'Incorrect category';
}

export function validateBrand(brand: string) {
  const trimmedBrandLength = brand.trim().length;
  const isValid = trimmedBrandLength >= 2 && trimmedBrandLength <= 100;
  return isValid ? '' : 'Brand should have length between 2 and 100 characters';
}
export function validatePrice(price: string): string {
  const trimmedPrice = price.trim();

  if (!trimmedPrice) {
    return 'Price must not be empty. Please enter a value';
  }

  const parsedPrice = parseFloat(trimmedPrice);

  if (isNaN(parsedPrice)) {
    return 'Invalid format. Please enter a valid number, e.g., 1 or 1.00';
  }

  if (parsedPrice <= 0 || parsedPrice > 1_000_000_000) {
    return 'Price must be greater than 0 and not exceed 1,000,000,000';
  }

  return '';
}

export function validateStock(stock: string) {
  const trimmedStock = stock.trim();

  if (!trimmedStock) {
    return 'Price must not be empty. Please enter a value';
  }

  const parsedStock = parseInt(trimmedStock);

  if (isNaN(parsedStock)) {
    return 'Invalid format. Please enter a valid number, e.g., 1';
  }

  if (parsedStock <= 0 || parsedStock > 1_000_000) {
    return 'Stock must be greater than 0 and not exceed 1,000,000';
  }

  return '';
}
