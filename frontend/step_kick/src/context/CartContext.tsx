"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CartItem = {
  id: string;
  name: string;
  tag: string;
  size: string;
  color: string;
  colorHex: string;
  price: number;
  qty: number;
  img: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQty: (id: string, size: string, color: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shipping: number;
  cartTotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  
  // Wishlist addition
  wishlist: string[]; // array of product IDs
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;

  // Account addition
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("stepkick_cart");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error("Error loading cart from localStorage", e);
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("stepkick_wishlist");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error("Error loading wishlist from localStorage", e);
      }
    }
    return [];
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Save items when they change
  useEffect(() => {
    try {
      localStorage.setItem("stepkick_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart to localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("stepkick_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Error saving wishlist to localStorage", e);
    }
  }, [wishlist]);

  const addToCart = useCallback((newItem: Omit<CartItem, "qty">, qty = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += qty;
        return updated;
      } else {
        return [...prev, { ...newItem, qty }];
      }
    });
    setIsCartDrawerOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      )
    );
  }, []);

  const updateQty = useCallback((id: string, size: string, color: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size && item.color === color) {
            return { ...item, qty: item.qty + delta };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart((prev) => (prev.length === 0 ? prev : []));
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const isInWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cartSubtotal === 0 ? 0 : cartSubtotal >= 120 ? 0 : 12;
  const cartTotal = cartSubtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartSubtotal,
        shipping,
        cartTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isAccountOpen,
        setIsAccountOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
