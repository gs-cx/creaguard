export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

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

    if (!proof) return NextResponse.json({ error: 'Preuve introuvable' }, { status: 404 });
    if (proof.userId !== user.id) return NextResponse.json({ error: 'Interdit' }, { status: 403 });

    // Génération PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawRectangle({ x: 20, y: 20, width: width - 40, height: height - 40, borderColor: rgb(0,0,0), borderWidth: 1 });
    page.drawText('KEEPPROOF CERTIFICAT', { x: 50, y: height - 80, size: 24, font: fontBold });
    
    const drawField = (l: string, v: string, y: number) => {
        page.drawText(l, { x: 50, y, size: 10, font: font, color: rgb(0.5,0.5,0.5) });
        page.drawText(v, { x: 50, y: y-15, size: 12, font: fontBold, color: rgb(0,0,0) });
    };

    drawField('Fichier', proof.filename, height - 150);
    drawField('Hash SHA-256', proof.fileHash, height - 200);
    drawField('Date', new Date(proof.createdAt).toLocaleString(), height - 250);
    drawField('ID Preuve', proof.id, height - 300);

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(pdfBytes as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificat_${proof.filename}.pdf"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
