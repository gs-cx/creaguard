export const runtime = 'edge';
import { Client } from 'pg';
import { NextResponse } from 'next/server';

// On force le dynamique pour avoir toujours les dernières données
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

  try {
    await client.connect();
    // On récupère les 100 dernières marques
    const query = 'SELECT * FROM marques ORDER BY id DESC LIMIT 100';
    const result = await client.query(query);
    
    return NextResponse.json({ marques: result.rows }, { status: 200 });

  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  } finally {
    try { await client.end(); } catch (e) {}
  }
}
