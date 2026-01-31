"use client";

import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/lib/data";

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: getFeaturedProducts,
  });
}
