import type { AttractionCategory } from './attraction';

export interface Category {
  id: AttractionCategory;
  name: string;
  icon: string;
  count: number;
  color: string;
}
