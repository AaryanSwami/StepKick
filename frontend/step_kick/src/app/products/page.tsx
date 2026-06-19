"use client";

import React, { useState, useMemo, Suspense, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, ArrowUpDown, Search, X } from "lucide-react";
import Link from "next/link";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Derive category directly from URL query parameters
  const selectedCategory = searchParams.get("category") || "All";
  const focusSearch = searchParams.get("focusSearch");

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(260); // Max shoe price is $248

  // Focus search input on mount if focusSearch param is true
  useEffect(() => {
    if (focusSearch === "true") {
      searchInputRef.current?.focus();
    }
  }, [focusSearch]);

  const handleCategoryChange = (category: string) => {
    // Update URL query parameter
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (selectedCategory !== "All") {
      if (selectedCategory === "New") {
        result = result.filter((p) => p.id === "1" || p.id === "3");
      } else if (selectedCategory === "Men") {
        result = result.filter((p) => p.id !== "4"); // Drift Knit is unisex/women, others are men
      } else if (selectedCategory === "Women") {
        result = result.filter((p) => p.id === "1" || p.id === "4" || p.id === "5");
      }
    }

    // 2. Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tag.toLowerCase().includes(query) ||
          (p.colorNames && p.colorNames.some((c) => c.toLowerCase().includes(query)))
      );
    }

    // 3. Price Filter
    result = result.filter((p) => p.price <= maxPrice);

    // 4. Sort
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, searchQuery, maxPrice, sortOption]);

  const resetFilters = () => {
    setSearchQuery("");
    setMaxPrice(260);
    setSortOption("featured");
    router.push("/products", { scroll: false });
  };

  const CATEGORIES = ["All", "Men", "Women", "New"];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Breadcrumbs */}
      <div className="mb-6 text-xs tracking-wider text-muted-foreground uppercase">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground">Products</span>
      </div>

      {/* Header Banner */}
      <div className="mb-12 border-b border-border/60 pb-8">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink">
          The Rotation
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          Goodyear-welted and plantation-crepe constructions designed for comfort, durability, and full recraftability.
        </p>
      </div>

      {/* Filter and Control Panel */}
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border/60 pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                selectedCategory === cat
                  ? "border-ink bg-ink text-primary-foreground"
                  : "border-border text-foreground hover:border-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search, Sort, and Toggle Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search input */}
          <div className="relative flex-1 sm:min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalogue..."
              className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-xs tracking-wider placeholder:text-muted-foreground focus:border-ink focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-muted"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none rounded-full border border-border bg-card py-2.5 pl-10 pr-8 text-xs font-medium uppercase tracking-wider focus:border-ink focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          {/* Price Range Filter Slider */}
          <div className="flex items-center gap-3 border border-border rounded-full bg-card px-4 py-2 text-xs font-semibold uppercase tracking-wider">
            <span className="text-muted-foreground">Price Max:</span>
            <input
              type="range"
              min="130"
              max="260"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-1 cursor-pointer accent-accent"
            />
            <span className="text-ink">${maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 gap-10">
        {/* Active Filters Summary */}
        {(selectedCategory !== "All" || searchQuery || maxPrice < 260) && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Active filters:</span>
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-clay px-3 py-1 font-semibold uppercase text-ink">
                Category: {selectedCategory}
                <button onClick={() => handleCategoryChange("All")}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-full bg-clay px-3 py-1 font-semibold uppercase text-ink">
                Search: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery("")}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {maxPrice < 260 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-clay px-3 py-1 font-semibold uppercase text-ink">
                Under ${maxPrice}
                <button onClick={() => setMaxPrice(260)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="ml-2 flex items-center gap-1 font-bold text-accent underline underline-offset-2 hover:text-ink"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Count */}
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          Showing {filteredProducts.length} model{filteredProducts.length !== 1 && "s"}
        </p>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-2xl bg-card">
            <SlidersHorizontal className="h-10 w-10 text-muted-foreground/30" />
            <h3 className="mt-4 font-display text-2xl">No items match your criteria</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search queries or clearing active filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 rounded-full bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:opacity-85"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
