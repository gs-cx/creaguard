export const runtime = 'edge';
'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { articles } from '@/lib/blogData';

// Petit utilitaire pour convertir la date française "14 Janv. 2026" en objet Date triable
const parseDate = (dateStr: string) => {
  const months: { [key: string]: number } = {
    'Janv.': 0, 'Fév.': 1, 'Mars': 2, 'Avr.': 3, 'Mai': 4, 'Juin': 5,
    'Juil.': 6, 'Août': 7, 'Sept.': 8, 'Oct.': 9, 'Nov.': 10, 'Déc.': 11
  };
  const parts = dateStr.split(' '); // ["14", "Janv.", "2026"]
  if (parts.length !== 3) return new Date();
  const day = parseInt(parts[0]);
  const month = months[parts[1]] || 0;
  const year = parseInt(parts[2]);
  return new Date(year, month, day);
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [sortOrder, setSortOrder] = useState<"recent" | "old">("recent");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Extraire les catégories uniques pour le filtre
  const categories = useMemo(() => {
    const cats = new Set(articles.map(a => a.category));
    return ["Tout", ...Array.from(cats)];
  }, []);

  // 2. Filtrer et Trier les articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // A. Filtre par Catégorie
    if (selectedCategory !== "Tout") {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    // B. Filtre par Recherche (Titre ou Extrait)
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(lowerQuery) || 
        a.excerpt.toLowerCase().includes(lowerQuery)
      );
    }

    // C. Tri par Date
    return filtered.sort((a, b) => {
      const dateA = parseDate(a.date).getTime();
      const dateB = parseDate(b.date).getTime();
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });
  }, [selectedCategory, sortOrder, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans">
      
      {/* HEADER SECTION */}
      <div className="pt-32 pb-12 px-6 bg-[#111116] border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Le Blog <span className="text-blue-500">KeepProof</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Conseils d'experts pour protéger vos créations.
          </p>

          {/* BARRE D'OUTILS DE FILTRE */}
          <div className="bg-[#0A0A0F] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto shadow-2xl">
            
            {/* Recherche */}
            <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
                <input 
                    type="text" 
                    placeholder="Rechercher un sujet..." 
                    className="w-full bg-[#1A1A20] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Filtre Catégorie */}
            <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#1A1A20] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            {/* Tri Date */}
            <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value as "recent" | "old")}
                className="bg-[#1A1A20] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
                <option value="recent">📅 Plus récents</option>
                <option value="old">📅 Plus anciens</option>
            </select>

          </div>
          
          {/* Compteur de résultats */}
          <p className="text-xs text-gray-500 mt-4">
            {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
          </p>

        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="group h-full">
                <div className="bg-[#111116] border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-blue-500/50 group-hover:transform group-hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10">
                    
                    {/* BANDE DE COULEUR CATÉGORIE */}
                    <div className={`h-1 w-full bg-gradient-to-r ${
                        ['Étudiants', 'Études'].includes(article.category) ? "from-yellow-500 to-orange-500" :
                        ['Musique', 'Art', 'Spectacle'].includes(article.category) ? "from-purple-500 to-pink-500" :
                        ['Juridique', 'Business'].includes(article.category) ? "from-green-500 to-emerald-500" :
                        "from-blue-500 to-cyan-500"
                    }`}></div>

                    <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-6 font-mono uppercase tracking-wider">
                        <span className={
                            ['Étudiants', 'Études'].includes(article.category) ? "text-yellow-500" :
                            ['Musique', 'Art', 'Spectacle'].includes(article.category) ? "text-purple-400" :
                            ['Juridique', 'Business'].includes(article.category) ? "text-emerald-400" :
                            "text-blue-400"
                        }>{article.category}</span>
                        <span>{article.date}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-gray-100 group-hover:text-white leading-tight">
                        {article.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                        {article.excerpt}
                    </p>

                    <div className="text-sm font-bold text-white flex items-center gap-2 mt-auto group-hover:text-blue-400 transition-colors">
                        Lire l'article <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    </div>
                </div>
                </Link>
            ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <div className="text-4xl mb-4">🕵️‍♂️</div>
                <h3 className="text-xl font-bold text-white mb-2">Aucun article trouvé</h3>
                <p className="text-gray-400">Essayez de modifier vos filtres ou votre recherche.</p>
                <button 
                    onClick={() => {setSearchQuery(""); setSelectedCategory("Tout");}}
                    className="mt-6 text-blue-400 hover:text-blue-300 underline"
                >
                    Réinitialiser les filtres
                </button>
            </div>
        )}
      </div>

      {/* CTA BOTTOM */}
      <div className="border-t border-white/10 bg-[#0A0A0F] py-20 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Ne ratez aucune astuce</h2>
        <p className="text-gray-400 mb-8">Rejoignez les créateurs qui sécurisent leur avenir.</p>
        <Link href="/new" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all">
            Protéger un fichier maintenant
        </Link>
      </div>

    </div>
  );
}
