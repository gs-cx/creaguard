'use client';
export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Bot, Search } from 'lucide-react';

interface Design {
  id: number;
  num_enregistrement: string;
  titre: string;
  deposant: string;
  date: string;
  image_file: string;
  locarno?: string;
}

const DesignCard = ({ design, onClick }: { design: Design, onClick: () => void }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div onClick={onClick} className="group bg-[#111116] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all cursor-pointer flex flex-col">
      <div className="relative aspect-[4/3] bg-[#0a0a0e] overflow-hidden flex items-center justify-center p-2">
        {!imgError && design.image_file ? (
            <Image
              src={`/api/design-image?name=${design.image_file}`}
              alt={design.titre || 'Design'}
              fill
              className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 p-4"
              unoptimized
              onError={() => setImgError(true)}
            />
        ) : design.image_file && imgError ? (
            <div className="flex flex-col items-center justify-center text-red-500/80 h-full w-full bg-[#1a0505] rounded-md border border-red-500/20">
               <span className="text-3xl mb-2">⚠️</span>
               <span className="text-[10px] uppercase tracking-widest text-center px-2 font-mono">OVH refuse l'accès<br/>à l'image</span>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center text-gray-600 h-full w-full border-2 border-dashed border-white/5 rounded-lg">
               <span className="text-[10px] uppercase tracking-widest opacity-50 text-center px-2 font-mono">Image non fournie<br/>par l'INPI</span>
            </div>
        )}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-xs font-mono px-2 py-1 rounded text-white border border-white/10">
          {new Date(design.date).getFullYear()}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-200 text-sm line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
          {design.titre || "Sans titre"}
        </h3>
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
          <span className="truncate max-w-[150px]">{design.deposant || "Anonyme"}</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
};

