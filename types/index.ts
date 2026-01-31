export const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home",
  "Books",
  "Sports",
  "Beauty",
  "Toys",
  "Grocery",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: Category;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  specifications: { key: string; value: string }[];
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  priceSnapshot: number;
}

export type UserRole = "customer" | "seller" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "name";

export interface ProductFilters {
  category: Category | null;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  search: string;
  sort: SortOption;
}
