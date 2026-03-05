export const runtime = 'edge';
import { NextResponse } from 'next/server';

// ⚠️ VOTRE CLÉ API GOOGLE (Conservée)
const GOOGLE_API_KEY = "AIzaSyDnRKr10jyCwHww7BMIoX1XEkSSGYHr-I0"; 

const BLACKLIST = [
    "the", "this", "that", "logo", "brand", "image", "text", "scan", "features", "shape", 
    "color", "background", "white", "black", "blue", "red", "yellow", "green", "gold", 
    "silver", "design", "style", "modern", "classic", "french", "symbol", "icon", 
    "vector", "illustration", "photo", "bank", "company", "name", "associated", "overall",
    "simple", "effective", "message", "conveying", "displayed", "below", "center", 
    "is", "a", "an", "of", "for", "in", "on", "at", "to", "by", "with", "from", "identify",
    "output", "only", "read", "exact", "sign", "feature", "graphic", "element", "web", "site"
];

function generateNGrams(words: string[]) {
    const ngrams: string[] = [];
    for (let i = 0; i < words.length; i++) {
        ngrams.push(words[i]); 
        if (i < words.length - 1) ngrams.push(`${words[i]} ${words[i+1]}`); 
        if (i < words.length - 2) ngrams.push(`${words[i]} ${words[i+1]} ${words[i+2]}`); 
        if (i < words.length - 3) ngrams.push(`${words[i]} ${words[i+1]} ${words[i+2]} ${words[i+3]}`); 
    }
    return ngrams;
}

function extractSmartKeywords(text: string) {
    if (!text) return [];
    const rawText = text.replace(/[^a-zA-Z0-9À-ÿ ]/g, " ");
    const words = rawText.split(/\s+/);
    const validWords: string[] = [];

    words.forEach(w => {
        const cleanW = w.trim();
        const lowerW = cleanW.toLowerCase();
        if (BLACKLIST.includes(lowerW)) return;
        if (cleanW.length < 2 && isNaN(Number(cleanW))) return;
        if (cleanW.length === 2 && !/^[A-Z0-9]/.test(cleanW)) return;
        validWords.push(cleanW);
    });

    const candidates = generateNGrams(validWords);
    const uniqueCandidates = [...new Set(candidates)];
    return uniqueCandidates.sort((a, b) => b.length - a.length);
}

// FONCTION FETCH (GEMINI) - CONSERVÉE
async function analyzeWithGemini(base64Image: string) {
    try {
        console.log("⚡ MODE: DIRECT FETCH (Gemini 2.5 Flash)...");
        const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
        
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`;
        
        const payload = {
            contents: [{
                parts: [
                    { text: "Look at this image. Identify the brand or logo. Read strictly the text written inside. Output only the brand name found. If no text is visible, output nothing." },
                    { inline_data: { mime_type: "image/jpeg", data: cleanBase64 } }
                ]
            }]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Erreur HTTP ${response.status}: ${errorData}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        
        console.log(`✨ Gemini a vu : "${text.trim()}"`);
        return text;

    } catch (error: any) {
        console.error("❌ ERREUR FETCH:", error.message);
        return null;
    }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, imageBase64 } = body; 
    
    console.log(`\n🔍 SCAN DIRECT : ${name}`);

    let score = 100; 
    let report: any[] = [];
    let brandDetails: any[] = [];
    let potentialBrands: string[] = [];
    let geminiText = "";

    // 1. ANALYSE IA (GEMINI)
    if (imageBase64 && type.startsWith('image/')) {
        geminiText = await analyzeWithGemini(imageBase64) || "";
        
        if (!geminiText || geminiText.trim().length < 2) {
            console.log("🟢 Aucun texte détecté par l'IA. Arrêt du scan.");
            return NextResponse.json({
                score: 100,
                report: [{ label: "Aucun texte ou logo détecté sur l'image.", status: "success" }],
                details: []
            });
        }

        extractSmartKeywords(geminiText).forEach(k => potentialBrands.push(k));
    }

    // 2. NETTOYAGE
    if (potentialBrands.some(b => b.length > 5)) {
        potentialBrands = potentialBrands.filter(b => b.toLowerCase() !== 'nike' && b.toLowerCase() !== 'latfl');
    }
    
    potentialBrands = [...new Set(potentialBrands)].sort((a, b) => b.length - a.length);
    console.log("📋 LISTE FINALE :", potentialBrands);

    // 3. RECHERCHE SUR LE NOUVEAU SERVEUR OVH
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.CREAGUARD_API_KEY || '';

    if (!apiUrl) throw new Error("API OVH non configurée dans le .env");

    let matchFound = false;
    for (const term of potentialBrands) {
        if (term.length < 2) continue; 
        try {
            // Requête vers OVH avec notre clé secrète
            const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(term)}`, {
                headers: { 'x-api-key': apiKey }
            });

            if (!response.ok) continue;

            const searchData = await response.json();
            const hits = searchData.hits || searchData; // S'adapte au format de réponse OVH
            
            if (hits && hits.length > 0) {
                let bestHit = null;
                for (const hit of hits) {
                    if (hit.name.toLowerCase() === term.toLowerCase()) {
                        bestHit = hit; break;
                    }
                    if (term.length > 3 && hit.name.toLowerCase().includes(term.toLowerCase())) {
                        if (!bestHit) bestHit = hit;
                    }
                }
                
                if (bestHit) {
                    console.log(`🚨 ALERTE : "${bestHit.name}" (via "${term}")`);
                    score = 1; 

                    const titulaire = bestHit.owner || bestHit.titulaire || bestHit.deposant || bestHit.applicant || "Non identifié";
                    const dateDepot = bestHit.date || bestHit.date_depot || bestHit.registration_date || bestHit.date_enregistrement || "Inconnue";
                    const classesNice = bestHit.classes || bestHit.nice_classes || bestHit.classe || bestHit.nice || "N/A";

                    report.push({ 
                        label: `⛔ ALERTE : Marque "${bestHit.name}" détectée !`, 
                        status: "danger" 
                    });
                    
                    report.push({ label: `👤 Propriétaire : ${titulaire}`, status: "danger" });
                    report.push({ label: `📅 Date dépôt : ${dateDepot}`, status: "danger" });
                    report.push({ label: `🗂️ Classes : ${classesNice}`, status: "danger" });

                    brandDetails.push({ 
                        texte: bestHit.name, 
                        statut: 'Déposée (INPI/EUIPO)',
                        date: dateDepot,
                        classes: classesNice,
                        titulaire: titulaire
                    });
                    
                    matchFound = true;
                    break; 
                }
            }
        } catch (error) { console.error("Erreur de connexion à OVH:", error); }
    }

    if (!matchFound) {
        report.push({ label: "Aucune correspondance trouvée", status: "success" });
    }

    return NextResponse.json({ score, report, details: brandDetails });

  } catch (error) {
    console.error("CRASH:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
