"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import type { ProductFilters, Category, SortOption } from "@/types";
import { CATEGORIES } from "@/types";
import { cn } from "@/lib/utils";

function ProductsPageSkeleton() {
  return (
    <div className="container px-4 py-6">
      <div className="flex gap-6">
        <div className="h-96 w-64 shrink-0 animate-pulse rounded-lg bg-muted" />
        <div className="flex-1 space-y-4">
          <div className="h-10 w-48 animate-pulse rounded bg-muted" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Rating" },
  { value: "name", label: "Name A-Z" },
];

const PRICE_MAX = 300;

function parseFilters(searchParams: URLSearchParams): ProductFilters {
  const category = searchParams.get("category");
  const search = searchParams.get("search") ?? "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || PRICE_MAX;
  const inStockOnly = searchParams.get("inStock") === "1";
  const sort = (searchParams.get("sort") as SortOption) ?? "newest";
  return {
    category: category && CATEGORIES.includes(category as Category) ? (category as Category) : null,
    minPrice,
    maxPrice: maxPrice === 0 ? Number.MAX_SAFE_INTEGER : maxPrice,
    inStockOnly,
    search,
    sort,
  };
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initialFilters = useMemo(
    () => parseFilters(new URLSearchParams(searchParams)),
    [searchParams]
  );
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: products, isLoading } = useProducts(filters);

  const updateFilter = <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: null,
      minPrice: 0,
      maxPrice: Number.MAX_SAFE_INTEGER,
      inStockOnly: false,
      search: "",
      sort: "newest",
    });
  };

  const hasActiveFilters =
    filters.category ||
    filters.minPrice > 0 ||
    filters.maxPrice < PRICE_MAX ||
    filters.inStockOnly ||
    filters.search.trim() ||
    filters.sort !== "newest";

  return (
    <div className="container px-4 py-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside
          className={cn(
            "w-full shrink-0 space-y-4 rounded-lg border bg-card p-4 lg:w-64",
            sidebarOpen ? "block" : "hidden lg:block"
          )}
        >
          <div className="flex items-center justify-between lg:justify-start">
            <h3 className="font-semibold">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              Close
            </Button>
          </div>
          <div>
            <label className="text-sm font-medium">Search</label>
            <Input
              type="search"
              placeholder="Name or description..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              value={filters.category ?? ""}
              onChange={(e) =>
                updateFilter(
                  "category",
                  e.target.value ? (e.target.value as Category) : null
                )
              }
            >
              <option value="">All</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Price range</label>
            <Slider
              className="mt-2"
              min={0}
              max={PRICE_MAX}
              step={5}
              value={[filters.minPrice, Math.min(filters.maxPrice, PRICE_MAX)]}
              onValueChange={([min, max]) => {
                updateFilter("minPrice", min);
                updateFilter("maxPrice", max === PRICE_MAX ? Number.MAX_SAFE_INTEGER : max);
              }}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              ${filters.minPrice} - ${Math.min(filters.maxPrice, PRICE_MAX)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="inStock"
              checked={filters.inStockOnly}
              onChange={(e) => updateFilter("inStockOnly", e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <label htmlFor="inStock" className="text-sm">
              In stock only
            </label>
          </div>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </aside>

        <div className="flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              Filters
            </Button>
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {filters.category && (
                  <Badge variant="secondary">
                    {filters.category}
                    <button
                      type="button"
                      className="ml-1 rounded-full hover:bg-muted"
                      onClick={() => updateFilter("category", null)}
                      aria-label={`Remove ${filters.category}`}
                    >
                      <span className="sr-only">Remove</span>
                      <span aria-hidden>x</span>
                    </button>
                  </Badge>
                )}
                {filters.search && (
                  <Badge variant="secondary">
                    Search: {filters.search}
                    <button
                      type="button"
                      className="ml-1"
                      onClick={() => updateFilter("search", "")}
                      aria-label="Clear search"
                    >
                      x
                    </button>
                  </Badge>
                )}
              </div>
            )}
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-transparent px-2 py-1 text-sm"
                value={filters.sort}
                onChange={(e) =>
                  updateFilter("sort", e.target.value as SortOption)
                }
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <div className="flex rounded-md border border-input">
                <Button
                  variant={layout === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => setLayout("grid")}
                  aria-label="Grid view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </Button>
                <Button
                  variant={layout === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => setLayout("list")}
                  aria-label="List view"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3.01" y1="6" y2="6" />
                    <line x1="3" x2="3.01" y1="12" y2="12" />
                    <line x1="3" x2="3.01" y1="18" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div
              className={cn(
                "grid gap-4",
                layout === "grid"
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-xl bg-muted"
                  aria-hidden
                />
              ))}
            </div>
          ) : !products?.length ? (
            <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
              No products match your filters. Try adjusting or clear filters.
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-4",
                layout === "grid"
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} layout={layout} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPageContent />
    </Suspense>
  );
}
