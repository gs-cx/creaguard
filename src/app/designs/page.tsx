'use client';
export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MessageSquare, Send, X, Loader2, Bot } from 'lucide-react';

// --- TYPES ---
interface Design {
  id: number;
  num_enregistrement: string;
  titre: string;
  deposant: string;
  date: string;
  image_file: string;
  locarno?: string;
}

// --- COMPOSANT CARTE (Avec gestion d'erreur image individuelle) ---
const DesignCard = ({ design, onClick }: { design: Design, onClick: () => void }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="group bg-[#111116] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[4/3] bg-[#0a0a0e] overflow-hidden flex items-center justify-center">
        {!imgError && design.image_file ? (
            <Image
              src={`/api/design-image?name=${design.image_file}`}
              alt={design.titre || 'Design'}
              fill
              className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 p-4"
              unoptimized
              onError={() => setImgError(true)} // Si pas d'image sur OVH, on bascule en mode texte
            />
        ) : (
            <div className="flex flex-col items-center justify-center text-gray-600 h-full w-full bg-[#0a0a0e]">
               <span className="text-3xl opacity-50 mb-2">🖼️</span>
               <span className="text-[10px] uppercase tracking-widest opacity-50">Aucun logo INPI</span>
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

// --- COMPOSANT MODAL (Fiche Détail) ---
const DesignModal = ({ design, onClose }: { design: Design; onClose: () => void }) => {
  const [imgError, setImgError] = useState(false);
  
  if (!design) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-[#111116] border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]" 
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-6 relative">
          <div className="relative w-full h-64 md:h-full min-h-[300px] flex items-center justify-center">
            {!imgError && design.image_file ? (
                <Image
                  src={`/api/design-image?name=${design.image_file}`}
                  alt={design.titre}
                  fill
                  className="object-contain"
                  unoptimized
                  onError={() => setImgError(true)}
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-600">
                   <span className="text-4xl mb-3 opacity-30">🖼️</span>
                   <span className="text-sm uppercase tracking-widest opacity-40 font-mono">Aucun visuel numérisé</span>
                </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <button onClick={onClose} className="self-end text-gray-400 hover:text-white mb-4">✕ Fermer</button>
          
          <span className="text-blue-500 text-xs font-mono uppercase tracking-wider mb-2">
            Archive INPI
          </span>
          
          <h2 className="text-2xl font-bold text-white mb-6 leading-tight">
            {design.titre || "Titre non spécifié"}
          </h2>

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

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-3">
              Cette archive vous inspire pour une nouvelle création ?
            </p>
            <Link 
              href="/new" 
              className="block w-full text-center bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              🛡️ Protéger ma version maintenant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPOSANT ASSISTANT IA FLOTTANT ---
const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, expertType: 'data' }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("Erreur de connexion à l'IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-40 flex flex-col items-end transition-all duration-300 ${isOpen ? 'w-full max-w-md' : 'w-auto'}`}>
      
      {isOpen && (
        <div className="bg-[#111116] border border-blue-500/30 shadow-2xl rounded-2xl w-full mb-4 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-white font-bold">
              <Bot className="w-5 h-5"/> Analyste INPI
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5"/>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0a0a0e]">
             <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-400"/>
                </div>
                <div className="bg-[#1A1A20] p-3 rounded-lg rounded-tl-none text-sm text-gray-300 border border-white/5">
                    Bonjour. Je suis connecté à la base de données locale. Je peux vous aider à chercher des antériorités ou analyser les tendances.
                </div>
             </div>

             {question && !loading && answer && (
                <div className="flex gap-3 justify-end">
                    <div className="bg-blue-600 p-3 rounded-lg rounded-tr-none text-sm text-white">{question}</div>
                </div>
             )}

             {loading && (
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Loader2 className="w-4 h-4 text-blue-400 animate-spin"/>
                    </div>
                    <div className="text-gray-500 text-sm italic py-2">Analyse en cours...</div>
                </div>
             )}

             {answer && (
                <div className="flex gap-3 animate-in fade-in">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-blue-400"/>
                    </div>
                    <div className="bg-[#1A1A20] p-3 rounded-lg rounded-tl-none text-sm text-gray-300 border border-white/5 whitespace-pre-wrap leading-relaxed">
                        {answer}
                    </div>
                </div>
             )}
          </div>

          <form onSubmit={handleAsk} className="p-3 bg-[#111116] border-t border-white/10 flex gap-2">
            <input 
                type="text" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex: Y a-t-il des dessins de montres ?"
                className="flex-1 bg-[#0A0A0F] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button 
                type="submit" 
                disabled={loading || !question.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
            >
                <Send className="w-4 h-4"/>
            </button>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-5 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${isOpen ? 'bg-gray-800 text-gray-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}`}
      >
        {isOpen ? (
            <>Fermer l'Assistant</>
        ) : (
            <>
                <Sparkles className="w-5 h-5 animate-pulse"/>
                <span className="font-bold">Interroger l'IA</span>
            </>
        )}
      </button>
    </div>
  );
};


// --- PAGE PRINCIPALE ---
export default function DesignsPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Design[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [page, setPage] = useState(1);
  const [debugLog, setDebugLog] = useState<string>('');

  const addLog = (msg: string) => setDebugLog(prev => prev + msg + '\n');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDesigns();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query, page]); 

  const fetchDesigns = async () => {
    if (!query) return;
    setLoading(true);
    setDebugLog('');
    addLog(`[1] Début recherche "${query}" (Page ${page})...`);

    try {
      const url = `/api/search?q=${encodeURIComponent(query)}&limit=24&page=${page}`;
      addLog(`[2] Requête envoyée à Cloudflare API: ${url}`);

      const res = await fetch(url);
      addLog(`[3] Réponse HTTP Cloudflare: ${res.status}`);

      const text = await res.text();
      addLog(`[4] Contenu brut reçu: ${text.substring(0, 150)}...`);

      if (res.ok) {
        try {
            const data = JSON.parse(text);
            if (data.hits) {
                setResults(data.hits);
                addLog(`[5] SUCCÈS ! ${data.hits.length} images récupérées depuis OVH.`);
            } else {
                setResults([]);
                addLog(`[5] ERREUR: Clé 'hits' introuvable.`);
            }
        } catch (e) {
            setResults([]);
            addLog(`[5] ERREUR CRITIQUE: Cloudflare n'a pas renvoyé de JSON.`);
        }
      } else {
        setResults([]);
        addLog(`[5] ÉCHEC HTTP. OVH a rejeté la requête.`);
      }
    } catch (error: any) {
      setResults([]);
      addLog(`[CRASH] Erreur fatale: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans">
      
      <div className="bg-[#111116] border-b border-white/5 pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Explorer les <span className="text-gray-400">Dessins & Modèles</span>
          </h1>
          <p className="text-gray-400 mb-8">
            Accédez à plus de 900 000 archives officielles de l'INPI stockées sur nos serveurs sécurisés.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Rechercher une marque (ex: peugeot, dior)..."
              className="w-full bg-[#0A0A0F] border border-white/10 rounded-full py-4 pl-6 pr-14 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-xl"
            />
            <div className="absolute right-2 top-2 p-2 text-gray-400">🔍</div>
          </div>
          
          {query && (
            <div className="mt-8 bg-black/80 border-2 border-red-500/50 p-4 rounded-xl text-left font-mono text-xs text-green-400 shadow-2xl whitespace-pre-wrap max-w-2xl mx-auto overflow-x-auto">
              <div className="text-red-500 font-bold mb-2 flex items-center gap-2 uppercase tracking-wider">
                 <span>🚨 Radar de Diagnostic Connecté</span>
              </div>
              {debugLog || "En attente du moteur..."}
            </div>
          )}

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-3">
             <Loader2 className="w-8 h-8 animate-spin text-blue-500"/>
             <p>Recherche dans les archives...</p>
          </div>
        ) : (
          <>
            {results.length > 0 && <p className="text-sm text-gray-500 mb-6">Résultats - Page {page}</p>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((design) => (
                <DesignCard key={design.id} design={design} onClick={() => setSelectedDesign(design)} />
              ))}
            </div>

            {results.length > 0 && (
              <div className="flex justify-center items-center gap-6 mt-16 border-t border-white/10 pt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="px-6 py-3 rounded-lg bg-[#1A1A20] border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium"
                >
                  ← Précédent
                </button>
                <span className="text-gray-400 font-medium">Page <span className="text-white">{page}</span></span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={results.length < 24 || loading}
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium shadow-lg shadow-blue-900/20"
                >
                  Suivant →
                </button>
              </div>
            )}

            {results.length === 0 && !loading && query && (
              <div className="text-center py-20 bg-[#111116] border border-white/5 rounded-2xl border-dashed">
                <p className="text-gray-400 mb-2">Aucun résultat affichable.</p>
                <p className="text-sm text-red-400 font-mono">Veuillez lire le panneau radar ci-dessus pour comprendre l'erreur.</p>
              </div>
            )}
          </>
        )}
      </div>

      {selectedDesign && (
        <DesignModal design={selectedDesign} onClose={() => setSelectedDesign(null)} />
      )}

      <AiAssistant />

    </div>
  );
}
