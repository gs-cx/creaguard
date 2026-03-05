export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// 1. LA "BIBLE" JURIDIQUE ET TECHNIQUE (Base de connaissances)
// ============================================================================

const KNOWLEDGE_DB = [
  // --- PILIER 1 : LE CODE CIVIL & LA LOI ---
  {
    ids: ["loi_1366", "valeur_legale"],
    keywords: ["loi", "juridique", "legal", "tribunal", "juge", "preuve", "valeur", "code", "civil", "recevable", "justice"],
    title: "⚖️ La Valeur Légale (Article 1366 du Code Civil)",
    content: `Oui, la preuve est parfaitement recevable au tribunal.
    
L'article 1366 du Code Civil stipule que : "L'écrit sous forme électronique a la même force probante que l'écrit sur support papier, sous réserve que puisse être dûment identifiée la personne dont il émane et qu'il soit établi et conservé dans des conditions de nature à en garantir l'intégrité."

KeepProof garantit cette intégrité via la Blockchain (impossible à modifier) et l'horodatage certifié.`
  },
  {
    ids: ["loi_1367", "signature"],
    keywords: ["signature", "electronique", "fiable", "decret", "authentique"],
    title: "✍️ Fiabilité de la signature (Article 1367)",
    content: `La signature électronique consiste en l'usage d'un procédé fiable d'identification garantissant son lien avec l'acte auquel elle s'attache. 
    
En utilisant KeepProof, vous créez une "empreinte numérique" (Hash) qui lie mathématiquement votre identité à votre fichier à un instant précis, répondant aux exigences de fiabilité du Code Civil.`
  },
  {
    ids: ["eidas", "europe"],
    keywords: ["europe", "ue", "eidas", "reglement", "international", "monde", "etranger"],
    title: "🇪🇺 Validité Européenne (Règlement eIDAS)",
    content: `Votre preuve est valable dans toute l'Union Européenne.
    
Le règlement européen eIDAS (n°910/2014) interdit aux juridictions de refuser une preuve électronique au seul motif qu'elle est sous forme numérique. L'horodatage qualifié est reconnu par tous les états membres.`
  },
  {
    ids: ["droit_auteur", "protection"],
    keywords: ["auteur", "droit", "copyright", "proteger", "idee", "creation", "oeuvre", "depot", "inpi"],
    title: "©️ Droit d'auteur vs Dépôt",
    content: `Attention à la confusion : En France, le droit d'auteur naît automatiquement dès la création de l'œuvre. Vous n'avez PAS besoin de déposer pour être protégé (Convention de Berne).
    
Cependant, en cas de procès, c'est à VOUS de prouver que vous étiez le premier. KeepProof ne crée pas le droit (il existe déjà), mais il fournit la PREUVE D'ANTÉRIORITÉ indispensable pour gagner un litige.`
  },

  // --- PILIER 2 : LA TECHNIQUE & SÉCURITÉ ---
  {
    ids: ["hash", "sha256"],
    keywords: ["hash", "empreinte", "technique", "fonctionnement", "math", "calcul", "sha", "256"],
    title: "🧬 Le Hash SHA-256 : L'ADN de votre fichier",
    content: `Nous utilisons l'algorithme SHA-256 (utilisé par les banques et les militaires).
    
Imaginez une moulinette mathématique : elle prend votre fichier et produit une chaîne unique de 64 caractères. Si vous changez une seule virgule ou un pixel dans votre fichier, le Hash change totalement.
C'est ce Hash qui est gravé dans la Blockchain. Il permet de prouver mathématiquement que le fichier n'a pas été modifié depuis son dépôt.`
  },
  {
    ids: ["blockchain", "polygon"],
    keywords: ["blockchain", "chaine", "bloc", "polygon", "public", "centralise", "serveur"],
    title: "⛓️ Pourquoi la Blockchain Polygon ?",
    content: `Nous ancrons les preuves sur la Blockchain publique Polygon. Contrairement à un serveur classique (où un admin peut tricher), la Blockchain est un registre public décentralisé et immuable.
    
Une fois votre preuve inscrite dans un bloc, personne au monde (ni KeepProof, ni un pirate, ni un gouvernement) ne peut la modifier ou l'effacer. C'est une preuve "éternelle".`
  },
  {
    ids: ["privacy", "confidentialite"],
    keywords: ["prive", "confidentialite", "secret", "voir", "lire", "stocker", "rgpd", "donnee", "vendre"],
    title: "🕵️ Confidentialité (Zero-Knowledge)",
    content: `C'est fondamental : KeepProof NE PEUT PAS voir vos fichiers.
    
L'empreinte (Hash) est calculée sur votre ordinateur (dans le navigateur). Seule cette empreinte est envoyée à nos serveurs. Le fichier original ne quitte jamais votre machine. Vous pouvez protéger des secrets industriels ou des données sensibles sans aucun risque.`
  },

  // --- PILIER 3 : DOUTES & "SCÉNARIOS CATASTROPHES" ---
  {
    ids: ["faillite", "disparition"],
    keywords: ["ferme", "faillite", "disparait", "fin", "mort", "societe", "garantie", "perdu"],
    title: "♾️ Et si KeepProof disparaît ?",
    content: `Vos preuves survivent à l'entreprise. C'est la force de la Blockchain décentralisée.
    
Puisque la preuve est gravée sur la Blockchain publique (Polygon) et que vous possédez le fichier original + le certificat PDF (contenant le Hash et les infos d'ancrage), vous pouvez vérifier la validité de votre preuve via n'importe quel outil tiers indépendant, même dans 10 ans, sans nous.`
  },
  {
    ids: ["vie", "duree"],
    keywords: ["temps", "duree", "combien", "annee", "renouvellement", "expire", "validite", "vie"],
    title: "⏳ Durée de validité",
    content: `La preuve est valable À VIE.
    
Contrairement à un dépôt Soleau (valable 5 ou 10 ans) ou un brevet (20 ans), la preuve cryptographique ne périme pas tant que les mathématiques derrière le SHA-256 tiennent la route (ce qui est garanti pour des décennies). Pas d'abonnement à payer pour "maintenir" la preuve.`
  }
];

