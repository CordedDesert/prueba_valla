import React, { useState } from 'react';
import { Calculator, ArrowRight, TreePine, Droplets, Zap, ShieldCheck } from 'lucide-react';
import { Lot } from '../types';

interface FinancialCalculatorProps {
  lots: Lot[];
  selectedLot: Lot | null;
  currency: 'MXN' | 'USD';
  onOpenBookingWithPlan: (lot: Lot, planDetails: any) => void;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({
  lots,
  selectedLot,
  currency,
  onOpenBookingWithPlan,
}) => {
  const [activeLotId, setActiveLotId] = useState<string>(selectedLot?.id || lots[0]?.id || 'lote-01');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30% default
  const [financingMonths, setFinancingMonths] = useState<number>(24); // 24 meses
  const [liquidationPercent, setLiquidationPercent] = useState<number>(20); // 20% al finiquito

  const lot = lots.find((l) => l.id === activeLotId) || lots[0];

  const totalPrice = currency === 'MXN' ? lot.priceMxn : lot.priceUsd;
  const downPaymentAmount = totalPrice * (downPaymentPercent / 100);
  const liquidationAmount = totalPrice * (liquidationPercent / 100);
  const financingAmount = totalPrice - downPaymentAmount - liquidationAmount;
  const monthlyPayment = financingMonths > 0 ? financingAmount / financingMonths : 0;

  // Bioclimatic ecological metrics based on lot area and canopy retention
  const preservedM2 = Math.round(lot.areaM2 * (lot.canopyRetentionPercent / 100));
  const estimatedTrees = Math.round(preservedM2 / 28); // approx 1 mature tree per 28 m² in Yucatan jungle
  const co2OffsetTons = (estimatedTrees * 0.045).toFixed(1); // 45kg per tree/yr
  const rainWaterHarvestLitres = Math.round(lot.maxFootprintM2 * 1100 * 0.85); // 1,100mm annual rain * 85% runoff
  const kwhAnnualSavings = Math.round(lot.maxFootprintM2 * 28); // 28 kWh/m2 savings from passive cross-ventilation

  const formatMoney = (amount: number) => {
    if (currency === 'MXN') {
      return `$${amount.toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN`;
    }
    return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })} USD`;
  };

  return (
    <section id="calculadora" className="py-20 lg:py-28 bg-[#F1EEE6] border-b border-[#C9C2B6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352] block mb-3">
            Estructuración Financiera & Retorno Bioclimático
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#101F12] font-normal tracking-[-0.015em] mb-4">
            Simulador de Adquisición & Huella Pasiva
          </h2>
          <p className="font-sans text-base text-[#434842] font-light leading-relaxed">
            Planes de financiamiento directo sin intermediación bancaria, hasta 36 meses sin intereses,
            calculando al mismo tiempo la captura hídrica y de carbono de la porción de selva adquirida.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column - 6 cols */}
          <div className="lg:col-span-6 border border-[#C9C2B6] bg-[#FCF9F1] p-6 sm:p-8 space-y-6">
            
            {/* Lot Selector */}
            <div>
              <label className="font-sans text-[10px] uppercase font-semibold tracking-[0.16em] text-[#747872] block mb-2">
                Seleccionar Predio de la Colección
              </label>
              <select
                value={activeLotId}
                onChange={(e) => setActiveLotId(e.target.value)}
                className="w-full bg-[#F2EFE7] border border-[#C9C2B6] px-4 py-3 text-sm font-sans text-[#1C1C17] focus:outline-none focus:border-[#253426] cursor-pointer"
              >
                {lots.map((l) => (
                  <option key={l.id} value={l.id}>
                    Lote {l.number < 10 ? `0${l.number}` : l.number} — {l.name} ({l.areaM2} m² • {formatMoney(currency === 'MXN' ? l.priceMxn : l.priceUsd)})
                  </option>
                ))}
              </select>
            </div>

            {/* Down Payment Percent Selector */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="font-sans text-[10px] uppercase font-semibold tracking-[0.16em] text-[#747872]">
                  Porcentaje de Enganche Inicial
                </label>
                <span className="font-mono text-sm font-semibold text-[#101F12]">
                  {downPaymentPercent}% ({formatMoney(downPaymentAmount)})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[20, 30, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`py-2 text-xs font-mono font-medium border transition-colors cursor-pointer ${
                      downPaymentPercent === pct
                        ? 'bg-[#253426] text-[#F2EFE7] border-[#253426]'
                        : 'bg-[#F2EFE7] text-[#30271F] border-[#C9C2B6] hover:bg-[#D9D0C1]'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Financing Term Selector */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="font-sans text-[10px] uppercase font-semibold tracking-[0.16em] text-[#747872]">
                  Plazo de Mensualidades (Sin Intereses)
                </label>
                <span className="font-mono text-sm font-semibold text-[#101F12]">
                  {financingMonths} Meses
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[12, 18, 24, 36].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setFinancingMonths(months)}
                    className={`py-2 text-xs font-mono font-medium border transition-colors cursor-pointer ${
                      financingMonths === months
                        ? 'bg-[#253426] text-[#F2EFE7] border-[#253426]'
                        : 'bg-[#F2EFE7] text-[#30271F] border-[#C9C2B6] hover:bg-[#D9D0C1]'
                    }`}
                  >
                    {months} meses
                  </button>
                ))}
              </div>
            </div>

            {/* Liquidation on delivery */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="font-sans text-[10px] uppercase font-semibold tracking-[0.16em] text-[#747872]">
                  Liquidación contra Entrega / Escritura
                </label>
                <span className="font-mono text-sm font-semibold text-[#101F12]">
                  {liquidationPercent}% ({formatMoney(liquidationAmount)})
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 30].map((liq) => (
                  <button
                    key={liq}
                    type="button"
                    onClick={() => setLiquidationPercent(liq)}
                    className={`py-2 text-xs font-mono font-medium border transition-colors cursor-pointer ${
                      liquidationPercent === liq
                        ? 'bg-[#253426] text-[#F2EFE7] border-[#253426]'
                        : 'bg-[#F2EFE7] text-[#30271F] border-[#C9C2B6] hover:bg-[#D9D0C1]'
                    }`}
                  >
                    {liq}%
                  </button>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() =>
                  onOpenBookingWithPlan(lot, {
                    downPaymentPercent,
                    downPaymentAmount,
                    financingMonths,
                    monthlyPayment,
                    liquidationPercent,
                    liquidationAmount,
                  })
                }
                className="w-full py-4 bg-[#253426] text-[#F2EFE7] font-sans text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-[#18251C] transition-colors cursor-pointer text-center flex items-center justify-center gap-3"
              >
                <span>Vincular esta Propuesta a Mi Recorrido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Result Breakdown & Bioclimatic Matrix - 6 cols */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Financial Result Card */}
            <div className="border border-[#C9C2B6] bg-[#FCF9F1] p-6 sm:p-8">
              <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.2em] text-[#526352] block mb-2">
                Resumen de Calendario de Pagos
              </span>
              
              <div className="flex items-baseline justify-between pb-4 border-b border-[#C9C2B6] mb-5">
                <span className="font-serif text-lg text-[#101F12]">
                  Mensualidad Fija:
                </span>
                <span className="font-serif text-3xl font-semibold text-[#253426]">
                  {formatMoney(monthlyPayment)}
                </span>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#C9C2B6]/40">
                  <span className="text-[#747872]">Valor Total de Lista</span>
                  <span className="font-mono font-semibold text-[#101F12]">{formatMoney(totalPrice)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#C9C2B6]/40">
                  <span className="text-[#747872]">Enganche Inicial ({downPaymentPercent}%)</span>
                  <span className="font-mono font-semibold text-[#101F12]">{formatMoney(downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#C9C2B6]/40">
                  <span className="text-[#747872]">{financingMonths} Mensualidades Sin Intereses</span>
                  <span className="font-mono font-semibold text-[#253426]">{formatMoney(monthlyPayment)} / mes</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#747872]">Saldo a la Entrega ({liquidationPercent}%)</span>
                  <span className="font-mono font-semibold text-[#101F12]">{formatMoney(liquidationAmount)}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#C9C2B6]/40 text-[11px] text-[#645E52] leading-relaxed">
                * Contrato de promesa de compraventa con firma electrónica notarial avalada. Sin comisiones de apertura ni penalizaciones por liquidación anticipada.
              </div>
            </div>

            {/* Bioclimatic Impact Card */}
            <div className="border border-[#C9C2B6] bg-[#18251C] text-[#F2EFE7] p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE7]/20">
                <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.2em] text-[#BACBB7]">
                  Retorno Ecosistémico & Ahorro Pasivo
                </span>
                <span className="w-2 h-2 bg-[#4ADE80]"></span>
              </div>

              <p className="font-sans text-xs text-[#D9D0C1] leading-relaxed">
                Adquirir en Editorial Yucateco asegura la custodia legal permanente de {preservedM2} m² de selva alta,
                generando un microclima personal sustentable:
              </p>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="border border-[#F2EFE7]/20 p-3 bg-[#101F12]/60">
                  <div className="flex items-center gap-1.5 text-[#BACBB7] text-[10px] uppercase tracking-wider mb-1">
                    <TreePine className="w-3.5 h-3.5" />
                    <span>Árboles Maduros</span>
                  </div>
                  <div className="font-mono text-xl text-[#FCF9F1] font-semibold">
                    ~{estimatedTrees} ejemplares
                  </div>
                  <span className="text-[10px] text-[#8C9D8A]">
                    {co2OffsetTons} tons CO₂/año retenidas
                  </span>
                </div>

                <div className="border border-[#F2EFE7]/20 p-3 bg-[#101F12]/60">
                  <div className="flex items-center gap-1.5 text-[#BACBB7] text-[10px] uppercase tracking-wider mb-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Captación Pluvial</span>
                  </div>
                  <div className="font-mono text-xl text-[#FCF9F1] font-semibold">
                    ~{rainWaterHarvestLitres.toLocaleString()} L
                  </div>
                  <span className="text-[10px] text-[#8C9D8A]">
                    Agua de lluvia limpia al año
                  </span>
                </div>

                <div className="border border-[#F2EFE7]/20 p-3 bg-[#101F12]/60">
                  <div className="flex items-center gap-1.5 text-[#BACBB7] text-[10px] uppercase tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Ahorro Eléctrico</span>
                  </div>
                  <div className="font-mono text-xl text-[#FCF9F1] font-semibold">
                    ~{kwhAnnualSavings.toLocaleString()} kWh
                  </div>
                  <span className="text-[10px] text-[#8C9D8A]">
                    Climatización pasiva cruzada
                  </span>
                </div>

                <div className="border border-[#F2EFE7]/20 p-3 bg-[#101F12]/60">
                  <div className="flex items-center gap-1.5 text-[#BACBB7] text-[10px] uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Bioma Protegido</span>
                  </div>
                  <div className="font-mono text-xl text-[#FCF9F1] font-semibold">
                    {lot.canopyRetentionPercent}%
                  </div>
                  <span className="text-[10px] text-[#8C9D8A]">
                    De tu terreno intacto para siempre
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
