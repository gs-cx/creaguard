'use client';
export const runtime = 'edge';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { jsPDF } from "jspdf";
import QRCode from 'qrcode';
import { 
  Search, FileText, Image as ImageIcon, Music, ShieldCheck, 
  Download, Plus, Wallet, Gavel, Folder, ChevronRight, LogOut, LayoutGrid,
  Share2 
} from 'lucide-react';

// --- TYPES ---
type Doc = {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'audio' | 'other';
  size: string;
  date: string;
  hash: string;
  status: 'protected' | 'pending';
  folderId?: string; 
};

type Folder = {
  id: string;
  name: string;
  color: string;
};

export default function Dashboard() {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [credits, setCredits] = useState(12);
  const [folders, setFolders] = useState<Folder[]>([
    { id: 'clients', name: 'Projets Clients', color: 'bg-purple-500' },
    { id: 'admin', name: 'Administratif', color: 'bg-emerald-500' }
  ]);
  const [activeFilter, setActiveFilter] = useState<string>('all'); 

  useEffect(() => {
    // Changement de clé de stockage : keepproof -> creaguard
    const savedDocs = localStorage.getItem('creaguard_docs');
    const demoDocs: Doc[] = [
      { id: 1, name: "avis_de_situation (2).pdf", type: 'pdf', size: "65 KB", date: "18/01/2026", hash: "0x6b12f8b4...1279f", status: "protected", folderId: 'clients' },
      { id: 2, name: "H_18663393.pdf", type: 'pdf', size: "27 KB", date: "11/01/2026", hash: "0x7f83b165...d9069", status: "protected", folderId: 'clients' },
      { id: 3, name: "Logo_Concept_Final.png", type: 'image', size: "4.2 MB", date: "20/01/2026", hash: "0x8a92b342...99a21", status: "protected" },
      { id: 4, name: "Meeting_Audio.wav", type: 'audio', size: "14 MB", date: "21/01/2026", hash: "0x1290384...aa923", status: "protected" },
    ];
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs)); 
      if(JSON.parse(savedDocs).length === 0) setDocuments(demoDocs);
    } else {
      setDocuments(demoDocs);
    }
  }, []);

  const saveDocs = (newDocs: Doc[]) => {
    setDocuments(newDocs);
    localStorage.setItem('creaguard_docs', JSON.stringify(newDocs));
  };

  const handleDownloadCertificate = async (doc: Doc) => {
    const pdf = new jsPDF();
    pdf.setFontSize(22);
    pdf.text("Certificat d'Ancrage Creaguard", 10, 20);
    
    pdf.setFontSize(12);
    pdf.text(`Fichier : ${doc.name}`, 10, 40);
    pdf.text(`Hash (Empreinte numérique) : ${doc.hash}`, 10, 50);
    pdf.text(`Date de protection : ${doc.date}`, 10, 60);
    pdf.text(`Statut : Protégé sur Blockchain Polygon`, 10, 70);
    
    pdf.save(`Certificat_Creaguard_${doc.name}.pdf`);
  };

  const handleLitigation = (doc: Doc) => {
    if(confirm(`🚨 Lancer une procédure pour "${doc.name}" ?`)) {
        window.location.href = `/litige?ref=${doc.hash}`; 
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Retirer ce fichier ?")) {
      saveDocs(documents.filter(doc => doc.id !== id));
    }
  };

  const handleRename = (id: number, currentName: string) => {
    const newName = prompt("Renommer :", currentName);
    if (newName) saveDocs(documents.map(doc => doc.id === id ? { ...doc, name: newName } : doc));
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = activeFilter === 'all' || doc.folderId === activeFilter;
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-400" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-blue-400" />;
      case 'audio': return <Music className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex font-sans selection:bg-blue-500/30 pt-24">
      
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 hidden md:flex flex-col border-r border-white/5 bg-[#0a0a0c] sticky top-24 h-[calc(100vh-6rem)] z-20">
        
        <nav className="flex-1 space-y-1 px-3 mt-6">
          <div 
             onClick={() => setActiveFilter('all')}
             className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors ${activeFilter === 'all' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="hidden lg:block font-medium">Vue d'ensemble</span>
          </div>

          <Link href="/dashboard/share" className="flex items-center gap-3 px-3 py-3 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl transition-colors group">
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:block font-bold">Safe-Link</span>
          </Link>
          
          <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider hidden lg:block">Vos Dossiers</div>
          
          {folders.map(folder => (
            <div 
                key={folder.id} 
                onClick={() => setActiveFilter(folder.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${activeFilter === folder.id ? 'bg-white/5 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
                <Folder className={`w-4 h-4 ${activeFilter === folder.id ? 'fill-current' : ''}`} />
                <span className="hidden lg:block font-medium text-sm">{folder.name}</span>
            </div>
          ))}

          <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider hidden lg:block">Outils</div>
          
          <Link href="/litige" className="flex items-center gap-3 px-3 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-colors">
            <Gavel className="w-5 h-5" />
            <span className="hidden lg:block font-medium">Centre Litiges</span>
          </Link>
        </nav>

        {/* User Mini Profile */}
        <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold shadow-lg">ME</div>
                <div className="hidden lg:block flex-1">
                    <p className="text-sm font-bold group-hover:text-blue-400 transition-colors">Mon Compte</p>
                    <p className="text-[10px] text-gray-500">Plan Créateur</p>
                </div>
                <LogOut className="w-4 h-4 text-gray-600 group-hover:text-white hidden lg:block" />
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto relative">
        
        {/* HEADER & SEARCH */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
                <h1 className="text-3xl font-bold mb-1">
                    {activeFilter === 'all' ? 'Tableau de Bord' : folders.find(f => f.id === activeFilter)?.name}
                </h1>
                <p className="text-gray-400 text-sm">Bienvenue, vos actifs sont sécurisés.</p>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Rechercher un fichier..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#111116] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 w-64 transition-all shadow-sm"
                    />
                </div>
                <Link href="/new" className="bg-white text-black hover:bg-gray-200 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-white/5">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Nouvelle Preuve</span>
                </Link>
            </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#111116] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <ShieldCheck className="w-32 h-32 text-white" />
                </div>
                <div className="flex items-center justify-between mb-4">
                     <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">État de protection</p>
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-white">Actif</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{documents.length} fichiers ancrés sur Polygon.</p>
            </div>

            <div className="bg-[#111116] border border-white/5 rounded-2xl p-6 relative overflow-hidden hover:border-blue-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Crédits disponibles</p>
                    <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                        <Wallet className="w-5 h-5" />
                    </div>
                </div>
                <span className="text-3xl font-bold text-white block mb-4">{credits}</span>
                <button className="text-xs font-bold text-blue-400 hover:text-white flex items-center gap-1 transition-colors">
                    Recharger le compte <ChevronRight className="w-3 h-3" />
                </button>
            </div>

            <div className="bg-gradient-to-br from-[#111116] to-red-900/10 border border-white/5 rounded-2xl p-6 relative group cursor-pointer hover:border-red-500/30 transition-all">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-500/10 p-2 rounded-lg text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                        <Gavel className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white">Assistant Litige</span>
                </div>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 leading-relaxed">
                    Victime de copie ? Générez une mise en demeure officielle basée sur vos preuves en 1 clic.
                </p>
            </div>
        </div>

        {/* TABLEAU */}
        <div className="bg-[#111116] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <h3 className="font-bold text-gray-200 text-sm uppercase tracking-wide">Documents Récents</h3>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">{filteredDocs.length}</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[11px] text-gray-500 border-b border-white/5 bg-white/[0.02]">
                            <th className="p-4 font-bold uppercase tracking-wider">Fichier</th>
                            <th className="p-4 font-bold uppercase tracking-wider">Date</th>
                            <th className="p-4 font-bold uppercase tracking-wider hidden sm:table-cell">Taille</th>
                            <th className="p-4 font-bold uppercase tracking-wider text-center">Status</th>
                            <th className="p-4 font-bold uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredDocs.map((doc) => (
                            <tr key={doc.id} className="group hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#050507] border border-white/10 flex items-center justify-center shadow-inner">
                                            {getFileIcon(doc.type)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer text-sm" onClick={() => handleRename(doc.id, doc.name)}>{doc.name}</p>
                                            <p className="text-[10px] text-gray-600 font-mono mt-0.5">{doc.hash.substring(0, 6)}...{doc.hash.substring(doc.hash.length - 4)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-400 text-xs">{doc.date}</td>
                                <td className="p-4 text-gray-500 text-xs hidden sm:table-cell">{doc.size}</td>
                                <td className="p-4 text-center">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/5 text-green-400 text-[10px] font-bold border border-green-500/10">
                                        <ShieldCheck className="w-3 h-3" /> Sécurisé
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-1 opacity-40 group-hover:opacity-100 transition-all">
                                        <button onClick={() => handleLitigation(doc)} className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-colors"><Gavel className="w-4 h-4" /></button>
                                        <button onClick={() => handleDownloadCertificate(doc)} className="p-2 hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(doc.id)} className="p-2 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"><LogOut className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </main>
    </div>
  );
}
