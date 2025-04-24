import { Product, ValidOrders, ValidSortFields } from '../types';

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

export function validateSortParams(
  sortBy: string | null | undefined,
  order: string | null | undefined,
) {
  const validOrders: Array<'asc' | 'desc'> = ['asc', 'desc'];

  const validatedSortBy = validSortFields.includes(sortBy as ValidSortFields)
    ? (sortBy as ValidSortFields)
    : 'id';

  const validatedOrder = validOrders.includes(order as ValidOrders)
    ? (order as ValidOrders)
    : 'asc';

  return { validatedSortBy, validatedOrder };
}
