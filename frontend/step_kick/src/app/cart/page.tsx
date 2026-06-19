"use client";

import Link from "next/link";
import { Minus, Plus, X, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

// ─── Cart Page ────────────────────────────────────────────────────────────────

export default function CartPage() {
  const {
    cart: items,
    updateQty,
    removeFromCart: removeItem,
    cartSubtotal: subtotal,
    shipping,
    cartTotal: total,
  } = useCart();

  const isEmpty = items.length === 0;

  return (
    <main className="min-h-screen">

      {/* Page header */}
      <div className="border-b border-border/60 bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Your selection</p>
            <h1 className="mt-1 font-display text-4xl">
              Shopping Bag
              {!isEmpty && (
                <span className="ml-3 text-2xl text-accent">({items.length})</span>
              )}
            </h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>
        </div>
      </div>

      {isEmpty ? (
        /* Empty state */
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
          <h2 className="mt-6 font-display text-3xl">Your bag is empty</h2>
          <p className="mt-3 text-muted-foreground">
            You haven&apos;t added anything yet. Find something you love.
          </p>
          <Link
            href="/#shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:opacity-80"
          >
            Shop the catalogue <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        /* Cart layout */
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">

            {/* ── Left: item list ── */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group flex gap-5 rounded-2xl border border-border bg-card p-5 transition hover:border-border/80 sm:gap-7"
                >
                  {/* Image */}
                  <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-clay sm:h-36 sm:w-36">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                          {item.tag}
                        </p>
                        <h3 className="mt-0.5 font-display text-xl">{item.name}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span>{item.size}</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span className="flex items-center gap-1.5">
                            <span
                              className="inline-block h-3 w-3 rounded-full border border-border"
                              style={{ backgroundColor: item.colorHex }}
                            />
                            {item.color}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id, item.size, item.color)}
                        aria-label="Remove item"
                        className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Qty + price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0 overflow-hidden rounded-full border border-border">
                        <button
                          onClick={() => updateQty(item.id, item.size, item.color, -1)}
                          aria-label="Decrease quantity"
                          className="px-3 py-2 transition hover:bg-muted"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-medium">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.size, item.color, 1)}
                          aria-label="Increase quantity"
                          className="px-3 py-2 transition hover:bg-muted"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-xl">
                        ${(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Free shipping notice */}
              {shipping > 0 && (
                <div className="rounded-2xl border border-dashed border-border bg-clay/40 px-5 py-4 text-sm text-muted-foreground">
                  Add{" "}
                  <span className="font-medium text-foreground">
                    ${(120 - subtotal).toFixed(0)}
                  </span>{" "}
                  more to unlock <span className="font-medium text-foreground">free shipping</span>.
                </div>
              )}
              {shipping === 0 && (
                <div className="rounded-2xl border border-dashed border-accent/40 bg-accent/5 px-5 py-4 text-sm text-accent">
                  ✓ You qualify for free carbon-neutral shipping.
                </div>
              )}
            </div>

            {/* ── Right: order summary ── */}
            <div className="h-fit rounded-2xl border border-border bg-card p-7">
              <h2 className="font-display text-2xl">Order summary</h2>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="my-6 border-t border-border" />

              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-display text-2xl">${total.toLocaleString()}</span>
              </div>

              <Link href="/checkout/success" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:opacity-80 shadow-md">
                Proceed to checkout <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Trust signals */}
              <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                <p>🔒 Secure checkout — SSL encrypted</p>
                <p>↩ Free returns within 60 days</p>
                <p>🌱 Carbon-neutral delivery on every order</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}