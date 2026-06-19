"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQty,
    removeFromCart,
    cartSubtotal,
    cartCount,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartDrawerOpen]);

  // Close drawer on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isCartDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setIsCartDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isCartDrawerOpen, setIsCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      {/* Drawer */}
      <div
        ref={drawerRef}
        className="relative flex h-full w-full max-w-md flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl">Your Selection</h2>
            <span className="rounded-full bg-clay px-2 py-0.5 text-xs font-medium">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close cart drawer"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
              <h3 className="mt-4 font-display text-lg">Your bag is empty</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Explore our Goodyear-welted shoes and find your perfect pair.
              </p>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="mt-6 rounded-full bg-ink px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-primary-foreground hover:opacity-85"
              >
                Keep Exploring
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border/80"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-clay">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-base leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-sm font-semibold">
                        ${(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.size}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span className="flex items-center gap-1">
                        <span
                          className="h-2 w-2 rounded-full border border-border"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        {item.color}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        onClick={() =>
                          updateQty(item.id, item.size, item.color, -1)
                        }
                        aria-label="Decrease quantity"
                        className="px-2 py-1 transition hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-xs font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(item.id, item.size, item.color, 1)
                        }
                        aria-label="Increase quantity"
                        className="px-2 py-1 transition hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="text-xs text-muted-foreground underline underline-offset-2 hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border bg-card px-6 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl">
                ${cartSubtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping & taxes calculated at checkout. Free shipping over $120.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={() => setIsCartDrawerOpen(false)}
                className="flex items-center justify-center rounded-full border border-border py-3 text-xs font-medium uppercase tracking-wider transition hover:bg-muted"
              >
                View bag
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsCartDrawerOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-full bg-ink py-3 text-xs font-medium uppercase tracking-wider text-primary-foreground transition hover:opacity-85"
              >
                Checkout <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
