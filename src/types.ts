import { IconType } from 'react-icons';

export interface SidebarItem {
  name: string;
  Icon: IconType;
  href: string;
}

export interface StatCardType {
  title: string;
  value: number;
  trend: 'up' | 'down';
  pillText: string;
  period: string;
}

export type Category =
  | 'beauty'
  | 'fragrances'
  | 'furniture'
  | 'groceries'
  | 'home-decoration'
  | 'kitchen-accessories'
  | 'laptops'
  | 'mens-shirts'
  | 'mens-shoes'
  | 'mens-watches'
  | 'mobile-accessories'
  | 'motorcycle'
  | 'skin-care'
  | 'smartphones'
  | 'sports-accessories'
  | 'sunglasses'
  | 'tablets'
  | 'tops'
  | 'vehicle'
  | 'womens-bags'
  | 'womens-dresses'
  | 'womens-jewellery'
  | 'womens-shoes'
  | 'womens-watches';

export interface Product {
  id: number;
  sku: string;
  title: string;
  description: string;
  brand: string;
  category: Category;
  price: number;
  stock: number;
  rating: number;
  thumbnail: string;
}

interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ExtendedProduct extends Product {
  images: string[];
  reviews: ProductReview[];
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: 'In stock' | 'Low Stock';
  returnPolicy: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

export interface AuthData {
  username: User['username'];
  password: User['password'];
}

export type ValidSortFields = keyof Omit<Product, 'image'>;
export type ValidOrders = 'asc' | 'desc';

export interface SortParams {
  sortBy: ValidSortFields;
  order: ValidOrders;
}
