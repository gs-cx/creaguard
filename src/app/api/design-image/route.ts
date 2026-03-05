export const runtime = 'edge';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// --- CHARGEMENT DE L'INDEX RÉEL ---
let realImagesIndex: Record<string, string> | null = null;
const INDEX_PATH = '/root/frontend/real-images.json';

function getRealFilename(requestedName: string): string | null {
    if (!realImagesIndex && fs.existsSync(INDEX_PATH)) {
        try {
            const data = fs.readFileSync(INDEX_PATH, 'utf8');
            realImagesIndex = JSON.parse(data);
        } catch (e) { console.error("Err index", e); }
    }
    if (!realImagesIndex) return null;

    const match = requestedName.match(/(\d+)/);
    if (match) {
        const id = parseInt(match[1], 10).toString();
        if (realImagesIndex[id]) return realImagesIndex[id];
    }
    return null;
}

// --- GÉNÉRATEUR D'IMAGE DE REMPLACEMENT (SVG) ---
function getPlaceholderImage(text: string) {
    const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1a1a20"/>
        <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#555" text-anchor="middle" dy=".3em">
            ${text}
        </text>
        <text x="50%" y="65%" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">
            Archive non numérisée
        </text>
    </svg>`;
    return new NextResponse(svg, {
        headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=3600' }
    });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawName = searchParams.get('name');

    if (!rawName) return getPlaceholderImage("Référence manquante");

    const baseDir = '/root/inpi_designs_backlog';
    let fileNameToServe = path.basename(rawName);

    // 1. Vérification directe
    if (!fs.existsSync(path.join(baseDir, fileNameToServe))) {
        // 2. Vérification via Index Intelligent
        const smartName = getRealFilename(rawName);
        if (smartName) {
            fileNameToServe = smartName;
        } else {
            // 3. ECHEC FINAL -> On envoie l'image Placeholder au lieu du 404
            console.log(`⚠️ Image manquante (placeholder servi) : ${rawName}`);
            return getPlaceholderImage("Image non disponible");
        }
    }

    const filePath = path.join(baseDir, fileNameToServe);
    
    // Ultime vérification
    if (!fs.existsSync(filePath)) {
        return getPlaceholderImage("Fichier introuvable");
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });

  } catch (error) {
    console.error(error);
    return getPlaceholderImage("Erreur Serveur");
  }
}
