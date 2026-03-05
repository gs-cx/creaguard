export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import QRCode from 'qrcode';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const proofId = params.id;

    const user = await currentUser();
    if (!user) return NextResponse.json({ error: 'Non connecté' }, { status: 401 });

    const proof = await prisma.proof.findUnique({ where: { id: proofId } });

    if (!proof) return NextResponse.json({ error: 'Introuvable' }, { status: 404 });
    if (proof.userId !== user.id) return NextResponse.json({ error: 'Interdit' }, { status: 403 });

    // --- PRÉPARATION DES DONNÉES ---
    // URL vers laquelle le QR Code pointe (Page de vérification future)
    const verifyUrl = `https://keepproof.com/verify/${proof.id}`;
    
    // Génération du QR Code en Buffer (Image PNG)
    const qrCodeBuffer = await QRCode.toBuffer(verifyUrl, { width: 150, margin: 1 });

    // --- CRÉATION DU PDF ---
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();
    
    // Polices
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Intégration du QR Code
    const qrImage = await pdfDoc.embedPng(qrCodeBuffer);

    // --- DESSIN DU DESIGN ---

    // 1. En-tête (Noir)
    page.drawRectangle({
        x: 0, y: height - 100, width: width, height: 100,
        color: rgb(0, 0, 0)
    });

    page.drawText('KEEPPROOF', {
        x: 40, y: height - 50,
        size: 28, font: fontBold, color: rgb(1, 1, 1)
    });

    page.drawText('PROTOCOLE DE CERTIFICATION', {
        x: 40, y: height - 75,
        size: 10, font: fontRegular, color: rgb(0.8, 0.8, 0.8)
    });

    // 2. Titre Principal
    page.drawText('Certificat d\'Antériorité', {
        x: 40, y: height - 150,
        size: 24, font: fontBold, color: rgb(0, 0, 0)
    });
    
    page.drawText('Preuve numérique d\'existence et d\'intégrité', {
        x: 40, y: height - 170,
        size: 12, font: fontRegular, color: rgb(0.5, 0.5, 0.5)
    });

    // Ligne de séparation
    page.drawLine({
        start: { x: 40, y: height - 190 }, end: { x: width - 40, y: height - 190 },
        thickness: 1, color: rgb(0.9, 0.9, 0.9)
    });

    // 3. Blocs d'information (Style "Key-Value")
    let currentY = height - 230;
    const spacing = 50;

    const drawBlock = (label: string, value: string, isMonospace = false) => {
        page.drawText(label.toUpperCase(), {
            x: 40, y: currentY,
            size: 9, font: fontBold, color: rgb(0.4, 0.4, 0.4)
        });
        
        // Si c'est un hash ou ID long, on réduit la taille
        const fontSize = isMonospace ? 10 : 12;
        page.drawText(value, {
            x: 40, y: currentY - 15,
            size: fontSize, font: isMonospace ? fontRegular : fontBold, color: rgb(0, 0, 0)
        });
        
        currentY -= spacing;
    };

    drawBlock('Fichier Protégé', proof.filename);
    drawBlock('Date d\'enregistrement (UTC)', new Date(proof.createdAt).toUTCString());
    drawBlock('Identifiant Unique (UUID)', proof.id, true);
    drawBlock('Empreinte Numérique (SHA-256)', proof.fileHash, true);
    
    // Placeholder pour la Blockchain (Si pas encore ancré, on met "En attente")
    drawBlock('Statut Blockchain', proof.txHash ? proof.txHash : "En attente d'ancrage (Proof of Existence)", true);

    // 4. Zone "Sceau" et QR Code (En bas à droite)
    const qrY = 150;
    page.drawImage(qrImage, {
        x: width - 180,
        y: qrY,
        width: 120,
        height: 120,
    });

    page.drawText('SCELLEMENT', {
        x: width - 180, y: qrY - 15,
        size: 10, font: fontBold, color: rgb(0, 0, 0)
    });
    page.drawText('NUMÉRIQUE', {
        x: width - 180, y: qrY - 27,
        size: 10, font: fontBold, color: rgb(0, 0, 0)
    });

    // 5. Pied de page légal
    const footerY = 60;
    page.drawLine({
        start: { x: 40, y: footerY + 20 }, end: { x: width - 40, y: footerY + 20 },
        thickness: 1, color: rgb(0.9, 0.9, 0.9)
    });

    page.drawText(`Émis le : ${new Date().toLocaleDateString('fr-FR')}`, {
        x: 40, y: footerY,
        size: 9, font: fontBold, color: rgb(0, 0, 0)
    });

    page.drawText('Ce certificat est généré électroniquement par KeepProof SAS.', {
        x: 40, y: footerY - 15,
        size: 8, font: fontRegular, color: rgb(0.5, 0.5, 0.5)
    });
    
    page.drawText('L\'intégrité de ce document est garantie par l\'empreinte numérique du fichier original.', {
        x: 40, y: footerY - 27,
        size: 8, font: fontRegular, color: rgb(0.5, 0.5, 0.5)
    });

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(pdfBytes as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificat_${proof.filename}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error("PDF ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
