/** @format */

import { ICategory } from './category';

export interface IMenu {
  id: number;
  image: string;
  description: string;
  product_name: string;
  price: number;
  Category: ICategory;
}
