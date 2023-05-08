import { ShopCategory } from '../utils/shopCategory';

export interface BasicProductModel {
  category?: ShopCategory;
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
}
