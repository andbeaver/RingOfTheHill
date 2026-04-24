"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Lightbox from "../components/Lightbox";
import ringsData, { Ring } from "../data/rings";

function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Home() {
  const [champion, setChampion] = useState<Ring | null>(null);
  const [challengers, setChallengers] = useState<Ring[]>([]);
  const [history, setHistory] = useState<Ring[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const s = shuffle(ringsData.slice());
    setChampion(s[0] ?? null);
    setChallengers(s.slice(1));
    setIsClient(true);
  }, []);

  const remaining = challengers.length;

  function handlePick(pick: "champion" | "challenger") {
    if (!champion) return;

    if (pick === "champion") {
      // champion stays, remove current challenger
      setHistory((h) => [...h, champion]);
      setChallengers((prev) => prev.slice(1));
    } else {
      // challenger wins, becomes new champion
      const next = challengers[0];
      setHistory((h) => [...h, next]);
      setChampion(next ?? null);
      setChallengers((prev) => prev.slice(1));
    }
  }

  function restart() {
    const s = shuffle(ringsData.slice());
    setChampion(s[0] ?? null);
    setChallengers(s.slice(1));
    setHistory([]);
  }

  if (!isClient || !champion) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Loading rings...</p>
        </div>
      </main>
    );
  }

  if (remaining === 0) {
    // final winner
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-lg text-center">
          <div className="mb-6 flex justify-center">
            <div className="text-5xl">👑</div>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Your Perfect Ring</h1>
          <p className="text-gray-500 mb-8">Champion selected after all votes</p>
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 border border-gray-200 dark:border-gray-700">
            <img src={champion.url} alt={champion.name} className="w-full h-80 object-cover" />
          </div>
          <h2 className="text-2xl font-semibold mb-6">{champion.name}</h2>
          <button onClick={restart} className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
            Vote Again
          </button>
        </div>
      </main>
    );
  }

  const challenger = challengers[0];

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-5xl w-full">
        <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Ring of the Hill</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Find your perfect engagement ring</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{remaining + 1}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">rings left</div>
            </div>
            <Link href="/gallery" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
              View All
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">Current Champion</h2>
              <span className="text-2xl">👑</span>
            </div>
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <img
                src={champion.url}
                alt={champion.name}
                className="w-full h-64 object-cover cursor-pointer group-hover:scale-105 transition-transform"
                onClick={() => setSelected(champion.url)}
              />
            </div>
            <h3 className="font-medium text-center mb-6 text-gray-900 dark:text-gray-100">{champion.name}</h3>
            <button
              onClick={() => handlePick("champion")}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
            >
              This
            </button>
          </div>

          <div className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-gray-700 dark:text-gray-300">Challenger</h2>
              <span className="text-2xl">✨</span>
            </div>
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <img
                src={challenger.url}
                alt={challenger.name}
                className="w-full h-64 object-cover cursor-pointer group-hover:scale-105 transition-transform"
                onClick={() => setSelected(challenger.url)}
              />
            </div>
            <h3 className="font-medium text-center mb-6 text-gray-900 dark:text-gray-100">{challenger.name}</h3>
            <button
              onClick={() => handlePick("challenger")}
              className="w-full px-6 py-3 bg-white dark:bg-slate-700 border-2 border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-600 rounded-lg font-medium transition-all"
            >
              That
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Progress: <span className="font-semibold text-gray-900 dark:text-gray-100">{remaining} more matchups</span>
          </div>
          <button onClick={restart} className="px-5 py-2 text-sm border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors font-medium">
            Start Over
          </button>
        </div>
      </div>
      {selected && <Lightbox src={selected} alt="Ring" onClose={() => setSelected(null)} />}
    </main>
  );
}
