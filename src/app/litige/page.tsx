'use client';
export const runtime = 'edge';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { jsPDF } from "jspdf";
import { useUser } from "@clerk/nextjs";
import { 
  ArrowLeft, ShieldAlert, Gavel, Download, Copy, 
  MapPin, Search, BookOpen, Archive, CheckCircle2, 
  AlertTriangle, ExternalLink, Map, ArrowRight, Mail, Scale, FileText, ShieldCheck
} from 'lucide-react';

// --- COMPOSANT PRINCIPAL ---
function LitigeContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const refHash = searchParams.get('ref');

  // --- ETATS ---
  const [activeTab, setActiveTab] = useState<'process' | 'guide' | 'generator' | 'export' | 'bailiff'>('process');
  
  const [docData, setDocData] = useState<any>(null);
  const [city, setCity] = useState('');
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [copied, setCopied] = useState(false);

  // Données Formulaire
  const [formData, setFormData] = useState({
    infringerName: '',
    infringerUrl: '',
    myAddress: ''
  });

  // --- CHARGEMENT DONNÉES ---
  useEffect(() => {
    if (user) {
        setFormData(prev => ({
            ...prev,
            myAddress: `${user.fullName || 'Mon Nom'}\n${user.primaryEmailAddress?.emailAddress || 'email@mon-compte.com'}`
        }));
    }
    if (refHash) {
        const savedDocs = localStorage.getItem('keepproof_docs');
        if (savedDocs) {
            const parsed = JSON.parse(savedDocs);
            const found = parsed.find((d: any) => d.hash === refHash);
            if (found) setDocData(found);
        }
        if (!docData) {
            setDocData({
                name: "Document_Protect.pdf",
                date: new Date().toLocaleDateString(),
                hash: refHash,
                id: 999
            });
        }
    }
  }, [user, refHash]);

  // --- FONCTION 1 : GÉNÉRATION MISE EN DEMEURE (COURRIER) ---
  const generateLetterText = () => {
    const today = new Date().toLocaleDateString('fr-FR');
    return `OBJET : MISE EN DEMEURE - ATTEINTE AUX DROITS D'AUTEUR\n
DE :\n${formData.myAddress || "[VOS COORDONNÉES]"}\n
À L'ATTENTION DE :\n${formData.infringerName || "[NOM DU CONTREFACTEUR]"}\n
Le ${today},\n
Madame, Monsieur,\n
Je suis l'auteur et le titulaire exclusif des droits de propriété intellectuelle concernant l'œuvre numérique suivante : "${docData?.name || '[Nom du Fichier]'}" (Sécurisée le ${docData?.date || '[Date]'}).\n
J'ai constaté que vous utilisez, reproduisez ou diffusez cette œuvre sans mon autorisation sur le support suivant :\n${formData.infringerUrl || 'https://www.merriam-webster.com/dictionary/lieu'}\n
Cette utilisation constitue une contrefaçon au sens des articles L.122-4 et L.335-2 du Code de la Propriété Intellectuelle.\n
Je tiens à vous informer que je dispose d'une PREUVE D'ANTÉRIORITÉ certifiée sur la Blockchain Polygon (Technologie KeepProof), rendant mon droit de paternité incontestable et opposable en justice.
Empreinte numérique (Hash) : ${docData?.hash || '...'}\n
PAR LA PRÉSENTE, JE VOUS METS EN DEMEURE DE :\n
1. Cesser immédiatement toute diffusion de mon œuvre.
2. Supprimer les fichiers concernés de tous vos supports sous 48 heures.
3. Me confirmer par écrit que ces mesures ont été prises.\n
À défaut d'exécution de votre part dans ce délai, je transmettrai ce dossier à mon conseil juridique afin d'engager les poursuites civiles et pénales nécessaires pour faire valoir mes droits et obtenir réparation du préjudice subi.\n
Dans l'attente de votre confirmation,\n
[Signature]`;
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    const textLines = doc.splitTextToSize(generateLetterText(), 170);
    doc.text(textLines, 20, 20);
    doc.save(`Mise_En_Demeure_${formData.infringerName || 'Juridique'}.pdf`);
  };

  // --- FONCTION 2 : GÉNÉRATION GUIDE JURIDIQUE COMPLET ---
  const generateFullGuide = () => {
    const doc = new jsPDF();
    let y = 20; // Curseur vertical

    // TITRE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("GUIDE DE DÉFENSE", 20, y);
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text("PROPRIÉTÉ INTELLECTUELLE & PREUVE NUMÉRIQUE", 20, y);
    
    y += 20;
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 15;

    // CHAPITRE 1 : LE DROIT
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("1. VOS DROITS FONDAMENTAUX", 20, y);
    y += 10;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const text1 = "En France, la protection du droit d'auteur est automatique dès la création de l'œuvre (Art. L.111-1 du CPI). Vous n'avez pas besoin de dépôt officiel pour être protégé. TOUTEFOIS, en cas de litige, c'est à vous d'apporter la preuve que vous êtes le créateur original et que vous avez créé l'œuvre AVANT le contrefacteur.";
    doc.text(doc.splitTextToSize(text1, 170), 20, y);
    y += 25;

    // Citation Loi
    doc.setFont("helvetica", "italic");
    doc.setTextColor(80, 80, 80);
    const loi1 = "\"Toute représentation ou reproduction intégrale ou partielle faite sans le consentement de l'auteur ou de ses ayants droit ou ayants cause est illicite.\" (Art. L.122-4 CPI)";
    doc.text(doc.splitTextToSize(loi1, 160), 25, y);
    y += 20;

    // CHAPITRE 2 : LA PREUVE KEEPPROOF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("2. LA VALEUR DE VOTRE PREUVE", 20, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const text2 = "KeepProof utilise la Blockchain (Polygon) pour créer un ancrage immuable. Juridiquement, cela constitue un 'Commencement de preuve par écrit' au sens de l'article 1365 du Code Civil et respecte les normes eIDAS.";
    doc.text(doc.splitTextToSize(text2, 170), 20, y);
    y += 15;
    
    const text3 = "Ce certificat permet d'établir une DATE CERTAINE (Date d'antériorité). C'est souvent l'élément clé qui permet de gagner un litige ou de dissuader un voleur sans aller au tribunal.";
    doc.text(doc.splitTextToSize(text3, 170), 20, y);
    y += 25;

    // CHAPITRE 3 : LA STRATÉGIE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("3. COMMENT RÉAGIR EN CAS DE VOL ?", 20, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const steps = [
        "A. CONSTATER : Ne contactez pas tout de suite le voleur. Faites des captures d'écran. Si l'enjeu est lourd, faites faire un constat d'huissier sur internet.",
        "B. CONTACTER (Amiable) : Envoyez un email ferme indiquant que vous avez une preuve certifiée Blockchain. Demandez le retrait sous 24h.",
        "C. METTRE EN DEMEURE (Officiel) : Si pas de réponse, envoyez une LRAR (Lettre Recommandée) utilisant le modèle KeepProof.",
        "D. AGIR (Judiciaire) : Saisissez un avocat spécialisé pour demander des dommages et intérêts."
    ];
    
    steps.forEach(step => {
        doc.text(doc.splitTextToSize(step, 170), 20, y);
        y += 12;
    });

    // FOOTER
    y = 280;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Document généré par KeepProof.com - Ne constitue pas un conseil juridique personnalisé.", 105, y, { align: "center" });

    doc.save("Guide_Defense_Droits_Auteur.pdf");
  };

  const handleZipDownload = () => {
    setIsGeneratingZip(true);
    setTimeout(() => {
        setIsGeneratingZip(false);
        alert("Simulation : Dossier_Contentieux.zip téléchargé !");
    }, 2000);
  };

  const handleLocalSearch = () => {
    const query = city.trim() ? encodeURIComponent(city + " huissier justice") : "huissier justice autour de moi";
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-blue-500/30 pt-20 pb-20 px-4 md:px-8">
        
        {/* HEADER */}
        <div className="max-w-7xl mx-auto mb-10">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-6">
                <ArrowLeft className="w-4 h-4" /> Retour au Dashboard
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                        <span className="bg-red-500/10 text-red-500 p-2 rounded-lg"><Gavel className="w-8 h-8" /></span>
                        Centre de Litige
                    </h1>
                    <p className="text-gray-400">Gérez vos conflits, générez vos courriers et trouvez un huissier.</p>
                </div>

                {/* NAVIGATION ONGLETS */}
                <div className="flex flex-wrap gap-2 bg-[#111116] p-1.5 rounded-xl border border-white/10">
                    {[
                        { id: 'process', icon: <Map className="w-4 h-4"/>, label: 'Le Process' },
                        { id: 'generator', icon: <ShieldAlert className="w-4 h-4"/>, label: 'Générateur' },
                        { id: 'guide', icon: <BookOpen className="w-4 h-4"/>, label: 'Guide PDF' },
                        { id: 'export', icon: <Archive className="w-4 h-4"/>, label: 'Pack Zip' },
                        { id: 'bailiff', icon: <MapPin className="w-4 h-4"/>, label: 'Huissiers' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                activeTab === tab.id 
                                ? 'bg-white text-black shadow-lg' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* CONTENU PRINCIPAL */}
        <div className="max-w-7xl mx-auto min-h-[600px]">

            {/* --- ONGLET 0 : LE PROCESS --- */}
            {activeTab === 'process' && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="bg-[#111116] border border-white/10 rounded-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold mb-2 text-white">Votre feuille de route en cas de litige</h2>
                        <p className="text-gray-400 mb-12">
                            La protection KeepProof vous donne l'avantage. Suivez cette gradation pour résoudre le conflit efficacement.
                        </p>

                        <div className="relative border-l-2 border-white/10 ml-4 md:ml-10 space-y-16">
                            
                            <div className="relative pl-12">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-[#111116]"></div>
                                <h3 className="text-lg font-bold text-white mb-2">1. La Preuve Irréfutable</h3>
                                <p className="text-gray-400 text-sm mb-4 max-w-2xl">
                                    Vous avez sécurisé votre fichier. Le certificat Blockchain prouve que vous aviez ce fichier à une date précise. C'est votre base légale.
                                </p>
                                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-500/20">
                                    <CheckCircle2 className="w-3 h-3"/> Certificat Actif
                                </div>
                            </div>

                            <div className="relative pl-12">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#111116]"></div>
                                <h3 className="text-lg font-bold text-white mb-2">2. Résolution Amiable (Rapide)</h3>
                                <p className="text-gray-400 text-sm mb-4 max-w-2xl">
                                    Contactez le contrefacteur (Email, Réseaux sociaux). Informez-le que vous disposez d'une preuve certifiée par Tiers de Confiance.
                                    <br/><em>Dans 70% des cas, la simple mention de "Preuve Blockchain" suffit à faire retirer le contenu.</em>
                                </p>
                                <div className="flex gap-3">
                                    <span className="text-xs bg-white/5 px-3 py-1.5 rounded border border-white/5 text-gray-300 flex items-center gap-2"><Mail className="w-3 h-3"/> Email type</span>
                                </div>
                            </div>

                            <div className="relative pl-12">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-[#111116]"></div>
                                <h3 className="text-lg font-bold text-white mb-2">3. Mise en Demeure (Blocage)</h3>
                                <p className="text-gray-400 text-sm mb-4 max-w-2xl">
                                    Si l'amiable échoue, passez à l'officiel. Envoyez une lettre recommandée (LRAR).
                                    <br/>Utilisez notre outil pour générer ce document juridique avec vos références de preuve incluses.
                                </p>
                                <button onClick={() => setActiveTab('generator')} className="text-sm bg-orange-500 hover:bg-orange-400 text-black font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                                    Générer ma Mise en Demeure <ArrowRight className="w-4 h-4"/>
                                </button>
                            </div>

                            <div className="relative pl-12">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-600 border-4 border-[#111116]"></div>
                                <h3 className="text-lg font-bold text-white mb-2">4. Action Judiciaire</h3>
                                <p className="text-gray-400 text-sm mb-4 max-w-2xl">
                                    En dernier recours, faites constater la contrefaçon par un Huissier (Commissaire de Justice) et saisissez un avocat spécialisé.
                                    Votre preuve KeepProof sera la pièce maîtresse du dossier au tribunal.
                                </p>
                                <button onClick={() => setActiveTab('bailiff')} className="text-sm bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                                    <Scale className="w-4 h-4"/> Trouver un Huissier
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            
            {/* --- ONGLET 1 : GÉNÉRATEUR --- */}
            {activeTab === 'generator' && (
                <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300">
                    <div className="w-full lg:w-5/12 space-y-6">
                        <div className="bg-[#111116] border border-blue-500/30 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden">
                             <div className="absolute right-0 top-0 p-3 opacity-10"><ShieldAlert className="w-24 h-24"/></div>
                             <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400 z-10">
                                <CheckCircle2 className="w-6 h-6" />
                             </div>
                             <div className="z-10">
                                <p className="text-xs text-blue-400 font-bold uppercase">Preuve Active</p>
                                <p className="font-bold text-white text-lg truncate w-60">{docData?.name || "Aucun fichier sélectionné"}</p>
                                <p className="text-xs text-gray-500 font-mono">Ref: {docData?.hash?.substring(0, 16)}...</p>
                             </div>
                        </div>

                        <div className="bg-[#111116] border border-white/10 rounded-xl p-6 space-y-4">
                            <h3 className="font-bold text-gray-200 border-b border-white/5 pb-2">Informations du Litige</h3>
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Contrefacteur</label>
                                <input type="text" className="w-full bg-[#050507] border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="Ex: Jean Dupont, Société X..." value={formData.infringerName} onChange={(e) => setFormData({...formData, infringerName: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">URL / Lieu</label>
                                <input type="text" className="w-full bg-[#050507] border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="Ex: https://voleur.com/ma-photo" value={formData.infringerUrl} onChange={(e) => setFormData({...formData, infringerUrl: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Vos Coordonnées</label>
                                <textarea className="w-full bg-[#050507] border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none h-24 resize-none" value={formData.myAddress} onChange={(e) => setFormData({...formData, myAddress: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-7/12 bg-[#1A1A20] rounded-xl p-8 relative flex flex-col items-center">
                        <div className="absolute top-4 right-4 flex gap-2">
                             <button onClick={() => {navigator.clipboard.writeText(generateLetterText()); setCopied(true); setTimeout(() => setCopied(false), 2000)}} className="p-2 bg-[#111116] hover:bg-white text-white hover:text-black rounded-lg transition-colors border border-white/10" title="Copier"><Copy className="w-4 h-4" /></button>
                             <button onClick={handleDownloadPDF} className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-lg" title="Télécharger PDF"><Download className="w-4 h-4" /></button>
                        </div>
                        <div className="bg-white text-black w-full max-w-[500px] min-h-[600px] p-8 shadow-2xl text-[10px] md:text-xs font-serif leading-relaxed whitespace-pre-wrap">{generateLetterText()}</div>
                        {copied && <div className="absolute bottom-8 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">Copié !</div>}
                    </div>
                </div>
            )}

            {/* --- ONGLET 2 : GUIDE PDF COMPLET --- */}
            {activeTab === 'guide' && (
                 <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="bg-[#111116] border border-white/10 rounded-2xl p-8 h-full flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold mb-4 w-fit border border-blue-500/20">
                                <BookOpen className="w-3 h-3"/> Version Complète 2026
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Guide de Défense des Droits d'Auteur</h2>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                Un document PDF clair et complet, rédigé par des experts, pour comprendre vos droits, citer les bons articles de loi (CPI) et maîtriser la stratégie de riposte graduée.
                            </p>
                            <button 
                                onClick={generateFullGuide}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl"
                            >
                                <Download className="w-5 h-5" /> Télécharger le Guide PDF
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#111116] p-5 rounded-xl border border-white/5 flex gap-4">
                                <div className="bg-white/5 p-3 rounded-lg h-fit"><ShieldCheck className="w-5 h-5 text-gray-300"/></div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Les Bases Légales</h4>
                                    <p className="text-xs text-gray-500 mt-1">Articles L.111-1 & L.122-4 expliqués simplement.</p>
                                </div>
                            </div>
                            <div className="bg-[#111116] p-5 rounded-xl border border-white/5 flex gap-4">
                                <div className="bg-white/5 p-3 rounded-lg h-fit"><FileText className="w-5 h-5 text-gray-300"/></div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">Modèles de Phrases</h4>
                                    <p className="text-xs text-gray-500 mt-1">Quoi dire exactement dans vos emails de réclamation.</p>
                                </div>
                            </div>
                            <div className="bg-[#111116] p-5 rounded-xl border border-white/5 flex gap-4">
                                <div className="bg-white/5 p-3 rounded-lg h-fit"><Gavel className="w-5 h-5 text-gray-300"/></div>
                                <div>
                                    <h4 className="font-bold text-white text-sm">La Preuve Blockchain</h4>
                                    <p className="text-xs text-gray-500 mt-1">Comment faire valoir votre certificat KeepProof au tribunal.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            )}

            {/* --- ONGLET 3 : PACK ZIP --- */}
            {activeTab === 'export' && (
                <div className="max-w-2xl mx-auto text-center animate-in fade-in duration-300 pt-12">
                    <div className="bg-[#111116] border border-white/10 rounded-2xl p-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Archive className="w-24 h-24 text-gray-600 mx-auto mb-6 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-500" />
                        <h2 className="text-2xl font-bold mb-4">Pack Juridique Complet</h2>
                        <p className="text-gray-400 mb-8">
                            Téléchargez une archive .ZIP contenant : <br/>
                            <span className="text-white">• Le fichier original</span> <span className="text-white">• Le certificat PDF</span> <span className="text-white">• Le fichier technique JSON</span>
                        </p>
                        <button onClick={handleZipDownload} disabled={isGeneratingZip} className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto w-full md:w-auto">
                            {isGeneratingZip ? <span className="animate-spin">⏳</span> : <Download className="w-5 h-5" />}
                            {isGeneratingZip ? "Compression en cours..." : "Télécharger le Dossier (.ZIP)"}
                        </button>
                    </div>
                </div>
            )}

            {/* --- ONGLET 4 : HUISSIERS --- */}
            {activeTab === 'bailiff' && (
                <div className="max-w-3xl mx-auto animate-in fade-in duration-300 pt-8">
                    <div className="bg-[#111116] border border-white/10 p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full"></div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <MapPin className="w-6 h-6 text-emerald-500" /> Trouver un Huissier
                        </h3>
                        <p className="text-gray-400 mb-8">Pour donner une valeur incontestable à votre preuve KeepProof lors d'un procès, il est recommandé de faire réaliser un constat par un Commissaire de Justice.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ville ou Code Postal..." className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors" onKeyDown={(e) => e.key === 'Enter' && handleLocalSearch()} />
                            </div>
                            <button onClick={handleLocalSearch} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-emerald-900/20 flex items-center gap-2 justify-center">Rechercher <ExternalLink className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    </div>
  );
}

// --- PAGE WRAPPER ---
export default function LitigePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050507] flex items-center justify-center text-white">Chargement...</div>}>
        <LitigeContent />
    </Suspense>
  );
}
