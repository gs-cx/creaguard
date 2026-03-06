'use client';
export const runtime = 'edge';
import React from 'react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      
      {/* Logo ou Icône */}
      <div className="w-20 h-20 bg-[#111116] rounded-2xl flex items-center justify-center mb-8 border border-white/10 animate-pulse">
        <span className="text-4xl">🚧</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
        Construction en cours.
      </h1>
      
      <p className="text-xl text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
        KeepProof prépare quelque chose de grand. <br/>
        La plateforme d'ancrage de preuves est actuellement en phase de mise à jour critique.
      </p>

      <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-mono rounded border border-blue-500/20">
        Status: SYSTEM_UPDATE
      </div>

      <div className="mt-12 text-sm text-gray-600">
        © 2026 KeepProof. Tous droits réservés.
      </div>
    </div>
  );
}
