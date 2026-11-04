import React, { useState } from 'react';
import { BookOpen, X, ArrowUpRight, Clock, User, Calendar, Quote } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/articlesData';
import { JournalArticle } from '../types';

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="cronicas" className="py-20 lg:py-28 bg-[#F2EFE7] border-b border-[#C9C2B6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C9C2B6] pb-6 mb-12 gap-4">
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352] block mb-2">
              Publicación Periódica • Ensayos de Obra
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#101F12] font-normal tracking-[-0.015em]">
              Crónicas del Territorio & Bitácora de Autor
            </h2>
          </div>
          <div className="text-left md:text-right font-sans text-xs text-[#747872]">
            Textos de investigación arquitectónica, historia botánica y termodinámica maya.
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="border border-[#C9C2B6] bg-[#FCF9F1] flex flex-col justify-between group hover:border-[#253426] transition-colors"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden border-b border-[#C9C2B6] bg-[#18251C]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#101F12]/80 backdrop-blur-xs px-2.5 py-1 text-[9px] font-sans uppercase tracking-[0.16em] text-[#BACBB7] border border-[#F2EFE7]/20">
                    {article.date}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-[10px] font-sans text-[#747872] uppercase tracking-[0.14em] mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#101F12] font-normal leading-snug mb-3 group-hover:text-[#253426] transition-colors">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs text-[#434842] leading-relaxed line-clamp-3">
                    {article.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="w-full py-2.5 border-t border-[#C9C2B6]/40 text-[#253426] font-sans text-[11px] font-semibold uppercase tracking-[0.16em] hover:text-[#101F12] flex items-center justify-between pt-4 group-hover:underline cursor-pointer"
                >
                  <span>Leer Crónica Completa</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#101F12]/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#F2EFE7] border border-[#C9C2B6] my-8 text-[#1C1C17] max-h-[92vh] overflow-y-auto">
            
            {/* Top Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-[#C9C2B6] bg-[#F1EEE6]">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352]">
                Cuaderno Editorial • {selectedArticle.date}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 text-[#434842] hover:text-[#101F12] transition-colors cursor-pointer"
                aria-label="Cerrar artículo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-10 space-y-8">
              
              <div>
                <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.2em] text-[#747872] block mb-2">
                  {selectedArticle.readTime} • Publicado por {selectedArticle.role}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#101F12] font-normal leading-tight mb-4">
                  {selectedArticle.title}
                </h1>
                <p className="font-serif italic text-lg text-[#645E52] leading-relaxed">
                  {selectedArticle.subtitle}
                </p>
              </div>

              {/* Cover Image */}
              <div className="border border-[#C9C2B6] overflow-hidden aspect-[16/9]">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pull quote if exists */}
              {selectedArticle.pullQuote && (
                <div className="border-y-2 border-[#253426] py-6 px-4 bg-[#F1EEE6]/60">
                  <p className="font-serif italic text-xl sm:text-2xl text-[#253426] leading-snug">
                    {selectedArticle.pullQuote}
                  </p>
                  {selectedArticle.pullQuoteAuthor && (
                    <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#747872] block mt-2">
                      — {selectedArticle.pullQuoteAuthor}
                    </span>
                  )}
                </div>
              )}

              {/* Article Paragraphs */}
              <div className="space-y-5 font-sans text-sm sm:text-base text-[#30271F] font-light leading-[1.8]">
                {selectedArticle.body.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Author Bio Footer */}
              <div className="border-t border-[#C9C2B6] pt-6 flex items-center justify-between text-xs font-sans text-[#747872]">
                <div>
                  <strong className="text-[#101F12] block text-sm">{selectedArticle.author}</strong>
                  <span>{selectedArticle.role}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 border border-[#C9C2B6] text-[#30271F] uppercase font-sans text-[10px] tracking-[0.14em] hover:bg-[#D9D0C1]"
                >
                  Regresar al Índice
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
