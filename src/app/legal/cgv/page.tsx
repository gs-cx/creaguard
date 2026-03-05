export const runtime = 'edge';
import Header from "@/components/Header";

export default function CGV() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050507] text-gray-300 py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-white mb-8">Conditions Générales de Vente (CGV)</h1>
          <p className="text-sm text-gray-500">Dernière mise à jour : 04 Janvier 2026</p>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Objet</h2>
            <p>
              Les présentes conditions régissent les ventes de services de certification d'antériorité numérique par la société KeepProof SAS sur le site keepproof.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Prix</h2>
            <p>
              Le prix de l'ancrage blockchain est fixé à <strong>9.99 € TTC</strong> par fichier.<br />
              KeepProof se réserve le droit de modifier ses prix à tout moment, mais le service sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Paiement</h2>
            <p>
              Le paiement est exigible immédiatement à la commande. Le règlement s'effectue par carte bancaire via la plateforme sécurisée <strong>Stripe</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Renonciation au droit de rétractation</h2>
            <p>
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
              <br /><br />
              En validant sa commande, le client accepte que l'ancrage sur la Blockchain (service exécuté immédiatement) ne puisse faire l'objet d'aucun remboursement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Responsabilité</h2>
            <p>
              KeepProof s'engage à fournir les moyens techniques pour l'ancrage sur la Blockchain Polygon. Cependant, KeepProof ne saurait être tenu responsable en cas de congestion du réseau Blockchain public ou d'arrêt de ce dernier, événements indépendants de sa volonté.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
