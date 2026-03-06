'use client';
export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, Download, EyeOff, AlertTriangle } from 'lucide-react';

export default function SafeViewer({ params }: { params: { id: string } }) {
  // Simulation de données (En prod, fetch depuis DB via l'ID)
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(86400); // 24h en secondes
  
  // Image de démo (Placeholder)
  const demoImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"; 
  const watermarkText = "CONFIDENTIEL • IP: 192.168.1.1 • " + new Date().toLocaleDateString();

  useEffect(() => {
    // Simulation chargement sécurité
    setTimeout(() => setLoading(false), 1500);

    // Timer Compte à rebours
    const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatage du temps restant
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  // Protection Clic Droit
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("⛔️ Sécurité KeepProof : Le clic droit est désactivé sur ce fichier protégé.");
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-cyan-500 gap-4">
            <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
            <p className="font-mono text-sm tracking-widest animate-pulse">DÉCHIFFREMENT SÉCURISÉ...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center py-10 px-4 font-sans select-none">
        
        {/* BANDEAU SÉCURITÉ */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between bg-[#111116] border border-white/10 rounded-xl p-4 mb-8 gap-4">
            <div className="flex items-center gap-3">
                <div className="bg-green-500/10 p-2 rounded-lg text-green-500">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="font-bold text-sm md:text-base">Fichier Protégé par KeepProof</h1>
                    <p className="text-xs text-gray-500">Consultation sécurisée. Téléchargement désactivé.</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-red-400 bg-red-500/5 px-3 py-1.5 rounded-lg border border-red-500/10">
                    <Clock className="w-4 h-4 animate-pulse" />
                    <span className="font-mono font-bold text-sm">{formatTime(timeLeft)}</span>
                </div>
            </div>
        </div>

        {/* VISUALISEUR SÉCURISÉ (LAYER) */}
        <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl" onContextMenu={handleContextMenu}>
            
            {/* 1. L'IMAGE (Floutée si on essaie de tricher) */}
            <img 
                src={demoImage} 
                alt="Protected Content" 
                className="w-full h-auto object-contain pointer-events-none"
            />

            {/* 2. LE FILIGRANE (WATERMARK GRID) */}
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-wrap content-center justify-center opacity-30 overflow-hidden">
                 {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="transform -rotate-45 text-white text-xs md:text-xl font-bold p-12 whitespace-nowrap">
                        {watermarkText}
                    </div>
                 ))}
            </div>

            {/* 3. LE BOUCLIER TRANSPARENT (Empêche le drag & drop) */}
            <div className="absolute inset-0 z-30 bg-transparent"></div>

        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center text-gray-500 text-xs">
            <p className="mb-2">Ce lien est unique et tracé. ID: {params.id}</p>
            <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Technologie <strong>Safe-Link™</strong> by KeepProof
            </div>
        </div>

    </div>
  );
}
