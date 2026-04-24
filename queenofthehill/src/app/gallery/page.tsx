"use client";
import Link from "next/link";
import React, { useState } from "react";
import ringsData from "../../data/rings";
import Lightbox from "../../components/Lightbox";

export default function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <main className="min-h-screen p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Ring Gallery</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Browse all {ringsData.length} rings</p>
          </div>
          <Link href="/" className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
            ← Back to Voting
          </Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ringsData.map((r) => (
            <div key={r.id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden h-64">
                <img
                  src={r.url}
                  alt={r.name}
                  className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-500"
                  onClick={() => setSelected(r.url)}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{r.name}</h3>
              </div>
            </div>
          ))}
        </div>
        {selected && <Lightbox src={selected} alt="Ring" onClose={() => setSelected(null)} />}
      </div>
    </main>
  );
}
