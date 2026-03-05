export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

// Correction Next.js 15 : params est une Promise
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const proofId = params.id;

    // Vérification de sécurité
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Non connecté' }, { status: 401 });
    }

    // Récupération BDD
    const proof = await prisma.proof.findUnique({
      where: { id: proofId },
    });

    if (!proof) {
      return NextResponse.json({ error: 'Preuve introuvable' }, { status: 404 });
    }

    if (proof.userId !== user.id) {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }

    // --- GÉNÉRATION PDF ---
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Cadre élégant
    page.drawRectangle({
      x: 20, y: 20, width: width - 40, height: height - 40,
      borderColor: rgb(0.1, 0.1, 0.1), borderWidth: 1,
    });
    
    // Logo en haut
    page.drawText('KEEPPROOF', { x: 50, y: height - 80, size: 24, font: fontBold, color: rgb(0, 0, 0) });
    page.drawText('CERTIFICAT DE PREUVE NUMÉRIQUE', { x: 50, y: height - 110, size: 14, font: font, color: rgb(0.3, 0.3, 0.8) });

    // Ligne de séparation
    page.drawLine({
        start: { x: 50, y: height - 130 }, end: { x: width - 50, y: height - 130 },
        thickness: 1, color: rgb(0.8, 0.8, 0.8),
    });

    // Données
    const startY = height - 180;
    const gap = 40;

    const drawField = (label: string, value: string, idx: number) => {
        const yPos = startY - (idx * gap);
        page.drawText(label.toUpperCase(), { x: 50, y: yPos, size: 8, font: font, color: rgb(0.5, 0.5, 0.5) });
        page.drawText(value, { x: 50, y: yPos - 15, size: 12, font: fontBold, color: rgb(0, 0, 0) });
    };

    drawField('Nom du fichier', proof.filename, 0);
    drawField('Empreinte Numérique (SHA-256)', proof.fileHash, 1);
    drawField('Date de certification', new Date(proof.createdAt).toLocaleString('fr-FR'), 2);
    drawField('Identifiant de preuve', proof.id, 3);
    drawField('Propriétaire du compte', user.emailAddresses[0]?.emailAddress || proof.userId, 4);

    // Pied de page légal
    page.drawText('Ce document certifie que le fichier correspondant à l\'empreinte numérique ci-dessus', { x: 50, y: 100, size: 9, font: font, color: rgb(0.4, 0.4, 0.4) });
    page.drawText('a été enregistré de manière immuable dans nos systèmes à la date indiquée.', { x: 50, y: 88, size: 9, font: font, color: rgb(0.4, 0.4, 0.4) });
    
    page.drawText('KeepProof.com - Sécurité et Antériorité', { x: 50, y: 40, size: 8, font: font, color: rgb(0.7, 0.7, 0.7) });

    // Envoi
    const pdfBytes = await pdfDoc.save();
    
    // ICI : Ajout de "as any" pour corriger l'erreur de build
    return new NextResponse(pdfBytes as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificat_${proof.filename}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error("PDF ERROR:", error);
    return NextResponse.json({ error: 'Erreur technique: ' + error.message }, { status: 500 });
  }
}
