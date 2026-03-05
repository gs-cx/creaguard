export const runtime = 'edge';
import React from 'react';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-black text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* En-tête */}
        <div className="text-center border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">Mentions Légales</h1>
          <p className="mt-4 text-gray-500">
            En vigueur au 01/01/2026
          </p>
        </div>

        {/* 1. Édition du site */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center">
            <span className="bg-blue-600 w-1 h-6 mr-3 rounded-full"></span>
            1. Édition du site
          </h2>
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <p className="mb-4">
              En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <strong>https://keepproof.com</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-400">
              <li><strong>Propriétaire du site :</strong> [VOTRE NOM OU NOM DE LA SOCIÉTÉ]</li>
              <li><strong>Forme juridique :</strong> [EX: SAS / SARL / AUTO-ENTREPRISE] au capital de [MONTANT] €</li>
              <li><strong>Adresse du siège social :</strong> [VOTRE ADRESSE COMPLÈTE]</li>
              <li><strong>SIRET :</strong> [VOTRE NUMÉRO SIRET]</li>
              <li><strong>RCS :</strong> [VILLE D'IMMATRICULATION] B [NUMÉRO]</li>
              <li><strong>Numéro de TVA Intracommunautaire :</strong> [FR XX XXXXXXXXX]</li>
              <li><strong>Responsable de publication :</strong> [NOM DU DIRECTEUR] - contact@keepproof.com</li>
            </ul>
          </div>
        </section>

        {/* 2. Hébergement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center">
            <span className="bg-blue-600 w-1 h-6 mr-3 rounded-full"></span>
            2. Hébergement
          </h2>
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <p>Le site et les services SaaS KeepProof sont hébergés par :</p>
            <div className="mt-4 p-4 bg-black rounded-lg border border-gray-800">
              <p className="font-bold text-white">Hostinger International Ltd.</p>
              <p>Société privée à responsabilité limitée de Chypre</p>
              <p>61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
              <p className="mt-2">
                <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                  https://www.hostinger.fr
                </a>
              </p>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Les données sont stockées exclusivement sur des serveurs situés au sein de l'Union Européenne (RGPD Compliant).
            </p>
          </div>
        </section>

        {/* 3. Propriété Intellectuelle */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center">
            <span className="bg-blue-600 w-1 h-6 mr-3 rounded-full"></span>
            3. Propriété intellectuelle
          </h2>
          <div className="prose prose-invert max-w-none text-gray-400">
            <p>
              <strong>[VOTRE SOCIÉTÉ]</strong> est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
            </p>
          </div>
        </section>

        {/* 4. Limitations de responsabilité */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center">
            <span className="bg-blue-600 w-1 h-6 mr-3 rounded-full"></span>
            4. Limitations de responsabilité
          </h2>
          <div className="prose prose-invert max-w-none text-gray-400">
            <p>
              <strong>[VOTRE SOCIÉTÉ]</strong> ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site <strong>https://keepproof.com</strong>.
            </p>
            <p>
              En tant que fournisseur de solution SaaS, nous nous engageons à mettre en œuvre tous les moyens nécessaires pour assurer la disponibilité du service. Toutefois, [VOTRE SOCIÉTÉ] ne pourra être tenue responsable des interruptions de service dues à des opérations de maintenance, des pannes techniques ou des cas de force majeure.
            </p>
          </div>
        </section>

        {/* 5. Données personnelles (RGPD) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center">
            <span className="bg-blue-600 w-1 h-6 mr-3 rounded-full"></span>
            5. CNIL et gestion des données personnelles
          </h2>
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <p className="mb-4">
              Conformément aux dispositions de la loi 78-17 du 6 janvier 1978 modifiée, l’utilisateur du site <strong>https://keepproof.com</strong> dispose d’un droit d’accès, de modification et de suppression des informations collectées.
            </p>
            <p className="mb-4">
              Pour exercer ce droit, envoyez un message à notre Délégué à la Protection des Données (DPO) : <strong>contact@keepproof.com</strong>.
            </p>
            <p className="text-sm text-gray-500">
              Pour plus d'informations sur la façon dont nous traitons vos données (type de données, finalité, destinataire...), veuillez lire notre <a href="/legal/privacy" className="text-blue-400 hover:underline">Politique de Confidentialité</a>.
            </p>
          </div>
        </section>

        {/* 6. Droit applicable */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center">
            <span className="bg-blue-600 w-1 h-6 mr-3 rounded-full"></span>
            6. Droit applicable et attribution de juridiction
          </h2>
          <div className="prose prose-invert max-w-none text-gray-400">
            <p>
              Tout litige en relation avec l’utilisation du site <strong>https://keepproof.com</strong> est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de <strong>[VOTRE VILLE]</strong>.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
