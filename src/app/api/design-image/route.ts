import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name'); // Il s'agit du numéro INPI

  if (!name) {
    return new NextResponse('Nom d\'image manquant', { status: 400 });
  }

  const apiKey = process.env.CREAGUARD_API_KEY || '';
  const host = 'https://api.creaguard.com';
  
  // L'adresse exacte de la route d'image sur votre serveur Python
  const urlFull = `${host}/image/marque/${name}`;

  try {
    const res = await fetch(urlFull, {
      method: 'GET',
      headers: { 
        'x-api-key': apiKey, 
        'Authorization': `Bearer ${apiKey}` 
      },
      cache: 'public', // On autorise la mise en cache pour accélérer le site
    });

    if (!res.ok) {
      return new NextResponse('Image introuvable', { status: res.status });
    }

    // Récupération des données binaires de l'image
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400' // Garde l'image en mémoire pendant 24h
      },
    });
  } catch (error: any) {
    return new NextResponse('Erreur de connexion', { status: 500 });
  }
}
