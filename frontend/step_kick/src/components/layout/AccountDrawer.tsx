"use client";

import { useCart } from "@/context/CartContext";
import { X, User, Package, Settings, MapPin, RefreshCw } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AccountDrawer() {
  const { isAccountOpen, setIsAccountOpen } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isAccountOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAccountOpen]);

  // Close drawer on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isAccountOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isAccountOpen, setIsAccountOpen]);

  if (!isAccountOpen) return null;

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
            <User className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl font-medium text-ink">Account Profile</h2>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            aria-label="Close profile drawer"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Profile Overview Card */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-clay flex items-center justify-center font-display text-xl text-ink border border-border/40 shadow-inner">
                AS
              </div>
              <div>
                <h3 className="font-display text-lg text-ink font-medium">Aaryan Sharma</h3>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-0.5">
                  Gold Tier Member
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-border/60 pt-4 text-center">
              <div className="border-r border-border/60 py-1">
                <p className="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold">
                  Steps Logged
                </p>
                <p className="font-display text-lg text-ink mt-0.5">142,800</p>
              </div>
              <div className="py-1">
                <p className="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold">
                  Resoles Done
                </p>
                <p className="font-display text-lg text-ink mt-0.5">2 pairs</p>
              </div>
            </div>
          </div>

          {/* Active / Recent Orders Log */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
                <Package className="h-4 w-4 text-accent" /> Order History
              </h4>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Showing 2 of 12
              </span>
            </div>

            <div className="space-y-3">
              {/* Order 1: Shipped */}
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-ink">Order #SK-84920</span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    In Transit
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-clay overflow-hidden">
                    <img src="/shoes/shoes3.png" alt="Suede shoe" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-ink truncate">Heritage 77 Suede</h5>
                    <p className="text-[10px] text-muted-foreground">Terracotta · Size EU 41</p>
                  </div>
                </div>
                <div className="border-t border-border/45 pt-2 flex justify-between items-center text-[10px] text-muted-foreground">
                  <span>DHL Express Tracking</span>
                  <Link
                    href="/track?order=SK-84920"
                    onClick={() => setIsAccountOpen(false)}
                    className="text-accent underline underline-offset-2 hover:text-ink font-semibold"
                  >
                    Track Package
                  </Link>
                </div>
              </div>

              {/* Order 2: Resoled / Completed */}
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-ink">Resole Service #SK-28412</span>
                  <span className="rounded-full bg-clay px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
                    Completed
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-clay overflow-hidden">
                    <img src="/shoes/shoes1.png" alt="Leather trainer" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-ink truncate">Atrium Low</h5>
                    <p className="text-[10px] text-muted-foreground">Parchment · Rebuild Program</p>
                  </div>
                </div>
                <div className="border-t border-border/45 pt-2 flex justify-between items-center text-[10px] text-muted-foreground">
                  <span>Delivered on May 12, 2026</span>
                  <Link
                    href="/track?order=SK-28412"
                    onClick={() => setIsAccountOpen(false)}
                    className="text-accent underline underline-offset-2 hover:text-ink font-semibold"
                  >
                    Track Package
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Addresses and Preferences */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5 border-b border-border/40 pb-2">
              <MapPin className="h-4 w-4 text-accent" /> Saved Address
            </h4>
            <div className="rounded-xl border border-border bg-card p-4 text-xs">
              <p className="font-semibold text-ink">Primary Shipping</p>
              <p className="text-muted-foreground mt-1.5 leading-relaxed">
                Aaryan Sharma<br />
                12 Nørrebrogade, Apt 4B<br />
                2200 København N<br />
                Denmark
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-border bg-card px-6 py-6 space-y-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background py-3 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-muted">
            <RefreshCw className="h-3.5 w-3.5" /> Request a Resole Welt Rebuild
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-background py-3 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-muted">
              <Settings className="h-3.5 w-3.5" /> Edit Profile
            </button>
            <button
              onClick={() => setIsAccountOpen(false)}
              className="flex items-center justify-center rounded-full bg-ink py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
