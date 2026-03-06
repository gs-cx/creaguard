'use client';
export const runtime = 'edge';

import React from 'react';
import Link from 'next/link';
// On a supprimé l'import de Header et Footer ici car ils sont déjà dans le Layout global
import { Check, Shield, Zap, Building2 } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#050507] text-white pt-32 pb-20 font-sans">
      
      <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Une protection simple,<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">des tarifs transparents.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                  Pas d'abonnement caché. Payez à l'acte ou prenez un pack pour économiser. 
                  Vos preuves sont valables à vie.
              </p>
          </div>

          {/* GRILLE DES PRIX */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* OFFRE 1 : À L'UNITÉ */}
              <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 flex flex-col hover:border-white/20 transition-colors">
                  <div className="mb-4">
                      <span className="text-xs font-bold bg-white/10 text-white px-2 py-1 rounded uppercase tracking-wider">Ponctuel</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">À l'unité</h3>
                  <p className="text-xs text-gray-400 mb-6 h-8">Idéal pour protéger une création unique.</p>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-bold text-white">4.90€</span>
                      <span className="text-gray-500 text-sm">/fichier</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Certificat d'antériorité PDF
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Ancrage Blockchain Polygon
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Preuve valable à vie
                      </li>
                  </ul>

                  <Link href="/new" className="w-full block text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition-colors">
                      Sécuriser maintenant
                  </Link>
              </div>

              {/* OFFRE 2 : ÉTUDIANTS (Jaune) */}
              <div className="bg-[#111116] border border-yellow-500/20 rounded-2xl p-6 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 blur-2xl -z-10"></div>
                  <div className="mb-4">
                      <span className="text-xs font-bold bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded uppercase tracking-wider">Étudiants</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Pack Campus</h3>
                  <p className="text-xs text-gray-400 mb-6 h-8">Pour vos mémoires, thèses et projets.</p>
                  
                  <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-bold text-white">9.90€</span>
                  </div>
                  <p className="text-xs text-yellow-500 mb-6 font-bold">Soit 1.98€ / fichier</p>

                  <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> <strong>5 Crédits</strong> inclus
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Protection Mémoire & Thèse
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Justificatif demandé
                      </li>
                  </ul>

                  <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-colors">
                      Demander le Pack
                  </button>
              </div>

              {/* OFFRE 3 : POPULAIRE (Bleu) */}
              <div className="bg-[#111116] border-2 border-blue-600 rounded-2xl p-6 flex flex-col relative shadow-2xl shadow-blue-900/20 transform md:-translate-y-4">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Populaire
                  </div>
                  <div className="mb-4 mt-2">
                      <span className="text-xs font-bold bg-blue-500/10 text-blue-400 px-2 py-1 rounded uppercase tracking-wider">Pack Crédits</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Pack Créateur</h3>
                  <p className="text-xs text-gray-400 mb-6 h-8">Pour les designers et créatifs réguliers.</p>
                  
                  <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-bold text-white">79.00€</span>
                  </div>
                  <p className="text-xs text-blue-400 mb-6 font-bold">Soit 3.95€ / fichier (20 crédits)</p>

                  <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> <strong>20 Certifications</strong> incluses
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Crédits sans date d'expiration
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Support prioritaire
                      </li>
                  </ul>

                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-600/20">
                      Commander le Pack
                  </button>
              </div>

              {/* OFFRE 4 : ENTREPRISE (Violet) */}
              <div className="bg-[#111116] border border-purple-500/20 rounded-2xl p-6 flex flex-col">
                  <div className="mb-4">
                      <span className="text-xs font-bold bg-purple-500/10 text-purple-400 px-2 py-1 rounded uppercase tracking-wider">Entreprise</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">API & Volume</h3>
                  <p className="text-xs text-gray-400 mb-6 h-8">Pour les plateformes et grands comptes.</p>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-3xl font-bold text-white">Sur Devis</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Zap className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" /> Accès API REST complet
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Shield className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" /> Marque blanche (White label)
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-300">
                          <Building2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" /> Facturation mensuelle
                      </li>
                  </ul>

                  <a href="mailto:sales@keepproof.com" className="w-full block text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition-colors">
                      Contacter l'équipe
                  </a>
              </div>

          </div>

      </div>
    </div>
  );
}
