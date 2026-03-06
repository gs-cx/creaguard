'use client';
export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { Send, Sparkles, BookOpen, Zap, Search, ChevronDown, ChevronUp, Shield, Lock, FileText, Globe, Scale, Loader2 } from 'lucide-react';

// --- DONNÉES DE LA FAQ ---
const faqData = [
  {
    category: "Juridique",
    question: "Quelle est la valeur légale d'une preuve KeepProof ?",
    answer: "KeepProof utilise l'ancrage Blockchain (Tezos) pour générer une preuve d'antériorité. En droit français et européen (règlement eIDAS), une preuve numérique certifiée a la même valeur probante qu'un écrit papier. Elle permet de prouver que vous déteniez un fichier précis à une date certaine, ce qui est capital en cas de litige pour contrefaçon ou droit d'auteur."
  },
  {
    category: "Juridique",
    question: "Est-ce que KeepProof remplace un brevet ?",
    answer: "Non. Le brevet est un titre de propriété industrielle délivré par l'INPI après examen (coûteux et long) qui vous donne un monopole d'exploitation. KeepProof crée une preuve de possession antérieure (droit d'auteur, secret des affaires). C'est complémentaire : KeepProof est idéal avant le dépôt de brevet (pour sécuriser la R&D) ou pour tout ce qui n'est pas brevetable (algorithmes, créations artistiques, savoir-faire)."
  },
  {
    category: "Juridique",
    question: "Mes fichiers sont-ils consultables par KeepProof ?",
    answer: "Absolument pas. Nous utilisons une technologie de 'Zero-Knowledge'. Votre fichier ne quitte jamais votre navigateur. Nous calculons uniquement son empreinte numérique (Hash) qui est envoyée sur la Blockchain. Nous ne voyons jamais vos images, textes ou codes sources."
  },
  {
    category: "Technique",
    question: "Quels types de fichiers puis-je protéger ?",
    answer: "Tous. Images (JPG, PNG), Documents (PDF, Word), Audio (WAV, MP3), Vidéo (MP4), Archives (ZIP), Code source... La seule limite est la taille de l'upload pour le calcul du hash, mais nous supportons des fichiers très volumineux."
  },
  {
    category: "Technique",
    question: "Combien de temps la preuve est-elle valable ?",
    answer: "À vie. La preuve est inscrite dans la Blockchain publique. Même si KeepProof venait à disparaître, votre certificat et l'inscription sur la Blockchain resteraient vérifiables mathématiquement par n'importe quel expert informatique indépendamment de nous."
  },
  {
    category: "Technique",
    question: "Qu'est-ce que la Blockchain Tezos utilisée ?",
    answer: "Tezos est une blockchain de 3ème génération, choisie pour sa sécurité institutionnelle, sa faible consommation énergétique (Proof of Stake) et sa fiabilité. Elle est utilisée par de grandes banques et institutions pour la certification."
  },
  {
    category: "Compte & Paiement",
    question: "Puis-je récupérer une facture ?",
    answer: "Oui, une facture détaillée est générée automatiquement à chaque achat de crédits ou abonnement. Elle est disponible dans votre espace 'Mon Compte' > 'Facturation'."
  },
  {
    category: "Compte & Paiement",
    question: "Comment vérifier un certificat ?",
    answer: "Vous pouvez utiliser notre outil de vérification gratuit sur la page d'accueil. Il suffit de glisser le fichier original et le certificat PDF. Le système recalculera les empreintes et confirmera qu'elles correspondent parfaitement."
  }
];

const categories = ["Tout", "Juridique", "Technique", "Compte & Paiement"];

