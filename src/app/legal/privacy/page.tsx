export const runtime = 'edge';
import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-[#050507] text-gray-300 pt-32 px-6 pb-20 selection:bg-blue-500/30">
        <div className="max-w-5xl mx-auto">
          
          {/* En-tête Juridique */}
          <div className="mb-12 border-b border-white/10 pb-8">
            <h1 className="text-4xl font-extrabold text-white mb-6 tracking-tight">
              Politique de Confidentialité et Protection des Données Personnelles
            </h1>
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded">Version 2.0 (Auditée)</span>
              <span className="bg-white/5 text-gray-400 border border-white/5 px-3 py-1 rounded">Mise à jour : 06 Janvier 2026</span>
              <span className="bg-white/5 text-gray-400 border border-white/5 px-3 py-1 rounded">Ref: GDPR-KP-2026</span>
            </div>
          </div>

          <div className="space-y-12 text-sm leading-relaxed text-gray-300">

            {/* Préambule */}
            <section className="bg-gradient-to-r from-blue-900/10 to-transparent p-6 rounded-xl border-l-4 border-blue-500">
              <h2 className="text-lg font-bold text-white mb-2">Préambule</h2>
              <p>
                La présente Politique de Confidentialité a pour objet d'informer les Utilisateurs du site <strong>KeepProof.com</strong> des moyens mis en œuvre pour collecter, consulter, traiter et conserver les données personnelles des utilisateurs.
                <br/><br/>
                KeepProof s'engage à respecter les dispositions du Règlement (UE) 2016/679 (RGPD) et de la Loi n°78-17 du 6 janvier 1978 modifiée (Loi Informatique et Libertés).
                Notre architecture est fondée sur le principe de <em>Privacy by Design</em>, minimisant nativement la collecte de données sensibles grâce à la cryptographie.
              </p>
            </section>

            {/* Article 1 : Définitions */}
            <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-blue-500">Article 1.</span> Définitions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#111116] p-5 rounded-lg border border-white/5">
                  <strong className="text-white block mb-2">« Donnée à caractère personnel »</strong>
                  <p className="text-gray-400 text-xs">Toute information se rapportant à une personne physique identifiée ou identifiable (ex: email, IP, cookie).</p>
                </div>
                <div className="bg-[#111116] p-5 rounded-lg border border-white/5">
                  <strong className="text-white block mb-2">« Empreinte (Hash) »</strong>
                  <p className="text-gray-400 text-xs">Résultat d'une fonction cryptographique (SHA-256) appliquée à un fichier. Juridiquement considérée comme une donnée pseudonymisée.</p>
                </div>
                <div className="bg-[#111116] p-5 rounded-lg border border-white/5">
                  <strong className="text-white block mb-2">« Blockchain »</strong>
                  <p className="text-gray-400 text-xs">Technologie de stockage et de transmission d'informations, transparente, sécurisée, et fonctionnant sans organe central de contrôle.</p>
                </div>
                <div className="bg-[#111116] p-5 rounded-lg border border-white/5">
                  <strong className="text-white block mb-2">« Zero-Knowledge »</strong>
                  <p className="text-gray-400 text-xs">Architecture technique garantissant que KeepProof n'a techniquement jamais accès au contenu en clair des fichiers certifiés.</p>
                </div>
              </div>
            </section>

            {/* Article 2 : Responsable */}
            <section className="border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 2. Identité du Responsable de Traitement</h2>
              <p>Les données sont collectées par :<br/>
              <strong>KeepProof SAS</strong>, société par actions simplifiée au capital de 1 000 euros.<br/>
              Siège social : [Adresse Complète]<br/>
              Immatriculée au RCS de [Ville] sous le numéro [SIREN].<br/>
              Représentée par son Président en exercice.
              </p>
            </section>

            {/* Article 3 : Données collectées */}
            <section className="border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 3. Typologie des Données Collectées</h2>
              <p className="mb-4">Nous collectons uniquement les données strictement nécessaires (Minimisation) :</p>
              
              <ul className="space-y-4">
                <li className="bg-[#111116] p-4 rounded border border-white/5">
                  <strong className="text-white">3.1 Données de Compte</strong><br/>
                  Adresse e-mail, Nom, Prénom, Photo de profil (si fournie via OAuth Google/GitHub).
                </li>
                <li className="bg-[#111116] p-4 rounded border border-white/5">
                  <strong className="text-white">3.2 Données de Certification (Meta-données)</strong><br/>
                  Nom du fichier original, taille du fichier, type MIME, et l'Empreinte cryptographique (Hash).
                  <br/><em className="text-blue-400 text-xs">Note : Nous ne stockons JAMAIS le contenu du fichier.</em>
                </li>
                <li className="bg-[#111116] p-4 rounded border border-white/5">
                  <strong className="text-white">3.3 Données Financières</strong><br/>
                  Historique des transactions, factures, 4 derniers chiffres de la carte (via Stripe).
                </li>
                <li className="bg-[#111116] p-4 rounded border border-white/5">
                  <strong className="text-white">3.4 Données de Connexion</strong><br/>
                  Adresse IP, type de navigateur, horodatage des connexions (pour obligation légale de sécurité).
                </li>
              </ul>
            </section>

            {/* Article 4 : Finalités & Base Légale */}
            <section className="border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white mb-6">Article 4. Finalités et Bases Légales</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-white/10 text-xs md:text-sm">
                  <thead>
                    <tr className="bg-white/10 text-white">
                      <th className="p-4 border border-white/10">Finalité</th>
                      <th className="p-4 border border-white/10">Base Légale (RGPD Art. 6)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-400">
                    <tr>
                      <td className="p-4 border border-white/10">Création et gestion du compte utilisateur</td>
                      <td className="p-4 border border-white/10">Exécution du contrat (CGU)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-white/10">Ancrage de la preuve sur Blockchain Polygon</td>
                      <td className="p-4 border border-white/10">Exécution du contrat</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-white/10">Lutte contre la fraude et sécurité du SI</td>
                      <td className="p-4 border border-white/10">Intérêt Légitime</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-white/10">Comptabilité et Facturation</td>
                      <td className="p-4 border border-white/10">Obligation Légale (Code de Commerce)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Article 5 : Durée de conservation (NEW) */}
            <section className="border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-blue-500">Article 5.</span> Politique de Conservation des Données
              </h2>
              <p className="mb-4">Vos données ne sont conservées que le temps nécessaire à l'accomplissement de la finalité pour laquelle elles ont été collectées :</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#111116] p-4 rounded border-t-2 border-green-500">
                  <strong className="text-white block mb-1">Données de Compte</strong>
                  <span className="text-xs">Toute la durée de la relation contractuelle + 3 ans après la dernière activité (prescription).</span>
                </div>
                <div className="bg-[#111116] p-4 rounded border-t-2 border-yellow-500">
                  <strong className="text-white block mb-1">Facturation</strong>
                  <span className="text-xs">10 ans (Obligation comptable légale, Art L123-22 Code de Commerce).</span>
                </div>
                <div className="bg-[#111116] p-4 rounded border-t-2 border-red-500">
                  <strong className="text-white block mb-1">Logs Techniques</strong>
                  <span className="text-xs">12 mois glissants (Obligation légale LCEN).</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500 italic">
                * Exception Blockchain : Les empreintes (Hash) ancrées sur la Blockchain Polygon sont conservées indéfiniment par nature technologique (immutabilité du registre distribué).
              </p>
            </section>

            {/* Article 6 : Sous-traitants */}
            <section className="border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white mb-6">Article 6. Destinataires et Transferts Hors UE</h2>
              <p className="mb-4">KeepProof s'assure que ses sous-traitants présentent des garanties suffisantes en matière de protection des données.</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span><strong>Clerk</strong> (Authentification)</span>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">USA (Data Privacy Framework)</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span><strong>Stripe</strong> (Paiement)</span>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">USA (SCCs / BCR)</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span><strong>Vercel / AWS</strong> (Hébergement)</span>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">Irlande (UE) / USA</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span><strong>Polygon Network</strong> (Blockchain)</span>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">Mondial (Décentralisé)</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Pour les transferts vers les États-Unis, nous nous appuyons sur le <em>Data Privacy Framework</em> (décision d'adéquation de la Commission Européenne du 10 juillet 2023) ou sur les Clauses Contractuelles Types (SCC).
              </p>
            </section>

            {/* Article 7 : Sécurité */}
            <section className="border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 7. Sécurité et Notification de Faille</h2>
              <p className="mb-4">
                Conformément à l'article 32 du RGPD, nous mettons en œuvre :
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Le chiffrement des données au repos (AES-256) et en transit (TLS 1.3).</li>
                <li>L'isolation stricte des environnements de développement et de production.</li>
                <li>Des audits de sécurité réguliers sur nos Smart Contracts.</li>
              </ul>
              <p className="bg-red-500/10 p-4 rounded border border-red-500/20 text-red-200">
                <strong>Gestion des incidents :</strong> En cas de violation de données présentant un risque pour vos droits et libertés, KeepProof s'engage à notifier la CNIL dans les 72 heures et à vous informer dans les meilleurs délais (Art. 33 et 34 RGPD).
              </p>
            </section>

            {/* Article 8 : Droits */}
            <section className="border-t border-white/5 pt-8">
              <h2 className="text-xl font-bold text-white mb-4">Article 8. Vos Droits</h2>
              <p className="mb-4">Vous disposez des droits d'accès, rectification, effacement, limitation, opposition et portabilité.</p>
              <div className="bg-[#111116] p-6 rounded-lg text-center">
                <p className="mb-4">Pour exercer ces droits, contactez notre DPO :</p>
                <a href="mailto:dpo@keepproof.com" className="text-xl font-bold text-white bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg transition">
                  dpo@keepproof.com
                </a>
                <p className="text-xs text-gray-500 mt-4">
                  Vous avez également le droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).
                </p>
              </div>
            </section>

             {/* Footer Policy */}
             <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500 pb-10">
               <p>© 2026 KeepProof SAS - Tous droits réservés.</p>
             </div>

          </div>
        </div>
      </div>
    </>
  );
}
