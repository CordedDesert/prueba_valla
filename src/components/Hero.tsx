import React from 'react';
import { ArrowDown, Compass, ShieldCheck, TreePine, Droplets, Wind } from 'lucide-react';

interface HeroProps {
  onExploreMasterplan: () => void;
  onOpenBooking: () => void;
  onOpenManifesto: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMasterplan,
  onOpenBooking,
  onOpenManifesto,
}) => {
  return (
    <section id="portada" className="relative pt-28 sm:pt-36 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Subtle Geological Texture & Warm Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Masthead Meta Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C9C2B6] pb-6 mb-10 gap-4">
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352] block mb-1">
              Cuaderno de Territorio • Edición Colección MMXXVI
            </span>
            <p className="font-serif italic text-lg text-[#645e52]">
              «La arquitectura no coloniza la selva; aprende su penumbra y se cobija bajo su copa.»
            </p>
          </div>
          <div className="text-left md:text-right font-sans text-[11px] text-[#747872] tracking-[0.12em] uppercase">
            <span>Reserva Privada Valladolid</span>
            <span className="mx-2">•</span>
            <span className="text-[#253426] font-semibold">Fase I: 16 Lotes de Autor</span>
          </div>
        </div>

        {/* Hero Title & Editorial Layout (Asymmetric 12-column grid per design system) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
          
          {/* Main Headline - spans 8 columns */}
          <div className="lg:col-span-8">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[72px] lg:line-height-[76px] font-normal tracking-[-0.02em] text-[#101F12] leading-[1.05] mb-8">
              El silencio como lenguaje arquitectónico.
            </h1>
            
            <p className="font-sans text-lg sm:text-[19px] font-light leading-[1.7] text-[#434842] max-w-2xl mb-10">
              Concebido como una publicación editorial antes que un desarrollo inmobiliario común,
              Editorial Yucateco salvaguarda 42 hectáreas de selva viva en el oriente maya.
              Lotes residenciales de baja densidad donde la cantera caliza, el estuco milenario de chukum
              y los vientos alisios configuran una experiencia de retiro atemporal.
            </p>

            {/* CTAs per Design System: Strict 0px, label-caps typography */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreMasterplan}
                className="px-8 py-4 bg-[#253426] text-[#F2EFE7] font-sans text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#18251C] transition-all transform hover:translate-x-1 duration-200 cursor-pointer flex items-center justify-center gap-3 text-center"
              >
                <span>Explorar Masterplan Cartográfico</span>
                <Compass className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="px-8 py-4 bg-transparent border border-[#C9C2B6] text-[#30271F] font-sans text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#D9D0C1]/50 transition-colors cursor-pointer text-center"
              >
                Agendar Recorrido en Terreno
              </button>

              <button
                onClick={onOpenManifesto}
                className="px-4 py-4 text-[#30271F] font-sans text-[13px] tracking-normal underline underline-offset-8 decoration-[#C9C2B6] hover:decoration-[#253426] transition-colors cursor-pointer text-center"
              >
                Leer el Manifiesto
              </button>
            </div>
          </div>

          {/* Quick Registry Card - spans 4 columns */}
          <div className="lg:col-span-4 border border-[#C9C2B6] p-6 bg-[#F6F3EB]/70 backdrop-blur-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#C9C2B6]/40 mb-4">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#526352]">
                Cédula del Proyecto
              </span>
              <span className="w-2 h-2 bg-[#253426]"></span>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div>
                <span className="text-[#747872] block uppercase tracking-[0.12em] text-[10px]">
                  Ubicación Catastral
                </span>
                <span className="text-[#1C1C17] font-medium text-sm">
                  Valladolid Oriental, Yucatán, México
                </span>
              </div>

              <div>
                <span className="text-[#747872] block uppercase tracking-[0.12em] text-[10px]">
                  Régimen de Propiedad
                </span>
                <span className="text-[#1C1C17] font-medium text-sm">
                  Propiedad Privada con Escrituración Inmediata
                </span>
              </div>

              <div>
                <span className="text-[#747872] block uppercase tracking-[0.12em] text-[10px]">
                  Densidad Máxima
                </span>
                <span className="text-[#1C1C17] font-medium text-sm">
                  1 Residencia unifamiliar por cada 1,200+ m²
                </span>
              </div>

              <div>
                <span className="text-[#747872] block uppercase tracking-[0.12em] text-[10px]">
                  Cuerpo de Agua Protegido
                </span>
                <span className="text-[#1C1C17] font-medium text-sm">
                  Cenote Abierto con Búfer Botánico de 30 metros
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#C9C2B6]/40">
              <p className="font-serif italic text-xs text-[#645E52] leading-relaxed">
                «El terreno no se desbroza a ciegas. Cada árbol de más de cinco metros queda asentado en la cartografía previa para adaptar la huella habitacional.»
              </p>
            </div>
          </div>

        </div>

        {/* Cinematographic Hero Image Gallery (Full bleed with 1px border) */}
        <div className="relative border border-[#C9C2B6] overflow-hidden mb-14 group">
          <div className="relative h-[420px] sm:h-[540px] lg:h-[620px] w-full">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
              alt="Pabellón de autor en la selva maya de Valladolid con piedra caliza y agua cristalina"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            {/* Soft mineral overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101F12]/80 via-[#101F12]/20 to-transparent" />

            {/* Bottom In-Image Caption */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between text-[#F2EFE7]">
              <div>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#BACBB7] block mb-1">
                  Fotografía de Obra & Contexto Natural
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FFFFFF]">
                  Pabellón de Caliza & Chukum frente a Espejo de Agua
                </h3>
              </div>

              <div className="mt-3 md:mt-0 font-sans text-xs text-[#E5E2DA] tracking-[0.1em] uppercase flex items-center gap-4">
                <span>Fotógrafo: Archivo Territorial</span>
                <span>•</span>
                <span>Valladolid MMXXVI</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Telemetry Metrics Bars with 1px Stone Borders */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-[#C9C2B6] divide-y md:divide-y-0 md:divide-x divide-[#C9C2B6] bg-[#F1EEE6]">
          
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#526352] mb-3">
              <TreePine className="w-4 h-4" />
              <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.18em]">
                Superficie Protegida
              </span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-[#101F12] font-normal mb-1">
              42 <span className="text-xl font-sans font-light">Has.</span>
            </div>
            <p className="font-sans text-xs text-[#645E52] leading-relaxed">
              Selva mediana subcaducifolia en conservación perpetua.
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#526352] mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.18em]">
                Huella Máxima (COS)
              </span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-[#101F12] font-normal mb-1">
              18% <span className="text-xl font-sans font-light">máx.</span>
            </div>
            <p className="font-sans text-xs text-[#645E52] leading-relaxed">
              El 82% restante permanece como dosel vegetal nativo intacto.
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#526352] mb-3">
              <Droplets className="w-4 h-4" />
              <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.18em]">
                Cenote Privado
              </span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-[#101F12] font-normal mb-1">
              1 <span className="text-xl font-sans font-light">Santuario</span>
            </div>
            <p className="font-sans text-xs text-[#645E52] leading-relaxed">
              Espejo de agua subterránea con acceso exclusivo de baja escala.
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[#526352] mb-3">
              <Wind className="w-4 h-4" />
              <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.18em]">
                Confort Térmico
              </span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-[#101F12] font-normal mb-1">
              -5.5°C <span className="text-xl font-sans font-light">pasivo</span>
            </div>
            <p className="font-sans text-xs text-[#645E52] leading-relaxed">
              Gradiente térmico por microclima arbóreo y vientos alisios ESE.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
