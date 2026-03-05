export const runtime = 'edge';
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

type Result = {
  id: number;
  num_depot: string;
  nom_marque: string;
  date_depot: string;
  deposant: string;
  statut: string;
  classes: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || query.length < 2) return;

    setLoading(true);
    setHasSearched(true);
    setResults([]);

    try {
      console.log("🔍 Envoi de la requête pour :", query);
      
      // AJOUT CRUCIAL : { cache: 'no-store' } pour interdire le cache
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        cache: 'no-store',
        headers: {
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        }
      });

      console.log("📡 Statut réponse :", res.status);

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      console.log("📦 Données reçues :", data);

      if (data.results) {
        setResults(data.results);
      }
    } catch (err) {
      console.error("❌ Erreur de recherche:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans">
      <Header />
      
      <div className="max-w-3xl mx-auto pt-32 px-6">
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Recherche d'Antériorité
        </h1>
        <p className="text-gray-400 mb-8">
          Vérifiez la disponibilité dans la base INPI & Blockchain (Données officielles)
        </p>

        <form onSubmit={handleSearch} className="relative mb-12">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Tesla, Apple, KeepProof..."
            className="w-full bg-[#1A1A20] border border-white/10 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
            autoFocus
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 px-6 rounded-lg font-bold transition-colors disabled:opacity-50 text-white"
          >
            {loading ? '...' : 'Vérifier'}
          </button>
        </form>

        <div className="space-y-4 pb-20">
          {hasSearched && results.length === 0 && !loading && (
             <div className="bg-[#111116] p-8 rounded-xl border border-white/5 text-center">
                <div className="text-2xl mb-2">✨</div>
                <p className="text-gray-300 font-medium">Aucune marque trouvée pour "{query}"</p>
                <p className="text-sm text-gray-500 mt-1">Le champ semble libre ! C'est le moment de protéger votre idée.</p>
                <Link href="/new" className="inline-block mt-4 text-blue-400 hover:text-blue-300 text-sm font-bold">
                  + Déposer une preuve maintenant
                </Link>
             </div>
          )}

          {results.map((r) => (
            <div key={r.id} className="bg-[#111116] p-5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition">
                        {r.nom_marque}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border ${
                        r.statut === 'Enregistrée' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-gray-500/10 text-gray-400 border-white/5'
                      }`}>
                        {r.statut || 'Inconnu'}
                      </span>
                   </div>
                   <p className="text-sm text-gray-400 font-medium">{r.deposant}</p>
                   <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        📅 {r.date_depot ? new Date(r.date_depot).toLocaleDateString() : 'N/A'}
                      </span>
                      <span className="flex items-center gap-1">
                        📂 Classes: {r.classes || 'N/A'}
                      </span>
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-xs font-mono text-gray-600 bg-white/5 px-2 py-1 rounded">
                     #{r.num_depot}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
