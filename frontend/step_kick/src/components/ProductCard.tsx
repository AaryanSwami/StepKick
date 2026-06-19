"use client";

import React, { useState } from "react";
import { Heart, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const SIZES = ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"];

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [showSizes, setShowSizes] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (size: string) => {
    // Add product to cart with first color of product
    const defaultColor = product.colorNames?.[0] || "Default";
    const defaultColorHex = product.colors[0] || "#000000";
    
    addToCart({
      id: product.id,
      name: product.name,
      tag: product.tag,
      price: product.price,
      img: product.img,
      size: size,
      color: defaultColor,
      colorHex: defaultColorHex,
    });
    setShowSizes(false);
  };

  return (
    <article className="group relative flex flex-col">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-clay">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.img}
            alt={product.name}
            width={800}
            height={800}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Dynamic New tag for first item */}
        {index === 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground shadow-sm">
            New
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute right-4 top-4 rounded-full bg-background/80 p-2.5 backdrop-blur-sm transition hover:bg-background shadow-sm hover:scale-105"
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-300 ${
              isWishlisted ? "fill-accent text-accent" : "text-foreground"
            }`}
          />
        </button>

        {/* Quick Add overlay / Size Selection overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 z-10">
          {!showSizes ? (
            <button
              onClick={() => setShowSizes(true)}
              className="flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-primary-foreground shadow-lg transition hover:bg-ink/90 hover:scale-105 whitespace-nowrap"
            >
              Quick add
            </button>
          ) : (
            <div className="w-[180px] rounded-xl bg-background/95 p-2.5 shadow-xl border border-border/80 backdrop-blur-sm animate-in slide-in-from-bottom-2 duration-300">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  Select Size
                </span>
                <button
                  onClick={() => setShowSizes(false)}
                  className="rounded-full p-0.5 hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleQuickAdd(size)}
                    className="rounded-lg border border-border py-1 text-center text-[10px] transition hover:border-ink hover:bg-ink hover:text-primary-foreground font-semibold"
                  >
                    {size.replace("EU ", "")}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info details */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            {product.tag}
          </p>
          <Link href={`/product/${product.id}`} className="block group-hover:text-accent transition-colors">
            <h3 className="mt-1 font-display text-xl">{product.name}</h3>
          </Link>
          <div className="mt-2.5 flex items-center gap-1.5">
            {product.colors.map((color, i) => (
              <span
                key={color}
                className="h-3.5 w-3.5 rounded-full border border-border"
                style={{ backgroundColor: color }}
                title={product.colorNames?.[i] || "Color"}
              />
            ))}
          </div>
        </div>
        <p className="font-display text-lg font-medium">${product.price}</p>
      </div>
    </article>
  );
}
