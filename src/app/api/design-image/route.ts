import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) return new NextResponse('Nom manquant', { status: 400 });

  const apiKey = process.env.CREAGUARD_API_KEY || '';
  const urlFull = `https://api.creaguard.com/image/marque/${name}`;

  try {
    const res = await fetch(urlFull, {
      method: 'GET',
      headers: { 'x-api-key': apiKey, 'Authorization': `Bearer ${apiKey}` },
      cache: 'no-store'
    });

    if (!res.ok) {
      const txt = await res.text();
      return new NextResponse(`Refus OVH ${res.status}: ${txt}`, { status: res.status });
    }

    let contentType = res.headers.get('content-type') || 'image/jpeg';
    if (contentType.includes('application/octet-stream')) {
      contentType = 'image/jpeg';
    }

    // 🚨 LE CHANGEMENT MAGIQUE : ON UTILISE res.body (STREAM) AU LIEU DE arrayBuffer
    // Cela empêche la mémoire de Cloudflare de saturer !
    return new NextResponse(res.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=86400'
      },
    });
  } catch (error: any) {
    return new NextResponse(`Crash Cloudflare: ${error.message}`, { status: 500 });
  }
}
