import React from 'react';
import { X, Scale, Trash2, ArrowRight, ShieldCheck, TreePine, Wind, Droplets } from 'lucide-react';
import { Lot } from '../types';

interface LotComparisonModalProps {
  lots: Lot[];
  onClose: () => void;
  onRemoveLot: (lotId: string) => void;
  currency: 'MXN' | 'USD';
  onOpenBooking: (lot: Lot) => void;
  onSelectLot: (lot: Lot) => void;
}

export const LotComparisonModal: React.FC<LotComparisonModalProps> = ({
  lots,
  onClose,
  onRemoveLot,
  currency,
  onOpenBooking,
  onSelectLot,
}) => {
  if (lots.length === 0) return null;

  const formatPrice = (valMxn: number, valUsd: number) => {
    if (currency === 'MXN') {
      return `$${valMxn.toLocaleString('es-MX')} MXN`;
    }
    return `$${valUsd.toLocaleString('en-US')} USD`;
  };

  const formatPricePerM2 = (lot: Lot) => {
    if (currency === 'MXN') {
      const pm2 = Math.round(lot.priceMxn / lot.areaM2);
      return `$${pm2.toLocaleString('es-MX')} MXN/m²`;
    }
    const pm2 = Math.round(lot.priceUsd / lot.areaM2);
    return `$${pm2.toLocaleString('en-US')} USD/m²`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#101F12]/80 backdrop-blur-md overflow-y-auto">
      
      {/* Rasante Comparison Sheet with 1px border (#C9C2B6), 0px roundedness */}
      <div className="relative w-full max-w-6xl bg-[#F2EFE7] border border-[#C9C2B6] my-8 text-[#1C1C17] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9C2B6] bg-[#F1EEE6]">
          <div className="flex items-center gap-3">
            <Scale className="w-4 h-4 text-[#253426]" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352]">
              Comparador Arquitectónico de Lotes
            </span>
            <span className="text-[#747872]">•</span>
            <span className="font-sans text-[11px] text-[#434842] uppercase tracking-[0.14em]">
              {lots.length} {lots.length === 1 ? 'predio en análisis' : 'predios en paralelo'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#434842] hover:text-[#101F12] transition-colors cursor-pointer"
            aria-label="Cerrar comparador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Comparison Matrix */}
        <div className="overflow-x-auto overflow-y-auto p-6 sm:p-8">
          <table className="w-full border-collapse font-sans text-xs text-left">
            <thead>
              <tr>
                <th className="p-4 border border-[#C9C2B6] bg-[#F1EEE6] font-sans text-[10px] uppercase tracking-[0.16em] text-[#747872] w-48">
                  Parámetro Técnico
                </th>
                {lots.map((lot) => (
                  <th
                    key={lot.id}
                    className="p-4 border border-[#C9C2B6] bg-[#FCF9F1] min-w-[240px] vertical-top"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-[#253426] text-[#F2EFE7] text-[10px] font-mono uppercase">
                        Lote {lot.number < 10 ? `0${lot.number}` : lot.number}
                      </span>
                      <button
                        onClick={() => onRemoveLot(lot.id)}
                        className="text-[#747872] hover:text-[#BA1A1A] transition-colors p-0.5 cursor-pointer"
                        title="Quitar del comparador"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <img
                      src={lot.heroImage}
                      alt={lot.name}
                      className="w-full h-28 object-cover border border-[#C9C2B6] mb-2"
                    />

                    <h4 className="font-serif text-lg font-normal text-[#101F12] leading-snug">
                      {lot.name}
                    </h4>
                    <span className="text-[10px] uppercase font-sans tracking-[0.14em] text-[#526352] block mt-0.5">
                      {lot.categoryLabel}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#C9C2B6]">
              {/* Estatus */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Estatus Catastral
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1]">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        lot.status === 'disponible'
                          ? 'bg-[#253426] text-[#F2EFE7]'
                          : lot.status === 'reservado'
                          ? 'bg-[#D9D0C1] text-[#30271F]'
                          : 'bg-[#C9C2B6] text-[#747872]'
                      }`}
                    >
                      {lot.status}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Inversión Total */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Inversión Total
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1]">
                    <span className="font-serif text-base font-semibold text-[#101F12]">
                      {formatPrice(lot.priceMxn, lot.priceUsd)}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Valor por m² */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Valor Unitario m²
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1] font-mono">
                    {formatPricePerM2(lot)}
                  </td>
                ))}
              </tr>

              {/* Superficie Total */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Superficie Total
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1]">
                    <span className="font-mono font-semibold text-sm text-[#101F12]">
                      {lot.areaM2} m²
                    </span>
                    <span className="text-[10px] text-[#747872] block">
                      ({lot.areaSqFt.toLocaleString()} sq ft)
                    </span>
                  </td>
                ))}
              </tr>

              {/* Dimensiones */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Frente x Fondo
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1] font-mono">
                    {lot.dimensions.front}m frente × {lot.dimensions.depth}m fondo
                  </td>
                ))}
              </tr>

              {/* Huella Máxima COS */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Huella de Ocupación (18%)
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1]">
                    <span className="font-mono font-semibold text-[#253426]">
                      {lot.maxFootprintM2} m² máx.
                    </span>
                  </td>
                ))}
              </tr>

              {/* Retención Arbórea */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Dosel de Selva Preservada
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1]">
                    <span className="font-mono font-semibold text-[#253426]">
                      {lot.canopyRetentionPercent}%
                    </span>
                    <span className="text-[10px] text-[#645E52] block">bosque autóctono</span>
                  </td>
                ))}
              </tr>

              {/* Orientación & Vientos */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Orientación Bioclimática
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1]">
                    <span className="font-mono block text-[#101F12]">{lot.orientation}</span>
                    <span className="text-[10px] text-[#526352]">{lot.windDirection}</span>
                  </td>
                ))}
              </tr>

              {/* Arbolado Notable */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Arbolado Singular
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1]">
                    <ul className="space-y-1 text-[11px] text-[#434842]">
                      {lot.featuredTrees.map((tree, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#526352]"></span>
                          <span>{tree}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Acciones */}
              <tr>
                <td className="p-3 border border-[#C9C2B6] bg-[#F1EEE6] font-semibold text-[#30271F]">
                  Acción
                </td>
                {lots.map((lot) => (
                  <td key={lot.id} className="p-3 border border-[#C9C2B6] bg-[#FCF9F1] space-y-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectLot(lot);
                      }}
                      className="w-full py-2 bg-[#F1EEE6] border border-[#C9C2B6] text-[#30271F] font-sans text-[10px] uppercase font-semibold tracking-[0.14em] hover:bg-[#D9D0C1] transition-colors cursor-pointer"
                    >
                      Ver Ficha Completa
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking(lot);
                      }}
                      className="w-full py-2 bg-[#253426] text-[#F2EFE7] font-sans text-[10px] uppercase font-semibold tracking-[0.14em] hover:bg-[#18251C] transition-colors cursor-pointer"
                    >
                      Agendar Visita
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#C9C2B6] bg-[#F1EEE6] flex items-center justify-between">
          <span className="font-sans text-xs text-[#747872]">
            Todos los lotes se escrituran con régimen de condominio ecológico de alta gama.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-transparent border border-[#C9C2B6] text-[#30271F] text-[11px] font-sans uppercase tracking-[0.14em] hover:bg-[#D9D0C1] transition-colors cursor-pointer"
          >
            Cerrar Comparador
          </button>
        </div>

      </div>

    </div>
  );
};
