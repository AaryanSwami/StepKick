"use client";

import React from 'react'
import { Search, ShoppingBag, Heart, User } from "lucide-react";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { cartCount, setIsCartDrawerOpen, wishlist, setIsAccountOpen } = useCart();

  return (
    <div>

       <div className="border-b border-border/60 bg-ink text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <span className="opacity-70">Complimentary carbon-neutral shipping over $120</span>
          <div className="hidden gap-6 sm:flex">
            <a className="opacity-70 hover:opacity-100" href="#">Stores</a>
            <a className="opacity-70 hover:opacity-100" href="#">Journal</a>
            <a className="opacity-70 hover:opacity-100" href="#">Help</a>
          </div>
        </div>
      </div>
      
  <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <nav className="hidden gap-8 text-sm md:flex">
            <Link href="/products?category=New" className="hover:text-accent">New</Link>
            <Link href="/products?category=Men" className="hover:text-accent">Men</Link>
            <Link href="/products?category=Women" className="hover:text-accent">Women</Link>
            <Link href="/products" className="hover:text-accent">Collections</Link>
          </nav>
          <Link href="/" className="font-display text-2xl tracking-tight">Step<span className="text-accent">·</span>kick</Link>
          <div className="flex items-center gap-5">
            <Link
              href="/products?focusSearch=true"
              aria-label="Search"
              className="transition hover:text-accent"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setIsAccountOpen(true)}
              aria-label="Account"
              className="hidden sm:block transition hover:text-accent"
            >
              <User className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative hidden sm:block transition hover:text-accent"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-accent-foreground animate-in zoom-in">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label="Bag"
              className="relative transition hover:text-accent"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

    </div>
  )
}

export default Navbar

