export const runtime = 'edge';
import { NextResponse } from 'next/server';
import axios from 'axios';

// C'EST CETTE LIGNE QUI CORRIGE L'ERREUR DE BUILD
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json({ error: 'URL manquante' }, { status: 400 });
    }

    // Le serveur télécharge l'image
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0' 
      }
    });

    const contentType = response.headers['content-type'] || 'image/jpeg';
    
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Erreur Proxy:', error);
    return NextResponse.json({ error: "Impossible de récupérer l'image." }, { status: 500 });
  }
}
