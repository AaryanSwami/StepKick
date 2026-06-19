"use client";

import { useState, Fragment } from "react";
import { Truck, RotateCcw, Shield } from "lucide-react";
import ScrollCanvas from "@/components/ScrollCanvas";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Men", "Women", "New"];

const RESOLE_STEPS = [
  ["01", "Send your worn-in pair, free label included."],
  ["02", "Our cobblers in Porto rebuild the sole over 8 days."],
  ["03", "Returned to your door, ready for another decade."],
];

const PROMISES = [
  { icon: Truck,      title: "Carbon-neutral shipping", desc: "Free over $120. Delivered in 2–4 days, offset at source." },
  { icon: RotateCcw,  title: "60-day returns",          desc: "Walk a thousand steps. Change your mind. We'll take them back." },
  { icon: Shield,     title: "12-year warranty",         desc: "Stitching, sole bond, eyelets. Anything we built, we repair." },
];

const MARQUEE_ITEMS = [
  "Made for movement",
  "Free returns 60 days",
  "Carbon-neutral shipping",
  "Repair, don't replace",
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [active, setActive] = useState("All");

  return (
    <main>

      {/* Hero — scroll animation */}
      <ScrollCanvas />

      {/* Marquee banner */}
      <section className="overflow-hidden border-b border-border/60 bg-ink py-5 text-primary-foreground">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-12">
              {MARQUEE_ITEMS.map((item) => (
                <Fragment key={item}>
                  <span>{item}</span>
                  <span className="text-accent">✦</span>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section id="shop" className="mx-auto max-w-7xl px-6 py-20">

        {/* Header + filters */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">The Catalogue</p>
            <h2 className="mt-2 text-4xl sm:text-5xl">Currently in rotation.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active === cat
                    ? "border-ink bg-ink text-primary-foreground"
                    : "border-border text-foreground hover:border-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.filter((product) => {
            if (active === "All") return true;
            if (active === "New") return product.id === "1" || product.id === "3";
            if (active === "Men") return product.id !== "4";
            if (active === "Women") return product.id === "1" || product.id === "4" || product.id === "5";
            return true;
          }).map((product, i) => (
            <ProductCard product={product} index={i} key={product.id} />
          ))}
        </div>
      </section>

      {/* Resole section */}
      <section className="border-y border-border/60 bg-clay">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16">

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Field Note 02</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">
              Built once.<br />
              <span className="italic text-accent">Resoled forever.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Every pair is stitched on Goodyear-welted construction so the upper and the outsole
              can part ways — and meet again. Send yours in, we&apos;ll rebuild it.
            </p>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {RESOLE_STEPS.map(([num, text]) => (
                <div key={num} className="flex items-start gap-6 py-5">
                  <span className="font-display text-3xl text-accent">{num}</span>
                  <p className="pt-1.5">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/shoes/shoes3.png"
              alt="Heritage suede sneaker"
              width={800}
              height={800}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-background p-5 shadow-lg sm:block">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Resoled to date</p>
              <p className="font-display text-4xl">28,412 <span className="text-accent">pairs</span></p>
            </div>
          </div>

        </div>
      </section>

      {/* Promises / trust bar */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-background p-8">
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
