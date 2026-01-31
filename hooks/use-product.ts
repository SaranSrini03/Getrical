"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/data";

export function useProduct(id: string | null) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });
}
