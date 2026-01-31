"use client";

import { useQuery } from "@tanstack/react-query";
import type { ProductFilters, SortOption } from "@/types";
import { getProducts } from "@/lib/data";

function filterAndSort(
  products: Awaited<ReturnType<typeof getProducts>>,
  filters: ProductFilters
) {
  let result = [...products];
  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.minPrice > 0) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice < Number.MAX_SAFE_INTEGER) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }
  if (filters.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }
  const sort = filters.sort;
  if (sort === "newest") {
    result.sort((a, b) => 0);
  } else if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }
  return result;
}

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: getProducts,
    select: (data) => filterAndSort(data, filters),
  });
}

export function useProductsList() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
