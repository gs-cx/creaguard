'use client';
export const runtime = 'edge';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Check, Minus, X } from 'lucide-react';

export default function ComparisonPage() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#050507] text-white font-sans pt-32 pb-20">
      
      {/* HEADER */}
      <div className="text-center max-w-4xl mx-auto px-6 mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          La meilleure protection <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">pour vos créations.</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Comparons objectivement les solutions juridiques existantes.
          Pourquoi la Blockchain est le nouveau standard d'efficacité.
        </p>
      </div>

      {/* TABLEAU COMPARATIF - DESIGN "SOBRE" */}
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
        <div className="min-w-[700px] bg-[#111116] border border-white/10 rounded-3xl overflow-hidden">
            
            {/* EN-TÊTES */}
            <div className="grid grid-cols-4 border-b border-white/10 bg-white/[0.02]">
                <div className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center">
                    Critères clés
                </div>
                <div className="p-6 text-center">
                    <div className="text-xl mb-2">⚖️</div>
                    <div className="font-bold text-gray-300">Huissier de Justice</div>
                    <div className="text-xs text-gray-500 mt-1">La méthode traditionnelle</div>
                </div>
                <div className="p-6 text-center">
                    <div className="text-xl mb-2">📮</div>
                    <div className="font-bold text-gray-300">Recommandé / Soleau</div>
                    <div className="text-xs text-gray-500 mt-1">La méthode administrative</div>
                </div>
                <div className="p-6 text-center bg-blue-600/5 border-b-2 border-blue-500 relative">
                    <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-blue-500/10 to-transparent h-20 pointer-events-none"></div>
                    <div className="text-xl mb-2 relative z-10">⚡</div>
                    <div className="font-bold text-white relative z-10">KeepProof</div>
                    <div className="text-xs text-blue-400 mt-1 font-medium relative z-10">La méthode moderne</div>
                </div>
            </div>

            {/* LIGNE 1 : COÛT */}
            <div className="grid grid-cols-4 border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                <div className="p-6 font-medium text-gray-400 flex items-center group-hover:text-white transition-colors">
                    Coût moyen par acte
                </div>
                
                <div className="p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-gray-300 font-medium">Élevé</span>
                    <span className="text-xs text-gray-500 mt-1">&gt; 250€ / constat</span>
                </div>
                
                <div className="p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-gray-300 font-medium">Modéré</span>
                    <span className="text-xs text-gray-500 mt-1">~15€ / envoi</span>
                </div>

                <div className="p-6 flex flex-col items-center justify-center text-center bg-blue-600/5 relative">
                     <span className="text-white font-bold text-lg">Abordable</span>
                     <span className="text-xs text-blue-400 mt-1">&lt; 5€ / fichier</span>
                </div>
            </div>

            {/* LIGNE 2 : DÉLAI */}
            <div className="grid grid-cols-4 border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                <div className="p-6 font-medium text-gray-400 flex items-center group-hover:text-white transition-colors">
                    Délai d'obtention
                </div>
                
                <div className="p-6 flex items-center justify-center text-center text-sm text-gray-400">
                     Sur rendez-vous
                </div>
                
                <div className="p-6 flex items-center justify-center text-center text-sm text-gray-400">
                     Délais postaux (48h)
                </div>

                <div className="p-6 flex items-center justify-center text-center bg-blue-600/5">
                    <span className="inline-flex items-center gap-2 text-white font-bold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Instantané
                    </span>
                </div>
            </div>

             {/* LIGNE 3 : VALEUR JURIDIQUE */}
             <div className="grid grid-cols-4 border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                <div className="p-6 font-medium text-gray-400 flex items-center group-hover:text-white transition-colors">
                    Force Probante
                </div>
                
                <div className="p-6 flex items-center justify-center text-center text-sm text-gray-300">
                     Acte Authentique
                </div>
                
                <div className="p-6 flex items-center justify-center text-center text-sm text-gray-300">
                     Date Certaine
                </div>

                <div className="p-6 flex flex-col items-center justify-center text-center bg-blue-600/5">
                     <span className="text-white font-medium text-sm">Conforme eIDAS 🇪🇺</span>
                     <span className="text-[10px] text-gray-500 mt-1">Reconnu dans 178 pays</span>
                </div>
            </div>

            {/* LIGNE 4 : DURÉE */}
            <div className="grid grid-cols-4 border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                <div className="p-6 font-medium text-gray-400 flex items-center group-hover:text-white transition-colors">
                    Durée de validité
                </div>
                
                <div className="p-6 flex items-center justify-center text-center text-sm text-gray-500">
                    25 ans (Archivage)
                </div>
                
                <div className="p-6 flex items-center justify-center text-center text-sm text-gray-500">
                    5 à 10 ans (Renouvelable)
                </div>

                <div className="p-6 flex items-center justify-center text-center bg-blue-600/5">
                     <span className="text-white font-bold flex items-center gap-2">
                        <span className="text-xl">∞</span> À vie
                     </span>
                </div>
            </div>

            {/* LIGNE 5 : INTÉGRITÉ */}
            <div className="grid grid-cols-4 hover:bg-white/[0.01] transition-colors group">
                <div className="p-6 font-medium text-gray-400 flex items-center group-hover:text-white transition-colors">
                    Sécurité & Intégrité
                </div>
                
                <div className="p-6 flex items-center justify-center text-center text-sm text-gray-500">
                    Constat humain
                </div>
                
                <div className="p-6 flex items-center justify-center text-center text-sm text-gray-500">
                    Cachet de la Poste
                </div>

                <div className="p-6 flex items-center justify-center text-center bg-blue-600/5">
                     <span className="text-blue-400 text-sm font-medium border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/10">
                        Infalsifiable (Hash)
                     </span>
                </div>
            </div>

        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-500 mb-6 text-sm">Convaincu par la simplicité ?</p>
        <Link 
            href="/new"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
            Je sécurise mes créations
        </Link>
      </div>

    </div>
    </>
  );
}
