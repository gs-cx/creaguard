export const runtime = 'edge';
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Type de données (à adapter selon votre vraie BDD)
type AuditLog = {
  id: string;
  timestamp: string;
  status: 'SUCCESS' | 'ERROR' | 'PENDING';
  action: string;
  user: string;
  details: string;
  hash?: string; // Optionnel : l'empreinte du fichier
  txId?: string; // Optionnel : ID transaction Polygon
};

// DONNÉES DE DÉMO (Pour visualiser le design Audit)
// Une fois connecté à votre API, vous remplacerez ceci par le fetch.
const MOCK_LOGS: AuditLog[] = [
  { id: 'log_1', timestamp: '2026-01-14T10:23:45', status: 'SUCCESS', action: 'UPLOAD_PROOF', user: 'je.gilginas@gmail.com', details: 'Fichier: Contrat_v2.pdf', hash: '0x8f...2a', txId: '0x123...abc' },
  { id: 'log_2', timestamp: '2026-01-14T09:12:00', status: 'SUCCESS', action: 'CREATE_ACCOUNT', user: 'new.user@test.com', details: 'Inscription via Google' },
  { id: 'log_3', timestamp: '2026-01-13T18:45:10', status: 'ERROR', action: 'PAYMENT_FAIL', user: 'client@bad.com', details: 'Carte refusée' },
  { id: 'log_4', timestamp: '2026-01-13T14:20:00', status: 'SUCCESS', action: 'UPLOAD_PROOF', user: 'architecte@pro.com', details: 'Fichier: Plan_Maison.dwg', hash: '0x7b...9c', txId: '0x456...def' },
  { id: 'log_5', timestamp: '2026-01-12T08:00:00', status: 'SUCCESS', action: 'LOGIN', user: 'je.gilginas@gmail.com', details: 'Connexion IP: 192.168.1.1' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState(''); // Format YYYY-MM-DD
  const [logs, setLogs] = useState<AuditLog[]>(MOCK_LOGS);

  // FILTRAGE EN TEMPS RÉEL
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
    
    const matchesDate = dateFilter === '' || log.timestamp.startsWith(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-red-500/30">
      
      {/* HEADER ADMIN PRO */}
      <header className="bg-[#0A0A0F] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition">
              K<span className="text-red-600">.</span>Admin
            </Link>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-400">
              AUDIT_MODE_ENABLED
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white">Administrateur</p>
              <p className="text-xs text-gray-500 font-mono">Session ID: #88291</p>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-white text-black text-sm font-bold rounded hover:bg-gray-200 transition"
            >
              Retour Site
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* TITRE ET STATS RAPIDES */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Registre des Preuves</h1>
            <p className="text-gray-400 text-sm">
              Trace d'audit immuable de toutes les actions critiques sur la plateforme.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-3 bg-[#111116] rounded border border-white/10">
                <p className="text-xs text-gray-500 uppercase">Total Preuves</p>
                <p className="text-2xl font-mono font-bold text-blue-400">1,240</p>
             </div>
             <div className="px-4 py-3 bg-[#111116] rounded border border-white/10">
                <p className="text-xs text-gray-500 uppercase">Incidents (24h)</p>
                <p className="text-2xl font-mono font-bold text-green-400">0</p>
             </div>
          </div>
        </div>

        {/* BARRE DE FILTRES (CRITÈRES) */}
        <div className="bg-[#111116] p-4 rounded-t-xl border border-white/10 border-b-0 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Recherche Texte */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Rechercher (Email, Action, Fichier...)"
              className="w-full bg-[#050507] text-white pl-10 pr-4 py-2 rounded border border-white/10 focus:border-blue-500 focus:outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {/* Filtre Date */}
            <input 
              type="date" 
              className="bg-[#050507] text-white px-4 py-2 rounded border border-white/10 text-sm focus:border-blue-500 outline-none"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />

            {/* Filtre Statut */}
            <select 
              className="bg-[#050507] text-white px-4 py-2 rounded border border-white/10 text-sm focus:border-blue-500 outline-none appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Tous les statuts</option>
              <option value="SUCCESS">✅ Succès</option>
              <option value="ERROR">❌ Erreurs</option>
            </select>
          </div>
        </div>

        {/* TABLEAU "AUDIT PROOF" */}
        <div className="bg-[#111116] border border-white/10 rounded-b-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#050507] text-gray-400 font-mono uppercase text-xs">
              <tr>
                <th className="py-4 px-6 border-b border-white/10">Horodatage (UTC)</th>
                <th className="py-4 px-6 border-b border-white/10">Utilisateur</th>
                <th className="py-4 px-6 border-b border-white/10">Action</th>
                <th className="py-4 px-6 border-b border-white/10">Détails de la Preuve</th>
                <th className="py-4 px-6 border-b border-white/10 text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                    
                    {/* Date en mono pour la précision */}
                    <td className="py-4 px-6 font-mono text-gray-400">
                      {new Date(log.timestamp).toLocaleString('fr-FR')}
                    </td>

                    {/* Utilisateur */}
                    <td className="py-4 px-6 font-medium text-white">
                      {log.user}
                    </td>

                    {/* Badge Action */}
                    <td className="py-4 px-6">
                      <span className="inline-block px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold font-mono">
                        {log.action}
                      </span>
                    </td>

                    {/* Détails techniques (Hash etc) */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-gray-300">{log.details}</span>
                        {log.hash && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-mono text-gray-500">Hash: {log.hash}</span>
                            {log.txId && (
                               <span className="text-xs text-purple-400 hover:underline cursor-pointer">
                                 🔗 PolygonScan
                               </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Statut Visuel */}
                    <td className="py-4 px-6 text-right">
                      {log.status === 'SUCCESS' && (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs font-bold uppercase tracking-wide bg-green-500/10 px-2 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                          Confirmé
                        </span>
                      )}
                      {log.status === 'ERROR' && (
                        <span className="inline-flex items-center gap-1 text-red-400 text-xs font-bold uppercase tracking-wide bg-red-500/10 px-2 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                          Échec
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    Aucun log ne correspond à vos critères de recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* FOOTER TABLEAU (PAGINATION SIMULÉE) */}
          <div className="bg-[#050507] p-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
            <span>Affichage de {filteredLogs.length} résultats</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#111116] border border-white/10 rounded hover:bg-white/5 disabled:opacity-50" disabled>Précédent</button>
              <button className="px-3 py-1 bg-[#111116] border border-white/10 rounded hover:bg-white/5">Suivant</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
