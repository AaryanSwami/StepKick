"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, Check, ArrowLeft, Loader2 } from "lucide-react";

export type TrackingStep = {
  title: string;
  desc: string;
  location: string;
  time: string;
  status: "completed" | "active" | "pending";
};

export type TrackingData = {
  id: string;
  status: string;
  estDelivery: string;
  carrier: string;
  steps: TrackingStep[];
};

function TrackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const queryOrder = searchParams.get("order") || "";
  const [inputVal, setInputVal] = useState(queryOrder);
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  const simulateTracking = (id: string) => {
    setIsLoading(true);
    // Simulate luxury response lag
    setTimeout(() => {
      // Determine track progress based on order number digits to keep it semi-dynamic
      const digits = id.replace(/\D/g, "");
      const num = digits ? parseInt(digits, 10) : 84920;
      
      const steps: TrackingStep[] = [
        {
          title: "Order Placed & Confirmed",
          desc: "Our workshop has received your order and allocated premium hides.",
          location: "Porto Workshop, Portugal",
          time: "June 19, 09:12 AM",
          status: "completed",
        },
        {
          title: "Goodyear-Welt Handcrafting",
          desc: "Our master cobblers have stitched the leather welt onto the insole.",
          location: "Porto Workshop, Portugal",
          time: "June 19, 14:30 PM",
          status: "completed",
        },
        {
          title: "DHL Shipment Picked Up",
          desc: "Package scanned and dispatched via carbon-neutral express courier.",
          location: "Lisbon Facility, Portugal",
          time: "June 19, 17:45 PM",
          status: "completed",
        },
        {
          title: "In Transit & Customs Clearance",
          desc: "Completed flight transfer and cleared transit checkpoints.",
          location: "Leipzig Hub, Germany",
          time: "June 19, 22:10 PM",
          status: num % 2 === 0 ? "completed" : "active",
        },
        {
          title: "Out for Local Delivery",
          desc: "Package loaded onto the courier vehicle for final delivery to your door.",
          location: "Local Hub, Denmark",
          time: "Estimated: Today before 8:00 PM",
          status: num % 2 === 0 ? "active" : "pending",
        },
        {
          title: "Signed & Delivered",
          desc: "Delivered directly to your hands or secure parcel drop-off.",
          location: "Your Address",
          time: "Pending delivery",
          status: "pending",
        },
      ];

      setTrackingData({
        id,
        status: num % 2 === 0 ? "In Transit" : "Arrived in Leipzig",
        estDelivery: "June 22, 2026",
        carrier: "DHL Express",
        steps,
      });
      setIsLoading(false);
    }, 600);
  };

  useEffect(() => {
    if (queryOrder) {
      // Defer state update to next tick to avoid synchronous cascading renders warning
      const timer = setTimeout(() => {
        simulateTracking(queryOrder);
      }, 0);
      return () => clearTimeout(timer);
    } else {
      // Defer clearing state to avoid synchronous cascading renders warning
      const timer = setTimeout(() => {
        setTrackingData(null);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [queryOrder]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("order", inputVal.trim().toUpperCase());
    router.push(`/track?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      {/* Breadcrumbs */}
      <div className="mb-6 text-xs tracking-wider text-muted-foreground uppercase">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground">Track Order</span>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="font-display text-4xl text-ink">Track Shipment</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Follow the progress of your Goodyear-welted shoes from our Porto workshop to your door.
          </p>
        </div>

        {/* Input Form */}
        <form key={queryOrder} onSubmit={handleTrackSubmit} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter Order ID (e.g. SK-84920)"
            className="w-full flex-1 rounded-full border border-border bg-card px-5 py-3 text-xs tracking-wider uppercase placeholder:normal-case placeholder:text-muted-foreground focus:border-ink focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-ink px-8 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-md hover:bg-ink/90 transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Searching...
              </>
            ) : (
              "Track Package"
            )}
          </button>
        </form>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-accent" />
            <p className="mt-4 text-xs text-muted-foreground tracking-widest uppercase">
              Connecting to DHL logistics...
            </p>
          </div>
        )}

        {/* Tracking Details */}
        {!isLoading && trackingData && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Overview Card */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    Order ID
                  </span>
                  <h3 className="font-display text-lg text-ink font-semibold">{trackingData.id}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    Est. Delivery
                  </span>
                  <p className="font-display text-lg text-ink font-semibold">{trackingData.estDelivery}</p>
                </div>
              </div>
              <div className="border-t border-border/60 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                <span>Carrier: <strong className="text-foreground">{trackingData.carrier}</strong></span>
                <span>Status: <strong className="text-accent uppercase tracking-wider text-[10px]">{trackingData.status}</strong></span>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-8 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink border-b border-border/40 pb-3 flex items-center gap-2">
                <Compass className="h-4 w-4 text-accent" /> Shipment Progress
              </h4>

              <div className="relative border-l border-border pl-6 ml-2 space-y-8">
                {trackingData.steps.map((step: TrackingStep, index: number) => (
                  <div key={index} className="relative">
                    {/* Circle Indicator */}
                    <div
                      className={`absolute -left-[31px] top-0 flex h-[10px] w-[10px] items-center justify-center rounded-full border ${
                        step.status === "completed"
                          ? "bg-accent border-accent ring-4 ring-accent/15"
                          : step.status === "active"
                          ? "bg-background border-accent ring-4 ring-accent/25 animate-pulse"
                          : "bg-background border-border"
                      }`}
                    >
                      {step.status === "completed" && (
                        <Check className="h-1.5 w-1.5 text-accent-foreground" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-x-4">
                        <h5
                          className={`text-xs font-bold ${
                            step.status === "completed"
                              ? "text-ink"
                              : step.status === "active"
                              ? "text-accent"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </h5>
                        <span className="text-[10px] text-muted-foreground">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground max-w-md leading-relaxed">
                        {step.desc}
                      </p>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground/80 font-semibold italic">
                        {step.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back Link */}
        {!trackingData && !isLoading && (
          <div className="text-center pt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-ink transition"
            >
              <ArrowLeft className="h-4 w-4" /> Go back to catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
