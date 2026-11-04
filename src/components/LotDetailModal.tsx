import React, { useState } from 'react';
import { 
  X, Compass, TreePine, Wind, ShieldCheck, 
  Droplets, FileText, Calendar, Scale, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { Lot } from '../types';

interface LotDetailModalProps {
  lot: Lot | null;
  onClose: () => void;
  currency: 'MXN' | 'USD';
  onOpenBooking: (lot: Lot) => void;
  onOpenDossier: (lot: Lot) => void;
  isCompared: boolean;
  onToggleCompare: (lot: Lot) => void;
}

export const LotDetailModal: React.FC<LotDetailModalProps> = ({
  lot,
  onClose,
  currency,
  onOpenBooking,
  onOpenDossier,
  isCompared,
  onToggleCompare,
}) => {
  if (!lot) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const allImages = [lot.heroImage, ...lot.detailImages];

  const formatPrice = (valMxn: number, valUsd: number) => {
    if (currency === 'MXN') {
      return `$${valMxn.toLocaleString('es-MX')} MXN`;
    }
    return `$${valUsd.toLocaleString('en-US')} USD`;
  };

  const enganche = currency === 'MXN' ? lot.priceMxn * 0.3 : lot.priceUsd * 0.3;
  const mensualidad = (currency === 'MXN' ? lot.priceMxn * 0.5 : lot.priceUsd * 0.5) / 24;
  const finiquito = currency === 'MXN' ? lot.priceMxn * 0.2 : lot.priceUsd * 0.2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#101F12]/80 backdrop-blur-md overflow-y-auto">
      
      {/* Rasante Panel in Marfil Cálido (#F2EFE7) with 1px border (#C9C2B6), 0px roundedness */}
      <div className="relative w-full max-w-5xl bg-[#F2EFE7] border border-[#C9C2B6] my-8 text-[#1C1C17] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9C2B6] bg-[#F1EEE6]">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352]">
              Cédula Técnica Catastral • Lote {lot.number < 10 ? `0${lot.number}` : lot.number}
            </span>
            <span className="text-[#747872]">•</span>
            <span className="font-sans text-[11px] text-[#434842] uppercase tracking-[0.14em]">
              {lot.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onToggleCompare(lot)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 text-[10px] font-sans uppercase tracking-[0.14em] border border-[#C9C2B6] transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-[#253426] text-[#F2EFE7] border-[#253426]'
                  : 'bg-transparent text-[#30271F] hover:bg-[#D9D0C1]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'En Comparador' : 'Comparar'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 text-[#434842] hover:text-[#101F12] transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Title & Status */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#C9C2B6]/40 pb-6">
            <div>
              <span className="text-xs uppercase font-sans tracking-[0.18em] text-[#747872] block mb-1">
                Expediente: EY-VALLADOLID-LOT-{lot.number < 10 ? `0${lot.number}` : lot.number}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#101F12] font-normal leading-tight">
                {lot.name}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-[0.16em] ${
                  lot.status === 'disponible'
                    ? 'bg-[#253426] text-[#F2EFE7]'
                    : lot.status === 'reservado'
                    ? 'bg-[#D9D0C1] text-[#30271F]'
                    : 'bg-[#C9C2B6] text-[#747872]'
                }`}
              >
                {lot.status}
              </span>
              <div className="text-right">
                <span className="text-[10px] uppercase font-sans tracking-[0.14em] text-[#747872] block">
                  Precio de Lista
                </span>
                <span className="font-serif text-2xl font-semibold text-[#101F12]">
                  {formatPrice(lot.priceMxn, lot.priceUsd)}
                </span>
              </div>
            </div>
          </div>

          {/* Photo Gallery & Architectural Blueprint Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Main Featured Photo - 8 cols */}
            <div className="lg:col-span-8 space-y-3">
              <div className="relative aspect-[16/10] border border-[#C9C2B6] overflow-hidden bg-[#18251C]">
                <img
                  src={allImages[activeImageIndex]}
                  alt={`${lot.name} - Vista ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute bottom-3 left-3 bg-[#101F12]/80 backdrop-blur-xs px-3 py-1 text-[10px] font-sans uppercase tracking-[0.16em] text-[#BACBB7] border border-[#F2EFE7]/20">
                  Fotografía de Predio & Entorno Silvestre
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 shrink-0 border cursor-pointer overflow-hidden ${
                      activeImageIndex === idx
                        ? 'border-[#253426] ring-1 ring-[#253426]'
                        : 'border-[#C9C2B6] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Cadastral Box - 4 cols */}
            <div className="lg:col-span-4 border border-[#C9C2B6] p-5 bg-[#F6F3EB] space-y-4 font-sans text-xs">
              <div className="pb-2 border-b border-[#C9C2B6]/50">
                <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.18em] text-[#526352] block mb-1">
                  Levantamiento Topográfico
                </span>
                <div className="font-mono text-xs text-[#1C1C17]">
                  {lot.renderCad}
                </div>
              </div>

              <div className="space-y-3 font-sans">
                <div className="flex justify-between py-1 border-b border-[#C9C2B6]/30">
                  <span className="text-[#747872] uppercase tracking-wider text-[10px]">Superficie Predial</span>
                  <span className="font-mono font-semibold text-[#1C1C17]">{lot.areaM2} m²</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C9C2B6]/30">
                  <span className="text-[#747872] uppercase tracking-wider text-[10px]">Equivalente</span>
                  <span className="font-mono text-[#1C1C17]">{lot.areaSqFt.toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C9C2B6]/30">
                  <span className="text-[#747872] uppercase tracking-wider text-[10px]">Frente de Calle</span>
                  <span className="font-mono text-[#1C1C17]">{lot.dimensions.front} metros lineales</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C9C2B6]/30">
                  <span className="text-[#747872] uppercase tracking-wider text-[10px]">Fondo Promedio</span>
                  <span className="font-mono text-[#1C1C17]">{lot.dimensions.depth} metros lineales</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C9C2B6]/30">
                  <span className="text-[#747872] uppercase tracking-wider text-[10px]">Huella COS (18%)</span>
                  <span className="font-mono font-semibold text-[#253426]">{lot.maxFootprintM2} m² máx.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C9C2B6]/30">
                  <span className="text-[#747872] uppercase tracking-wider text-[10px]">Retiro Frontal</span>
                  <span className="font-mono text-[#1C1C17]">8.0 m selva virgen</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C9C2B6]/30">
                  <span className="text-[#747872] uppercase tracking-wider text-[10px]">Retiros Laterales</span>
                  <span className="font-mono text-[#1C1C17]">5.0 m a cada linde</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#747872] uppercase tracking-wider text-[10px]">Altura Permitida</span>
                  <span className="font-mono text-[#1C1C17]">2 niveles (8.5 m máx.)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#C9C2B6]/50">
                <button
                  onClick={() => onOpenDossier(lot)}
                  className="w-full py-2 border border-[#253426] text-[#253426] font-sans text-[10px] uppercase font-semibold tracking-[0.16em] hover:bg-[#253426] hover:text-[#F2EFE7] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ver Expediente Técnico Imprimible</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bioclimatic & Narrative Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#C9C2B6]/40 pt-6">
            
            {/* Description & Flora */}
            <div className="space-y-4">
              <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.2em] text-[#526352] block">
                Descripción del Terreno & Sotobosque
              </span>
              <p className="font-sans text-sm text-[#434842] leading-relaxed">
                {lot.description}
              </p>

              <div>
                <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.16em] text-[#747872] block mb-2">
                  Especies Vegetales Catalogadas
                </span>
                <div className="flex flex-wrap gap-2">
                  {lot.featuredTrees.map((tree, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#F1EEE6] text-[#30271F] font-sans text-xs border border-[#C9C2B6] flex items-center gap-1.5"
                    >
                      <TreePine className="w-3.5 h-3.5 text-[#526352]" />
                      {tree}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Architectural & Orientation Guidelines */}
            <div className="space-y-4">
              <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.2em] text-[#526352] block">
                Criterios de Autor & Orientación Solar
              </span>
              <div className="p-4 border-l-2 border-[#253426] bg-[#F1EEE6]">
                <p className="font-serif italic text-sm text-[#30271F] leading-relaxed">
                  «{lot.architecturalNote}»
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="border border-[#C9C2B6] p-3 bg-[#F6F3EB]">
                  <span className="text-[10px] uppercase font-sans text-[#747872] block mb-1">
                    Vientos Dominantes
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101F12]">
                    <Wind className="w-3.5 h-3.5 text-[#526352]" />
                    <span>{lot.windDirection}</span>
                  </div>
                </div>

                <div className="border border-[#C9C2B6] p-3 bg-[#F6F3EB]">
                  <span className="text-[10px] uppercase font-sans text-[#747872] block mb-1">
                    Retención Arbórea
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#253426]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#526352]" />
                    <span>{lot.canopyRetentionPercent}% intacto</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Investment & Payment Schedule Matrix */}
          <div className="border border-[#C9C2B6] p-6 bg-[#F6F3EB] space-y-4">
            <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.2em] text-[#526352] block">
              Estructura de Inversión Sugerida (24 Meses Sin Intereses)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
              <div className="border border-[#C9C2B6] p-4 bg-[#F2EFE7]">
                <span className="text-[10px] uppercase text-[#747872] block mb-1 tracking-wider">
                  Enganche (30%)
                </span>
                <span className="font-mono text-base font-semibold text-[#101F12] block">
                  {currency === 'MXN' ? `$${enganche.toLocaleString('es-MX')} MXN` : `$${enganche.toLocaleString('en-US')} USD`}
                </span>
                <span className="text-[10px] text-[#747872]">A la firma del contrato privado</span>
              </div>

              <div className="border border-[#C9C2B6] p-4 bg-[#F2EFE7]">
                <span className="text-[10px] uppercase text-[#747872] block mb-1 tracking-wider">
                  24 Mensualidades (50%)
                </span>
                <span className="font-mono text-base font-semibold text-[#253426] block">
                  {currency === 'MXN' ? `$${mensualidad.toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN` : `$${mensualidad.toLocaleString('en-US', { maximumFractionDigits: 0 })} USD`} / mes
                </span>
                <span className="text-[10px] text-[#747872]">Sin intereses directos del desarrollador</span>
              </div>

              <div className="border border-[#C9C2B6] p-4 bg-[#F2EFE7]">
                <span className="text-[10px] uppercase text-[#747872] block mb-1 tracking-wider">
                  Liquidación (20%)
                </span>
                <span className="font-mono text-base font-semibold text-[#101F12] block">
                  {currency === 'MXN' ? `$${finiquito.toLocaleString('es-MX')} MXN` : `$${finiquito.toLocaleString('en-US')} USD`}
                </span>
                <span className="text-[10px] text-[#747872]">Contra entrega y escrituración definitiva</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Action Footer */}
        <div className="px-6 sm:px-8 py-5 border-t border-[#C9C2B6] bg-[#F1EEE6] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-sans text-[#645E52]">
            <CheckCircle2 className="w-4 h-4 text-[#526352]" />
            <span>Escrituración ante notario público de Valladolid • Entrega con servicios subterráneos</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenBooking(lot);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#253426] text-[#F2EFE7] font-sans text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-[#18251C] transition-colors cursor-pointer text-center"
            >
              Agendar Recorrido en Terreno
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
