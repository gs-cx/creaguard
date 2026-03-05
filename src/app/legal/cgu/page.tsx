export const runtime = 'edge';
"use client";

import React from 'react';

export default function CGU() {
  return (
    <div className="min-h-screen bg-[#050507] text-gray-300 font-sans pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Conditions Générales d'Utilisation
        </h1>
        <p className="text-sm text-gray-500 mb-12 pb-6 border-b border-white/10">
          Dernière mise à jour : 20 Janvier 2026
        </p>

        <div className="space-y-12 text-sm leading-relaxed text-justify">
          
          <section>
            <h2 className="text-lg font-bold text-white mb-2">Article 1 : Objet du service</h2>
            <p>
              KeepProof fournit un service d'horodatage numérique et d'ancrage sur Blockchain publique (réseau Polygon). 
              L'objectif est de fournir à l'utilisateur un moyen technique de prouver l'existence d'un fichier numérique à une date donnée (Preuve d'Antériorité).
            </p>
          </section>

          <section className="bg-red-900/10 border border-red-500/20 p-6 rounded-xl">
            <h2 className="text-lg font-bold text-red-400 mb-2">Article 2 : Valeur Juridique (Avertissement)</h2>
            <p className="mb-2">
              L'utilisateur reconnaît expressément que :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>KeepProof n'est pas un cabinet d'avocats ni une étude d'Huissier de Justice.</li>
              <li>Le certificat délivré constitue un <strong>"Commencement de preuve par écrit"</strong> au sens de l'article 1365 du Code Civil.</li>
              <li>KeepProof ne garantit pas l'issue d'une procédure judiciaire, le juge restant souverain dans l'appréciation des preuves.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Article 3 : Responsabilité Technique</h2>
            <p>
              KeepProof s'engage à une obligation de moyens pour assurer la disponibilité du service. 
              Cependant, la société ne saurait être tenue responsable en cas de défaillance du réseau Blockchain Polygon (panne mondiale, congestion) qui est une infrastructure tierce décentralisée.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Article 4 : Confidentialité & Fichiers</h2>
            <p>
              L'utilisateur est seul responsable de la conservation de son fichier original. 
              <strong>Attention :</strong> Si l'utilisateur modifie, perd ou altère son fichier original (même d'un seul octet), le certificat deviendra techniquement invérifiable. 
              KeepProof ne stockant pas les fichiers originaux pour des raisons de confidentialité, aucune restauration n'est possible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">Article 5 : Remboursement</h2>
            <p>
              Compte tenu de la nature immatérielle du service et de l'exécution immédiate sur la Blockchain (frais de Gas irréversibles), 
              le droit de rétractation ne peut être exercé une fois le certificat généré, conformément à l'article L221-28 du Code de la Consommation.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
