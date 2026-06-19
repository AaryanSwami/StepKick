"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Truck, Mail, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  
  // Initialize mock order number once on mount using lazy state initialization
  const [orderNumber] = useState(() => {
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `SK-${rand}`;
  });

  // Clear cart on checkout success mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Generate a shipping date (3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="min-h-[80vh] flex items-center bg-background py-16">
      <div className="mx-auto max-w-xl px-6 w-full">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
          
          {/* Check Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          {/* Success Title */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Order confirmed
            </span>
            <h1 className="mt-4 font-display text-4xl text-ink">
              Thank you for your step.
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your order has been placed and is being forwarded to our cobblers in Porto.
            </p>
          </div>

          <div className="my-6 border-y border-border/60 py-4 divide-y divide-border/60 text-xs">
            {/* Order number */}
            <div className="flex justify-between py-2.5">
              <span className="text-muted-foreground font-medium">Order Number</span>
              <span className="font-semibold text-ink">{orderNumber || "SK-XXXXX"}</span>
            </div>
            
            {/* Estimated delivery */}
            <div className="flex justify-between py-2.5">
              <span className="text-muted-foreground font-medium">Est. Delivery</span>
              <span className="font-semibold text-ink">{formattedDelivery}</span>
            </div>

            {/* Shipping Carrier */}
            <div className="flex justify-between py-2.5">
              <span className="text-muted-foreground font-medium">Shipping Method</span>
              <span className="font-semibold text-ink">DHL Express (Carbon-Neutral)</span>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 gap-3 text-left">
            <div className="flex items-start gap-3 rounded-xl bg-clay/20 p-4 border border-border/30">
              <Mail className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-ink">Receipt sent by email</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  We sent a confirmation receipt and tracking link to your inbox.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-clay/20 p-4 border border-border/30">
              <Package className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-ink">Ready to resole</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  Remember: your Goodyear-welted shoes are covered under our lifetime repair guarantee.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/track?order=${orderNumber}`}
              className="flex items-center justify-center gap-2 rounded-full border border-border bg-background py-4 text-xs font-semibold uppercase tracking-widest text-ink shadow-sm transition hover:bg-muted"
            >
              Track Order <Truck className="h-4 w-4 text-accent" />
            </Link>
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 rounded-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-md transition hover:bg-ink/90"
            >
              Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
        </div>
      </div>
    </main>
  );
}
