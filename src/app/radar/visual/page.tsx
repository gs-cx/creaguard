export const runtime = 'edge';
'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function VisualSearchPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  // Gestion du Drop de fichier
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Afficher l'aperçu
      setSelectedImage(URL.createObjectURL(file));
      // Lancer la recherche
      handleSearch(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: {'image/*': []}, 
    multiple: false 
  });

  const handleSearch = async (file: File) => {
    setIsSearching(true);
    setError('');
    setResults([]);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/visual-search', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      setResults(data);

    } catch (err: any) {
      setError("Le moteur visuel est surchargé ou démarre. Réessayez dans 30s.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-2 text-white">Radar Visuel <span className="text-blue-500">Bêta</span></h1>
        <p className="text-gray-400 mb-8">Déposez un croquis ou une photo. Notre IA scanne 300 000+ designs pour trouver les ressemblances conceptuelles.</p>

        {/* ZONE DE DROP */}
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 hover:border-gray-500 bg-gray-900'
          }`}
        >
          <input {...getInputProps()} />
          
          {selectedImage ? (
            <div className="flex flex-col items-center">
              <img src={selectedImage} alt="Preview" className="h-48 object-contain rounded-lg shadow-lg mb-4 border border-gray-600" />
              <p className="text-blue-400 font-semibold">Analyse en cours...</p>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-4">📸</div>
              <p className="text-lg font-medium text-white">Glissez votre image ici</p>
              <p className="text-sm text-gray-500 mt-2">ou cliquez pour sélectionner (JPG, PNG)</p>
            </div>
          )}
        </div>

        {/* LOADING */}
        {isSearching && (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-400">Comparaison vectorielle en cours...</p>
          </div>
        )}

        {/* ERREUR */}
        {error && (
          <div className="mt-8 p-4 bg-red-900/30 border border-red-800 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* RÉSULTATS */}
        {results.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Résultats Similaires ({results.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {results.map((design) => (
                <div key={design.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition-all group">
                  <div className="h-48 bg-black relative">
                    <img 
                      src={`/designs/${design.image}`} 
                      alt={design.title}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png' }}
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm border border-gray-700">
                      {design.score}% Match
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-white truncate" title={design.title}>{design.title || "Sans titre"}</h3>
                    <p className="text-xs text-gray-500 mt-1 truncate">{design.deposant}</p>
                    <p className="text-xs text-gray-600 mt-2 font-mono">ID: {design.id}</p>
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
