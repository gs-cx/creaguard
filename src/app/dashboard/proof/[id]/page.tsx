'use client';
export const runtime = 'edge';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import QRCode from 'qrcode';

interface Proof {
  id: string;
  file_name: string;
  status: string;
  created_at: string;
  file_hash_sha256: string;
  user_id: string;
  tx_hash?: string;
}

export default function ProofDetails() {
  const params = useParams();
  const [proof, setProof] = useState<Proof | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const fetchProof = async () => {
      try {
        const res = await fetch(`https://keepproof.com/api/proof/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProof(data);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProof();
  }, [params.id]);

  const downloadPDF = async () => {
    if (!proof) return;
    setIsGeneratingPdf(true);

    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      
      // --- 1. EN-TÊTE ---
      let y = 25;
      
      // Logo Texte (En haut à gauche)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(20, 20, 20);
      doc.text("KEEPPROOF", 20, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text("PROTOCOLE DE CERTIFICATION", 20, y + 5);

      // Date d'émission du PDF (En haut à droite)
      const printDate = new Date().toLocaleDateString('fr-FR');
      doc.text(`Émis le : ${printDate}`, width - 20, y, { align: "right" });

      // Ligne de séparation
      y += 15;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(20, y, width - 20, y);

      // --- 2. TITRE OFFICIEL (Police Serif "Times" pour l'aspect juridique) ---
      y += 20;
      doc.setFont("times", "bold");
      doc.setFontSize(24);
      doc.setTextColor(0, 0, 0);
      doc.text("Certificat d'Antériorité", width / 2, y, { align: "center" });

      y += 10;
      doc.setFont("times", "italic");
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.text("Preuve numérique d'existence et d'intégrité", width / 2, y, { align: "center" });

      // --- 3. INFORMATIONS (Layout 2 Colonnes) ---
      y += 25;
      const col1X = 20;
      const col2X = 110; // Milieu de page environ

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      
      // Labels
      doc.text("FICHIER PROTÉGÉ", col1X, y);
      doc.text("DATE D'ENREGISTREMENT (UTC)", col2X, y);

      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);

      // Valeurs (Nom du fichier et Date formatée proprement)
      // On coupe le nom du fichier s'il est trop long pour la colonne
      const splitName = doc.splitTextToSize(proof.file_name, 80); 
      doc.text(splitName, col1X, y);

      // Formatage date ISO pour faire pro (YYYY-MM-DD HH:MM:SS)
      const dateObj = new Date(proof.created_at);
      const dateStr = dateObj.toISOString().replace('T', ' ').substring(0, 19) + " UTC";
      doc.text(dateStr, col2X, y);

      // Ajustement de Y si le nom de fichier prend plusieurs lignes
      y += (splitName.length * 5) + 15;

      // UUID
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text("IDENTIFIANT UNIQUE (UUID)", 20, y);
      
      y += 6;
      doc.setFont("courier", "normal"); // Courier pour les codes
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(proof.id, 20, y);
      y += 15;

      // --- 4. SECTION TECHNIQUE (Cadre gris léger pour les Hashs) ---
      
      // Fonction pour dessiner un bloc de hash
      const drawHashBlock = (label: string, value: string) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          doc.setTextColor(120, 120, 120);
          doc.text(label.toUpperCase(), 20, y);
          y += 5;

          doc.setFont("courier", "normal");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          
          // Découpage du hash
          const splitHash = doc.splitTextToSize(value, width - 40);
          doc.text(splitHash, 20, y);
          
          y += (splitHash.length * 5) + 10;
      };

      drawHashBlock("Empreinte Numérique (SHA-256)", proof.file_hash_sha256);

      if (proof.tx_hash) {
          drawHashBlock("Transaction Blockchain (Polygon Network)", proof.tx_hash);
      }

      // --- 5. SCEAU ET PIED DE PAGE ---
      const footerY = height - 50;

      // Dessin du Sceau (Cercle + Texte) en bas à gauche
      const sealX = 35;
      const sealY = footerY + 15;
      
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.circle(sealX, sealY, 12, 'S'); // Cercle extérieur
      doc.setLineWidth(0.2);
      doc.circle(sealX, sealY, 11, 'S'); // Cercle intérieur
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6);
      doc.text("SCELLEMENT", sealX, sealY - 2, { align: "center" });
      doc.text("NUMÉRIQUE", sealX, sealY + 2, { align: "center" });
      doc.setFontSize(5);
      doc.text("KEEPPROOF", sealX, sealY + 6, { align: "center" });

      // QR Code en bas à droite
      const qrSize = 25;
      const verificationUrl = `https://keepproof.com/verify/${proof.id}`;
      try {
        const qrDataUrl = await QRCode.toDataURL(verificationUrl, { margin: 0, color: { dark: '#000000', light: '#ffffff' } });
        doc.addImage(qrDataUrl, 'PNG', width - qrSize - 20, footerY, qrSize, qrSize);
      } catch (err) {}

      // Texte légal centré en bas
      doc.setFont("times", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      
      const legalText = "Ce certificat est généré électroniquement par KeepProof SAS. L'intégrité de ce document est garantie par la technologie blockchain.";
      doc.text(legalText, width / 2, height - 10, { align: "center" });

      doc.save(`Certificat_KeepProof_${proof.id.slice(0, 8)}.pdf`);

    } catch (error) {
      console.error("Erreur PDF:", error);
      alert("Erreur PDF");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Chargement...</div>;
  if (!proof) return <div className="text-white text-center mt-20">Preuve introuvable.</div>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-[#111116] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Certificat Disponible</h1>
            <div className="text-green-500 text-sm border border-green-500/30 px-3 py-1 rounded-full bg-green-500/10">
                ● Prêt
            </div>
        </div>
        
        {/* Aperçu rapide */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/5 mb-8">
             <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">Fichier</p>
                    <p className="text-white font-medium truncate">{proof.file_name}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">Date</p>
                    <p className="text-white font-medium">{new Date(proof.created_at).toLocaleDateString()}</p>
                </div>
             </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={downloadPDF}
            disabled={isGeneratingPdf}
            className="flex-1 bg-white text-black px-6 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg"
          >
            {isGeneratingPdf ? 'Création...' : 'Télécharger le Certificat Officiel'}
          </button>
          
          <button 
            onClick={() => window.history.back()} 
            className="px-6 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}
