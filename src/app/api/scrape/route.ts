export const runtime = 'edge';
import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL manquante' }, { status: 400 });
    }

    // 1. Récupérer le HTML de la page
    const { data } = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    });

    // 2. Analyser le HTML
    const $ = cheerio.load(data);
    const images: string[] = [];

    // 3. Trouver toutes les images
    $('img').each((_, element) => {
      let src = $(element).attr('src');
      if (src) {
        // Gérer les URLs relatives (ex: /logo.png devient https://site.com/logo.png)
        if (src.startsWith('//')) {
            src = 'https:' + src;
        } else if (src.startsWith('/')) {
            const urlObj = new URL(url);
            src = `${urlObj.origin}${src}`;
        } else if (!src.startsWith('http')) {
             // Cas complexes ignorés pour la démo
             return; 
        }
        
        // Filtrer les icones minuscules ou tracking pixels
        images.push(src);
      }
    });

    // Renvoyer les 20 premières images uniques
    const uniqueImages = Array.from(new Set(images)).slice(0, 20);

    return NextResponse.json({ images: uniqueImages });

  } catch (error) {
    console.error('Erreur scraping:', error);
    return NextResponse.json({ error: "Impossible d'accéder à ce site." }, { status: 500 });
  }
}
