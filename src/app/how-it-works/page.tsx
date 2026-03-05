export const runtime = 'edge';
'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function HowItWorks() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-blue-500/30 pt-24 pb-20">
      
      {/* HERO SECTION */}
      <div className="px-6 text-center max-w-4xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-6 uppercase tracking-wider">
           🎓 Tutoriel Rapide
        </div>
        {/* MODIFICATION ICI : Minuscules appliquées */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          de l'idée à la preuve.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">en 3 étapes simples.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Fini la paperasse administrative complexe. Avec KeepProof, sécuriser votre propriété intellectuelle prend moins de 2 minutes.
        </p>
      </div>

      {/* LES 3 ÉTAPES (STEPS) */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Ligne de connexion (Desktop seulement) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 z-0"></div>

            {/* ÉTAPE 1 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-2xl bg-[#111116] border border-white/10 flex items-center justify-center mb-6 shadow-2xl group-hover:border-blue-500/50 transition-colors">
                    <span className="text-4xl">📂</span>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold border-4 border-[#050507]">1</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Sélectionnez votre fichier</h3>
                <p className="text-gray-400 text-sm leading-relaxed px-4">
                    Glissez n'importe quel type de fichier (PDF, Image, Audio, Code).<br/>
                    <span className="text-blue-400 font-medium">L'empreinte numérique est calculée sur votre appareil.</span> Vos données ne sont pas transférées.
                </p>
            </div>

            {/* ÉTAPE 2 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-2xl bg-[#111116] border border-white/10 flex items-center justify-center mb-6 shadow-2xl group-hover:border-purple-500/50 transition-colors">
                    <span className="text-4xl">⛓️</span>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold border-4 border-[#050507]">2</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Sécurisation Blockchain</h3>
                <p className="text-gray-400 text-sm leading-relaxed px-4">
                    Nous verrouillons l'empreinte unique de votre fichier dans la Blockchain publique (Polygon). Cela crée une <span className="text-purple-400 font-medium">date certaine infalsifiable</span>, reconnue juridiquement.
                </p>
            </div>

            {/* ÉTAPE 3 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-2xl bg-[#111116] border border-white/10 flex items-center justify-center mb-6 shadow-2xl group-hover:border-green-500/50 transition-colors">
                    <span className="text-4xl">📜</span>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center font-bold border-4 border-[#050507]">3</div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Certificat Immédiat</h3>
                <p className="text-gray-400 text-sm leading-relaxed px-4">
                    Vous recevez instantanément votre <span className="text-green-400 font-medium">Certificat d'Antériorité</span> avec QR Code de vérification. Vous pouvez l'utiliser pour prouver vos droits en cas de litige.
                </p>
            </div>

        </div>
      </div>

      {/* COMPARATIF (WHY US?) */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir KeepProof ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Carte Enveloppe Soleau */}
            <div className="p-8 rounded-2xl border border-white/5 bg-white/5 opacity-75 hover:opacity-100 transition-all">
                <h3 className="text-lg font-bold text-gray-400 mb-4">Enveloppe Soleau</h3>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li className="flex gap-3 items-start">
                        <span className="text-orange-400 mt-0.5">🔸</span> 
                        <span>Contraintes de format<br/><span className="text-xs opacity-70">(Max 7 pages / 10 Mo)</span></span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-orange-400 mt-0.5">🔸</span> 
                        <span>Validité temporaire<br/><span className="text-xs opacity-70">(Renouvellement requis tous les 5 ans)</span></span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-orange-400 mt-0.5">🔸</span> 
                        <span>Démarche administrative</span>
                    </li>
                </ul>
            </div>

            {/* Carte KeepProof */}
            <div className="p-8 rounded-2xl border border-blue-500/50 bg-blue-500/5 relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Recommandé
                </div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <div className="w-6 h-6 bg-white rounded text-black flex items-center justify-center text-xs font-bold">K</div>
                    KeepProof
                </h3>
                <ul className="space-y-4 text-sm text-gray-300">
                    <li className="flex gap-3 items-center">
                        <span className="text-green-400 text-lg">✓</span> 
                        <span><strong>Fichiers illimités</strong> (Taille & Pages)</span>
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="text-green-400 text-lg">✓</span> 
                        <span><strong>Valable à vie</strong> (Blockchain)</span>
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="text-green-400 text-lg">✓</span> 
                        <span>Certificat PDF immédiat</span>
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="text-green-400 text-lg">✓</span> 
                        <span>Zéro abonnement récurrent</span>
                    </li>
                </ul>
            </div>

            {/* Carte Notaire */}
            <div className="p-8 rounded-2xl border border-white/5 bg-white/5 opacity-75 hover:opacity-100 transition-all">
                <h3 className="text-lg font-bold text-gray-400 mb-4">Huissier / Notaire</h3>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li className="flex gap-3 items-start">
                        <span className="text-gray-400 mt-0.5">🔹</span> 
                        <span>Budget par acte<br/><span className="text-xs opacity-70">(Souvent &gt; 150€)</span></span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-gray-400 mt-0.5">🔹</span> 
                        <span>Sur rendez-vous</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-gray-400 mt-0.5">🔹</span> 
                        <span>Formalisme juridique strict</span>
                    </li>
                </ul>
            </div>

        </div>
      </div>

      {/* CTA FINAL */}
      <div className="text-center border-t border-white/10 pt-20">
        <h2 className="text-3xl font-bold mb-6">Prêt à protéger votre travail ?</h2>
        <p className="text-gray-400 mb-8">Rejoignez 12,000+ créateurs qui ont choisi la sécurité.</p>
        <Link 
            href="/new"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
            <span>⚡</span> Commencer maintenant
        </Link>
      </div>

    </div>
    </>
  );
}
