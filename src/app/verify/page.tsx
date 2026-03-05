export const runtime = 'edge';
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShieldCheck, XCircle, FileType, CheckCircle2, ExternalLink, Loader2, ScanLine } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VerifyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'valid' | 'invalid'>('idle');
  const [result, setResult] = useState<any>(null);

  // --- MOTEUR DE VÉRIFICATION (SIMULATION) ---
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setStatus('searching');

    // Simulation d'appel API / Blockchain
    setTimeout(() => {
        // SCÉNARIO 1 : C'est un code valide (Ex: KP-2026-TEST)
        if (searchQuery.includes('KP') || searchQuery.length > 10) {
            setResult({
                id: searchQuery,
                filename: "Mon_Projet_Secret_v2.pdf",
                owner: "0x71C...9A23",
                date: "14 Janvier 2026 à 10:42",
                hash: "0xea8...3b12",
                tx: "0x1234567890abcdef",
                block: 54902110
            });
            setStatus('valid');
        } 
        // SCÉNARIO 2 : Inconnu
        else {
            setStatus('invalid');
        }
    }, 1500);
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#050507] text-white font-sans pt-32 pb-20">
      
      <div className="max-w-3xl mx-auto px-6">
        
        {/* EN-TÊTE */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/20 rounded-2xl mb-6 border border-blue-500/20">
                <ScanLine className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Vérifier une preuve</h1>
            <p className="text-gray-400">
                L'outil d'audit public pour authentifier un certificat KeepProof. <br/>
                Utilisé par les tribunaux, huissiers et plateformes partenaires.
            </p>
        </div>

        {/* BARRE DE RECHERCHE */}
        <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <form onSubmit={handleSearch} className="relative flex items-center">
                <Search className="absolute left-6 text-gray-500 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Entrez l'ID du Certificat (KP-...) ou le Hash du fichier"
                    className="w-full bg-[#111116] border border-white/10 rounded-full py-5 pl-16 pr-32 text-white focus:outline-none focus:border-blue-500 transition-all shadow-2xl placeholder:text-gray-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                    type="submit"
                    className="absolute right-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold transition-colors flex items-center gap-2"
                >
                    {status === 'searching' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Vérifier'}
                </button>
            </form>
        </div>

        {/* RÉSULTATS */}
        
        {/* CAS 1 : VALIDE */}
        {status === 'valid' && (
            <div className="bg-[#0A0A0F] border border-green-500/30 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Vert */}
                <div className="bg-green-500/10 p-6 flex items-center gap-4 border-b border-green-500/20">
                    <div className="w-12 h-12 bg-green-500 text-black rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Certificat Authentique</h3>
                        <p className="text-green-400 text-sm">Ce document est protégé sur la Blockchain.</p>
                    </div>
                </div>

                {/* Détails */}
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Nom du fichier</p>
                            <div className="flex items-center gap-2 text-white font-medium">
                                <FileType className="w-4 h-4 text-gray-400" />
                                {result.filename}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Date d'ancrage</p>
                            <div className="text-white font-mono">{result.date}</div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Empreinte (Hash)</p>
                            <div className="text-xs text-gray-400 font-mono bg-white/5 p-2 rounded border border-white/5 break-all">
                                {result.hash}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Transaction Polygon</p>
                            <a href="#" className="text-xs text-blue-400 hover:underline font-mono flex items-center gap-1">
                                {result.tx} <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                    
                    <div className="border-t border-white/5 pt-6 mt-6">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            Preuve vérifiée mathématiquement via le réseau Polygon (Bloc #{result.block}).
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* CAS 2 : INVALIDE */}
        {status === 'invalid' && (
            <div className="bg-[#0A0A0F] border border-red-500/30 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-red-500/10 p-6 flex items-center gap-4 border-b border-red-500/20">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center">
                        <XCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Certificat Inconnu ou Invalide</h3>
                        <p className="text-red-400 text-sm">Aucune preuve correspondante trouvée.</p>
                    </div>
                </div>
                <div className="p-8">
                    <p className="text-gray-400 mb-4">
                        L'identifiant <strong>"{searchQuery}"</strong> ne correspond à aucun ancrage sur la Blockchain Polygon via KeepProof.
                    </p>
                    <ul className="text-sm text-gray-500 space-y-2 list-disc pl-5">
                        <li>Vérifiez qu'il n'y a pas de faute de frappe.</li>
                        <li>Le fichier a peut-être été modifié (même d'un seul pixel), ce qui change son Hash.</li>
                        <li>Ce certificat peut être une contrefaçon.</li>
                    </ul>
                </div>
            </div>
        )}

        {/* HELPERS */}
        {status === 'idle' && (
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-bold text-white mb-1">1. Récupérez l'ID</div>
                    <p className="text-xs text-gray-500">Sur le PDF (ex: KP-202X...)</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-bold text-white mb-1">2. Entrez le code</div>
                    <p className="text-xs text-gray-500">Dans la barre ci-dessus</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="font-bold text-white mb-1">3. Audit immédiat</div>
                    <p className="text-xs text-gray-500">Connexion Blockchain</p>
                </div>
             </div>
        )}

      </div>
    </div>
    <Footer />
    </>
  );
}
