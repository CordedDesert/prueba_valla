import React from 'react';
import { Layers, Sparkles, Feather, Compass, CheckCircle2 } from 'lucide-react';

export const Manifesto: React.FC = () => {
  return (
    <section id="manifiesto" className="py-20 lg:py-28 bg-[#F1EEE6] border-y border-[#C9C2B6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352] block mb-3">
            Tratado de Arquitectura & Territorio
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#101F12] font-normal tracking-[-0.015em] mb-6">
            El Manifiesto de la Cantera y la Ceiba.
          </h2>
          <p className="font-sans text-base sm:text-lg font-light text-[#434842] leading-relaxed">
            Rechazamos las urbanizaciones genéricas de asfalto y cercas perimetrales sintéticas.
            Proponemos una habitabilidad basada en la quietud conventual de Valladolid,
            donde cada muro nace de la piedra del mismo predio y cada árbol preexistente ordena el plano del arquitecto.
          </p>
        </div>

        {/* 3 Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#C9C2B6] pt-12">
          
          {/* Column 1 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#C9C2B6]/40 pb-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#526352] font-semibold">
                Principio I
              </span>
              <span className="font-serif italic text-lg text-[#747872]">01</span>
            </div>

            <h3 className="font-serif text-2xl text-[#1C1C17] font-normal">
              La Materia de la Tierra: Piedra Caliza y Chukum
            </h3>

            <p className="font-sans text-sm text-[#434842] leading-relaxed">
              Toda intervención en la reserva debe dialogar con los materiales vernáculos.
              El estuco elaborado con la resina cocida del árbol de chukum sella los muros de forma natural,
              evitando la pintura plástica y adquiriendo una pátina orgánica que madura con la lluvia y el sol.
            </p>

            <div className="border border-[#C9C2B6] p-4 bg-[#F2EFE7]">
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#253426] font-semibold block mb-2">
                Normativa de Materialidad
              </span>
              <ul className="space-y-2 text-xs font-sans text-[#645E52]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#253426]"></span>
                  Muros en mampostería de piedra caliza de la región
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#253426]"></span>
                  Revoques de chukum o encalado blanco natural
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#253426]"></span>
                  Carpinterías en maderas tropicales duras (Zapote, Tzalam)
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#C9C2B6]/40 pb-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#526352] font-semibold">
                Principio II
              </span>
              <span className="font-serif italic text-lg text-[#747872]">02</span>
            </div>

            <h3 className="font-serif text-2xl text-[#1C1C17] font-normal">
              La Sombrilla Arbórea: Ventilación Pasiva Cruzada
            </h3>

            <p className="font-sans text-sm text-[#434842] leading-relaxed">
              La selva de Valladolid no es un obstáculo a talar, sino la maquinaria bioclimática más sofisticada del planeta.
              Al preservar el 82% de la masa arbórea en cada predio, se crea un dosel térmico continuo que impide
              la acumulación de calor en el suelo, complementado con crujías estrechas orientadas al viento alisio.
            </p>

            <div className="border border-[#C9C2B6] p-4 bg-[#F2EFE7]">
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#253426] font-semibold block mb-2">
                Parámetros Bioclimáticos
              </span>
              <ul className="space-y-2 text-xs font-sans text-[#645E52]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#253426]"></span>
                  COS máximo: 18% a 20% de huella constructiva
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#253426]"></span>
                  Retiros laterales mínimos de 5.0 metros de selva virgen
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#253426]"></span>
                  Captación de vientos dominantes del Este-Sureste
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#C9C2B6]/40 pb-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#526352] font-semibold">
                Principio III
              </span>
              <span className="font-serif italic text-lg text-[#747872]">03</span>
            </div>

            <h3 className="font-serif text-2xl text-[#1C1C17] font-normal">
              La Memoria de la Caverna: El Cenote y el Silencio
            </h3>

            <p className="font-sans text-sm text-[#434842] leading-relaxed">
              El agua en Yucatán es sagrada. El cenote central de la reserva cuenta con un perímetro de protección botánica
              absoluta de 30 metros donde queda prohibida cualquier edificación pesada.
              Los senderos hacia el agua se transitan a pie sobre piedra caliza en seco, en una liturgia de sosiego y comunión.
            </p>

            <div className="border border-[#C9C2B6] p-4 bg-[#F2EFE7]">
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#253426] font-semibold block mb-2">
                Conservación Hídrica
              </span>
              <ul className="space-y-2 text-xs font-sans text-[#645E52]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#253426]"></span>
                  Tratamiento biodigestor anaerobio de 3 etapas
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#253426]"></span>
                  Cero vertimientos a mantos freáticos
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#253426]"></span>
                  Aljibes subterráneos de captación pluvial obligatorios
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Quote Block with Editorial Serif Italic */}
        <div className="mt-16 border-t border-[#C9C2B6] pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#253426] leading-snug">
              «No construimos casas en medio de la naturaleza; diseñamos umbrales habitables para contemplar la vida del bosque.»
            </blockquote>
          </div>
          <div className="md:col-span-4 md:text-right">
            <span className="font-sans text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1C17] block">
              Comité de Arquitectura Editorial
            </span>
            <span className="font-sans text-xs text-[#747872] block">
              Taller Territorial Valladolid MMXXVI
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
