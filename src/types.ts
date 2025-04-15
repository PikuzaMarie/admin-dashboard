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

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  category: "women's clothing" | "men's clothing" | 'electronics' | 'jewelery';
  image: string;
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
