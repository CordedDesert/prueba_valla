import React, { useState } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, Layers, Compass, 
  MapPin, Wind, Sparkles, Eye, Check, ArrowRight, 
  Trees, Droplet, ShieldCheck, Scale
} from 'lucide-react';
import { Lot } from '../types';

interface MasterplanViewerProps {
  lots: Lot[];
  selectedLot: Lot | null;
  onSelectLot: (lot: Lot) => void;
  currency: 'MXN' | 'USD';
  onOpenBookingForLot: (lot: Lot) => void;
  comparedLots: Lot[];
  onToggleCompare: (lot: Lot) => void;
}

export const MasterplanViewer: React.FC<MasterplanViewerProps> = ({
  lots,
  selectedLot,
  onSelectLot,
  currency,
  onOpenBookingForLot,
  comparedLots,
  onToggleCompare,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [showContours, setShowContours] = useState<boolean>(true);
  const [showWinds, setShowWinds] = useState<boolean>(true);
  const [showTrees, setShowTrees] = useState<boolean>(true);
  const [showBuffer, setShowBuffer] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredLot, setHoveredLot] = useState<Lot | null>(null);

  // Filters per design document specification:
  // "Todas las Fases", "Frente a Cenote", "Lotes Hacienda (>1,200 m²)", "Santuario Botánico", "Disponibles"
  const filterOptions = [
    { id: 'todos', label: 'Todas las Fases' },
    { id: 'cenote', label: 'Frente a Cenote' },
    { id: 'hacienda', label: 'Lotes Tipo Hacienda (>1,600 m²)' },
    { id: 'botanico', label: 'Santuario Botánico' },
    { id: 'retiro', label: 'Retiro y Quietud' },
    { id: 'disponibles', label: 'Solo Disponibles' },
  ];

  const filteredLots = lots.filter((lot) => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'disponibles') return lot.status === 'disponible';
    if (activeFilter === 'cenote') return lot.category === 'cenote';
    if (activeFilter === 'hacienda') return lot.category === 'hacienda';
    if (activeFilter === 'botanico') return lot.category === 'botanico';
    if (activeFilter === 'retiro') return lot.category === 'retiro';
    return true;
  });

  const isLotMatched = (lot: Lot) => {
    return filteredLots.some((f) => f.id === lot.id);
  };

  const isCompared = (lot: Lot) => {
    return comparedLots.some((c) => c.id === lot.id);
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
    if (direction === 'out') setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
    if (direction === 'reset') setZoomLevel(1);
  };

  const formatPrice = (lot: Lot) => {
    if (currency === 'MXN') {
      return `$${(lot.priceMxn / 1000000).toFixed(2)}M MXN`;
    }
    return `$${lot.priceUsd.toLocaleString('en-US')} USD`;
  };

  return (
    <section id="masterplan" className="py-20 bg-[#18251C] text-[#F2EFE7] relative overflow-hidden">
      
      {/* Top Banner & Editorial Framing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#F2EFE7]/20 pb-6 mb-8 gap-4">
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#BACBB7] block mb-2">
              Cartografía & Catastro Territorial
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FCF9F1] font-normal tracking-[-0.015em]">
              Masterplan General: Reserva Valladolid
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#BACBB7]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#526352] border border-[#BACBB7] inline-block"></span>
              <span>Disponible ({lots.filter(l => l.status === 'disponible').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#8C9D8A] inline-block"></span>
              <span>Reservado ({lots.filter(l => l.status === 'reservado').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#31312B] border border-[#747872] inline-block"></span>
              <span>Adquirido ({lots.filter(l => l.status === 'adquirido').length})</span>
            </div>
          </div>
        </div>

        {/* Filter Chips per Design Spec:
            "Estilo rectangular sobrio. Fondo nulo, borde perimetral de 1px en tono neutro.
             Al activarse, adquieren fondo Verde Selva (#253426) y texto Blanco Cálido (#F2EFE7)" */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#BACBB7] mr-2">
            Filtros:
          </span>
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-[11px] font-sans uppercase tracking-[0.14em] font-medium border transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#253426] text-[#FCF9F1] border-[#BACBB7]'
                    : 'bg-transparent text-[#D9D0C1] border-[#C9C2B6]/40 hover:border-[#D9D0C1] hover:bg-[#253426]/30'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Layer Controls Bar & Zoom */}
        <div className="flex flex-wrap items-center justify-between bg-[#101F12]/80 border border-[#F2EFE7]/20 p-3 mb-6 text-xs font-sans text-[#D9D0C1]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#BACBB7] flex items-center gap-1.5 font-semibold">
              <Layers className="w-3.5 h-3.5" />
              Capas Técnicas:
            </span>

            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={showContours}
                onChange={(e) => setShowContours(e.target.checked)}
                className="accent-[#526352] w-3.5 h-3.5 rounded-none cursor-pointer"
              />
              <span className="text-[11px] tracking-wider">Topografía & Curvas (+20m / +28m)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={showWinds}
                onChange={(e) => setShowWinds(e.target.checked)}
                className="accent-[#526352] w-3.5 h-3.5 rounded-none cursor-pointer"
              />
              <span className="text-[11px] tracking-wider">Vientos Alisios ESE</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={showTrees}
                onChange={(e) => setShowTrees(e.target.checked)}
                className="accent-[#526352] w-3.5 h-3.5 rounded-none cursor-pointer"
              />
              <span className="text-[11px] tracking-wider">Ceibas & Dosel Arbóreo</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={showBuffer}
                onChange={(e) => setShowBuffer(e.target.checked)}
                className="accent-[#526352] w-3.5 h-3.5 rounded-none cursor-pointer"
              />
              <span className="text-[11px] tracking-wider">Búfer del Cenote (30m)</span>
            </label>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => handleZoom('in')}
              className="p-1.5 border border-[#F2EFE7]/30 hover:bg-[#253426] transition-colors"
              title="Acercar plano"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="p-1.5 border border-[#F2EFE7]/30 hover:bg-[#253426] transition-colors"
              title="Alejar plano"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom('reset')}
              className="p-1.5 border border-[#F2EFE7]/30 hover:bg-[#253426] transition-colors"
              title="Restablecer vista"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-[10px] uppercase font-mono tracking-wider ml-1 text-[#BACBB7]">
              {(zoomLevel * 100).toFixed(0)}%
            </span>
          </div>
        </div>

      </div>

      {/* Main Interactive Map & Side Inspector Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Vector Map Container - 8 or 12 columns */}
          <div className={`relative border border-[#F2EFE7]/20 bg-[#101F12] overflow-hidden ${selectedLot ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
            
            {/* Topographic Scale & Orientation Compass Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-[#18251C]/85 backdrop-blur-md border border-[#F2EFE7]/20 p-3 pointer-events-none">
              <div className="flex items-center gap-2 mb-1 text-[10px] font-sans uppercase tracking-[0.16em] text-[#BACBB7]">
                <Compass className="w-3.5 h-3.5 text-[#BACBB7]" />
                <span>Norte Cartográfico</span>
              </div>
              <div className="font-mono text-[9px] text-[#D9D0C1]">
                Cota Base: +22.0m | Declinación: +3.2°
              </div>
            </div>

            {/* Bottom Scale Indicator */}
            <div className="absolute bottom-4 left-4 z-10 bg-[#18251C]/85 backdrop-blur-md border border-[#F2EFE7]/20 px-3 py-1.5 pointer-events-none font-mono text-[9px] text-[#BACBB7] flex items-center gap-3">
              <span>0m</span>
              <div className="w-16 h-1 bg-[#BACBB7]"></div>
              <span>50m</span>
              <div className="w-16 h-1 bg-[#BACBB7]"></div>
              <span>100m</span>
            </div>

            {/* SVG Map Canvas */}
            <div className="w-full overflow-x-auto overflow-y-hidden cursor-crosshair">
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.25s ease-out',
                }}
                className="min-w-[850px] w-full"
              >
                <svg
                  viewBox="0 0 1020 620"
                  className="w-full h-auto select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Cenote Water Gradient */}
                    <radialGradient id="cenoteGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0E7490" stopOpacity="0.9" />
                      <stop offset="45%" stopColor="#0D9488" stopOpacity="0.75" />
                      <stop offset="85%" stopColor="#115E59" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#18251C" stopOpacity="0.9" />
                    </radialGradient>

                    {/* Vegetation Pattern */}
                    <pattern id="junglePattern" width="30" height="30" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1.5" fill="#253426" opacity="0.6" />
                      <circle cx="22" cy="18" r="2" fill="#526352" opacity="0.4" />
                      <circle cx="5" cy="25" r="1" fill="#8C9D8A" opacity="0.3" />
                    </pattern>

                    {/* Caliza Texture */}
                    <pattern id="stonePath" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#C9C2B6" strokeWidth="0.5" opacity="0.2" />
                    </pattern>
                  </defs>

                  {/* Masterplan Base Background */}
                  <rect width="1020" height="620" fill="#141E15" />
                  <rect width="1020" height="620" fill="url(#junglePattern)" />

                  {/* Topographic Contour Lines */}
                  {showContours && (
                    <g opacity="0.4" stroke="#8C9D8A" strokeWidth="0.75" fill="none" strokeDasharray="3 3">
                      {/* Contour 20m */}
                      <path d="M 40 80 Q 250 40 500 70 T 980 60" />
                      <text x="60" y="70" fill="#8C9D8A" fontSize="8" fontFamily="monospace">cota +20.0m</text>

                      {/* Contour 22m */}
                      <path d="M 40 180 Q 300 130 550 170 T 980 150" />
                      <text x="60" y="170" fill="#8C9D8A" fontSize="8" fontFamily="monospace">cota +22.0m</text>

                      {/* Contour 24m */}
                      <path d="M 40 330 Q 280 270 540 310 T 980 290" />
                      <text x="60" y="320" fill="#8C9D8A" fontSize="8" fontFamily="monospace">cota +24.0m</text>

                      {/* Contour 26m */}
                      <path d="M 40 460 Q 320 400 580 440 T 980 430" />
                      <text x="60" y="450" fill="#8C9D8A" fontSize="8" fontFamily="monospace">cota +26.0m</text>

                      {/* Contour 28m */}
                      <path d="M 40 580 Q 340 520 600 550 T 980 540" />
                      <text x="60" y="570" fill="#8C9D8A" fontSize="8" fontFamily="monospace">cota +28.0m</text>
                    </g>
                  )}

                  {/* Cenote Sagrado and Buffer Zone */}
                  <g id="cenote-area">
                    {/* 30m Ecological Buffer */}
                    {showBuffer && (
                      <circle
                        cx="330"
                        cy="460"
                        r="120"
                        fill="none"
                        stroke="#0D9488"
                        strokeWidth="1.2"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />
                    )}

                    {/* Cenote Water Body */}
                    <ellipse
                      cx="330"
                      cy="460"
                      rx="75"
                      ry="58"
                      fill="url(#cenoteGradient)"
                      stroke="#2DD4BF"
                      strokeWidth="1.5"
                    />

                    {/* Water concentric ripples */}
                    <ellipse cx="330" cy="460" rx="50" ry="38" fill="none" stroke="#A7F3D0" strokeWidth="0.8" opacity="0.5" />
                    <ellipse cx="330" cy="460" rx="25" ry="18" fill="none" stroke="#ECFDF5" strokeWidth="0.6" opacity="0.6" />

                    {/* Cenote Label */}
                    <text
                      x="330"
                      y="463"
                      textAnchor="middle"
                      fill="#F2EFE7"
                      fontSize="10"
                      fontFamily="EB Garamond, serif"
                      letterSpacing="0.1em"
                      fontWeight="500"
                    >
                      CENOTE SAGRADO DE LA RESERVA
                    </text>
                    <text
                      x="330"
                      y="476"
                      textAnchor="middle"
                      fill="#99F6E4"
                      fontSize="7"
                      fontFamily="Inter, sans-serif"
                      letterSpacing="0.15em"
                    >
                      AGUAS SUBTERRÁNEAS VÍRGENES • BÚFER 30M
                    </text>
                  </g>

                  {/* Main Limestone Pathways (Senderos de Cantera) */}
                  <g id="pathways" stroke="#C9C2B6" strokeWidth="4" fill="none" opacity="0.75" strokeLinecap="square">
                    {/* Main North-South Access Camino Real */}
                    <path d="M 50 240 Q 280 230 520 205 T 980 180" />
                    <path d="M 50 390 Q 250 380 500 350 T 980 320" />
                    {/* Cenote Path */}
                    <path d="M 330 380 L 330 400" strokeDasharray="3 3" strokeWidth="2" stroke="#99F6E4" />
                    {/* North-South Trail */}
                    <path d="M 515 90 L 510 580" strokeDasharray="2 3" strokeWidth="2" opacity="0.5" />
                  </g>

                  {/* Pathway Labels */}
                  <text x="210" y="235" fill="#D9D0C1" fontSize="7" fontFamily="Inter, sans-serif" letterSpacing="0.15em">
                    SENDERO PRINCIPAL DE LA CANTERA BLANCA
                  </text>
                  <text x="680" y="325" fill="#D9D0C1" fontSize="7" fontFamily="Inter, sans-serif" letterSpacing="0.15em">
                    CAMINO REAL DE LAS CEIBAS
                  </text>

                  {/* Native Trees & Canopy Accents */}
                  {showTrees && (
                    <g id="trees" fill="#526352" opacity="0.6">
                      <circle cx="140" cy="110" r="14" />
                      <circle cx="280" cy="80" r="16" />
                      <circle cx="450" cy="70" r="15" />
                      <circle cx="680" cy="65" r="18" />
                      <circle cx="890" cy="55" r="16" />
                      <circle cx="160" cy="510" r="17" />
                      <circle cx="620" cy="480" r="20" />
                      <circle cx="820" cy="450" r="18" />
                      {/* Tree trunk marker */}
                      <circle cx="140" cy="110" r="2" fill="#D9D0C1" />
                      <text x="140" y="130" textAnchor="middle" fill="#BACBB7" fontSize="6" fontFamily="sans-serif">Ceiba 34m</text>
                      <circle cx="680" cy="65" r="2" fill="#D9D0C1" />
                      <text x="680" y="87" textAnchor="middle" fill="#BACBB7" fontSize="6" fontFamily="sans-serif">Tzalam Centenario</text>
                    </g>
                  )}

                  {/* Wind Direction Arrows */}
                  {showWinds && (
                    <g id="winds" stroke="#BACBB7" strokeWidth="1" opacity="0.65" fill="none">
                      <path d="M 940 370 L 870 350 M 885 345 L 870 350 L 880 358" />
                      <path d="M 750 490 L 680 470 M 695 465 L 680 470 L 690 478" />
                      <path d="M 580 540 L 510 520 M 525 515 L 510 520 L 520 528" />
                      <text x="890" y="380" fill="#BACBB7" fontSize="8" fontFamily="Inter, sans-serif" letterSpacing="0.12em">
                        VIENTOS ALISIOS ESE (14 km/h)
                      </text>
                    </g>
                  )}

                  {/* Render Lots (1 to 16) */}
                  <g id="lots">
                    {lots.map((lot) => {
                      const isSelected = selectedLot?.id === lot.id;
                      const isHovered = hoveredLot?.id === lot.id;
                      const matched = isLotMatched(lot);

                      // Strict Color coding per spec:
                      // Disponible: Deep Forest / Sage border
                      // Reservado: Warm Earth / Sand
                      // Adquirido: Dark Stone
                      let fillColor = '#1B2C1E';
                      let strokeColor = '#526352';
                      let strokeWidth = '1';

                      if (lot.status === 'disponible') {
                        fillColor = isSelected ? '#253426' : isHovered ? '#253426' : '#1C291D';
                        strokeColor = isSelected ? '#BACBB7' : isHovered ? '#FFFFFF' : '#8C9D8A';
                        strokeWidth = isSelected || isHovered ? '2.5' : '1.2';
                      } else if (lot.status === 'reservado') {
                        fillColor = isSelected ? '#3D362C' : '#2A251E';
                        strokeColor = '#D9D0C1';
                        strokeWidth = isSelected || isHovered ? '2' : '1';
                      } else if (lot.status === 'adquirido') {
                        fillColor = '#181C19';
                        strokeColor = '#434842';
                        strokeWidth = '0.8';
                      }

                      const opacity = matched ? (lot.status === 'adquirido' ? '0.6' : '0.95') : '0.25';

                      return (
                        <g
                          key={lot.id}
                          className="cursor-pointer transition-all duration-150"
                          onClick={() => onSelectLot(lot)}
                          onMouseEnter={() => setHoveredLot(lot)}
                          onMouseLeave={() => setHoveredLot(null)}
                        >
                          {/* Lot Polygon with Aristas Vivas (Sharp 0px) */}
                          <polygon
                            points={lot.svgCoords.polygon}
                            fill={fillColor}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            opacity={opacity}
                          />

                          {/* Lot Number Label */}
                          <text
                            x={lot.svgCoords.labelPos[0]}
                            y={lot.svgCoords.labelPos[1] - 4}
                            textAnchor="middle"
                            fill={isSelected ? '#FFFFFF' : '#F2EFE7'}
                            fontSize="11"
                            fontFamily="EB Garamond, serif"
                            fontWeight={isSelected ? '600' : '400'}
                          >
                            {lot.number < 10 ? `0${lot.number}` : lot.number}
                          </text>

                          {/* Lot m² */}
                          <text
                            x={lot.svgCoords.labelPos[0]}
                            y={lot.svgCoords.labelPos[1] + 8}
                            textAnchor="middle"
                            fill={isSelected ? '#BACBB7' : '#C9C2B6'}
                            fontSize="7.5"
                            fontFamily="Inter, monospace"
                            letterSpacing="0.05em"
                          >
                            {lot.areaM2} m²
                          </text>

                          {/* Status Micro Indicator (Circular per spec) */}
                          <circle
                            cx={lot.svgCoords.labelPos[0]}
                            cy={lot.svgCoords.labelPos[1] + 16}
                            r="2.5"
                            fill={
                              lot.status === 'disponible'
                                ? '#4ADE80'
                                : lot.status === 'reservado'
                                ? '#FBBF24'
                                : '#6B7280'
                            }
                          />
                        </g>
                      );
                    })}
                  </g>

                </svg>
              </div>
            </div>

            {/* Hover Tooltip Float (When hovered and no lot selected or hovering another) */}
            {hoveredLot && (
              <div className="absolute bottom-4 right-4 z-20 bg-[#F2EFE7] text-[#1C1C17] border border-[#C9C2B6] p-4 max-w-xs shadow-none">
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#C9C2B6] mb-2">
                  <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.16em] text-[#526352]">
                    Lote {hoveredLot.number < 10 ? `0${hoveredLot.number}` : hoveredLot.number} • {hoveredLot.categoryLabel}
                  </span>
                  <span
                    className={`text-[9px] uppercase font-semibold px-1.5 py-0.5 ${
                      hoveredLot.status === 'disponible'
                        ? 'bg-[#253426] text-[#F2EFE7]'
                        : hoveredLot.status === 'reservado'
                        ? 'bg-[#D9D0C1] text-[#30271F]'
                        : 'bg-[#C9C2B6] text-[#747872]'
                    }`}
                  >
                    {hoveredLot.status}
                  </span>
                </div>
                <h4 className="font-serif text-base text-[#101F12] font-medium leading-snug mb-1">
                  {hoveredLot.name}
                </h4>
                <div className="flex items-center justify-between text-xs font-mono text-[#434842] mt-2 pt-2 border-t border-[#C9C2B6]/40">
                  <span>{hoveredLot.areaM2} m² ({hoveredLot.areaSqFt.toLocaleString()} sq ft)</span>
                  <span className="font-semibold text-[#101F12]">{formatPrice(hoveredLot)}</span>
                </div>
                <p className="text-[10px] text-[#747872] mt-1 font-sans">
                  Haz clic para abrir la ficha técnica y plano topográfico
                </p>
              </div>
            )}

          </div>

          {/* Contextual Side Inspector Panel per Design Specification:
              "Modales contextuales de lotes emergentes sin sombras espesas: paneles rasantes de acabado marfil cálido (#F2EFE7),
               con contorno nítido de 1px, exponiendo topografía, medidas exactas y renderizado arquitectónico contextual." */}
          {selectedLot ? (
            <div className="lg:col-span-4 border border-[#F2EFE7]/30 bg-[#F2EFE7] text-[#1C1C17] p-6 lg:p-8 animate-fadeIn">
              
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#C9C2B6] mb-5">
                <div>
                  <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.2em] text-[#526352] block mb-1">
                    Ficha Cartográfica • Lote {selectedLot.number < 10 ? `0${selectedLot.number}` : selectedLot.number}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl font-normal text-[#101F12] leading-tight">
                    {selectedLot.name}
                  </h3>
                </div>

                <button
                  onClick={() => onSelectLot(null as any)}
                  className="text-xs uppercase font-sans tracking-widest text-[#747872] hover:text-[#101F12] p-1 cursor-pointer"
                >
                  ✕ Cerrar
                </button>
              </div>

              {/* Architectural Render Preview */}
              <div className="relative border border-[#C9C2B6] overflow-hidden mb-5">
                <img
                  src={selectedLot.heroImage}
                  alt={selectedLot.name}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-[#F2EFE7]/90 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.14em] text-[#253426] font-semibold border border-[#C9C2B6]">
                  Render de Integración Bioclimática
                </div>
              </div>

              {/* Exact Metrics Grid (label-mono-stat) */}
              <div className="grid grid-cols-2 gap-3 border border-[#C9C2B6] p-4 bg-[#F6F3EB] mb-5 font-sans">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#747872] block">
                    Superficie Total
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#101F12]">
                    {selectedLot.areaM2} m²
                  </span>
                  <span className="text-[10px] text-[#747872] block">
                    ({selectedLot.areaSqFt.toLocaleString()} sq ft)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#747872] block">
                    Dimensiones
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#101F12]">
                    {selectedLot.dimensions.front}m x {selectedLot.dimensions.depth}m
                  </span>
                  <span className="text-[10px] text-[#747872] block">
                    Frente por fondo
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#747872] block">
                    Orientación & Viento
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#101F12]">
                    {selectedLot.orientation}
                  </span>
                  <span className="text-[10px] text-[#526352] block font-medium">
                    {selectedLot.windDirection}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#747872] block">
                    Selva Preservada
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#253426]">
                    {selectedLot.canopyRetentionPercent}%
                  </span>
                  <span className="text-[10px] text-[#747872] block">
                    Huella COS: {selectedLot.maxFootprintM2} m²
                  </span>
                </div>
              </div>

              {/* Species Inventory */}
              <div className="mb-5">
                <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.16em] text-[#526352] block mb-1.5">
                  Arbolado Endémico Registrado
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLot.featuredTrees.map((tree, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#EBE8E0] text-[10px] font-sans text-[#30271F] border border-[#C9C2B6]"
                    >
                      {tree}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architectural Recommendation */}
              <div className="mb-6 border-l-2 border-[#253426] pl-3 py-1">
                <p className="font-serif italic text-xs text-[#434842] leading-relaxed">
                  «{selectedLot.architecturalNote}»
                </p>
              </div>

              {/* Pricing & CTA Buttons */}
              <div className="pt-4 border-t border-[#C9C2B6] space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#747872]">
                    Valor de Adquisición
                  </span>
                  <span className="font-serif text-2xl font-semibold text-[#101F12]">
                    {formatPrice(selectedLot)}
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => onOpenBookingForLot(selectedLot)}
                    className="w-full py-3 bg-[#253426] text-[#F2EFE7] font-sans text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-[#18251C] transition-colors cursor-pointer text-center"
                  >
                    Agendar Recorrido en Terreno
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onToggleCompare(selectedLot)}
                      className={`py-2 px-3 border border-[#C9C2B6] text-[10px] uppercase font-sans tracking-[0.14em] font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        isCompared(selectedLot)
                          ? 'bg-[#253426] text-[#F2EFE7]'
                          : 'bg-transparent text-[#30271F] hover:bg-[#D9D0C1]'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{isCompared(selectedLot) ? 'En Comparador' : 'Comparar'}</span>
                    </button>

                    <button
                      onClick={() => {
                        const lotElem = document.getElementById(`lote-card-${selectedLot.id}`);
                        if (lotElem) lotElem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="py-2 px-3 border border-[#C9C2B6] text-[10px] uppercase font-sans tracking-[0.14em] font-medium bg-transparent text-[#30271F] hover:bg-[#D9D0C1] transition-colors cursor-pointer text-center"
                    >
                      Ver en Catálogo
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="hidden lg:block lg:col-span-12">
              <div className="border border-[#F2EFE7]/20 p-4 bg-[#101F12]/60 text-center font-sans text-xs text-[#BACBB7]">
                Selecciona cualquier lote en el mapa vectorial superior para desplegar su ficha catastral, orientación solar y arbolado preservado.
              </div>
            </div>
          )}

        </div>
      </div>

    </section>
  );
};
