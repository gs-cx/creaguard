export const runtime = 'edge';
import React from 'react';
import Header from '../../components/Header';
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
              Politique de Confidentialité et de Protection des Données
            </h1>
            <p className="text-sm text-gray-400 font-mono bg-white/5 p-4 rounded-lg border border-white/5 inline-block">
              <strong>Version en vigueur au :</strong> 06 Janvier 2026<br/>
              <strong>Conformité :</strong> RGPD (UE 2016/679), Loi Informatique et Libertés
            </p>
          </div>

          <div className="space-y-10 text-sm leading-relaxed text-gray-300">

            {/* Introduction */}
            <section className="bg-blue-900/10 p-6 rounded-xl border border-blue-500/20">
              <p>
                La société éditrice de <strong>KeepProof</strong> (ci-après « le Responsable de Traitement ») accorde une importance capitale à la protection de la vie privée de ses utilisateurs. 
                La présente politique vise à vous informer en toute transparence sur les traitements de données opérés lors de l'utilisation de nos services de certification par Blockchain.
              </p>
            </section>

            {/* Article 1 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Article 1. Responsable de Traitement</h2>
              <p className="mb-2">Le responsable du traitement des données est la société <strong>KeepProof SAS</strong> (ou structure juridique en cours de formation), dont le siège social est situé en France.</p>
              <p>Pour toute question relative à vos données, notre Délégué à la Protection des Données (DPO) est joignable à : <a href="mailto:dpo@keepproof.com" className="text-blue-400 hover:underline">dpo@keepproof.com</a>.</p>
            </section>

            {/* Article 2 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Article 2. Nature des Données Collectées</h2>
              <p className="mb-4">Nous appliquons strictement le principe de minimisation des données. Nous collectons et traitons uniquement les données suivantes :</p>
              
              <div className="space-y-4">
                <div className="bg-[#111116] p-4 rounded-lg border border-white/5">
                  <h3 className="text-white font-bold mb-1">2.1 Données relatives aux Utilisateurs (KYC léger)</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-400">
                    <li><strong>Identité :</strong> Adresse e-mail, Nom, Prénom (via notre partenaire d'authentification Clerk).</li>
                    <li><strong>Connexion :</strong> Logs techniques, adresse IP, User-Agent (pour la sécurité du compte).</li>
                  </ul>
                </div>

                <div className="bg-[#111116] p-4 rounded-lg border border-blue-500/10">
                  <h3 className="text-white font-bold mb-1 flex items-center gap-2">
                    2.2 Distinction Fichiers / Empreintes (Architecture Zero-Knowledge)
                    <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase">Crucial</span>
                  </h3>
                  <p className="mb-2 text-gray-400">
                    Il est essentiel de distinguer le fichier source de son empreinte cryptographique :
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-400">
                    <li>
                      <strong>Fichiers Originaux :</strong> KeepProof ne collecte, ne télécharge et ne stocke <strong>JAMAIS</strong> vos fichiers originaux en clair. Le hachage (calcul de l'empreinte) est effectué localement sur votre appareil (Client-Side).
                    </li>
                    <li>
                      <strong>Empreintes Numériques (Hash) :</strong> Nous collectons uniquement le résultat cryptographique (Hash SHA-256) du fichier, ainsi que ses métadonnées non sensibles (nom, taille, type MIME). Ce Hash est une donnée pseudonymisée qui ne permet pas de reconstituer le fichier original.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Article 3 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Article 3. Finalités et Bases Légales</h2>
              <table className="w-full text-left border-collapse border border-white/10">
                <thead>
                  <tr className="bg-white/5 text-white">
                    <th className="p-3 border border-white/10">Finalité du traitement</th>
                    <th className="p-3 border border-white/10">Base Légale (RGPD Art. 6)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr>
                    <td className="p-3 border border-white/10">Gestion du compte et accès au service</td>
                    <td className="p-3 border border-white/10">Exécution du contrat (CGU)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10">Ancrage de la preuve sur la Blockchain</td>
                    <td className="p-3 border border-white/10">Exécution du contrat</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10">Facturation et comptabilité</td>
                    <td className="p-3 border border-white/10">Obligation Légale</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-white/10">Amélioration du service et sécurité</td>
                    <td className="p-3 border border-white/10">Intérêt Légitime</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Article 4 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Article 4. Destinataires et Transferts</h2>
              <p className="mb-4">Vos données sont strictement confidentielles. Elles peuvent néanmoins être communiquées aux tiers suivants pour les seuls besoins du service :</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Clerk :</strong> Gestionnaire d'authentification (USA, conforme Data Privacy Framework).</li>
                <li><strong>Stripe :</strong> Prestataire de paiement sécurisé (PCI-DSS niveau 1). KeepProof n'a jamais accès à vos coordonnées bancaires complètes.</li>
                <li><strong>La Blockchain Polygon (Public Ledger) :</strong> Le Hash de votre fichier et l'horodatage sont inscrits sur un registre public décentralisé. 
                  <span className="text-yellow-500 block mt-1 text-xs">⚠️ Avertissement : De par la nature technologique d'une Blockchain publique, ces données (Hash) sont accessibles publiquement et ne peuvent être ni modifiées ni supprimées. Elles ne contiennent cependant aucune donnée nominative directe.</span>
                </li>
              </ul>
            </section>

            {/* Article 5 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Article 5. Sécurité des Données</h2>
              <p className="mb-4">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données (Art. 32 RGPD) :</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#111116] p-4 rounded border border-white/5">
                  <h4 className="text-white font-bold mb-2">Chiffrement</h4>
                  <p className="text-gray-400 text-xs">Toutes les communications sont chiffrées via TLS 1.3. Les données au repos sont chiffrées (AES-256).</p>
                </div>
                <div className="bg-[#111116] p-4 rounded border border-white/5">
                  <h4 className="text-white font-bold mb-2">Isolation</h4>
                  <p className="text-gray-400 text-xs">Les bases de données sont isolées et les accès administratifs sont restreints au personnel habilité sous clause de confidentialité.</p>
                </div>
              </div>
            </section>

            {/* Article 6 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Article 6. Droits des Personnes concernées</h2>
              <p className="mb-4">Conformément à la réglementation, vous disposez des droits suivants :</p>
              <ul className="space-y-3">
                <li className="flex gap-4 items-start">
                  <span className="text-blue-400 font-bold min-w-[150px]">Droit d'accès & Rectification</span>
                  <span>Vous pouvez accéder à vos données personnelles depuis votre tableau de bord ou en nous contactant.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-blue-400 font-bold min-w-[150px]">Droit à l'effacement</span>
                  <span>
                    Vous pouvez demander la suppression de votre compte. 
                    <br/><em className="text-gray-500">Note importante : En raison de l'immutabilité technique de la technologie Blockchain, l'empreinte (Hash) ancrée sur le réseau Polygon ne pourra pas être effacée. Elle sera cependant désassociée de votre identité dans nos bases de données.</em>
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="text-blue-400 font-bold min-w-[150px]">Droit à la portabilité</span>
                  <span>Vous pouvez demander l'export de vos preuves dans un format structuré, couramment utilisé et lisible par machine (JSON/CSV).</span>
                </li>
              </ul>
              <p className="mt-6 text-sm bg-gray-800 p-4 rounded">
                Pour exercer ces droits, contactez notre DPO à : <a href="mailto:privacy@keepproof.com" className="text-white hover:underline">privacy@keepproof.com</a>. 
                Une réponse vous sera adressée sous un délai d'un mois maximum.
              </p>
            </section>

            {/* Article 7 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Article 7. Cookies et Traceurs</h2>
              <p>
                Notre site utilise exclusivement des cookies techniques strictement nécessaires au fonctionnement du service (authentification, sécurité, mémorisation du panier). 
                Conformément aux recommandations de la CNIL, ces traceurs sont dispensés du recueil de consentement. 
                Nous n'utilisons aucun cookie publicitaire tiers de revente de données.
              </p>
            </section>

             {/* Footer Policy */}
             <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
               <p>En cas de litige, vous disposez du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr.</p>
             </div>

          </div>
        </div>
      </div>
    </>
  );
}
