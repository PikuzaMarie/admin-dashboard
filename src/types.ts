import { IconType } from 'react-icons';

export interface SidebarItem {
  name: string;
  Icon: IconType;
  href: string;
}

export interface StatCardType {
  name: string;
  Icon: IconType;
  color: string;
  value: string;
}

export type Category =
  | 'beauty'
  | 'fragrances'
  | 'furniture'
  | 'groceries'
  | 'home-decoration'
  | 'kitchen-accessories'
  | 'laptops'
  | 'mensShirts'
  | 'mensShoes'
  | 'mensWatches'
  | 'mobile-accessories'
  | 'motorcycle'
  | 'skinCare'
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
