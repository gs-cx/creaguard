export const runtime = 'edge';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import sharp from 'sharp';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DATA_DIR = '/root/inpi_designs_backlog';
const MAP_FILE = '/root/image-map.json';

let imageMapCache = null;

function getMap() {
    if (imageMapCache) return imageMapCache;
    try {
        if (fs.existsSync(MAP_FILE)) {
            const fileContent = fs.readFileSync(MAP_FILE, 'utf8');
            imageMapCache = JSON.parse(fileContent);
        } else {
            imageMapCache = {};
        }
    } catch (e) { 
        imageMapCache = {};
    }
    return imageMapCache;
}

// Fonction pour nettoyer le nom (enlever extension et path)
function cleanName(name) {
    return path.basename(name).replace(/\.(jpg|jpeg|tif|tiff|png|xml)$/i, '');
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawName = searchParams.get('name'); 

  if (!rawName) return new Response('Nom manquant', { status: 400 });

  // 1. Définir toutes les variantes possibles du nom de fichier
  const base = cleanName(rawName);
  const candidates = [
      rawName,                            // ex: image.jpg
      base + '.jpg',                      // ex: image.jpg
      'dmf' + base + '.jpg',              // ex: dmfimage.jpg (CAS FRÉQUENT INPI)
      base.replace(/^0+/, '') + '.jpg'    // ex: suppression des zéros initiaux
  ];

  const map = getMap();
  
  // Chercher aussi via la Map JSON
  let info = map[rawName] || map[base];
  if (info) {
      const mapBase = cleanName(info.p);
      candidates.push(mapBase + '.jpg');        // Nom venant du JSON mais en JPG
      candidates.push('dmf' + mapBase + '.jpg');
      candidates.push(info.p);                  // Nom original du JSON
  }

  // --- RECHERCHE SUR LE DISQUE ---
  for (const filename of candidates) {
      const filePath = path.join(DATA_DIR, filename);
      if (fs.existsSync(filePath)) {
          try {
              const buffer = fs.readFileSync(filePath);
              return new Response(buffer, {
                  headers: { 
                      'Content-Type': 'image/jpeg', 
                      'Cache-Control': 'public, max-age=31536000, immutable' 
                  }
              });
          } catch (e) {
              console.error("Erreur lecture:", e);
          }
      }
  }

  // --- DERNIER RECOURS : RECHERCHE DANS LES ZIPS ---
  // (Seulement si on n'a rien trouvé en direct)
  if (info) {
      try {
          const zipPath = path.join(DATA_DIR, info.z);
          if (fs.existsSync(zipPath)) {
              const zip = new AdmZip(zipPath);
              const entry = zip.getEntry(info.p);
              if (entry) {
                  let buffer = zip.readFile(entry);
                  const lowerName = info.p.toLowerCase();
                  if (lowerName.endsWith('.tif') || lowerName.endsWith('.tiff')) {
                      buffer = await sharp(buffer).jpeg({ quality: 80 }).toBuffer();
                  }
                  return new Response(buffer, {
                      headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=31536000' }
                  });
              }
          }
      } catch (e) {}
  }

  return new Response('Introuvable', { status: 404 });
}
