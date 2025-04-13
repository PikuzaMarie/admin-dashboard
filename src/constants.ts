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

export const STAT_CARDS: StatCardType[] = [
  { name: 'Total Sales', Icon: FiZap, value: '$12,245', color: '#6366F1' },
  { name: 'New Users', Icon: FiUsers, value: '1,234', color: '#8e51ff' },
  {
    name: 'Total Products',
    Icon: FiShoppingBag,
    value: '567',
    color: '#EC4899',
  },
  {
    name: 'Conversion Rate',
    Icon: FiBarChart2,
    value: '12.5%',
    color: '#10B981',
  },
];
