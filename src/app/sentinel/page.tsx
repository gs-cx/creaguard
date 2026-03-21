'use client';

export const runtime = 'edge';

import React, { useState } from 'react';
import { UploadCloud, Scan, AlertTriangle } from 'lucide-react';

export default function SentinelPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResults(null);
    }
  };

  const runAudit = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/radar', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.resultats) {
        setResults(data.resultats);
      } else {
        alert("Erreur lors de l'analyse.");
      }
    } catch (error) {
      console.error(error);
      alert("Impossible de contacter le Radar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* EN-TÊTE */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            Radar Sentinel
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            L'Électrochoc. Uploadez une image suspecte (e-commerce, réseaux sociaux) et laissez notre IA vectorielle identifier instantanément les plagiats dans la base de l'INPI.
          </p>
        </div>

        {/* ZONE D'UPLOAD */}
        <div className="bg-[#111116] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            <div className="flex-1 w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-red-500/30 rounded-xl cursor-pointer bg-[#0a0a0e] hover:bg-red-500/5 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-12 h-12 text-red-500 mb-4" />
                  <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-white">Cliquez</span> ou glissez une image</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">JPG, PNG (Max 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>

            {preview && (
              <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
                <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-white/20 shadow-lg">
                  <img src={preview} alt="Cible" className="object-cover w-full h-full" />
                </div>
                <button 
                  onClick={runAudit} 
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${loading ? 'bg-red-900/50 text-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'}`}
                >
                  {loading ? <><Scan className="animate-spin" /> Analyse...</> : <><Scan /> Lancer l'Audit</>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RÉSULTATS */}
        {results && (
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-white/10 pb-4">
              <AlertTriangle className="text-orange-500" /> 
              Rapport d'Identification
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((res, index) => (
                <div key={index} className="bg-[#111116] border border-white/10 rounded-xl overflow-hidden flex flex-col relative group hover:border-red-500/50 transition-colors">
                  
                  {/* Badge de Score */}
                  <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-md text-sm font-bold shadow-lg ${res.score_similarite > 85 ? 'bg-red-600 text-white' : res.score_similarite > 75 ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
                    {res.score_similarite}% Match
                  </div>

                  <div className="h-48 bg-[#0a0a0e] relative p-4 flex items-center justify-center">
                    <img 
                      src={`/api/design-image?name=${res.nom_fichier}`} 
                      alt="Résultat INPI" 
                      className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  
                  <div className="p-4 border-t border-white/5 bg-[#0d0d12]">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dossier Source</p>
                    <p className="font-mono text-sm text-white truncate">{res.nom_fichier}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