// ============================================================================
// 2. LE CERVEAU (Moteur de recherche par Scoring)
// ============================================================================

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enlève accents
    .replace(/[?!.,;:'"()]/g, " "); // Enlève ponctuation
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawQuestion = body?.question || "";
    const cleanQuestion = normalize(rawQuestion);
    
    console.log("🔹 Question User :", rawQuestion);

    // 1. Analyse des mots-clés (Scoring)
    let bestMatch = null;
    let highestScore = 0;

    for (const entry of KNOWLEDGE_DB) {
      let score = 0;
      const words = cleanQuestion.split(" ");
      
      // On vérifie chaque mot de la question
      for (const word of words) {
        if (word.length < 3) continue; // On ignore les petits mots (le, la, de...)
        if (entry.keywords.some(kw => normalize(kw) === word || normalize(kw).includes(word))) {
          score += 10; // +10 points par mot-clé pertinent trouvé
        }
      }

      // Bonus si la phrase contient des séquences exactes (ex: "valeur légale")
      if (cleanQuestion.includes("legal") || cleanQuestion.includes("loi")) {
         if (entry.ids.includes("loi_1366")) score += 20;
      }
      if (cleanQuestion.includes("disparait") || cleanQuestion.includes("ferme")) {
         if (entry.ids.includes("faillite")) score += 30;
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    // 2. Construction de la réponse
    let finalResponse = "";

    // Seuil de déclenchement (pour éviter les faux positifs)
    if (highestScore >= 10 && bestMatch) {
      finalResponse = `${bestMatch.title}\n\n${bestMatch.content}`;
    } else {
      // Fallback (Réponse par défaut pédagogique)
      finalResponse = `🤔 Je n'ai pas trouvé de réponse précise dans ma base juridique pour cette question spécifique.

Cependant, voici les principes clés de KeepProof qui pourraient vous aider :
1. **Légal :** Conforme Code Civil Art. 1366 & Règlement eIDAS.
2. **Technique :** Ancrage infalsifiable sur Blockchain Polygon via SHA-256.
3. **Confidentialité :** Zero-Knowledge (nous ne voyons jamais vos fichiers).

Essayez de reformuler avec des termes comme "loi", "durée", "confidentialité" ou "technique".`;
    }

    return NextResponse.json({ answer: finalResponse });

  } catch (error) {
    console.error("Erreur API AI:", error);
    return NextResponse.json({ answer: "Erreur interne du système expert." }, { status: 500 });
  }
}
