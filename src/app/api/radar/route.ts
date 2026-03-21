import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  console.log("=== 🟢 DÉBUT DE LA REQUÊTE API RADAR ===");
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      console.error("❌ Erreur : Aucun fichier fourni dans la requête.");
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    console.log(`📁 Fichier reçu : ${(file as File).name}, taille: ${(file as File).size} octets`);

    // On cible directement l'IP pour isoler le problème DNS (remettez le port 80 ou 8080 selon ce qui tourne sur OVH)
    const targetUrl = "https://15f12646d3e170.lhr.life/api/radar/audit";
    console.log(`🔗 Tentative de connexion au VPS cible : ${targetUrl}`);

    const vpsFormData = new FormData();
    vpsFormData.append('file', file);

    console.log("🚀 Envoi de la requête fetch vers le VPS...");
    const startTime = Date.now();

    let vpsResponse;
    try {
      vpsResponse = await fetch(targetUrl, {
        method: 'POST',
        body: vpsFormData,
      });
    } catch (fetchError: any) {
      console.error("💥 ERREUR CRITIQUE LORS DU FETCH VERS LE VPS :");
      console.error("-> Message :", fetchError.message);
      console.error("-> Cause :", fetchError.cause);
      console.error("-> Nom :", fetchError.name);
      
      // On renvoie l'erreur détaillée au navigateur web
      return NextResponse.json({ 
        error: "Le VPS est injoignable (Crash au niveau de Cloudflare)", 
        details: fetchError.message,
        cause: fetchError.cause ? String(fetchError.cause) : "Aucune cause précisée"
      }, { status: 500 });
    }

    const duration = Date.now() - startTime;
    console.log(`⏱️ Réponse du VPS reçue en ${duration}ms. Statut HTTP : ${vpsResponse.status}`);

    if (!vpsResponse.ok) {
      const errorText = await vpsResponse.text();
      console.error(`❌ Erreur renvoyée par le VPS (Statut ${vpsResponse.status}) :`, errorText);
      throw new Error(`Refus du VPS. HTTP ${vpsResponse.status} - Détails : ${errorText}`);
    }

    const data = await vpsResponse.json();
    console.log("✅ Audit réussi, renvoi des données au frontend.");
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("💥 ERREUR GLOBALE PROXY RADAR :");
    console.error("-> Message :", error.message);
    console.error("-> Stack :", error.stack);
    
    return NextResponse.json({
      error: "Le radar a rencontré une erreur interne.",
      details: error.message
    }, { status: 500 });
  } finally {
    console.log("=== 🛑 FIN DE LA REQUÊTE API RADAR ===");
  }
}
