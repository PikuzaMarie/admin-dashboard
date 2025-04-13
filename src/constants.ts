import {
  FiDollarSign,
  FiHome,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';

import { SidebarItem } from './types';

export const ROUTES = {
  home: '/',
  products: '/products',
  users: '/users',
  sales: '/sales',
  orders: '/orders',
  analytics: '/analytics',
  settings: '/settings',
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
