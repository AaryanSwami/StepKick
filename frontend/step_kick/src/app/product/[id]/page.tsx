"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  Truck,
  RotateCcw,
  Shield,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const SIZES = ["EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45", "EU 46"];

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const isWishlisted = isInWishlist(product.id);
  const [addingToCart, setAddingToCart] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // Accordion states
  const [openSection, setOpenSection] = useState<string>("details");

  // Related products (exclude current)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const selectedColorName = product.colorNames?.[selectedColorIndex] || "Default";
  const selectedColorHex = product.colors[selectedColorIndex] || "#000000";

  // Gallery angles (crops of the original high-quality shoe image to simulate different angles)
  const galleryViews = [
    { name: "Profile View", style: "object-center scale-100" },
    { name: "Macro Detail", style: "object-top scale-150 translate-y-4" },
    { name: "Outsole & Heel", style: "object-right scale-[1.25] -translate-x-2" },
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    setAddingToCart(true);

    // Simulate luxury animation lag
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        tag: product.tag,
        price: product.price,
        img: product.img,
        size: selectedSize,
        color: selectedColorName,
        colorHex: selectedColorHex,
      });
      setAddingToCart(false);
      setJustAdded(true);

      setTimeout(() => {
        setJustAdded(false);
      }, 3000);
    }, 800);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-6 py-6 text-xs tracking-wider text-muted-foreground uppercase">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2 text-border">/</span>
        <Link href="/#shop" className="hover:text-foreground">
          Catalogue
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Main product display */}
      <section className="mx-auto max-w-7xl px-6 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        
        {/* Left Column: Premium Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-clay">
            {/* Main Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.img}
              alt={`${product.name} - ${galleryViews[activeImageIndex].name}`}
              className={`h-full w-full object-cover transition-transform duration-700 ${galleryViews[activeImageIndex].style}`}
            />

            {/* Magnify overlay on hover */}
            <div className="absolute inset-0 bg-ink/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Floating Tags */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              <span className="rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground shadow-sm">
                Goodyear Welted
              </span>
              {product.price > 200 && (
                <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent-foreground shadow-sm">
                  <Sparkles className="h-3 w-3" /> Premium Edition
                </span>
              )}
            </div>

            {/* Heart Wishlist button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute right-4 top-4 rounded-full bg-background/80 p-3 backdrop-blur-sm transition hover:bg-background shadow-sm hover:scale-105"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`h-5 w-5 transition-colors duration-300 ${
                  isWishlisted ? "fill-accent text-accent" : "text-foreground"
                }`}
              />
            </button>
          </div>

          {/* Thumbnails list */}
          <div className="grid grid-cols-3 gap-4">
            {galleryViews.map((view, i) => (
              <button
                key={view.name}
                onClick={() => setActiveImageIndex(i)}
                className={`group relative aspect-[4/3] overflow-hidden rounded-xl bg-clay border-2 transition ${
                  activeImageIndex === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.img}
                  alt={view.name}
                  className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${view.style}`}
                />
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-white">
                  {view.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Order Details panel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {product.tag}
            </span>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl leading-tight text-ink">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-2xl font-medium text-ink">
              ${product.price}
            </p>

            <div className="my-6 border-t border-border/60" />

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Color Switcher */}
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Color: <span className="font-normal text-muted-foreground">{selectedColorName}</span>
                </span>
              </div>
              <div className="mt-3 flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColorIndex(i)}
                    className={`h-9 w-9 rounded-full border flex items-center justify-center transition hover:scale-105 ${
                      selectedColorIndex === i ? "border-ink ring-2 ring-ink/20" : "border-border"
                    }`}
                    style={{ backgroundColor: color }}
                    title={product.colorNames?.[i] || "Color"}
                  >
                    {selectedColorIndex === i && (
                      <Check
                        className={`h-4 w-4 ${
                          color === "#f4ecdf" || color === "#e7dccb" ? "text-black" : "text-white"
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Size
                </span>
                <button className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">
                  Size Guide & Fit
                </button>
              </div>

              {sizeError && (
                <p className="mt-2 text-xs font-semibold text-destructive animate-pulse">
                  ⚠ Please select a size before adding to bag
                </p>
              )}

              <div className="mt-3 grid grid-cols-4 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`rounded-xl border py-3 text-center text-sm font-medium transition ${
                      selectedSize === size
                        ? "border-ink bg-ink text-primary-foreground font-bold shadow-md"
                        : "border-border bg-card text-foreground hover:border-ink hover:bg-muted"
                    }`}
                  >
                    {size.replace("EU ", "")}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground italic">
                Fits true to size. If you are between sizes, we recommend ordering the smaller size.
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className={`relative flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-semibold uppercase tracking-widest shadow-md transition duration-300 hover:scale-[1.01] ${
                  justAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-ink text-primary-foreground hover:bg-ink/90"
                }`}
              >
                {addingToCart ? (
                  <span>Adding to Selection...</span>
                ) : justAdded ? (
                  <span className="flex items-center gap-1.5">
                    ✓ Added to bag!
                  </span>
                ) : (
                  <span>Add to Selection</span>
                )}
              </button>
            </div>

            {/* Luxury Shipping & Guarantee list */}
            <div className="mt-8 space-y-3 rounded-2xl border border-border bg-clay/35 p-5 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-accent" />
                <span>Complimentary Carbon-Neutral Shipping over $120</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-4 w-4 text-accent" />
                <span>60-day trial wear window (free returns)</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-accent" />
                <span>Lifetime repair and rebuild recrafting program</span>
              </div>
            </div>
          </div>

          {/* Luxury Accordions */}
          <div className="mt-10 border-t border-border/60 divide-y divide-border/60">
            {/* Details & Fit */}
            <div className="py-4">
              <button
                onClick={() => toggleSection("details")}
                className="flex w-full items-center justify-between font-display text-lg text-ink"
              >
                <span>Details & Features</span>
                {openSection === "details" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {openSection === "details" && (
                <ul className="mt-3 list-disc pl-5 text-xs space-y-2 text-muted-foreground animate-in fade-in duration-200">
                  {product.features?.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Construction & resoling */}
            <div className="py-4">
              <button
                onClick={() => toggleSection("construction")}
                className="flex w-full items-center justify-between font-display text-lg text-ink"
              >
                <span>Goodyear-Welt Construction</span>
                {openSection === "construction" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {openSection === "construction" && (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground animate-in fade-in duration-200">
                  Stepkick utilizes Goodyear-welted construction, the gold standard of shoe making.
                  An upper is stitched to a leather welt which is then stitched to the sole. This
                  prevents water entry and allows the shoe to be completely resoled by our cobblers
                  indefinitely once worn out.
                </p>
              )}
            </div>

            {/* Sizing detail */}
            <div className="py-4">
              <button
                onClick={() => toggleSection("shipping")}
                className="flex w-full items-center justify-between font-display text-lg text-ink"
              >
                <span>Shipping & Circular Returns</span>
                {openSection === "shipping" ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {openSection === "shipping" && (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground animate-in fade-in duration-200">
                  We ship carbon-neutral with DHL Express. Returns are accepted within 60 days of purchase.
                  Under our circular model, when you are ready to trade-in or repair, we provide you a
                  pre-paid mailing label to send your shoes back to our cobblers in Porto.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="mx-auto max-w-7xl px-6 mt-24 border-t border-border/60 pt-16">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Complete the look
        </p>
        <h2 className="mt-2 text-3xl font-display">You may also like</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/#shop"
            className="inline-flex items-center gap-2 rounded-full border border-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink hover:bg-ink hover:text-primary-foreground transition duration-300"
          >
            Explore all models <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
