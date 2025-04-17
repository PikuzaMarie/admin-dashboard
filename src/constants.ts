import {
  FiBarChart2,
  FiDollarSign,
  FiHome,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi';

import { Category, Product, SidebarItem, StatCardType } from './types';

export const SERVER_URL = 'https://dummyjson.com';
export const USERS_ENDPOINT = '/users';
export const USERS_LIMIT = 5;
export const AUTH_ENDPOINT = '/auth/me';
export const USER_LOGIN_ENDPOINT = '/user/login';
export const PRODUCTS_ENDPOINT = '/auth/products';
export const SEARCH_ENDPOINT = '/search';

export const PRODUCTS_FIELDS = Object.keys({
  id: 0,
  sku: '',
  title: '',
  description: '',
  brand: '',
  category: 'beauty',
  price: 0,
  stock: 0,
  rating: 0,
  thumbnail: '',
}) as (keyof Product)[];

export const ROUTES = {
  auth: '/auth',
  home: '/',
  products: '/products',
  users: '/users',
  sales: '/sales',
  orders: '/orders',
  analytics: '/analytics',
  settings: '/settings',
};

export const COLORS: { [key: string]: string } = {
  blue: '#6366F1',
  purple: '#8e51ff',
  pink: '#EC4899',
  green: '#10B981',
  yellow: '#F59E0B',
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { name: 'Home', Icon: FiHome, href: ROUTES.home },
  { name: 'Products', Icon: FiShoppingBag, href: ROUTES.products },
  { name: 'Users', Icon: FiUsers, href: ROUTES.users },
  { name: 'Sales', Icon: FiDollarSign, href: ROUTES.sales },
  { name: 'Orders', Icon: FiShoppingCart, href: ROUTES.orders },
  { name: 'Analytics', Icon: FiTrendingUp, href: ROUTES.analytics },
  { name: 'Settings', Icon: FiSettings, href: ROUTES.settings },
];

export const STAT_CARDS: StatCardType[] = [
  { name: 'Total Sales', Icon: FiZap, value: '$12,245', color: COLORS.blue },
  { name: 'New Users', Icon: FiUsers, value: '1,234', color: COLORS.purple },
  {
    name: 'Total Products',
    Icon: FiShoppingBag,
    value: '567',
    color: COLORS.pink,
  },
  {
    name: 'Conversion Rate',
    Icon: FiBarChart2,
    value: '12.5%',
    color: COLORS.green,
  },
];

export const SALES_DATA: { name: string; sales: number }[] = [
  { name: 'Jul', sales: 4200 },
  { name: 'Aug', sales: 3800 },
  { name: 'Sep', sales: 5100 },
  { name: 'Oct', sales: 4600 },
  { name: 'Nov', sales: 5400 },
  { name: 'Dec', sales: 7200 },
  { name: 'Jan', sales: 6100 },
  { name: 'Feb', sales: 5900 },
  { name: 'Mar', sales: 6800 },
  { name: 'Apr', sales: 6300 },
  { name: 'May', sales: 7100 },
  { name: 'Jun', sales: 7500 },
];

export const CATEGORY_DATA: { name: string; value: number; color: string }[] = [
  { name: 'Electronics', value: 4500, color: COLORS.blue },
  { name: 'Clothing', value: 3200, color: COLORS.purple },
  { name: 'Home & Garden', value: 2800, color: COLORS.pink },
  { name: 'Books', value: 2100, color: COLORS.green },
  { name: 'Sports & Outdoors', value: 1900, color: COLORS.yellow },
];

export const SALES_CHANNEL_DATA: {
  name: string;
  value: number;
  color: string;
}[] = [
  { name: 'Website', value: 45600, color: COLORS.blue },
  { name: 'Mobile App', value: 38200, color: COLORS.purple },
  { name: 'Marketplace', value: 29800, color: COLORS.pink },
  { name: 'Social Media', value: 18700, color: COLORS.green },
];

export const PRODUCTS_TABLE_HEADERS: { [key in keyof Product]: string } = {
  id: 'Id',
  sku: 'SKU',
  thumbnail: 'Image',
  title: 'Title',
  description: 'Description',
  brand: 'Brand',
  category: 'Category',
  price: 'Price',
  stock: 'Stock',
  rating: 'Rating',
};
export const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15];

export const CATEGORY_COLORS: Record<Category, string> = {
  beauty: 'bg-pink-100 text-pink-800',
  fragrances: 'bg-violet-100 text-violet-800',
  furniture: 'bg-teal-100 text-teal-800',
  groceries: 'bg-green-100 text-green-800',
  'home-decoration': 'bg-yellow-100 text-yellow-800',
  'kitchen-accessories': 'bg-orange-100 text-orange-800',
  laptops: 'bg-blue-100 text-blue-800',
  mensShirts: 'bg-cyan-100 text-cyan-800',
  mensShoes: 'bg-gray-100 text-gray-800',
  mensWatches: 'bg-indigo-100 text-indigo-800',
  'mobile-accessories': 'bg-teal-100 text-teal-800',
  motorcycle: 'bg-red-100 text-red-800',
  skinCare: 'bg-lime-100 text-lime-800',
  smartphones: 'bg-slate-100 text-slate-800',
  'sports-accessories': 'bg-emerald-100 text-emerald-800',
  sunglasses: 'bg-rose-100 text-rose-800',
  tablets: 'bg-violet-100 text-violet-800',
  tops: 'bg-fuchsia-100 text-fuchsia-800',
  vehicle: 'bg-stone-100 text-stone-800',
  'womens-bags': 'bg-pink-100 text-pink-800',
  'womens-dresses': 'bg-yellow-100 text-yellow-800',
  'womens-jewellery': 'bg-amber-100 text-amber-800',
  'womens-shoes': 'bg-rose-100 text-rose-800',
  'womens-watches': 'bg-emerald-100 text-emerald-800',
};
