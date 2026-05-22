export type Product = {
  id: string;
  image: string;
  name: string;
  rating: { stars: number; count: number };
  priceCents: number;
  category: string;
  subCategory: string;
  description: string;
};
