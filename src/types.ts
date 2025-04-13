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
