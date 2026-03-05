export const runtime = 'edge';
"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { 
  UploadCloud, FileText, ShieldCheck, CheckCircle2, Search, Loader2, 
  AlertTriangle, Share2, Eye, ScanEye, Fingerprint, Zap, Lock, Globe, Music
} from 'lucide-react';
import { SHA256 } from 'crypto-js';

export default function NewProof() {
  
  // --- ETATS ---
  const [file, setFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState('');
  const [step, setStep] = useState(1); 
  
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisSteps, setAnalysisSteps] = useState<{label: string, icon: any, status: 'pending'|'loading'|'done'|'alert'}[]>([]);
  const [riskScore, setRiskScore] = useState(0); 
  const [uniqueHash, setUniqueHash] = useState('');
  
  // États Audit Marque
  const [brandStatus, setBrandStatus] = useState<'idle' | 'safe' | 'warning'>('idle');
  // ON SIMPLIFIE : Une seule source de vérité
  const [scanDetails, setScanDetails] = useState<any[]>([]);

  // Etats Post-Ancrage
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  // --- 1. GESTION FICHIER ---
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setCustomName(selectedFile.name.split('.')[0]);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileHash = SHA256(event.target?.result as string).toString();
        setUniqueHash("0x" + fileHash);
      };
      reader.readAsBinaryString(selectedFile);

      startRealAIAnalysis(selectedFile);
    }
  };

  // --- 2. SÉQUENCE D'ANALYSE ---
  const startRealAIAnalysis = async (file: File) => {
    setStep(2);
    setAnalysisProgress(10);
    setScanDetails([]); // Reset propre
    
    let steps = [
        { label: "Extraction de l'empreinte numérique (SHA-256)", icon: Fingerprint, status: 'pending' as const },
        { label: "Analyse d'intégrité du fichier", icon: FileText, status: 'pending' as const },
    ];

    if (file.type.startsWith('image/')) {
        steps.push({ label: "Scan biométrique visuel (IA Vision)", icon: ScanEye, status: 'pending' as const });
    }
    
    steps.push({ label: "Interrogation Base INPI (via MeiliSearch)", icon: Search, status: 'pending' as const });
    setAnalysisSteps(steps);

    try {
        let base64Image = null;
        if (file.type.startsWith('image/')) {
            base64Image = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        }

        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: file.name,
                type: file.type,
                imageBase64: base64Image
            })
        });
        
        const result = await response.json();
        console.log("DEBUG API REÇU:", result); // Regardez la console F12 si besoin

        // ANIMATION
        let currentStep = 0;
        const totalSteps = steps.length;
        
        const interval = setInterval(() => {
            currentStep++;
            setAnalysisProgress(prev => Math.min(prev + (90 / totalSteps), 90));

            setAnalysisSteps(prev => prev.map((s, i) => {
                if (i === currentStep - 1) return { ...s, status: 'done' };
                if (i === currentStep) return { ...s, status: 'loading' };
                return s;
            }));

            if (currentStep >= totalSteps) {
                clearInterval(interval);
                setAnalysisProgress(100);
                
                setAnalysisSteps(prev => prev.map(s => ({ ...s, status: 'done' })));

                setRiskScore(result.score);
                
                // MISE À JOUR CRITIQUE DU STATE
                if (result.details && Array.isArray(result.details) && result.details.length > 0) {
                    console.log("SETTING DETAILS:", result.details);
                    setScanDetails(result.details);
                } else {
                    setScanDetails([]);
                }

                if (result.score < 50) {
                    setBrandStatus('warning');
                } else {
                    setBrandStatus('safe');
                }
            }
        }, 800); // Un peu plus rapide pour le test

    } catch (error) {
        console.error("Erreur critique:", error);
        setRiskScore(50);
        setBrandStatus('warning');
    }
  };

  // --- 3. ANCRAGE FINAL ---
  const handleAnchor = async () => {
    setStep(3); 
    const uniqueId = "kp-" + Math.random().toString(36).substring(2, 9);
    setGeneratedLink(`${window.location.origin}/s/${uniqueId}`);

    setTimeout(() => {
        const newDoc = {
            id: Date.now(),
            name: customName || file?.name,
            type: file?.type.includes('image') ? 'image' : 'pdf',
            size: (file!.size / 1024).toFixed(0) + " KB",
            date: new Date().toLocaleDateString(),
            hash: uniqueHash,
            status: "protected",
            folderId: 'clients'
        };
        const existingDocs = JSON.parse(localStorage.getItem('keepproof_docs') || '[]');
        localStorage.setItem('keepproof_docs', JSON.stringify([newDoc, ...existingDocs]));
        setStep(4); 
    }, 2000);
  };

  const isAnalysisDone = analysisProgress >= 100;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#050507] text-white pt-32 pb-20 font-sans">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center mb-10">
             <h1 className="text-3xl md:text-4xl font-bold mb-4">
                 {step === 4 ? "Protection Activée & Sécurisée" : "Nouveau Dépôt Intelligent"}
             </h1>
             <p className="text-gray-400">
                 {step === 4 ? "Votre preuve est ancrée. Passez à l'étape suivante." : "Analyse IA, Audit d'antériorité et Ancrage Blockchain."}
             </p>
          </div>

          {/* --- ETAPE 1 : UPLOAD --- */}
          {step === 1 && (
              <div className="max-w-3xl mx-auto bg-[#111116] border border-white/10 rounded-3xl p-1 animate-in fade-in">
                  <div className="border-2 border-dashed border-white/10 rounded-[22px] p-12 text-center hover:border-blue-500/50 transition-colors cursor-pointer relative group bg-[#0A0A0F]">
                      <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/20">
                          <UploadCloud className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Déposez votre création originale</h3>
                      <p className="text-sm text-gray-500 mb-6">Images, Audio, PDF, Textes • Max 100MB</p>
                      <div className="flex justify-center gap-4 text-xs text-gray-500 uppercase tracking-widest font-bold opacity-70">
                          <span className="flex items-center gap-1"><ScanEye className="w-3 h-3"/> Scan IA</span>
                          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Blockchain</span>
                          <span className="flex items-center gap-1"><Search className="w-3 h-3"/> INPI</span>
                      </div>
                  </div>
              </div>
          )}

          {/* --- ETAPE 2 : SCANNER & RAPPORT --- */}
          {step === 2 && file && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8">
                  
                  {/* GAUCHE : VISUALISATION SCAN */}
                  <div className={`bg-[#111116] border transition-colors duration-500 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden h-80 md:h-auto ${isAnalysisDone ? (brandStatus === 'warning' ? 'border-red-500/50' : 'border-green-500/50') : 'border-white/10'}`}>
                      
                      <div className="absolute inset-0 bg-blue-500/5 z-0"></div>
                      
                      {!isAnalysisDone && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] animate-[scan_2s_ease-in-out_infinite] z-10"></div>
                      )}
                      
                      {file.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(file)} className={`max-h-48 object-contain rounded-lg border z-0 transition-all duration-500 ${isAnalysisDone ? (brandStatus === 'warning' ? 'border-red-500 opacity-100 scale-105 grayscale' : 'border-green-500 opacity-100 scale-105') : 'border-white/10 opacity-80'}`} />
                      ) : (
                          <FileText className={`w-32 h-32 z-0 transition-colors ${isAnalysisDone ? 'text-green-500' : 'text-gray-600'}`} />
                      )}
                      
                      <div className="absolute bottom-6 left-6 right-6">
                          <div className={`flex justify-between text-xs font-bold mb-2 uppercase tracking-wider ${isAnalysisDone ? (brandStatus === 'warning' ? 'text-red-400' : 'text-green-400') : 'text-blue-400'}`}>
                              <span>{isAnalysisDone ? 'Analyse Terminée' : 'Vision IA en cours...'}</span>
                              <span>{Math.round(analysisProgress)}%</span>
                          </div>
                          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-300 ${isAnalysisDone ? (brandStatus === 'warning' ? 'bg-red-500' : 'bg-green-500') : 'bg-blue-500'}`} style={{ width: `${analysisProgress}%` }}></div>
                          </div>
                      </div>
                  </div>

                  {/* DROITE : RAPPORT */}
                  <div className="flex flex-col justify-between h-full">
                      <div className="bg-[#111116] border border-white/10 rounded-3xl p-6 mb-6 flex-grow">
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                              <Fingerprint className="w-5 h-5 text-purple-400"/> Rapport d'Unicité
                          </h3>
                          <div className="space-y-4">
                              {analysisSteps.map((s, idx) => (
                                  <div key={idx} className="flex items-center gap-3 text-sm">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                                          s.status === 'done' ? 'bg-green-500/10 border-green-500/50 text-green-500' :
                                          s.status === 'loading' ? 'border-blue-500/50 text-blue-500 scale-110' :
                                          'border-white/10 text-gray-600'
                                      }`}>
                                          {s.status === 'done' ? <CheckCircle2 className="w-4 h-4" /> : 
                                           s.status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                           <s.icon className="w-4 h-4" />}
                                      </div>
                                      <span className={s.status === 'pending' ? 'text-gray-600' : 'text-gray-300'}>{s.label}</span>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* LE SCORE FINAL (DYNAMIQUE) */}
                      {isAnalysisDone && (
                          <div className={`border rounded-3xl p-6 animate-in zoom-in ${brandStatus === 'warning' ? 'bg-red-900/20 border-red-500/50' : 'bg-green-900/20 border-green-500/30'}`}>
                              <div className="flex items-center justify-between mb-2">
                                  <span className={`font-bold uppercase text-xs tracking-wider ${brandStatus === 'warning' ? 'text-red-400' : 'text-green-400'}`}>
                                      {brandStatus === 'warning' ? 'Correspondance Trouvée' : 'Score d\'Unicité'}
                                  </span>
                                  <span className={`text-3xl font-bold ${brandStatus === 'warning' ? 'text-red-500' : 'text-white'}`}>
                                      {brandStatus === 'warning' ? (100 - riskScore) : riskScore}%
                                  </span>
                              </div>
                              
                              {brandStatus === 'warning' ? (
                                  <>
                                      {/* --- BLOC D'INFORMATION DÉTAILLÉ --- */}
                                      <div className="bg-red-500/10 rounded-lg p-4 mb-4 border border-red-500/20 text-left">
                                          {scanDetails && scanDetails.length > 0 ? (
                                              <div className="space-y-2 text-sm">
                                                  <div className="flex flex-col">
                                                      <span className="text-red-300 text-xs uppercase font-bold">Marque Détectée :</span>
                                                      <span className="text-white font-bold text-lg">{scanDetails[0].texte}</span>
                                                  </div>
                                                  <div className="flex flex-col border-t border-red-500/20 pt-2">
                                                      <span className="text-red-300 text-xs">Propriétaire :</span>
                                                      <span className="text-white font-medium">{scanDetails[0].titulaire}</span>
                                                  </div>
                                                  <div className="flex justify-between border-t border-red-500/20 pt-2 mt-1">
                                                      <span className="text-red-300 text-xs">Date dépôt :</span>
                                                      <span className="text-white text-xs font-mono">{scanDetails[0].date}</span>
                                                  </div>
                                                  <div className="flex flex-col border-t border-red-500/20 pt-2 mt-1">
                                                      <span className="text-red-300 text-xs">Classes :</span>
                                                      <span className="text-white text-xs opacity-80">{scanDetails[0].classes}</span>
                                                  </div>
                                              </div>
                                          ) : (
                                              /* CAS DE SECOURS : Si jamais le tableau est vide malgré l'alerte */
                                              <p className="text-xs text-red-300 font-bold flex items-center gap-2">
                                                  <AlertTriangle className="w-4 h-4" /> ALERTE : Marque identifiée, mais détails indisponibles.
                                              </p>
                                          )}
                                      </div>
                                  </>
                              ) : (
                                  <p className="text-xs text-gray-400 mb-4">Votre création semble unique. Aucune marque identique détectée.</p>
                              )}

                              <button 
                                onClick={handleAnchor}
                                className={`w-full font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg ${brandStatus === 'warning' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-black hover:bg-gray-200'}`}
                              >
                                  {brandStatus === 'warning' ? 'Forcer la protection (Risqué)' : 'Sécuriser (4.90€)'}
                              </button>
                          </div>
                      )}
                  </div>
              </div>
          )}

          {/* --- ETAPES 3 et 4 inchangées pour l'instant --- */}
          {step === 3 && (
              <div className="max-w-xl mx-auto bg-[#111116] border border-white/10 rounded-3xl p-12 text-center shadow-2xl">
                  <div className="relative w-24 h-24 mx-auto mb-8">
                      <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                      <ShieldCheck className="absolute inset-0 m-auto text-blue-500 w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Ancrage en cours...</h2>
                  <p className="text-gray-500 text-sm">Inscription immuable sur Polygon Network.</p>
              </div>
          )}

          {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in">
                  <div className="bg-[#111116] border border-green-500/30 rounded-3xl p-8 text-center relative overflow-hidden flex flex-col justify-between">
                      <div>
                          <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                              <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <h2 className="text-2xl font-bold mb-2">Protégé à Vie !</h2>
                          <p className="text-gray-400 text-sm mb-6">Certificat Blockchain généré.</p>
                          <div className="bg-black/40 rounded-xl p-4 text-left border border-white/5 mb-6">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-cyan-400 uppercase flex items-center gap-1"><Share2 className="w-3 h-3"/> Safe-Link</span>
                                <span className="text-[10px] text-gray-500">Vue seule • Tatoué</span>
                              </div>
                              <div className="flex gap-2">
                                  <input type="text" value={generatedLink} readOnly className="bg-transparent text-white text-xs w-full outline-none font-mono truncate" />
                                  <button onClick={() => {navigator.clipboard.writeText(generatedLink); setCopied(true)}} className="text-xs font-bold text-white hover:text-cyan-400">
                                      {copied ? 'Copié' : 'Copier'}
                                  </button>
                              </div>
                          </div>
                      </div>
                      <a href="/dashboard" className="block w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-sm font-bold transition-colors">Retour au Dashboard</a>
                  </div>
                  <div className="bg-gradient-to-br from-[#111116] to-red-900/10 border border-red-500/20 rounded-3xl p-8 text-left relative overflow-hidden group flex flex-col justify-between">
                      <div>
                          <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-pulse">Recommandé</div>
                          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 transition-transform">
                              <ScanEye className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Activer le Radar ?</h3>
                          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                              Votre fichier est protégé aujourd'hui. Mais qui le surveille demain ?<br/><br/>
                              <span className="text-white font-bold">Le Radar KeepProof</span> scanne le web 24h/24 pour détecter le vol.
                          </p>
                      </div>
                      <div className="border-t border-white/5 pt-6">
                          <div className="flex items-end gap-2 mb-4">
                              <span className="text-2xl font-bold text-white">9.90€</span>
                              <span className="text-sm text-gray-500 mb-1">/mois</span>
                          </div>
                          <button className="w-full bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-red-900/20 transition-colors flex items-center justify-center gap-2">
                              <ScanEye className="w-4 h-4" /> Activer la Surveillance
                          </button>
                          <p className="text-[10px] text-gray-500 text-center mt-3">Sans engagement.</p>
                      </div>
                  </div>
              </div>
          )}

        </div>
      </div>
    </>
  );
}
