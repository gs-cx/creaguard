export const runtime = 'edge';
"use client";

import { useState, useEffect } from 'react';
import { Search, Calendar, Filter, Image as ImageIcon, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function DesignSearch() {
  // --- ÉTATS ---
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({ total: 0, time: 0 });
  const [loading, setLoading] = useState(false);
  
  // Pagination
  const [page, setPage] = useState(1);
  const hitsPerPage = 12;

  // Filtres
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  // --- RECHERCHE ---
  const searchDesigns = async () => {
    setLoading(true);
    try {
      // On envoie les paramètres proprement
      const params = new URLSearchParams({
        q: query,
        limit: hitsPerPage,
        offset: (page - 1) * hitsPerPage, // C'est ici que la pagination se joue
        sort: sortBy,
        minYear: startDate,
        maxYear: endDate
      });

      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) throw new Error("Erreur réseau");
      
      const data = await response.json();
      setResults(data.hits || []);
      setStats({ total: data.estimatedTotalHits || 0, time: data.processingTimeMs || 0 });
      
    } catch (err) {
      console.error("Erreur de recherche:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchDesigns();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, sortBy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    searchDesigns();
  };

  // Calcul pour savoir si on est à la dernière page
  const isLastPage = (page * hitsPerPage) >= stats.total;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* HEADER */}
      <header className="border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-black font-bold p-1 rounded">K</div>
            <span className="font-semibold text-lg tracking-tight">KeepProof</span>
          </div>
        </div>
      </header>

      {/* HERO SEARCH */}
      <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border-b border-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Explorer les Dessins & Modèles
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Accédez à plus de 900 000 archives officielles de l'INPI.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une marque, un objet, un numéro..."
              className="block w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-gray-700 rounded-xl text-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-xl"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Rechercher'}
            </button>
          </form>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-2 rounded-lg border border-gray-800">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none text-gray-300 cursor-pointer"
              >
                <option value="relevance">Pertinence</option>
                <option value="date:desc">Les plus récents</option>
                <option value="date:asc">Les plus anciens</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-2 rounded-lg border border-gray-800">
              <Calendar className="h-4 w-4 text-gray-400" />
              <input 
                type="number" 
                placeholder="Année min" 
                className="bg-transparent w-20 outline-none text-gray-300"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="text-gray-600">-</span>
              <input 
                type="number" 
                placeholder="Année max" 
                className="bg-transparent w-20 outline-none text-gray-300"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RÉSULTATS */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {stats.total > 0 && (
          <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
            <span>{stats.total.toLocaleString()} résultats trouvés ({stats.time}ms)</span>
            <span>Page {page}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((hit) => (
            <div key={hit.id} className="group bg-[#111] border border-gray-800 hover:border-blue-500/50 rounded-xl overflow-hidden transition-all hover:shadow-2xl flex flex-col">
              
              <div className="relative h-56 bg-[#000] flex items-center justify-center overflow-hidden">
                {hit.image_file ? (
                  <img 
                    src={hit.image_file} 
                    alt={hit.titre}
                    loading="lazy"
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                
                <div className="absolute inset-0 flex-col items-center justify-center text-gray-700 bg-[#050505] hidden" style={{ display: hit.image_file ? 'none' : 'flex' }}>
                  <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
                  <span className="text-xs font-mono uppercase tracking-widest opacity-40">Aucun visuel</span>
                </div>
                
                <div className="absolute top-3 right-3">
                   <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border backdrop-blur-md bg-gray-800/80 border-gray-700 text-gray-400">
                    {hit.statut || 'ARCHIVE'}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-200 line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
                  {hit.titre || "Titre non disponible"}
                </h3>
                
                <div className="mt-auto space-y-3 pt-4 border-t border-gray-800/50">
                  <div className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-gray-600 shrink-0">Par</span>
                    <span className="line-clamp-1 text-gray-300">{hit.deposant || "Anonyme"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {hit.date}
                    </div>
                    <span className="font-mono text-[10px] text-gray-700">{hit.num_enregistrement}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION CORRIGÉE */}
        {results.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-12 mb-8">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium text-gray-400">Page {page}</span>
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={isLastPage || results.length < hitsPerPage}
              className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
