export const runtime = 'edge';
'use client';
import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function SecurityPage() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-blue-500/30">
      
      {/* HERO SECTION - TEXTE AMÉLIORÉ */}
      <div className="pt-32 pb-20 px-6 border-b border-white/5 bg-[#111116]">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full mb-8 uppercase tracking-wider border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            Architecture Zero-Knowledge
          </div>

          {/* Titre Principal */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
            Vos fichiers restent invisibles.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Même pour nous.</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Contrairement au Cloud classique, KeepProof n'a aucune clé pour lire vos données. 
            Le calcul de l'empreinte se fait <strong className="text-white">localement sur votre appareil</strong>. 
            Nous certifions ce que vous possédez, sans jamais savoir ce que c'est.
          </p>

        </div>
      </div>

      {/* CORE CONCEPT : LE HASHING */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Le principe du Coffre-Fort aveugle</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Beaucoup de services promettent de "ne pas regarder". Chez KeepProof, nous ne demandons pas votre confiance, nous utilisons les mathématiques pour rendre cela impossible.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Lorsque vous déposez un fichier, l'algorithme SHA-256 s'exécute <strong>dans votre navigateur</strong>, avant le moindre envoi.
            </p>
            <div className="bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <p className="font-bold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                La seule chose que nous recevons :
              </p>
              <p className="font-mono text-blue-300 text-sm mt-3 break-all bg-black/30 p-3 rounded border border-blue-500/20 select-all">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</p>
              <p className="text-sm text-gray-400 mt-2 italic">Une suite de caractères aléatoires. Impossible de reconstruire votre roman ou votre logo à partir de ceci.</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="relative bg-[#1A1A20] border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl">
                <div className="flex items-center gap-4">
                    {/* ICONE FICHIER */}
                    <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                    
                    {/* BARRE DE PROGRESSION ANIMÉE */}
                    <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    </div>
                    
                    {/* ICONE CADENAS */}
                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                </div>
                <p className="text-center text-sm text-gray-400 font-mono pt-2">
                    Votre Ordi <span className="text-blue-500">➔</span> SHA-256 <span className="text-blue-500">➔</span> Envoi Hash
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* GRID DE SÉCURITÉ - ICONES PRO */}
      <div className="bg-[#0A0A0F] py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Une forteresse à 4 niveaux</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* ITEM 1 : BLOCKCHAIN */}
            <div className="bg-[#111116] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1 group">
              <div className="mb-6 bg-blue-500/10 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l-9 5.25m9-5.25l9-5.25" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Immuabilité</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Preuve ancrée sur Polygon. Incensurable, indestructible et vérifiable à vie, même sans nous.
              </p>
            </div>

            {/* ITEM 2 : PAIEMENTS */}
            <div className="bg-[#111116] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1 group">
               <div className="mb-6 bg-blue-500/10 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Paiements Sécurisés</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transactions gérées par <strong>Stripe</strong>. Aucune donnée bancaire ne transite par nos serveurs.
              </p>
            </div>

            {/* ITEM 3 : AUTHENTIFICATION */}
            <div className="bg-[#111116] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1 group">
               <div className="mb-6 bg-blue-500/10 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Auth Forte</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Comptes protégés par <strong>Clerk</strong>. Standards de sécurité industrielle pour vos accès.
              </p>
            </div>

            {/* ITEM 4 : CONFIDENTIALITE */}
            <div className="bg-[#111116] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1 group">
               <div className="mb-6 bg-blue-500/10 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Privé par défaut</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Zéro revente de données. Titres et contenus cryptés ou hashés. Vous seul avez la clé.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ SÉCURITÉ */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Questions fréquentes sur la sécurité</h2>
        
        <div className="space-y-12">
          
          <div className="border-l-2 border-blue-500 pl-6">
            <h3 className="text-xl font-bold mb-2 text-white">Que se passe-t-il si KeepProof fait faillite ?</h3>
            <p className="text-gray-400 leading-relaxed">
              C'est la force de la Blockchain. Une fois votre certificat généré, la preuve existe sur le réseau public décentralisé. Vous n'avez pas besoin de nos serveurs pour prouver votre antériorité dans 10 ans. Vous êtes indépendant de nous (Self-Sovereignty).
            </p>
          </div>

          <div className="border-l-2 border-purple-500 pl-6">
            <h3 className="text-xl font-bold mb-2 text-white">Mes concurrents peuvent-ils voir ce que j'ai déposé ?</h3>
            <p className="text-gray-400 leading-relaxed">
              Non. La Blockchain est publique, mais elle ne contient que des "Hashes" (des séries de chiffres illisibles). Personne ne peut deviner que le hash <code>0x8f...2a</code> correspond à votre fichier. Le contenu reste secret tant que VOUS ne décidez pas de le révéler.
            </p>
          </div>
          
          <div className="border-l-2 border-gray-700 pl-6">
            <h3 className="text-xl font-bold mb-2 text-white">Un pirate peut-il voler mon idée sur vos serveurs ?</h3>
            <p className="text-gray-400 leading-relaxed">
              Non. Comme nous ne stockons que l'empreinte numérique et pas le fichier original, un pirate ne trouverait qu'une liste de codes inutilisables. Votre secret industriel reste physiquement sur votre machine.
            </p>
          </div>

           <div className="border-l-2 border-green-500 pl-6">
            <h3 className="text-xl font-bold mb-2 text-white">Ma preuve est-elle recevable en justice ?</h3>
            <p className="text-gray-400 leading-relaxed">
              Oui. En France et en Europe (Règlement eIDAS), la preuve numérique sur Blockchain est reconnue comme un commencement de preuve par écrit. Elle permet d'établir une date certaine infalsifiable.
            </p>
          </div>

          <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
            <h3 className="text-xl font-bold mb-2 text-red-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Point crucial : Vos originaux
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Attention : <strong>La preuve est liée mathématiquement au fichier exact.</strong> Si vous perdez votre fichier original, le lien est rompu. Nous ne stockant pas vos fichiers, <strong>c'est votre responsabilité de conserver précieusement vos originaux certifiés</strong> (disque dur, cloud, clé USB).
            </p>
          </div>

        </div>

        <div className="mt-16 text-center">
            <Link href="/new" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-transform hover:scale-105 shadow-xl shadow-white/10">
                Protéger un fichier
            </Link>
        </div>

      </div>

    </div>
    </>
  );
}