const DesignModal = ({ design, onClose }: { design: Design; onClose: () => void }) => {
  const [imgError, setImgError] = useState(false);
  if (!design) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#111116] border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-6 relative">
          <div className="relative w-full h-64 md:h-full min-h-[300px] flex items-center justify-center">
            {!imgError && design.image_file ? (
                <Image src={`/api/design-image?name=${design.image_file}`} alt={design.titre} fill className="object-contain" unoptimized onError={() => setImgError(true)} />
            ) : design.image_file && imgError ? (
                <div className="flex flex-col items-center justify-center text-red-500">
                   <span className="text-4xl mb-3">⚠️</span>
                   <span className="text-sm uppercase tracking-widest text-center px-2 font-mono">Erreur serveur OVH</span>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-600 border border-dashed border-white/10 w-full h-full rounded-xl m-4">
                   <span className="text-sm uppercase tracking-widest opacity-40 font-mono">Image non fournie par l'INPI</span>
                </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <button onClick={onClose} className="self-end text-gray-400 hover:text-white mb-4">✕ Fermer</button>
          <span className="text-blue-500 text-xs font-mono uppercase tracking-wider mb-2">Archive INPI</span>
          <h2 className="text-2xl font-bold text-white mb-6 leading-tight">{design.titre || "Titre non spécifié"}</h2>
          <div className="space-y-4 text-sm text-gray-300 flex-1">
            <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
              <p className="text-gray-500 text-xs uppercase mb-1">Statut / Déposant</p>
              <p className="font-semibold text-white">{design.deposant || "Anonyme"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
                <p className="text-gray-500 text-xs uppercase mb-1">Date de dépôt</p>
                <p className="font-mono text-white">{new Date(design.date).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
                <p className="text-gray-500 text-xs uppercase mb-1">N° Enregistrement</p>
                <p className="font-mono text-white">{design.num_enregistrement}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DesignsPage() {
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  
  const [results, setResults] = useState<Design[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [page, setPage] = useState(1);

  // IA States
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Le déclencheur principal (Le bouton Entrée ou le clic sur la loupe)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    // On mémorise la recherche validée pour la pagination
    setActiveQuery(searchInput);
    setPage(1);

    // On lance l'IA
    setAiAnswer('');
    setAiLoading(true);
    try {
      const resAi = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: searchInput, expertType: 'data' }),
      });
      const dataAi = await resAi.json();
      setAiAnswer(dataAi.answer);
    } catch (err) {
      setAiAnswer("L'analyse IA est momentanément indisponible.");
    } finally {
      setAiLoading(false);
    }

    // On lance la grille d'images (Page 1)
    fetchImages(searchInput, 1);
  };

  // Le moteur d'images (appelé par la barre de recherche ET par la pagination)
  const fetchImages = async (queryToSearch: string, pageToFetch: number) => {
    if (!queryToSearch) return;
    setLoading(true);

    try {
      const url = `/api/search?q=${encodeURIComponent(queryToSearch)}&limit=24&page=${pageToFetch}&_browserCache=${Date.now()}`;
      const res = await fetch(url);
      const text = await res.text();

      if (res.ok) {
        const data = JSON.parse(text);
        if (data.hits) {
            setResults(data.hits);
        } else setResults([]);
      } else setResults([]);
    } catch (error: any) { 
        setResults([]); 
    } finally { 
        setLoading(false); 
    }
  };

  // Si on clique sur Suivant/Précédent, on ne recharge que les images, pas l'IA
  useEffect(() => {
    if (activeQuery && page > 1) {
      fetchImages(activeQuery, page);
    } else if (activeQuery && page === 1 && results.length > 0) {
      // Évite un double chargement sur la première recherche
      fetchImages(activeQuery, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); 

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans">
      <div className="bg-[#111116] border-b border-white/5 pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Le Moteur <span className="text-gray-400">Intelligent</span></h1>
          <p className="text-gray-400 mb-8">
            Posez votre question à l'IA ou tapez directement le nom d'une marque pour explorer les archives.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mt-8">
            <input 
              type="text" 
              value={searchInput} 
              onChange={(e) => setSearchInput(e.target.value)} 
              placeholder="Ex: Je cherche des informations sur la marque Apple..." 
              className="w-full bg-[#0A0A0F] border border-white/10 rounded-full py-4 pl-6 pr-16 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-2xl" 
            />
            <button 
              type="submit"
              disabled={loading || aiLoading || !searchInput.trim()}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full transition-colors disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* LE BLOC INTELLIGENCE ARTIFICIELLE */}
        {(aiLoading || aiAnswer) && (
          <div className="mb-12 bg-[#111116] border border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
             <div className="flex items-center gap-3 mb-4">
                <Bot className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Analyse de l'IA</h3>
             </div>
             {aiLoading ? (
                <div className="flex items-center gap-3 text-gray-400">
                   <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                   <p>Extraction des mots-clés et recherche dans les bases de données de l'INPI...</p>
                </div>
             ) : (
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                   {aiAnswer}
                </div>
             )}
          </div>
        )}

        {/* LA GRILLE VISUELLE */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-3"><Loader2 className="w-8 h-8 animate-spin text-blue-500"/></div>
        ) : (
          <>
            {results.length > 0 && <p className="text-sm text-gray-500 mb-6">Résultats visuels - Page {page}</p>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((design) => <DesignCard key={design.id} design={design} onClick={() => setSelectedDesign(design)} />)}
            </div>
            
            {results.length > 0 && (
              <div className="flex justify-center items-center gap-6 mt-16 border-t border-white/10 pt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-6 py-3 rounded-lg bg-[#1A1A20] text-white disabled:opacity-50">← Précédent</button>
                <span className="text-gray-400">Page <span className="text-white">{page}</span></span>
                <button onClick={() => setPage(p => p + 1)} disabled={results.length < 24} className="px-6 py-3 rounded-lg bg-blue-600 text-white disabled:opacity-50">Suivant →</button>
              </div>
            )}

            {results.length === 0 && !loading && activeQuery && !aiLoading && (
              <div className="text-center py-20 bg-[#111116] border border-white/5 rounded-2xl border-dashed">
                <p className="text-gray-400 mb-2">Aucune image trouvée pour cette requête.</p>
              </div>
            )}
          </>
        )}
      </div>
      
      {selectedDesign && <DesignModal design={selectedDesign} onClose={() => setSelectedDesign(null)} />}
    </div>
  );
}
