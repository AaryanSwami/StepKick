"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useCart();

  // Find all products whose ID is in the wishlist
  const wishlistedItems = PRODUCTS.filter((product) =>
    wishlist.includes(product.id)
  );

  const isEmpty = wishlistedItems.length === 0;

  return (
    <main className="min-h-screen pb-24">
      {/* Page Header */}
      <div className="border-b border-border/60 bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Curated selection
            </p>
            <h1 className="mt-1 font-display text-4xl flex items-center gap-3">
              Wishlist
              {!isEmpty && (
                <span className="text-2xl text-accent">({wishlistedItems.length})</span>
              )}
            </h1>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue browsing
          </Link>
        </div>
      </div>

      {isEmpty ? (
        /* Empty State */
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32 text-center">
          <Heart className="h-16 w-16 text-muted-foreground/30 animate-pulse" />
          <h2 className="mt-6 font-display text-3xl">Your wishlist is empty</h2>
          <p className="mt-3 text-muted-foreground max-w-sm">
            Save your favorite models here to review them later, compare colors, and build your perfect rotation.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:opacity-85 shadow-md"
          >
            Browse the catalogue <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        /* Grid of favorited items */
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistedItems.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
