'use client';
export const runtime = 'edge';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { ShieldCheck, Globe, Leaf, Lock, ServerOff, Search } from 'lucide-react';

export default function BlockchainPage() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-purple-500/30 pt-32 pb-20">
      
      {/* HEADER HERO */}
      <div className="text-center max-w-4xl mx-auto px-6 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold mb-6 uppercase tracking-wider">
           Technologie & Transparence
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Vos preuves sont <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">indestructibles.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Nous utilisons la technologie <strong>Blockchain Polygon</strong> pour rendre vos certificats infalsifiables et indépendants de notre entreprise.
          <br/>On vous explique simplement pourquoi c'est important.
        </p>
      </div>

      {/* CONTENU PÉDAGOGIQUE */}
      <div className="max-w-5xl mx-auto px-6 space-y-24">

        {/* 1. L'ANALOGIE (C'est quoi ?) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                    <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Un "Notaire Numérique" Mondial</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                    <p>
                        Imaginez un immense registre public, accessible à tous, partout dans le monde, 24h/24. 
                        Une fois qu'une information y est écrite, il est <strong>physiquement impossible</strong> de l'effacer ou de la modifier.
                    </p>
                    <p>
                        C'est ça, la Blockchain. Contrairement à un serveur classique (Cloud) qui appartient à une entreprise (et qui peut brûler ou être piraté), la Blockchain est dupliquée sur des milliers d'ordinateurs indépendants.
                    </p>
                </div>
            </div>
            <div className="order-1 md:order-2 bg-[#111116] border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                {/* Illustration abstraite de blocs connectés */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
                     <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse-slow">
                        <path fill="#4F46E5" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,89.1,-6.6C88.1,7.2,83.4,20.5,75.4,32C67.4,43.5,56.1,53.2,43.7,61.3C31.3,69.4,17.8,75.9,3.3,70.2C-11.2,64.5,-26.7,46.6,-38.6,31.7C-50.5,16.8,-58.8,4.9,-60.8,-8.3C-62.8,-21.5,-58.5,-36,-49.2,-46.5C-39.9,-57,-25.6,-63.5,-11.1,-63.3C3.4,-63.1,6.8,-56.3,44.7,-76.4Z" transform="translate(100 100)" />
                     </svg>
                </div>
                <div className="relative z-10 text-center">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl inline-block mb-4 border border-white/10">
                        📄 Fichier : Mon_Logo.png
                    </div>
                    <div className="h-8 w-0.5 bg-white/20 mx-auto"></div>
                    <div className="bg-green-500/20 backdrop-blur-md p-4 rounded-xl inline-block text-green-400 border border-green-500/30 font-bold">
                        🔒 Gravé pour toujours
                    </div>
                </div>
            </div>
        </div>

        {/* 2. L'INDÉPENDANCE (Argument Massue) */}
        <div className="bg-gradient-to-br from-[#111116] to-purple-900/10 border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <ServerOff className="w-64 h-64" />
            </div>
            
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-purple-600/30">
                🛡️
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Et si KeepProof disparaît ?</h2>
            <p className="text-xl text-white mb-6">
                C'est là toute la magie. <span className="text-purple-400 font-bold">Votre preuve survit à notre entreprise.</span>
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
                Parce que nous ancrons l'empreinte de votre fichier sur la Blockchain publique (Polygon), 
                vous n'avez pas besoin de nos serveurs pour prouver votre antériorité dans 10 ans. 
                Vous possédez votre preuve, souverainement.
            </p>
            
            <div className="flex justify-center gap-4">
                 <div className="bg-[#050507] border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-400 flex items-center gap-2">
                    <Search className="w-4 h-4" /> Vérifiable sur PolygonScan
                 </div>
                 <div className="bg-[#050507] border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-400 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Standard Universel
                 </div>
            </div>
        </div>

        {/* 3. POURQUOI POLYGON ? */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111116] p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors">
                <ShieldCheck className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Sécurité Ethereum</h3>
                <p className="text-sm text-gray-400">Polygon s'appuie sur la sécurité du réseau Ethereum, le standard mondial des contrats intelligents.</p>
            </div>
            <div className="bg-[#111116] p-8 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                <Leaf className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Écologique</h3>
                <p className="text-sm text-gray-400">Contrairement au Bitcoin, Polygon utilise le "Proof of Stake". Son empreinte carbone est quasi-nulle (neutre en carbone).</p>
            </div>
            <div className="bg-[#111116] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors">
                <Globe className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Reconnu Juridiquement</h3>
                <p className="text-sm text-gray-400">La preuve Blockchain est reconnue par le règlement européen eIDAS et par les tribunaux de 178 pays (Convention de Berne).</p>
            </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-10 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-6">Prêt à utiliser la technologie de demain ?</h2>
            <Link 
                href="/new"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-transform hover:scale-105"
            >
                Sécuriser un fichier maintenant
            </Link>
        </div>

      </div>
    </div>
    </>
  );
}
