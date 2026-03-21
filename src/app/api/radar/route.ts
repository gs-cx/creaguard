import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    // L'adresse de votre usine OVH (remplacez par votre vraie IP)
    const vpsUrl = "http://51.91.196.115.nip.io:8080/api/radar/audit";
    
    // On prépare le colis pour l'OVH
    const vpsFormData = new FormData();
    vpsFormData.append('file', file);

    // On tire vers le radar
    const vpsResponse = await fetch(vpsUrl, {
      method: 'POST',
      body: vpsFormData,
    });

    if (!vpsResponse.ok) {
      throw new Error(`Erreur du moteur IA : ${vpsResponse.status}`);
    }

    const data = await vpsResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Erreur Proxy Radar:", error);
    return NextResponse.json({ error: "Le radar est temporairement indisponible." }, { status: 500 });
  }
}
