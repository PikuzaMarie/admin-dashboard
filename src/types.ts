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
  | 'homeDecoration'
  | 'kitchenAccessories'
  | 'laptops'
  | 'mensShirts'
  | 'mensShoes'
  | 'mensWatches'
  | 'mobileAccessories'
  | 'motorcycle'
  | 'skinCare'
  | 'smartphones'
  | 'sportsAccessories'
  | 'sunglasses'
  | 'tablets'
  | 'tops'
  | 'vehicle'
  | 'womensBags'
  | 'womensDresses'
  | 'womensJewellery'
  | 'womensShoes'
  | 'womensWatches';

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
