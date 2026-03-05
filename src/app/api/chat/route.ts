export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const maxDuration = 60;
export const dynamic = 'force-dynamic'; 

const prisma = new PrismaClient();

async function searchDatabase(keyword: string) {
    try {
        const cleanKeyword = keyword.trim();
        const searchTerm = `%${cleanKeyword}%`; 

        console.log(`🔍 [SQL] Recherche pour : "${cleanKeyword}"`);

        // On récupère Titre, ID, Déposant ET le nom du fichier image
        const results: any[] = await prisma.$queryRaw`
            SELECT num_enregistrement, titre, image_file, deposant, description
            FROM "inpi_design"
            WHERE (titre ILIKE ${searchTerm}) 
               OR (deposant ILIKE ${searchTerm})
               OR (description ILIKE ${searchTerm})
            LIMIT 5;
        `;

        if (results.length > 0) {
            // On prépare un format très facile à lire pour l'IA
            return results.map(r => 
                `ELEMNENT_TROUVE: ID=${r.num_enregistrement} | TITRE="${r.titre}" | DEPOSANT="${r.deposant}"`
            ).join('\n');
        }
        return null;

    } catch (e: any) {
        console.error("🔥 Erreur SQL:", e.message);
        return null;
    }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question } = body; 

    // 1. Extraction simple
    const words = question.toLowerCase().replace(/[?,.]/g, '').split(/\s+/);
    const forbidden = ['est', 'que', 'les', 'des', 'pour', 'sur', 'une', 'avec', 'dans', 'base', 'données', 'cherche', 'trouve', 'montre', 'peux', 'dire', 'bonjour', 'salut', 'il', 'y', 'a', 't', 'de'];
    const meaningfulWords = words.filter((w: string) => !forbidden.includes(w) && w.length > 2);
    const targetWord = meaningfulWords.length > 0 ? meaningfulWords[meaningfulWords.length - 1] : "";

    let dbContext = "AUCUN RESULTAT.";
    
    if (targetWord) {
        const searchResult = await searchDatabase(targetWord);
        if (searchResult) {
            dbContext = searchResult;
        }
    }

    // 2. Le PROMPT "MILITAIRE"
    // On interdit à l'IA de faire des phrases de politesse
    const finalPrompt = `
    RÔLE : Tu es un moteur de recherche strict.
    
    INSTRUCTION : 
    1. Si tu reçois une liste commençant par "ELEMNENT_TROUVE", tu dois l'afficher sous forme de liste à puces.
    2. NE DIS PAS "Bonjour", "Je suis désolé", ou "Voici les résultats". Affiche DIRECTEMENT la liste.
    3. Format obligatoire pour chaque puce :
       - 📂 **[Titre]** (N° [ID]) - *[Déposant]*

    DONNÉES À TRAITER :
    ${dbContext}

    Si les données sont "AUCUN RESULTAT", réponds juste : "Aucun dessin trouvé pour ce terme."
    `;

    // 3. Appel Ollama
    const response = await fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral:latest',
        messages: [{ role: "user", content: finalPrompt }],
        stream: false,
        options: { temperature: 0.0 } // 0.0 = Robotique pure, aucune créativité
      }),
      signal: AbortSignal.timeout(60000)
    });

    if (!response.ok) throw new Error(`Ollama Error`);
    const data = await response.json();
    
    return NextResponse.json({ answer: data.message.content });

  } catch (error) {
    return NextResponse.json({ answer: "Erreur technique." });
  }
}
