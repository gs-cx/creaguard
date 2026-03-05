export const runtime = 'edge';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

// 🛑 CORRECTION : Force le mode dynamique pour éviter l'erreur de build
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Récupère les preuves de l'utilisateur
    const proofs = await prisma.proof.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(proofs);
  } catch (error) {
    console.error("Erreur API my-proofs:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
