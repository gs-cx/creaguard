import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question } = body; 

    // 1. Analyse sémantique (Le "Cerveau") : Extraction du mot clé de la phrase
    const words = question.toLowerCase().replace(/[?,.]/g, '').split(/\s+/);
    const forbidden = ['est', 'que', 'les', 'des', 'pour', 'sur', 'une', 'avec', 'dans', 'base', 'données', 'cherche', 'trouve', 'montre', 'peux', 'dire', 'bonjour', 'salut', 'il', 'y', 'a', 't', 'de', 'je', 'un', 'une'];
    const meaningfulWords = words.filter((w: string) => !forbidden.includes(w) && w.length > 2);
    const targetWord = meaningfulWords.length > 0 ? meaningfulWords[meaningfulWords.length - 1] : "";

    if (!targetWord) {
        return NextResponse.json({ answer: "Veuillez préciser votre recherche avec des mots-clés (ex: montre, dior, apple)." });
    }

    // 2. Interrogation directe de notre base de données OVH débridée !
    const apiKey = process.env.CREAGUARD_API_KEY || '';
    const urlFull = `https://api.creaguard.com/recherche/marque/${encodeURIComponent(targetWord)}?limit=5`;

    const res = await fetch(urlFull, {
      method: 'GET',
      headers: { 'x-api-key': apiKey, 'Authorization': `Bearer ${apiKey}` },
      cache: 'no-store'
    });

    if (!res.ok) {
        return NextResponse.json({ answer: "Mon accès aux archives OVH est temporairement perturbé." });
    }

    const data = await res.json();
    const hits = Array.isArray(data) ? data : (data.resultats || data.hits || data.results || []);

    if (hits.length === 0) {
        return NextResponse.json({ answer: `Je n'ai trouvé aucune archive correspondant à "**${targetWord}**" dans notre base de données INPI.` });
    }

    // 3. Formatage "Assistant IA" des résultats
    let answer = `Voici les principales archives que j'ai identifiées pour "**${targetWord}**" :\n\n`;
    
    hits.forEach((r: any) => {
        const titre = `Marque : ${targetWord.toUpperCase()}`;
        const deposant = r.statut || "Statut inconnu";
        answer += `- 📂 **${titre}** (N° INPI : ${r.numero})\n  *Statut : ${deposant}*\n\n`;
    });

    answer += `Voulez-vous que j'affine cette recherche ou que j'analyse une autre marque ?`;

    return NextResponse.json({ answer });

  } catch (error) {
    return NextResponse.json({ answer: "Erreur technique de connexion au serveur d'archives." });
  }
}
