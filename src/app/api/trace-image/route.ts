import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // On cible par défaut la vieille archive Peugeot de 1978 qui nous pose problème
  const name = searchParams.get('name') || '1076731'; 

  const apiKey = process.env.CREAGUARD_API_KEY || '';
  const urlFull = `https://api.creaguard.com/image/marque/${name}`;

  try {
    const start = Date.now();
    
    // On attaque directement OVH sans aucun cache
    const res = await fetch(urlFull, {
      method: 'GET',
      headers: { 'x-api-key': apiKey, 'Authorization': `Bearer ${apiKey}` },
      cache: 'no-store'
    });
    
    const duration = Date.now() - start;
    const status = res.status;
    const headers = Object.fromEntries(res.headers.entries());
    
    let bodySnippet = "";
    
    // Si c'est une vraie image, on le dit. Sinon, on lit l'erreur de Python.
    if (headers['content-type'] && headers['content-type'].includes('image')) {
        bodySnippet = "[SUCCÈS: DONNÉES BINAIRES DE L'IMAGE REÇUES]";
    } else {
        bodySnippet = await res.text();
    }

    // Le rapport d'autopsie complet
    return NextResponse.json({
        "1_DIAGNOSTIC": "SONDE DE TRACAGE MAXIMUM ACTIVEE",
        "2_CIBLE_OVH": urlFull,
        "3_TEMPS_REPONSE_MS": duration,
        "4_CODE_HTTP_PYTHON": status,
        "5_REPONSE_BRUTE_PYTHON": bodySnippet,
        "6_ENTETES_RESEAU": headers
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
        "1_DIAGNOSTIC": "CRASH FATAL DU RESEAU CLOUDFLARE",
        "2_CIBLE_OVH": urlFull,
        "3_ERREUR": error.message
    }, { status: 500 });
  }
}
