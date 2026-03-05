export const runtime = 'edge';
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Share2, Clock, Shield, Eye, Copy, Check, Lock, ArrowLeft, UploadCloud } from 'lucide-react';

export default function SafeLinkPage() {
  const [step, setStep] = useState(1); // 1: Upload, 2: Config, 3: Result
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  const [options, setOptions] = useState({
    expiration: '24h',
    watermark: 'CONFIDENTIEL - PROPRIÉTÉ DE KEEPPROOF',
    allowDownload: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStep(2);
    }
  };

  const generateLink = () => {
    // Simulation d'ID unique (en prod : appel API)
    const uniqueId = "kp-" + Math.random().toString(36).substring(2, 9);
    // Lien pointant vers la page de visualisation
    const generatedUrl = `${window.location.origin}/s/${uniqueId}`;
    setLink(generatedUrl);
    setStep(3);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white pt-24 pb-12 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-10">
            <Link href="/dashboard" className="text-gray-500 hover:text-white flex items-center gap-2 mb-4 text-sm transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour Dashboard
            </Link>
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20 text-cyan-400">
                    <Share2 className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Safe-Link <span className="text-cyan-400">Generator</span></h1>
            </div>
            <p className="text-gray-400">Partagez vos fichiers sensibles avec un lien éphémère, tatoué et sécurisé.</p>
        </div>

        {/* --- ETAPE 1 : UPLOAD --- */}
        {step === 1 && (
            <div className="bg-[#111116] border border-white/10 border-dashed border-2 rounded-3xl p-12 text-center hover:border-cyan-500/50 transition-all cursor-pointer group relative">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileChange} />
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2">Glissez votre fichier ici</h3>
                <p className="text-gray-500 text-sm">JPG, PNG, PDF (Max 50MB)</p>
            </div>
        )}

        {/* --- ETAPE 2 : CONFIGURATION --- */}
        {step === 2 && file && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-[#111116] border border-white/10 rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center font-bold text-gray-300">
                            {file.name.substring(0, 3).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-bold text-white">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Prêt à sécuriser</p>
                        </div>
                        <button onClick={() => setStep(1)} className="ml-auto text-xs text-red-400 hover:text-red-300">Changer</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Expiration (Autodestruction)
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {['1h', '24h', '7j'].map((opt) => (
                                    <button 
                                        key={opt}
                                        onClick={() => setOptions({...options, expiration: opt})}
                                        className={`py-3 rounded-xl text-sm font-bold border transition-all ${options.expiration === opt ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-black border-white/10 text-gray-400 hover:border-white/30'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4" /> Sécurité Visuelle
                            </label>
                            <input 
                                type="text" 
                                value={options.watermark}
                                onChange={(e) => setOptions({...options, watermark: e.target.value})}
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none placeholder-gray-600"
                                placeholder="Texte du tatouage (Watermark)..."
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            id="download"
                            checked={options.allowDownload} 
                            onChange={(e) => setOptions({...options, allowDownload: e.target.checked})}
                            className="w-5 h-5 rounded border-gray-600 bg-black text-cyan-500 focus:ring-cyan-500"
                        />
                        <label htmlFor="download" className="text-sm text-gray-300 cursor-pointer select-none">
                            Autoriser le téléchargement (Si décoché : <strong>Vue seule</strong>)
                        </label>
                    </div>
                </div>

                <button 
                    onClick={generateLink}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl text-lg shadow-xl shadow-cyan-900/20 transition-all transform hover:scale-[1.01]"
                >
                    Générer le Safe-Link Sécurisé
                </button>
            </div>
        )}

        {/* --- ETAPE 3 : RÉSULTAT --- */}
        {step === 3 && (
            <div className="max-w-2xl mx-auto text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                    <Check className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Lien Sécurisé Créé !</h2>
                <p className="text-gray-400 mb-8">Ce lien expirera dans {options.expiration}. Le fichier est tatoué.</p>

                <div className="bg-[#111116] border border-cyan-500/30 p-2 pl-4 rounded-xl flex items-center gap-4 mb-8 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                    <Lock className="w-4 h-4 text-cyan-500 shrink-0" />
                    <input 
                        type="text" 
                        value={link} 
                        readOnly 
                        className="bg-transparent border-none outline-none text-white w-full text-sm font-mono truncate"
                    />
                    <button 
                        onClick={copyToClipboard}
                        className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                        {copied ? 'Copié !' : 'Copier'}
                    </button>
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={() => window.open(link, '_blank')} className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
                        <Eye className="w-4 h-4" /> Tester le lien
                    </button>
                    <button onClick={() => {setStep(1); setFile(null)}} className="text-sm text-cyan-400 hover:text-cyan-300">
                        Créer un autre lien
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}