export default function FaqPage() {
  // --- ÉTATS CHATBOT ---
  const [question, setQuestion] = useState('');
  const [shortAnswer, setShortAnswer] = useState('');
  const [longAnswer, setLongAnswer] = useState('');
  const [loadingShort, setLoadingShort] = useState(false);
  const [loadingLong, setLoadingLong] = useState(false);
  const [activeBotTab, setActiveBotTab] = useState(0);

  // --- ÉTATS FAQ STATIQUE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  // --- LOGIQUE CHATBOT ---
  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setShortAnswer('');
    setLongAnswer('');
    setLoadingShort(true);
    setLoadingLong(true);
    setActiveBotTab(0);

    try {
      // 1. Appel Rapide
      const resFast = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, mode: 'fast' }),
      });
      const dataFast = await resFast.json();
      setShortAnswer(dataFast.answer);
      setLoadingShort(false);

      // 2. Appel Expert (continue en fond)
      const resExpert = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, mode: 'expert' }),
      });
      const dataExpert = await resExpert.json();
      setLongAnswer(dataExpert.answer);
      setLoadingLong(false);
    } catch (err) {
      console.error(err);
      setLoadingShort(false);
      setLoadingLong(false);
    }
  };

  // --- LOGIQUE FAQ FILTRAGE ---
  const filteredFaq = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tout' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#050507] text-white pt-28 pb-20 font-sans selection:bg-blue-500/30">
      
      {/* --- SECTION 1 : ASSISTANT IA (HÉROS) --- */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/5">
                <Sparkles className="w-3 h-3" /> Assistant Intelligent
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Foire Aux <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Questions</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Notre intelligence artificielle analyse la jurisprudence pour répondre à vos questions spécifiques.
            </p>
        </div>

        {/* CADRE DE CHAT */}
        <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-1 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20"></div>
            
            <div className="p-6 md:p-8 flex flex-col min-h-[300px]">
                 {/* ZONE RÉPONSE */}
                {(shortAnswer || loadingShort) && (
                    <div className="flex-grow mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* TABS DU BOT */}
                        <div className="flex gap-6 mb-6 border-b border-white/5 pb-1">
                            <button 
                                onClick={() => setActiveBotTab(0)}
                                className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all ${activeBotTab === 0 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Zap className="w-4 h-4"/> Synthèse
                            </button>
                            <button 
                                onClick={() => setActiveBotTab(1)}
                                className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all ${activeBotTab === 1 ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-500 hover:text-white'}`}
                            >
                                <BookOpen className="w-4 h-4"/> Analyse Détaillée
                                {loadingLong && <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse ml-1"/>}
                            </button>
                        </div>

                        <div className="bg-[#1a1a20] rounded-2xl p-6 md:p-8 border border-white/5 min-h-[120px]">
                            {activeBotTab === 0 ? (
                                loadingShort ? (
                                    /* ANIMATION CHARGEMENT SYNTHÈSE (Skeleton) */
                                    <div className="space-y-3 animate-pulse">
                                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                                            <Sparkles className="w-4 h-4 animate-spin" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Génération de la synthèse...</span>
                                        </div>
                                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                        <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                    </div>
                                ) : (
                                    <p className="text-lg text-gray-200 leading-relaxed">{shortAnswer}</p>
                                )
                            ) : (
                                loadingLong ? (
                                    /* ANIMATION CHARGEMENT EXPERT (Centrale et visible) */
                                    <div className="flex flex-col items-center justify-center py-6 space-y-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse"></div>
                                            <Loader2 className="w-10 h-10 text-purple-400 animate-spin relative z-10" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-purple-300 font-medium animate-pulse">Rédaction de l'avis juridique...</p>
                                            <p className="text-xs text-gray-500 mt-1">L'IA analyse les textes de loi (approx. 20 sec)</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="prose prose-invert max-w-none text-gray-300 text-sm md:text-base whitespace-pre-wrap leading-7">
                                        {longAnswer}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}

                {/* INPUT */}
                <form onSubmit={handleAsk} className="relative mt-auto group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                    <input 
                        type="text" 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ex: Comment protéger mon code source face à un client ?"
                        className="w-full bg-[#050507] relative z-10 border border-white/10 rounded-xl py-5 pl-6 pr-20 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-xl"
                        disabled={loadingShort}
                    />
                    <button 
                        type="submit" 
                        disabled={loadingShort || !question.trim()}
                        className={`absolute right-2 top-2 bottom-2 z-20 px-5 rounded-lg transition-all flex items-center justify-center shadow-lg text-white ${loadingShort ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/25'}`}
                    >
                        {loadingShort ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </form>
            </div>
        </div>
      </section>


      {/* --- SECTION 2 : BASE DE CONNAISSANCES (RECHERCHE) --- */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-400"/> Base de Connaissances
            </h2>
            
            {/* Barre de recherche */}
            <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"/>
                <input 
                    type="text" 
                    placeholder="Rechercher un mot clé..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#111116] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>
        </div>

        {/* FILTRES CATÉGORIES */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === cat 
                        ? 'bg-white text-black shadow-lg shadow-white/10 scale-105' 
                        : 'bg-[#111116] text-gray-400 hover:bg-[#1a1a20] hover:text-white border border-white/5'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* LISTE DES QUESTIONS (ACCORDÉON) */}
        <div className="space-y-4">
            {filteredFaq.length > 0 ? (
                filteredFaq.map((item, index) => {
                    const isOpen = openQuestionIndex === index;
                    return (
                        <div 
                            key={index} 
                            className={`group border rounded-2xl transition-all duration-300 overflow-hidden ${
                                isOpen 
                                ? 'bg-[#111116] border-blue-500/30 shadow-lg shadow-blue-900/10' 
                                : 'bg-[#0a0a0e] border-white/5 hover:border-white/10 hover:bg-[#0f0f13]'
                            }`}
                        >
                            <button 
                                onClick={() => toggleQuestion(index)}
                                className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${isOpen ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-white/10'} transition-colors`}>
                                        {item.category === 'Juridique' && <Scale className="w-5 h-5"/>}
                                        {item.category === 'Technique' && <Shield className="w-5 h-5"/>}
                                        {item.category === 'Compte & Paiement' && <Lock className="w-5 h-5"/>}
                                    </div>
                                    <span className={`font-semibold text-lg ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'} transition-colors`}>
                                        {item.question}
                                    </span>
                                </div>
                                {isOpen ? <ChevronUp className="w-5 h-5 text-blue-500"/> : <ChevronDown className="w-5 h-5 text-gray-500"/>}
                            </button>
                            
                            <div 
                                className={`grid transition-all duration-300 ease-in-out ${
                                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-center py-20 bg-[#111116] rounded-2xl border border-white/5 border-dashed">
                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4"/>
                    <h3 className="text-xl font-bold text-white mb-2">Aucun résultat</h3>
                    <p className="text-gray-500">Essayez de reformuler votre recherche ou posez la question à l'IA ci-dessus.</p>
                </div>
            )}
        </div>

      </section>
    </main>
  );
}
