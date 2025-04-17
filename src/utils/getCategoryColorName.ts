import { Category } from '../types';

export function getCategoryColor(category: Category) {
  switch (category) {
    case 'beauty':
      return 'pink';
    case 'fragrances':
      return 'purple';
    case 'furniture':
      return 'stone';
    case 'groceries':
      return 'green';
    case 'homeDecoration':
      return 'yellow';
    case 'kitchenAccessories':
      return 'orange';
    case 'laptops':
      return 'blue';
    case 'mensShirts':
      return 'cyan';
    case 'mensShoes':
      return 'gray';
    case 'mensWatches':
      return 'indigo';
    case 'mobileAccessories':
      return 'teal';
    case 'motorcycle':
      return 'red';
    case 'skinCare':
      return 'lime';
    case 'smartphones':
      return 'slate';
    case 'sportsAccessories':
      return 'emerald';
    case 'sunglasses':
      return 'rose';
    case 'tablets':
      return 'violet';
    case 'tops':
      return 'fuchsia';
    case 'vehicle':
      return 'stone';
    case 'womensBags':
      return 'pink';
    case 'womensDresses':
      return 'yellow';
    case 'womensJewellery':
      return 'amber';
    case 'womensShoes':
      return 'rose';
    case 'womensWatches':
      return 'emerald';
    default:
      return 'stone';
  }
}
