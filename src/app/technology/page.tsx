export const runtime = 'edge';
'use client';
import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
// J'ai retiré l'import du Footer ici car il est géré par votre layout global

export default function TechnologyPage() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-purple-500/30">
      
      {/* HERO SECTION */}
      <div className="pt-32 pb-20 px-6 border-b border-white/5 bg-[#111116]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
            Infrastructure Décentralisée
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Pourquoi nous avons choisi <br/> <span className="text-purple-500">Polygon</span>.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            KeepProof ne stocke pas votre preuve sur un simple serveur privé. Nous l'ancrons dans l'une des blockchains les plus sécurisées et durables au monde. Voici pourquoi.
          </p>
        </div>
      </div>

      {/* SECTION 1 : L'ARGUMENT "ETERNITÉ" */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Si KeepProof disparaît, <br/>votre preuve reste.</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              C'est la différence fondamentale entre un "Tiers de confiance classique" (Notaire, Huissier, Cloud) et la Blockchain.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Lorsque vous créez un certificat, nous écrivons l'empreinte de votre fichier sur le réseau public Polygon. Cette écriture est définitive. Elle est répliquée sur des milliers d'ordinateurs à travers le monde.
            </p>
            <div className="bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-r-xl">
              <p className="font-bold text-white mb-2">L'indépendance totale</p>
              <p className="text-sm text-gray-400">
                Vous n'avez pas besoin de notre permission ou de nos serveurs pour vérifier votre preuve dans 10 ans. N'importe quel explorateur de blockchain (PolygonScan) pourra confirmer que VOUS étiez là le premier.
              </p>
            </div>
          </div>
          
          {/* VISUEL */}
          <div className="bg-[#111116] p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
             <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <div className="relative z-10 text-center">
                <div className="text-6xl mb-4">🔗</div>
                <h3 className="text-xl font-bold mb-2">Le Registre Public Mondial</h3>
                <p className="text-sm text-gray-500">
                    Contrairement à une base de données privée (SQL) que l'administrateur peut modifier ou effacer, la Blockchain est un livre ouvert en lecture seule, impossible à falsifier.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 : ÉCOLOGIE */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-b border-white/5 bg-[#0A0A0F]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* VISUEL */}
            <div className="order-2 md:order-1 bg-[#111116] p-8 rounded-2xl border border-white/10 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🌱</div>
                    <div className="text-4xl font-bold text-green-400 mb-2">99.99%</div>
                    <p className="text-gray-400">Moins d'énergie que Bitcoin</p>
                </div>
            </div>

            <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">Une technologie verte <br/>(Carbone Négatif)</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Nous savons que l'impact environnemental du numérique vous préoccupe. C'est pourquoi nous avons exclu Bitcoin (trop énergivore) pour choisir Polygon.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Polygon utilise la technologie "Proof of Stake" (Preuve d'Enjeu). Ancrer une preuve sur KeepProof consomme autant d'énergie que d'envoyer <strong>un simple email</strong>. De plus, la fondation Polygon compense son carbone pour être "Carbon Negative".
                </p>
            </div>
        </div>
      </div>

      {/* SECTION 3 : RAPIDITÉ & COÛT */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pourquoi pas Bitcoin ou Ethereum ?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Nous avons comparé les technologies pour vous offrir le meilleur rapport Sécurité / Prix.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A1A20] p-6 rounded-xl border border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all">
                <h3 className="font-bold text-lg mb-2">Bitcoin</h3>
                <p className="text-sm text-gray-500 mb-4">L'ancêtre.</p>
                <ul className="text-sm space-y-2 text-red-400">
                    <li>❌ Très lent (10-60 min)</li>
                    <li>❌ Très cher (5€ à 20€ / preuve)</li>
                    <li>❌ Très polluant</li>
                </ul>
            </div>

            <div className="bg-[#1A1A20] p-6 rounded-xl border border-white/5 opacity-70 grayscale hover:grayscale-0 transition-all">
                <h3 className="font-bold text-lg mb-2">Ethereum</h3>
                <p className="text-sm text-gray-500 mb-4">Le standard.</p>
                <ul className="text-sm space-y-2 text-orange-400">
                    <li>⚠️ Vitesse moyenne (2-5 min)</li>
                    <li>❌ Coûts imprévisibles (Gas fees)</li>
                    <li>✅ Sécurité maximale</li>
                </ul>
            </div>

            <div className="bg-[#111116] p-6 rounded-xl border-2 border-purple-500 transform scale-105 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-white">Polygon</h3>
                    <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">CHOISI</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">La couche rapide d'Ethereum.</p>
                <ul className="text-sm space-y-2 text-green-400">
                    <li>✅ Instantané (2 secondes)</li>
                    <li>✅ Coût négligeable (inclus dans votre abo)</li>
                    <li>✅ Sécurité héritée d'Ethereum</li>
                </ul>
            </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-24">
        <Link href="/new" className="inline-block px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/50">
            Créer ma première preuve sur Polygon
        </Link>
      </div>

    </div>
    {/* Pas de <Footer /> ici, car il est dans layout.tsx */}
    </>
  );
}
