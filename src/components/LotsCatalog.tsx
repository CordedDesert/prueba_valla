import React, { useState } from 'react';
import { Search, SlidersHorizontal, Scale, Eye, ArrowUpRight, Check, Compass, ShieldCheck } from 'lucide-react';
import { Lot } from '../types';

interface LotsCatalogProps {
  lots: Lot[];
  onSelectLot: (lot: Lot) => void;
  currency: 'MXN' | 'USD';
  onOpenBookingForLot: (lot: Lot) => void;
  comparedLots: Lot[];
  onToggleCompare: (lot: Lot) => void;
}

export const LotsCatalog: React.FC<LotsCatalogProps> = ({
  lots,
  onSelectLot,
  currency,
  onOpenBookingForLot,
  comparedLots,
  onToggleCompare,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'number' | 'priceAsc' | 'priceDesc' | 'areaDesc'>('number');

  const categories = [
    { id: 'todos', label: 'Todos los Lotes' },
    { id: 'cenote', label: 'Frente a Cenote' },
    { id: 'hacienda', label: 'Tipo Hacienda' },
    { id: 'botanico', label: 'Santuario Botánico' },
    { id: 'retiro', label: 'Retiro y Quietud' },
  ];

  const filteredLots = lots
    .filter((lot) => {
      if (selectedCategory !== 'todos' && lot.category !== selectedCategory) return false;
      if (selectedStatus !== 'todos' && lot.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = lot.name.toLowerCase().includes(query);
        const matchesTrees = lot.featuredTrees.some((t) => t.toLowerCase().includes(query));
        const matchesNum = lot.number.toString().includes(query);
        if (!matchesName && !matchesTrees && !matchesNum) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'number') return a.number - b.number;
      if (sortBy === 'priceAsc') return a.priceMxn - b.priceMxn;
      if (sortBy === 'priceDesc') return b.priceMxn - a.priceMxn;
      if (sortBy === 'areaDesc') return b.areaM2 - a.areaM2;
      return 0;
    });

  const isCompared = (lot: Lot) => {
    return comparedLots.some((c) => c.id === lot.id);
  };

  const formatPrice = (lot: Lot) => {
    if (currency === 'MXN') {
      return `$${(lot.priceMxn / 1000000).toFixed(2)}M MXN`;
    }
    return `$${lot.priceUsd.toLocaleString('en-US')} USD`;
  };

  return (
    <section id="lotes" className="py-20 lg:py-28 bg-[#F2EFE7] border-b border-[#C9C2B6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352] block mb-3">
            Colección Residencial • Fase I
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#101F12] font-normal tracking-[-0.015em] mb-4">
            Archivo de Predios & Lotes de Autor
          </h2>
          <p className="font-sans text-base text-[#434842] font-light leading-relaxed">
            Cada predio cuenta con un levantamiento topográfico milimétrico, catálogo florístico georreferenciado
            y cédula de retiros para garantizar que tu futura residencia quede enteramente cobijada por el dosel de la selva.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="border border-[#C9C2B6] p-4 bg-[#F1EEE6] mb-10 space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-[11px] font-sans uppercase tracking-[0.14em] font-medium border transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#253426] text-[#F2EFE7] border-[#253426]'
                      : 'bg-transparent text-[#30271F] border-[#C9C2B6] hover:bg-[#D9D0C1]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Status and Search */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search bar */}
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#747872]" />
                <input
                  type="text"
                  placeholder="Buscar por especie o número..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F2EFE7] border border-[#C9C2B6] pl-9 pr-3 py-1.5 text-xs font-sans text-[#1C1C17] placeholder-[#747872] focus:outline-none focus:border-[#253426]"
                />
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#F2EFE7] border border-[#C9C2B6] px-3 py-1.5 text-xs font-sans text-[#30271F] focus:outline-none focus:border-[#253426] cursor-pointer"
              >
                <option value="todos">Todos los Estatus</option>
                <option value="disponible">Solo Disponibles</option>
                <option value="reservado">Reservados</option>
                <option value="adquirido">Adquiridos</option>
              </select>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F2EFE7] border border-[#C9C2B6] px-3 py-1.5 text-xs font-sans text-[#30271F] focus:outline-none focus:border-[#253426] cursor-pointer"
              >
                <option value="number">Orden Catastral</option>
                <option value="areaDesc">Mayor Superficie (m²)</option>
                <option value="priceAsc">Menor Precio</option>
                <option value="priceDesc">Mayor Precio</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#C9C2B6]/40 text-xs font-sans text-[#645E52]">
            <span>
              Mostrando <strong className="text-[#101F12]">{filteredLots.length}</strong> de {lots.length} lotes
            </span>
            {comparedLots.length > 0 && (
              <span className="text-[#253426] font-medium">
                {comparedLots.length} {comparedLots.length === 1 ? 'lote seleccionado' : 'lotes seleccionados'} para comparar
              </span>
            )}
          </div>

        </div>

        {/* Editorial Lot Cards Grid:
            "Reemplazo del concepto tradicional de tarjeta con sombra por módulos editoriales integrados a la cuadrícula.
             Marco delimitado exclusivamente por líneas de 1px en Piedra Cálida.
             Fotografía a proporción áurea fija (3:2 o 4:5), seguida de título del lote en headline-sm (EB Garamond),
             métricas en label-mono-stat y estatus en versalitas discretas." */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLots.map((lot) => (
            <article
              id={`lote-card-${lot.id}`}
              key={lot.id}
              className="group border border-[#C9C2B6] bg-[#FCF9F1] flex flex-col justify-between transition-colors duration-200 hover:border-[#253426]"
            >
              
              {/* Golden Ratio Image Container (3:2) */}
              <div className="relative aspect-[3/2] overflow-hidden border-b border-[#C9C2B6] bg-[#18251C]">
                <img
                  src={lot.heroImage}
                  alt={lot.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top overlay badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-[#F2EFE7]/90 text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#253426] border border-[#C9C2B6]">
                    Lote {lot.number < 10 ? `0${lot.number}` : lot.number}
                  </span>

                  <span
                    className={`px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.16em] ${
                      lot.status === 'disponible'
                        ? 'bg-[#253426] text-[#F2EFE7]'
                        : lot.status === 'reservado'
                        ? 'bg-[#D9D0C1] text-[#30271F]'
                        : 'bg-[#C9C2B6] text-[#747872]'
                    }`}
                  >
                    {lot.status}
                  </span>
                </div>

                {/* Bottom in-image category badge */}
                <div className="absolute bottom-3 left-3 bg-[#101F12]/80 backdrop-blur-xs px-2.5 py-1 text-[9px] font-sans uppercase tracking-[0.16em] text-[#BACBB7] border border-[#F2EFE7]/20">
                  {lot.categoryLabel}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                
                <div>
                  <h3 className="font-serif text-2xl text-[#101F12] font-normal leading-snug mb-3 group-hover:text-[#253426] transition-colors">
                    {lot.name}
                  </h3>

                  <p className="font-sans text-xs text-[#434842] line-clamp-2 leading-relaxed mb-5">
                    {lot.description}
                  </p>

                  {/* Metrics Row in label-mono-stat */}
                  <div className="grid grid-cols-3 gap-2 border-y border-[#C9C2B6]/40 py-3 mb-5 font-sans">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.14em] text-[#747872] block">
                        Superficie
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#101F12]">
                        {lot.areaM2} m²
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-[0.14em] text-[#747872] block">
                        Selva Viva
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#253426]">
                        {lot.canopyRetentionPercent}%
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-[0.14em] text-[#747872] block">
                        Orientación
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#101F12]">
                        {lot.orientation}
                      </span>
                    </div>
                  </div>

                  {/* Featured Trees */}
                  <div className="mb-5">
                    <span className="text-[9px] uppercase tracking-[0.16em] text-[#747872] block mb-1.5">
                      Arbolado Singular
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {lot.featuredTrees.slice(0, 2).map((tree, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-sans px-2 py-0.5 bg-[#F1EEE6] text-[#30271F] border border-[#C9C2B6]"
                        >
                          {tree}
                        </span>
                      ))}
                      {lot.featuredTrees.length > 2 && (
                        <span className="text-[10px] font-sans px-1.5 py-0.5 text-[#747872]">
                          +{lot.featuredTrees.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price and Action Buttons */}
                <div className="pt-4 border-t border-[#C9C2B6]/40">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-[10px] uppercase font-sans tracking-[0.16em] text-[#747872]">
                      Inversión
                    </span>
                    <span className="font-serif text-xl font-medium text-[#101F12]">
                      {formatPrice(lot)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectLot(lot)}
                      className="py-2.5 px-3 bg-[#253426] text-[#F2EFE7] text-[10px] font-sans font-semibold uppercase tracking-[0.16em] hover:bg-[#18251C] transition-colors cursor-pointer text-center"
                    >
                      Inspeccionar
                    </button>

                    <button
                      onClick={() => onToggleCompare(lot)}
                      className={`py-2.5 px-3 text-[10px] font-sans font-medium uppercase tracking-[0.14em] border border-[#C9C2B6] transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        isCompared(lot)
                          ? 'bg-[#253426] text-[#F2EFE7] border-[#253426]'
                          : 'bg-transparent text-[#30271F] hover:bg-[#D9D0C1]'
                      }`}
                    >
                      <Scale className="w-3 h-3" />
                      <span>{isCompared(lot) ? 'Seleccionado' : 'Comparar'}</span>
                    </button>
                  </div>

                  {lot.status === 'disponible' && (
                    <button
                      onClick={() => onOpenBookingForLot(lot)}
                      className="w-full mt-2 py-2 text-[10px] font-sans text-[#526352] hover:text-[#253426] uppercase tracking-[0.14em] text-center font-medium block hover:underline"
                    >
                      Agendar Visita a este Terreno →
                    </button>
                  )}
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
