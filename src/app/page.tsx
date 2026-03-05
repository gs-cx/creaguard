export const runtime = 'edge';
import Link from 'next/link';
import { Shield, Upload, Search, CheckCircle, FileUp, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
      
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center py-12">
        
        {/* --- COLONNE GAUCHE : TEXTE & ACTIONS --- */}
        <div className="text-left space-y-8">
          
          {/* Badge Nouveauté */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-800 text-blue-400 text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            NOUVEAU : Moteur de recherche historique disponible
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
            Protégez vos <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              créations
            </span>
            <br />avant qu'il ne soit trop tard.
          </h1>
          
          {/* --- TEXTE SIMPLIFIÉ ICI --- */}
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
            La manière la plus simple de <strong>prouver que vous êtes l'auteur</strong> et d'être <strong>alerté en cas de copie</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* BOUTON PRINCIPAL : DÉPÔT */}
            <Link href="/dashboard" className="group bg-white text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-lg shadow-white/10">
              <Shield className="w-5 h-5" />
              Protéger un fichier
            </Link>
            
            {/* BOUTON SECONDAIRE : RECHERCHE */}
            <Link href="/designs" className="group bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <Search className="w-5 h-5 text-gray-400 group-hover:text-white" />
              Explorer les archives
            </Link>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> Preuve certifiée
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> Valable à vie
            </div>
          </div>
        </div>

        {/* --- COLONNE DROITE : LE DROPPER (VISUEL) --- */}
        <div className="relative group">
          {/* Effet de Halo derrière */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative bg-[#0a0a0c] border border-gray-800 rounded-2xl p-8 aspect-square flex flex-col items-center justify-center text-center shadow-2xl">
            
            {/* Onglets simulés */}
            <div className="absolute top-0 left-0 w-full flex border-b border-gray-800">
              <div className="w-1/2 p-4 text-blue-400 border-b-2 border-blue-500 font-medium text-sm flex justify-center gap-2">
                <FileUp className="w-4 h-4" /> Fichier
              </div>
              <div className="w-1/2 p-4 text-gray-500 font-medium text-sm flex justify-center gap-2">
                Site Web
              </div>
            </div>

            {/* Zone centrale */}
            <div className="mt-10 mb-6 p-6 rounded-full bg-blue-900/20 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-12 h-12 text-blue-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Protégez votre fichier</h3>
            <p className="text-gray-400 mb-8">JPG, PNG, PDF ou ZIP.</p>
            
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold w-full max-w-xs transition-colors shadow-lg shadow-blue-900/50">
              Choisir un fichier
            </Link>

            <p className="mt-6 text-xs text-gray-600">
              Vos fichiers sont chiffrés et ne sont jamais rendus publics.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
