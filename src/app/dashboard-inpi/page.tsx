'use client';

// Cette ligne est CRUCIALE pour Cloudflare Pages
export const runtime = 'edge'; 

import React, { useEffect, useState } from 'react';

// REMPLACE PAR L'IP DE TON VPS
const API_URL = "http://51.91.xxx.xxx:8000/api/stats"; 

interface InpiStats {
  status: string;
  last_sync: string;
  counts: {
    BREVET: number;
    DESSINS: number;
    MARQUES: number;
    MODELES: number;
  };
  health: string;
}

export default function InpiDashboard() {
  const [data, setData] = useState<InpiStats | null>(null);
  const [selectedBase, setSelectedBase] = useState('BREVET');
  const [error, setError] = useState<string | null>(null);

  const eras: Record<string, any[]> = {
    BREVET: [
      { label: 'Ère Legacy', range: '1980 - 2021', format: 'XML ST.36', color: 'bg-blue-500' },
      { label: 'Ère Moderne', range: '2021 - 2025', format: 'XML ST.96', color: 'bg-indigo-500' },
      { label: 'Ère Phoenix', range: '2025 - 2026', format: 'V10 Titan', color: 'bg-purple-500' }
    ],
    DESSINS: [
      { label: 'Ère Standard', range: '2000 - 2026', format: 'JSON/JPG Pack', color: 'bg-green-500' }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('API non joignable');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Impossible de contacter l'API sur le VPS. Vérifiez le port 8000.");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (error) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-red-400 p-4 text-center">
      <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
        <i className="fas fa-exclamation-triangle text-3xl mb-4 text-red-500"></i>
        <p className="font-bold">{error}</p>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center font-sans">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 mt-4 font-medium italic tracking-wide">Initialisation du Phoenix...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 text-white">
        <div>
          <h1 className="text-4xl font-black tracking-tight italic uppercase">
            CREAGUARD <span className="text-indigo-500 not-italic">PHOENIX</span>
          </h1>
          <p className="text-slate-400 font-medium">Monitoring Pro - Infrastructure INPI</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/50 px-5 py-2.5 rounded-2xl border border-slate-700 shadow-xl">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-green-500 text-sm font-black uppercase tracking-widest">Live Sync</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(data.counts).map(([key, val]) => (
            <div 
              key={key} 
              onClick={() => setSelectedBase(key)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${
                selectedBase === key 
                ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]' 
                : 'border-slate-800 bg-slate-800/40 hover:border-slate-600'
              }`}
            >
              <h3 className="text-slate-500 uppercase text-[10px] font-black tracking-[0.2em] mb-1">{key}</h3>
              <p className="text-3xl font-black text-white tracking-tight">{val.toLocaleString('fr-FR')}</p>
              <div className={`h-1 w-12 mt-4 rounded-full transition-all ${selectedBase === key ? 'bg-indigo-500 w-full' : 'bg-slate-700'}`}></div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/40 backdrop-blur-md p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden">
          <h2 className="text-xl font-black mb-10 flex items-center text-white uppercase tracking-wider">
            Cycle de vie technique : {selectedBase}
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between items-start relative gap-8">
            <div className="hidden md:block absolute top-2.5 left-0 w-full h-0.5 bg-slate-700/50"></div>
            
            {(eras[selectedBase] || []).map((era) => (
              <div key={era.label} className="relative flex flex-col items-start md:items-center w-full md:w-1/3 group">
                <div className={`hidden md:block absolute top-0 w-5 h-5 rounded-full border-[5px] border-[#0f172a] shadow-lg z-10 ${era.color}`}></div>
                <div className="pt-0 md:pt-10 text-left md:text-center">
                  <p className="text-white font-black text-sm uppercase tracking-tight">{era.label}</p>
                  <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-2 mb-1 ${era.color} text-white`}>
                    {era.format}
                  </div>
                  <p className="text-slate-500 text-[11px] font-mono">{era.range}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-slate-800/20 p-5 rounded-2xl border border-slate-800/50 flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Santé Parser</span>
                <span className="text-indigo-400 font-black tracking-tighter text-xl">{data.health}</span>
            </div>
            <div className="flex-1 bg-slate-800/20 p-5 rounded-2xl border border-slate-800/50 flex justify-between items-center text-white">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Dernier relevé</span>
                <span className="text-slate-300 font-mono text-sm">{data.last_sync}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
