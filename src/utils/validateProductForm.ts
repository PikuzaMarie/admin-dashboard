import { CATEGORIES } from '../constants';

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
