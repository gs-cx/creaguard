import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [], error: "Aucune recherche demandée" });
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.CREAGUARD_API_KEY;

    if (!apiUrl) {
      return NextResponse.json({ results: [], error: "URL OVH introuvable dans Cloudflare. Vérifiez vos variables d'environnement." });
    }

    const ovhUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    const testUrl1 = `${ovhUrl}/api/search?q=${encodeURIComponent(query)}`;
    
    let res;
    try {
      // Cloudflare tente de joindre OVH
      res = await fetch(testUrl1, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey || '',
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (fetchError: any) {
       // Si le serveur OVH est éteint, ou le port 8000 bloqué par un pare-feu
       return NextResponse.json({ results: [], error: `Impossible de joindre OVH (Port fermé ou serveur éteint ?). Détail : ${fetchError.message}` });
    }

    if (!res.ok) {
      const testUrl2 = `${ovhUrl}/search?q=${encodeURIComponent(query)}`;
      res = await fetch(testUrl2, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey || '',
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
         const errorText = await res.text();
         return NextResponse.json({ results: [], error: `OVH a refusé la connexion. Code HTTP: ${res.status}. Message: ${errorText}` });
      }
    }

    const data = await res.json();
    return NextResponse.json({ results: data.results || data, success: true });

  } catch (error: any) {
    return NextResponse.json({ results: [], error: `Crash interne du Proxy: ${error.message}` });
  }
}
