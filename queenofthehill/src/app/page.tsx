"use client";
import React, { useMemo, useState } from "react";
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
  const initial = useMemo(() => {
    const s = shuffle(ringsData.slice());
    return { champion: s[0], challengers: s.slice(1) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [champion, setChampion] = useState<Ring | null>(initial.champion ?? null);
  const [challengers, setChallengers] = useState<Ring[]>(initial.challengers ?? []);
  const [history, setHistory] = useState<Ring[]>([]);

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

  if (!champion) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No rings available.</p>
          <button onClick={restart} className="mt-4 px-4 py-2 border rounded">
            Restart
          </button>
        </div>
      </main>
    );
  }

  if (remaining === 0) {
    // final winner
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">Final Winner</h1>
          <img src={champion.url} alt={champion.name} className="w-full h-72 object-cover rounded" />
          <p className="mt-3 text-lg">{champion.name}</p>
          <button onClick={restart} className="mt-6 px-4 py-2 border rounded">
            Play again
          </button>
        </div>
      </main>
    );
  }

  const challenger = challengers[0];

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">King of the Hill — Ring Picker</h1>
          <div className="text-sm text-gray-600">Remaining: {remaining + 1}</div>
        </header>

        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded p-4 text-center">
            <h2 className="mb-2 font-medium">Current</h2>
            <img src={champion.url} alt={champion.name} className="w-full h-64 object-cover rounded" />
            <div className="mt-3">{champion.name}</div>
            <button
              onClick={() => handlePick("champion")}
              className="mt-4 px-4 py-2 border rounded bg-slate-100"
            >
              Keep
            </button>
          </div>

          <div className="border rounded p-4 text-center">
            <h2 className="mb-2 font-medium">Challenger</h2>
            <img src={challenger.url} alt={challenger.name} className="w-full h-64 object-cover rounded" />
            <div className="mt-3">{challenger.name}</div>
            <button
              onClick={() => handlePick("challenger")}
              className="mt-4 px-4 py-2 border rounded bg-slate-100"
            >
              Swap
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">Challengers left: {remaining}</div>
          <div className="flex gap-2">
            <button onClick={restart} className="px-3 py-1 border rounded">
              Restart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
