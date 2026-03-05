export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret');
    
    // 1. Vérification
    if (secret !== 'keepproof_admin_2026') {
      return NextResponse.json({ error: 'Token Invalide' }, { status: 401 });
    }

    // 2. Redirection VERS LE DOMAINE PUBLIC (Correction du bug 0.0.0.0)
    const response = NextResponse.redirect('https://keepproof.com');
    
    // 3. Pose du cookie
    response.cookies.set('maintenance_bypass', 'true', {
      path: '/',
      maxAge: 2592000, // 30 jours
      httpOnly: true,
      sameSite: 'lax'
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
