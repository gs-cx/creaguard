export const runtime = 'edge';
'use client';
import React from 'react';
import Link from 'next/link';

export default function CGUPage() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050507] text-gray-300 font-sans">
      
      {/* En-tête de page simple */}
      <div className="bg-[#111116] border-b border-white/5 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Conditions Générales</h1>
          <p className="text-gray-400 max-w-2xl">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            <br />
            Ces conditions régissent l'utilisation des services de certification et de stockage KeepProof.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* --- SOMMAIRE (Sticky à gauche) --- */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-1 border-l border-white/10">
            {[
              { id: 'art1', title: '1. Mentions Légales' },
              { id: 'art2', title: '2. Objet du Service' },
              { id: 'art3', title: '3. Accès & Compte' },
              { id: 'art4', title: '4. Tarifs & Paiement' },
              { id: 'art5', title: '5. Rétractation' },
              { id: 'art6', title: '6. Responsabilité' },
              { id: 'art7', title: '7. Données Personnelles' },
              { id: 'art8', title: '8. Propriété Intellectuelle' },
              { id: 'art9', title: '9. Droit Applicable' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left pl-4 py-2 text-sm text-gray-500 hover:text-blue-400 hover:border-l-2 hover:border-blue-400 hover:bg-white/5 transition-all"
              >
                {item.title}
              </button>
            ))}
          </div>
        </aside>

        {/* --- CONTENU JURIDIQUE --- */}
        <div className="flex-1 space-y-16 max-w-4xl">
          
          <section id="art1" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-500">1.</span> Mentions Légales
            </h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed">
              <p>
                Le site internet <strong>KeepProof.com</strong> est édité par la société <strong>[VOTRE NOM DE SOCIÉTÉ OU NOM PROPRE]</strong>, 
                [Forme juridique : ex SASU/Auto-entrepreneur] au capital de [Montant] €, immatriculée au Registre du Commerce et des Sociétés de [VILLE] 
                sous le numéro <strong>[VOTRE SIRET]</strong>.
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li><strong>Siège social :</strong> [VOTRE ADRESSE COMPLÈTE]</li>
                <li><strong>Numéro de TVA intracommunautaire :</strong> [VOTRE NUMÉRO TVA ou "Non assujetti"]</li>
                <li><strong>Directeur de la publication :</strong> [VOTRE NOM]</li>
                <li><strong>Hébergeur :</strong> OVH SAS, 2 rue Kellermann, 59100 Roubaix, France / Amazon Web Services (AWS).</li>
                <li><strong>Contact :</strong> contact@keepproof.com</li>
              </ul>
            </div>
          </section>

          <section id="art2" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-500">2.</span> Objet du Service
            </h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>
                KeepProof fournit un service SaaS (Software as a Service) permettant l'horodatage, la certification d'intégrité via Blockchain et le stockage sécurisé de fichiers numériques.
              </p>
              <p>
                Le service permet de générer une <strong>Preuve d'Antériorité</strong> technique. KeepProof agit en tant que tiers technique de confiance mais ne se substitue pas à un office notarial ou à un organisme de propriété intellectuelle d'État (INPI).
              </p>
            </div>
          </section>

          <section id="art3" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-500">3.</span> Accès et Compte Utilisateur
            </h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>
                L'accès aux services nécessite la création d'un compte utilisateur. L'utilisateur est seul responsable de la confidentialité de ses identifiants. Toute action effectuée depuis son compte est réputée être effectuée par lui.
              </p>
              <p className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200">
                <strong>Attention :</strong> KeepProof utilise une architecture de chiffrement avancée. En cas de perte de vos accès, KeepProof ne pourra en aucun cas restaurer les fichiers si l'utilisateur a perdu ses propres clés de chiffrement (si option activée).
              </p>
            </div>
          </section>

          <section id="art4" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-500">4.</span> Tarifs et Conditions de Paiement
            </h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>
                Les services sont facturés selon la grille tarifaire en vigueur au jour de la commande. Les prix sont indiqués en Euros (€) toutes taxes comprises (TTC).
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Paiement à l'acte :</strong> Le débit est immédiat au moment du dépôt du fichier.</li>
                <li><strong>Packs de crédits :</strong> Les crédits sont prépayés et débités à chaque utilisation. Ils sont valables sans limite de temps, sauf fermeture définitive du service (avec préavis de 6 mois).</li>
              </ul>
              <p>
                Les paiements sont sécurisés par notre prestataire <strong>Stripe</strong>. KeepProof ne stocke aucune coordonnée bancaire complète.
              </p>
            </div>
          </section>

          <section id="art5" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-500">5.</span> Renoncement au Droit de Rétractation
            </h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>
                Le Client est informé que le service KeepProof constitue la fourniture d'un contenu numérique non fourni sur un support matériel, dont l'exécution commence immédiatement après paiement.
              </p>
              <p className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-500">
                En application de l'article <strong>L.221-28 du Code de la consommation</strong>, le Client renonce expressément à son droit de rétractation pour toute commande de certification ou de pack de crédits, afin de bénéficier du service immédiatement. En conséquence, aucun remboursement ne sera effectué une fois la prestation technique réalisée.
              </p>
            </div>
          </section>

          <section id="art6" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-500">6.</span> Responsabilité et Force Majeure
            </h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <h3 className="font-bold text-white mt-2">6.1. Obligation de moyens</h3>
              <p>
                KeepProof est tenu à une obligation de moyens concernant la disponibilité du service et l'intégrité des données. Nous mettons en œuvre les meilleures technologies (redondance, chiffrement) pour assurer la sécurité.
              </p>
              
              <h3 className="font-bold text-white mt-2">6.2. Limites de responsabilité</h3>
              <p>
                KeepProof certifie l'existence d'un fichier à une date T. KeepProof <strong>ne certifie pas</strong> que l'utilisateur est l'auteur réel de l'œuvre, ni que l'œuvre est originale. En cas de litige, la preuve numérique fournie par KeepProof est soumise à la libre appréciation des tribunaux.
              </p>
              <p>
                La responsabilité de KeepProof ne saurait être engagée en cas de : congestion des réseaux Blockchain (Polygon/Ethereum), coupure d'internet mondiale, cyber-attaque majeure imprévisible, ou fermeture des services d'hébergement tiers (AWS/OVH).
              </p>
            </div>
          </section>

          <section id="art7" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-500">7.</span> Données Personnelles (RGPD)
            </h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. 
              </p>
              <p>
                <strong>Données des fichiers :</strong> KeepProof applique un principe de "Zero Knowledge" autant que possible. Les fichiers déposés sont chiffrés. KeepProof ne revend aucune donnée utilisateur.
                Pour exercer vos droits : <a href="mailto:dpo@keepproof.com" className="text-blue-400 hover:underline">dpo@keepproof.com</a>.
              </p>
            </div>
          </section>

          <section id="art8" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-500">8.</span> Propriété Intellectuelle
            </h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>
                <strong>Vos fichiers :</strong> Vous restez l'unique propriétaire des droits de propriété intellectuelle sur les fichiers que vous protégez via KeepProof. Le dépôt ne transfère aucun droit à KeepProof.
              </p>
              <p>
                <strong>La Plateforme :</strong> Tous les éléments du site KeepProof (code, design, logo, textes) sont la propriété exclusive de l'éditeur. Toute reproduction est interdite.
              </p>
            </div>
          </section>

          <section id="art9" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-blue-500">9.</span> Droit Applicable et Litiges
            </h2>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>
                Les présentes Conditions Générales sont soumises au <strong>droit français</strong>.
              </p>
              <p>
                En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux français seront seuls compétents, nonobstant pluralité de défendeurs ou appel en garantie.
              </p>
            </div>
          </section>

          <div className="pt-12 border-t border-white/10 mt-12">
             <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-bold">
                ← Retour à l'accueil
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
