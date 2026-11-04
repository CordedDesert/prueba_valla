import React from 'react';
import { X, Printer, Download, Compass, ShieldCheck, TreePine, Droplets } from 'lucide-react';
import { Lot } from '../types';

interface DossierModalProps {
  lot: Lot | null;
  onClose: () => void;
  currency: 'MXN' | 'USD';
}

export const DossierModal: React.FC<DossierModalProps> = ({
  lot,
  onClose,
  currency,
}) => {
  if (!lot) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatPrice = (valMxn: number, valUsd: number) => {
    if (currency === 'MXN') {
      return `$${valMxn.toLocaleString('es-MX')} MXN`;
    }
    return `$${valUsd.toLocaleString('en-US')} USD`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#101F12]/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      
      {/* Dossier Document Container (Sharp 0px, 1px border, white/caliza paper finish) */}
      <div className="relative w-full max-w-4xl bg-[#FCF9F1] border border-[#C9C2B6] my-8 text-[#1C1C17] flex flex-col max-h-[94vh] overflow-hidden print:max-h-none print:border-none print:my-0">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9C2B6] bg-[#F1EEE6] print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352]">
              Copia Digital Certificada • Dossier Catastral
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#253426] text-[#F2EFE7] font-sans text-[10px] uppercase font-semibold tracking-[0.14em] hover:bg-[#18251C] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 text-[#434842] hover:text-[#101F12] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 font-sans">
          
          {/* Header Masthead of Deed */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-[#101F12] pb-6 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#526352] block mb-1">
                EDITORIAL YUCATECO • ARCHIVO TERRITORIAL
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#101F12] font-normal">
                Expediente Técnico Catastral
              </h1>
              <p className="font-sans text-xs text-[#747872] uppercase tracking-[0.12em] mt-1">
                Polígono de Desarrollo Sustentable • Valladolid, Yucatán
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs">
              <span className="bg-[#253426] text-[#F2EFE7] px-2.5 py-1 text-[11px] font-semibold inline-block mb-1">
                LOTE 0{lot.number}
              </span>
              <div className="text-[10px] text-[#747872] uppercase tracking-wider">
                ID: EY-VLD-2026-0{lot.number}
              </div>
              <div className="text-[10px] text-[#747872]">
                Cédula Notarial Libro IV
              </div>
            </div>
          </div>

          {/* Lot Title & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-[#C9C2B6] p-4 bg-[#F2EFE7]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#747872] block">Denominación</span>
              <span className="font-serif text-xl font-medium text-[#101F12]">{lot.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#747872] block">Tipología</span>
              <span className="font-mono text-sm font-semibold text-[#253426]">{lot.categoryLabel}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#747872] block">Valor Comercial</span>
              <span className="font-serif text-xl font-semibold text-[#101F12]">
                {formatPrice(lot.priceMxn, lot.priceUsd)}
              </span>
            </div>
          </div>

          {/* Technical Polygon & Dimensions Grid */}
          <div>
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#253426] mb-3">
              1. Mediciones & Cuadro de Construcción
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="border border-[#C9C2B6] p-3 bg-white">
                <span className="text-[9px] uppercase tracking-wider text-[#747872] block">Superficie Total</span>
                <span className="font-mono text-base font-semibold text-[#101F12]">{lot.areaM2} m²</span>
                <span className="text-[9px] text-[#747872]">({lot.areaSqFt.toLocaleString()} sq ft)</span>
              </div>
              <div className="border border-[#C9C2B6] p-3 bg-white">
                <span className="text-[9px] uppercase tracking-wider text-[#747872] block">Frente a Sendero</span>
                <span className="font-mono text-base font-semibold text-[#101F12]">{lot.dimensions.front}.00 m</span>
                <span className="text-[9px] text-[#747872]">Límite sur</span>
              </div>
              <div className="border border-[#C9C2B6] p-3 bg-white">
                <span className="text-[9px] uppercase tracking-wider text-[#747872] block">Fondo Predial</span>
                <span className="font-mono text-base font-semibold text-[#101F12]">{lot.dimensions.depth}.00 m</span>
                <span className="text-[9px] text-[#747872]">Límite norte</span>
              </div>
              <div className="border border-[#C9C2B6] p-3 bg-white">
                <span className="text-[9px] uppercase tracking-wider text-[#747872] block">Huella COS Máx.</span>
                <span className="font-mono text-base font-semibold text-[#253426]">{lot.maxFootprintM2} m²</span>
                <span className="text-[9px] text-[#747872]">18% de ocupación</span>
              </div>
            </div>
          </div>

          {/* Botanical & Tree Preservation Inventory */}
          <div>
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#253426] mb-3">
              2. Inventario Florístico de Preservación Perpetua
            </h3>
            <div className="border border-[#C9C2B6] p-4 bg-white space-y-2 text-xs">
              <p className="text-[#434842] leading-relaxed">
                El adquirente asume la custodia del estrato vegetal catalogado con un mínimo del{' '}
                <strong className="text-[#253426]">{lot.canopyRetentionPercent}% de dosel arbóreo intacto</strong>.
                Especies registradas dentro de la poligonal:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {lot.featuredTrees.map((tree, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-[#F1EEE6] border border-[#C9C2B6] font-mono text-[11px] text-[#1C1C17]"
                  >
                    {tree}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Architectural Restrictive Covenant Guidelines */}
          <div>
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#253426] mb-3">
              3. Lineamientos Arquitectónicos del Comité de Autor
            </h3>
            <div className="border border-[#C9C2B6] p-4 bg-white space-y-3 text-xs text-[#434842] leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <strong className="text-[#101F12] block mb-1">Paleta Matérica Permitida:</strong>
                  Mampostería de piedra caliza dorada o blanca de la región, estuco tradicional de chukum en muros y albercas, carpinterías en tzalam, zapote o pich con aceite vegetal.
                </div>
                <div>
                  <strong className="text-[#101F12] block mb-1">Retiros y Servidumbres:</strong>
                  Retiro frontal obligatorio de 8.0 m hacia sendero; retiros laterales y posterior mínimos de 5.0 m de selva virgen sin pavimentos duros.
                </div>
              </div>
              <div className="border-t border-[#C9C2B6]/40 pt-2 font-serif italic text-sm text-[#253426]">
                «{lot.architecturalNote}»
              </div>
            </div>
          </div>

          {/* Cadastral Stamp & Signatures */}
          <div className="border-t-2 border-[#101F12] pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-[10px] uppercase font-sans text-[#747872]">
            <div>
              <span className="block text-[#101F12] font-semibold mb-1">Perito Topógrafo Responsable</span>
              <span>Ing. Rodrigo Pech Canché</span>
              <span className="block font-mono">Céd. Prof. 8492041-YUC</span>
            </div>
            <div>
              <span className="block text-[#101F12] font-semibold mb-1">Comité de Arquitectura</span>
              <span>Taller Editorial Yucateco</span>
              <span className="block">Valladolid MMXXVI</span>
            </div>
            <div className="col-span-2 sm:col-span-1 text-right">
              <span className="block text-[#101F12] font-semibold mb-1">Sello Digital de Validación</span>
              <span className="font-mono text-[#526352] font-bold block">VERIFICADO-OK</span>
              <span>20°41'22"N 88°12'06"W</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
