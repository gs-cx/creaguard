'use client';
export const runtime = 'edge';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Proof {
  id: string;
  file_name: string;
  status: string;
  created_at: string;
  file_hash_sha256: string;
  tx_hash?: string;
}

export default function VerifyPage() {
  const params = useParams();
  const [proof, setProof] = useState<Proof | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProof = async () => {
      try {
        const res = await fetch(`https://keepproof.com/api/proof/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProof(data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchProof();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050507] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !proof) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Certificat Introuvable</h1>
          <p className="text-gray-400 text-sm mb-6">
            Ce document n'existe pas ou l'identifiant est incorrect.
          </p>
          <Link href="/" className="text-white bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg text-sm transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Fond lumineux subtil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            KeepProof
          </Link>
        </div>

        {/* Carte de validation */}
        <div className="bg-[#111116] border border-green-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
          
          <div className="text-center border-b border-white/5 pb-8 mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
              <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Certificat Authentique</h1>
            <p className="text-green-400 text-sm font-medium">
              ✓ Vérifié par la Blockchain KeepProof
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Info Fichier */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Fichier Protégé</p>
              <p className="font-medium text-lg">{proof.file_name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Date d'ancrage</p>
                  <p className="text-sm text-gray-300">{new Date(proof.created_at).toLocaleDateString()}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Heure (UTC)</p>
                  <p className="text-sm text-gray-300">{new Date(proof.created_at).toLocaleTimeString()}</p>
               </div>
            </div>

            {/* Hash */}
            <div className="bg-black/30 rounded-xl p-4 border border-white/5 font-mono text-xs break-all">
               <p className="text-gray-600 mb-1">EMPREINTE SHA-256</p>
               <span className="text-blue-400">{proof.file_hash_sha256}</span>
            </div>
            
            {/* Blockchain Transaction */}
            {proof.tx_hash && (
               <div className="bg-purple-500/5 rounded-xl p-4 border border-purple-500/10 font-mono text-xs break-all">
                  <p className="text-purple-500/70 mb-1 flex items-center gap-2">
                    ● ANCRAGE POLYGON
                  </p>
                  <span className="text-purple-300">{proof.tx_hash}</span>
               </div>
            )}

          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-gray-600">
              Ce document est immuable. Son existence est prouvée mathématiquement.
            </p>
          </div>

        </div>

        <div className="text-center mt-8">
            <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
                Protéger mon propre fichier →
            </Link>
        </div>

      </div>
    </div>
  );
}
