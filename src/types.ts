export interface Product {
  title: string;
  price: number;
  discountPercentage: number;
  quantity: number;
  total: number;
}

export interface Cart {
  id: string;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number | null;
}
