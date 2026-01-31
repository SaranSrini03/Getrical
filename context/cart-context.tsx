"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types";
import { useAuth } from "./auth-context";

const STORAGE_PREFIX = "ecomm-cart-";

interface CartContextValue {
  items: CartItem[];
  count: number;
  addItem: (productId: string, quantity: number, priceSnapshot: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  getItemByProductId: (productId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(userId: string | null): CartItem[] {
  if (typeof window === "undefined" || !userId) return [];
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + userId);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(userId: string, items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_PREFIX + userId, JSON.stringify(items));
}

function generateId() {
  return `ci-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  const userId = user?.id ?? null;

  useEffect(() => {
    setItems(loadCart(userId));
  }, [userId]);

  useEffect(() => {
    if (userId) saveCart(userId, items);
  }, [userId, items]);

  const addItem = useCallback(
    (productId: string, quantity: number, priceSnapshot: number) => {
      if (!userId) return;
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === productId);
        if (existing) {
          return prev.map((i) =>
            i.id === existing.id
              ? { ...i, quantity: i.quantity + quantity, priceSnapshot }
              : i
          );
        }
        return [
          ...prev,
          {
            id: generateId(),
            userId,
            productId,
            quantity,
            priceSnapshot,
          },
        ];
      });
    },
    [userId]
  );

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const getItemByProductId = useCallback(
    (productId: string) => items.find((i) => i.productId === productId),
    [items]
  );

  const count = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      addItem,
      updateQuantity,
      removeItem,
      getItemByProductId,
    }),
    [items, count, addItem, updateQuantity, removeItem, getItemByProductId]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
