'use client';
export const runtime = 'edge';
import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/blogData';
import { notFound } from 'next/navigation';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Trouver l'article correspondant à l'URL
  const article = articles.find(a => a.slug === params.slug);

  if (!article) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans">
      
      {/* ARTICLE HEADER */}
      <div className="pt-32 pb-12 px-6 bg-[#111116] border-b border-white/5">
        <div className="max-w-3xl mx-auto text-center">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-white mb-6 inline-block">← Retour au blog</Link>
            
            <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                <span>{article.category}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500">{article.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                {article.title}
            </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed
            prose-h3:text-white prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-12 prose-h3:mb-6
            prose-ul:my-6 prose-li:my-2 prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        {/* --- CTA STRATEGIQUE : C'est ici qu'on convertit le lecteur --- */}
        <div className="mt-16 p-8 bg-blue-900/10 border border-blue-500/30 rounded-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                🛡️
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Vous êtes dans cette situation ?</h3>
                <p className="text-sm text-gray-300">Ne prenez pas de risques. Sécurisez vos créations dès maintenant. C'est instantané et valable à vie.</p>
            </div>
            <Link href="/new" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] whitespace-nowrap transition-all">
                Sécuriser ce travail
            </Link>
        </div>
      </div>
    </div>
  );
}
