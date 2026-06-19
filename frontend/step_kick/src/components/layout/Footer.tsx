"use client";

import { ArrowUpRight } from 'lucide-react';
import React from 'react';

const Footer = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };


  return (
    <div>
        <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl bg-ink px-8 py-16 text-primary-foreground sm:px-16 sm:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-widest opacity-60">The Dispatch</div>
              <h2 className="mt-3 text-4xl sm:text-5xl">First steps. Early access.</h2>
              <p className="mt-4 max-w-md opacity-70">
                One letter a month: new releases, restocks, and field notes from our makers. No noise.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="you@somewhere.com"
                className="w-full flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-4 text-sm placeholder:text-white/40 focus:border-accent focus:outline-none"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition hover:opacity-90">
                Subscribe <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs opacity-60">
            <span>© {new Date().getFullYear()} Sole & Stride — Copenhagen</span>
            <div className="flex gap-6">
              <a href="#">Instagram</a><a href="#">Journal</a><a href="#">Careers</a><a href="#">Contact</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
