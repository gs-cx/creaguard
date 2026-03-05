export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = parseInt(searchParams.get('offset') || '0');

    let designs = [];
    let count = 0;

    if (!query) {
      designs = await prisma.inpi_Design.findMany({
        take: limit,
        skip: offset,
        orderBy: { date: 'desc' }
      });
      count = 1000;
    } else {
      designs = await prisma.inpi_Design.findMany({
        where: {
          OR: [
            { titre: { contains: query, mode: 'insensitive' } },
            { deposant: { contains: query, mode: 'insensitive' } },
            { num_enregistrement: { contains: query, mode: 'insensitive' } },
          ]
        },
        take: limit,
        skip: offset,
        orderBy: { date: 'desc' },
      });
      count = await prisma.inpi_Design.count({
        where: {
           OR: [
            { titre: { contains: query, mode: 'insensitive' } },
            { deposant: { contains: query, mode: 'insensitive' } },
          ]
        }
      });
    }

    const formattedResults = designs.map(d => ({
        ...d,
        title: d.titre || 'Sans titre',
        nomMarque: d.titre,
        numDepot: d.num_enregistrement,
        dateDepot: d.date,
        demandeur: d.deposant,
        imageUrl: d.image_file ? d.image_file : '/placeholder.png', 
        image: d.image_file ? d.image_file : '/placeholder.png'
    }));

    return NextResponse.json({ 
      hits: formattedResults, 
      estimatedTotalHits: count, 
      processingTimeMs: 10 
    });
  } catch (error: any) {
    console.error("ERREUR API:", error);
    return NextResponse.json({ error: "Erreur", details: error.message }, { status: 500 });
  }
}
