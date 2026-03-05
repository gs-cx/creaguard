export const runtime = 'edge';
import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// --- DONNÉES SEO CIBLÉES ---
const solutionsData: Record<string, { title: string; desc: string; keywords: string[]; content: string; icon: string }> = {
  'designers': {
    title: "Protection Droit d'Auteur pour Graphistes & Designers",
    desc: "Protégez vos logos, maquettes et créations graphiques avant de les envoyer au client. Preuve d'antériorité certifiée par Blockchain.",
    keywords: ["protection logo", "droit auteur graphiste", "vol création", "preuve antériorité design"],
    icon: "🎨",
    content: "En tant que designer, votre portfolio est votre capital. Malheureusement, le vol de maquettes lors d'appels d'offres ou le plagiat sur les réseaux sociaux est fréquent. KeepProof vous permet de certifier l'existence de votre fichier PSD, AI ou Figma à une date précise avant toute diffusion."
  },
  'developers': {
    title: "Preuve d'Antériorité Code Source & Logiciel",
    desc: "Sécurisez la paternité de votre code. Horodatage certifié pour prouver que vous êtes l'auteur de l'algorithme ou de l'application.",
    keywords: ["copyright code source", "protection logiciel", "enveloppe soleau numérique", "propriété intellectuelle dev"],
    icon: "💻",
    content: "Le code est protégé par le droit d'auteur dès sa création. Mais comment prouver que vous l'avez écrit avant un ex-associé ou un concurrent ? En déposant une archive de votre repository Git sur KeepProof, vous créez une preuve mathématique indiscutable de votre paternité."
  },
  'musicians': {
    title: "Protection Copyright Musique & Beatmakers",
    desc: "Verrouillez vos démos, beats et paroles. Ne laissez personne voler votre mélodie.",
    keywords: ["copyright musique", "protection beatmaker", "sacem preuve", "antériorité musique"],
    icon: "🎵",
    content: "Avant d'envoyer votre démo à un label ou de poster votre beat sur YouTube, assurez-vous d'avoir une preuve de date certaine. KeepProof est votre assurance contre le plagiat musical, complémentaire à la SACEM."
  },
  'startups': {
    title: "Protection Idée & Business Plan",
    desc: "Sécurisez vos concepts avant de pitcher aux investisseurs. Protégez votre propriété intellectuelle.",
    keywords: ["protection idée startup", "nda alternative", "preuve concept", "protection pitch"],
    icon: "🚀",
    content: "Les investisseurs ne signent pas de NDA. Comment leur parler sans risque ? En certifiant votre Pitch Deck ou votre Business Plan avec KeepProof. Vous prouvez ainsi que l'idée structurée venait de vous à cette date précise."
  }
};

// RETOUR A LA VERSION SYNCHRONE (Next.js 14)
type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params; // Pas de await ici
  const data = solutionsData[slug];

  if (!data) return { title: 'Solution non trouvée' };

  return {
    title: data.title,
    description: data.desc,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.desc,
      type: 'article',
    }
  };
}

export default function SolutionPage({ params }: Props) {
  const { slug } = params; // Pas de await ici
  const data = solutionsData[slug];

  if (!data) return notFound();

  return (
    <>
      <div className="min-h-screen bg-[#050507] text-white pt-32 px-6 pb-20 selection:bg-blue-500/30">
        <div className="max-w-4xl mx-auto">
          
          <Breadcrumb />

          <div className="bg-[#111116] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-6">{data.icon}</div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                {data.title}
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {data.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {data.keywords.map((kw, i) => (
                   <span key={i} className="text-xs font-mono bg-white/5 text-gray-500 px-2 py-1 rounded border border-white/5">
                     #{kw.replace(/\s+/g, '')}
                   </span>
                ))}
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-bold mb-4 text-white">Pourquoi KeepProof pour les {slug} ?</h3>
                <ul className="space-y-3 text-gray-400 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Preuve valide à vie (Ancrage Blockchain)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Confidentialité totale (Fichier non lu)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Coût minime (4.90€) par rapport à un huissier
                  </li>
                </ul>

                <Link href="/new" className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Protéger mon travail maintenant
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Voir aussi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.keys(solutionsData).filter(s => s !== slug).map((otherSlug) => (
                <Link key={otherSlug} href={`/solutions/${otherSlug}`} className="block p-4 bg-[#111116] border border-white/5 rounded-lg hover:border-blue-500/30 transition text-gray-400 hover:text-white">
                  <span className="text-2xl mr-2">{solutionsData[otherSlug].icon}</span>
                  <span className="font-medium capitalize">{otherSlug}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
