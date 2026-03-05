export const runtime = 'edge';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
    }

    // On prépare l'envoi vers le nouveau serveur Python (OVH)
    const pythonFormData = new FormData();
    pythonFormData.append('image', file);

    // On récupère l'URL et la clé secrète depuis le fichier .env
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.CREAGUARD_API_KEY || '';

    if (!apiUrl) {
      throw new Error("L'adresse de l'API OVH (NEXT_PUBLIC_API_URL) n'est pas définie dans le .env");
    }

    // Le fameux "fetch" corrigé vers OVH avec la clé de sécurité
    const response = await fetch(`${apiUrl}/search`, {
      method: 'POST',
      body: pythonFormData,
      headers: {
        'x-api-key': apiKey // On montre patte blanche au videur OVH
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur serveur OVH (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("❌ Erreur API Visual Search:", error);
    return NextResponse.json({ 
      error: "Erreur de connexion au moteur IA CreaGuard. Vérifiez que le serveur OVH est allumé." 
    }, { status: 500 });
  }
}
