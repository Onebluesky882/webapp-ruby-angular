import { Product } from './product.type';

export type CartItem = {
  userId: string;
  qty: number;
  total: number;
  status: 'onCart' | 'paid' | 'cancelled' | 'received';
  items: Product[];
};
