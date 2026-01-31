import type { Product, Category } from "@/types";

const sampleImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
];

function buildProduct(
  overrides: Partial<Product> & { id: string; name: string; category: Category; price: number }
): Product {
  return {
    description: "",
    originalPrice: overrides.price,
    images: sampleImages,
    rating: 4,
    reviewCount: 24,
    inStock: true,
    featured: false,
    specifications: [],
    ...overrides,
  };
}

export const mockProducts: Product[] = [
  buildProduct({
    id: "1",
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with 30h battery.",
    price: 129.99,
    originalPrice: 179.99,
    category: "Electronics",
    rating: 4.5,
    reviewCount: 312,
    featured: true,
    specifications: [
      { key: "Battery", value: "30h" },
      { key: "Connectivity", value: "Bluetooth 5.2" },
    ],
  }),
  buildProduct({
    id: "2",
    name: "Running Shoes",
    description: "Lightweight mesh running shoes for daily training.",
    price: 89.99,
    category: "Sports",
    rating: 4.2,
    reviewCount: 156,
    featured: true,
  }),
  buildProduct({
    id: "3",
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness and color temperature.",
    price: 45.99,
    category: "Home",
    rating: 4.7,
    featured: true,
  }),
  buildProduct({
    id: "4",
    name: "Cotton T-Shirt",
    description: "Organic cotton crew neck t-shirt. Available in multiple colors.",
    price: 24.99,
    category: "Clothing",
    inStock: true,
  }),
  buildProduct({
    id: "5",
    name: "Programming Guide",
    description: "Comprehensive guide to modern TypeScript and React.",
    price: 39.99,
    category: "Books",
    rating: 4.8,
  }),
  buildProduct({
    id: "6",
    name: "Skincare Set",
    description: "Cleanser, serum, and moisturizer for daily routine.",
    price: 59.99,
    category: "Beauty",
  }),
  buildProduct({
    id: "7",
    name: "Building Blocks Set",
    description: "200-piece construction set for ages 6+.",
    price: 34.99,
    category: "Toys",
  }),
  buildProduct({
    id: "8",
    name: "Organic Coffee",
    description: "Whole bean organic coffee, 1kg.",
    price: 14.99,
    category: "Grocery",
  }),
  buildProduct({
    id: "9",
    name: "Smart Watch",
    description: "Fitness tracking, heart rate, and notifications.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    rating: 4.4,
    featured: true,
  }),
  buildProduct({
    id: "10",
    name: "Yoga Mat",
    description: "Non-slip eco-friendly yoga mat with carrying strap.",
    price: 29.99,
    category: "Sports",
  }),
];

export function getProducts(): Promise<Product[]> {
  return Promise.resolve(mockProducts);
}

export function getProductById(id: string): Promise<Product | undefined> {
  return Promise.resolve(mockProducts.find((p) => p.id === id));
}

export function getFeaturedProducts(): Promise<Product[]> {
  return Promise.resolve(mockProducts.filter((p) => p.featured));
}

export function getProductsByCategory(category: Category): Promise<Product[]> {
  return Promise.resolve(
    mockProducts.filter((p) => p.category === category)
  );
}
