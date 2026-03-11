'use client';
export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { Loader2, Bot, Search, Briefcase, PenTool } from 'lucide-react';

interface Design {
  id: number;
  num_enregistrement: string;
  titre: string;
  statut: string;
  date: string;
  image_file: string;
  code_office?: string;
  deposant?: string;
  description?: string;
  classes?: string;
  createur?: string | null;
}

const DesignCard = ({ design, onClick }: { design: Design, onClick: () => void }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div onClick={onClick} className="group bg-[#111116] border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all cursor-pointer flex flex-col">
      <div className="relative aspect-[4/3] bg-[#0a0a0e] overflow-hidden flex items-center justify-center p-2">
        {!imgError && design.image_file ? (
            <img src={`/api/design-image?name=${design.image_file}`} alt={design.titre || 'Design'} className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 p-4" onError={() => setImgError(true)} />
        ) : design.image_file && imgError ? (
            <div className="flex flex-col items-center justify-center text-red-500/80 h-full w-full bg-[#1a0505] rounded-md border border-red-500/20"><span className="text-3xl mb-2">⚠️</span><span className="text-[10px] uppercase tracking-widest text-center px-2 font-mono">OVH refuse l'accès</span></div>
        ) : (
            <div className="flex flex-col items-center justify-center text-gray-600 h-full w-full border-2 border-dashed border-white/5 rounded-lg"><span className="text-[10px] uppercase tracking-widest opacity-50 text-center px-2 font-mono">Image non fournie</span></div>
        )}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-xs font-mono px-2 py-1 rounded text-white border border-white/10">{new Date(design.date).getFullYear()}</div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-200 text-sm line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors uppercase">{design.titre}</h3>
        <p className="text-xs text-gray-400 line-clamp-1 mb-2 italic">{design.deposant !== "Déposant inconnu" ? design.deposant : ""}</p>
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
          <span className="truncate max-w-[150px] text-blue-400 font-medium">{design.statut}</span>
          <span className="font-mono bg-white/10 px-2 py-1 rounded">{design.code_office}</span>
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
        <div className="w-full md:w-1/2 bg-[#050507] flex flex-col relative border-r border-white/5">
          <div className="relative w-full h-64 md:h-full min-h-[300px] flex items-center justify-center p-6">
            {!imgError && design.image_file ? (
                <img src={`/api/design-image?name=${design.image_file}`} alt={design.titre} className="w-full h-full object-contain p-4" onError={() => setImgError(true)} />
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-600 border border-dashed border-white/10 w-full h-full rounded-xl m-4">
                   <span className="text-sm uppercase tracking-widest opacity-40 font-mono">Aperçu indisponible</span>
                </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <button onClick={onClose} className="self-end text-gray-400 hover:text-white mb-2">✕ Fermer</button>
          <div className="mb-6">
             <span className="text-blue-500 text-xs font-mono uppercase tracking-wider mb-2 block">Dossier de Propriété Intellectuelle</span>
             <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight uppercase">{design.titre}</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-300 flex-1">
            <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
              <p className="text-gray-500 text-xs uppercase mb-1">Titulaire / Déposant</p>
              <p className="font-semibold text-white">{design.deposant}</p>
            </div>
            
            {design.createur && (
              <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
                <p className="text-gray-500 text-xs uppercase mb-1">Créateur(s)</p>
                <p className="text-gray-300">{design.createur}</p>
              </div>
            )}
            
            {design.description && design.description !== "Aucune description" && (
              <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
                <p className="text-gray-500 text-xs uppercase mb-1">Description & Produits</p>
                <p className="text-gray-300 leading-relaxed text-sm max-h-32 overflow-y-auto pr-2 custom-scrollbar">{design.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
                <p className="text-gray-500 text-xs uppercase mb-1">Date d'enregistrement</p>
                <p className="font-mono text-white">{new Date(design.date).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
                <p className="text-gray-500 text-xs uppercase mb-1">Classification</p>
                <p className="font-mono text-white">{design.classes}</p>
              </div>
              <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
                <p className="text-gray-500 text-xs uppercase mb-1">N° Officiel</p>
                <p className="font-mono text-white">{design.num_enregistrement}</p>
              </div>
              <div className="bg-[#1A1A20] p-4 rounded-lg border border-white/5">
                <p className="text-gray-500 text-xs uppercase mb-1">Statut Juridique</p>
                <p className="font-semibold text-blue-400 truncate">{design.statut}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
