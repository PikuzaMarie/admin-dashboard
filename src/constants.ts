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

import { SidebarItem, StatCardType } from './types';

export const SERVER_URL = 'https://dummyjson.com';
export const USERS_ENDPOINT = '/users';
export const USERS_LIMIT = 5;
export const AUTH_ENDPOINT = '/auth/me';
export const USER_LOGIN_ENDPOINT = '/user/login';

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
