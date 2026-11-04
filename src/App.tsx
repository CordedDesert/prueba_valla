import React, { useState, useEffect } from 'react';
import {
  Compass, MapPin, CheckCircle2, ChevronDown, ChevronUp,
  FileText, Scale, Calendar, Download, Eye, ArrowRight,
  ShieldCheck, Layers, HelpCircle, User, Phone, Mail,
  Printer, ArrowUpRight, Search, Trees, Sparkles, X, SlidersHorizontal
} from 'lucide-react';

interface Macrolote {
  id: string;
  lote: string;
  categoria: 'Carretera' | 'Interior' | 'En esquina';
  superficieM2: number;
  superficieHectareas: number;
  precioM2: number;
  precioTotal: number;
  disponibilidad: 'Disponible' | 'En proceso' | 'Reservado';
  imagen: string;
  frente: number;
  fondo: number;
  detalles: string;
  vegetacion: string;
}

const INVENTARIO_MACROLOTES: Macrolote[] = [
  {
    id: 'macrolote-1',
    lote: 'Macrolote 01 · Frente Carretera',
    categoria: 'Carretera',
    superficieM2: 2500.45,
    superficieHectareas: 0.25,
    precioM2: 1200,
    precioTotal: 3000540,
    disponibilidad: 'Disponible',
    imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    frente: 35.5,
    fondo: 70.4,
    detalles: 'Frente directo sobre carretera Pisté-Valladolid con excelente visibilidad y acceso vehicular expedito.',
    vegetacion: 'Árboles de Tzalam, Ceiba joven y estrato de cantera blanca.',
  },
  {
    id: 'macrolote-2',
    lote: 'Macrolote 02 · En Esquina',
    categoria: 'En esquina',
    superficieM2: 5000.00,
    superficieHectareas: 0.5,
    precioM2: 980,
    precioTotal: 4900000,
    disponibilidad: 'Disponible',
    imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    frente: 55.0,
    fondo: 90.9,
    detalles: 'Media hectárea con doble frente sobre sendero principal. Excelente orientación a los vientos alisios ESE.',
    vegetacion: 'Arboleda densa de Ramón silvestre, Jabín y orquídeas fósiles.',
  },
  {
    id: 'macrolote-3',
    lote: 'Macrolote 03 · Interior',
    categoria: 'Interior',
    superficieM2: 7500.00,
    superficieHectareas: 0.75,
    precioM2: 850,
    precioTotal: 6375000,
    disponibilidad: 'En proceso',
    imagen: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    frente: 65.0,
    fondo: 115.4,
    detalles: 'Amplia fracción interior cobijada por selva virgen. Silencio absoluto y privacidad patrimonial.',
    vegetacion: 'Ceibas maduras registradas, Copal aromático y Tzalam centenario.',
  },
  {
    id: 'macrolote-4',
    lote: 'Macrolote 04 · Macrolote 1 Ha',
    categoria: 'Interior',
    superficieM2: 10000.00,
    superficieHectareas: 1.0,
    precioM2: 500,
    precioTotal: 5000000,
    disponibilidad: 'Disponible',
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
    frente: 80.0,
    fondo: 125.0,
    detalles: '1 Hectárea completa con tarifa preferencial de volumen a $500/m². Idónea para rancho boutique o reserva de valor.',
    vegetacion: 'Selva alta subcaducifolia en conservación perpetua con suelo cárstico fértil.',
  },
  {
    id: 'macrolote-5',
    lote: 'Macrolote 05 · Santuario Interior',
    categoria: 'Interior',
    superficieM2: 15000.00,
    superficieHectareas: 1.5,
    precioM2: 520,
    precioTotal: 7800000,
    disponibilidad: 'Disponible',
    imagen: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    frente: 100.0,
    fondo: 150.0,
    detalles: '1.5 Hectáreas contiguas a la zona de amortiguamiento botánico. Terreno sin afectación ni servidumbres.',
    vegetacion: 'Población de maderas duras tropicales (Zapote, Chaca rojo, Balché).',
  },
  {
    id: 'macrolote-6',
    lote: 'Macrolote 06 · Gran Reserva 2.5 Has',
    categoria: 'Interior',
    superficieM2: 25000.00,
    superficieHectareas: 2.5,
    precioM2: 480,
    precioTotal: 12000000,
    disponibilidad: 'Disponible',
    imagen: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    frente: 125.0,
    fondo: 200.0,
    detalles: 'La fracción de mayor escala del proyecto. Macrolote patrimonial para inversionistas institucionales o preservación familiar.',
    vegetacion: 'Bosque tropical maduro continuo con afloramientos naturales de piedra caliza.',
  },
];

// Fallback image links
const IMG_HERO_CDN = 'https://lh3.googleusercontent.com/aida/AEtjO1U0hhl81Rn_0aT_2gblwHJ25szGLf8LsOH0Am85WYkj8dh0Q6Za1KIh_hCJMC47ixS-1bGDacbsMKXeZ9QA61wppqLEWzHSYiLmkbj_bRZ-SyaNpJL7wZTBKbsmCe_1J6AyhShgok-NpUo7AxCm3zCq55GXPHSfOfA9fKhoNV6a3qq59I28_cfFJzsQZah4b49LmJF7237hgsJ7eVQ7c2xwvIGHWvD2XgG7sPbTMslGSA';
const IMG_HERO_BACKUP = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85';

const IMG_DETAIL_CDN = 'https://lh3.googleusercontent.com/aida/AEtjO1V7JvRJrRvUIYda2s_XUPtgg7l2ECMYVcB1STbGc15Nux-OfjuDvzBsXYxHZbMFa2ciHZoTtZoBeiyt3XaKq_UPst80Bbm783r7bP3vWUW9QWUwFSRVRulIZTsBF0PcuMwAP3_MhvUlzMUzw-cXurPqAUwshdO9MoV7GAcHV5Q35Lq-XIVlt48iB_hL3B794EcsjyEH-eiwFU9mDXnp17nzCHJpJFJWh_te-6RKxcU5Gg';
const IMG_DETAIL_BACKUP = 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85';

export default function App() {
  const [heroImg, setHeroImg] = useState(IMG_HERO_CDN);
  const [detailImg, setDetailImg] = useState(IMG_DETAIL_CDN);

  // Filters & Selection
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('todos');
  const [selectedMacroloteForDetail, setSelectedMacroloteForDetail] = useState<Macrolote | null>(null);
  const [comparedLots, setComparedLots] = useState<Macrolote[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Asesor Tools & Cotizador Modal State
  const [isAsesorModalOpen, setIsAsesorModalOpen] = useState(false);
  const [cotizadorLotId, setCotizadorLotId] = useState<string>('macrolote-1');
  const [cotizadorPlan, setCotizadorPlan] = useState<'A' | 'B'>('A');
  const [cotizacionEmitida, setCotizacionEmitida] = useState(false);
  const [clienteNombre, setClienteNombre] = useState('');

  // Contact Form State
  const [contactMode, setContactMode] = useState<'informacion' | 'visita'>('informacion');
  const [contactName, setContactName] = useState('');
  const [contactContact, setContactContact] = useState('');
  const [contactLotInterest, setContactLotInterest] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [assignedFolio, setAssignedFolio] = useState('');

  // Header scroll & active section state
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('ubicacion');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy to keep active gold indicator synchronized
      const sections = [
        { id: 'hero', key: 'inicio' },
        { id: 'proyecto', key: 'proyecto' },
        { id: 'ubicacion', key: 'ubicacion' },
        { id: 'reserva-liah', key: 'reserva' },
        { id: 'certeza', key: 'certeza' },
      ];

      const scrollPos = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveNav(sections[i].key);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCompare = (lote: Macrolote) => {
    setComparedLots((prev) => {
      const exists = prev.some((l) => l.id === lote.id);
      if (exists) {
        return prev.filter((l) => l.id !== lote.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), lote];
      }
      return [...prev, lote];
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const folio = `VLD-${Math.floor(100000 + Math.random() * 900000)}`;
    setAssignedFolio(folio);
    setContactSubmitted(true);
  };

  const filteredMacrolotes = INVENTARIO_MACROLOTES.filter((m) => {
    if (activeCategoryFilter === 'todos') return true;
    return m.categoria === activeCategoryFilter;
  });

  const selectedCotizadorLot = INVENTARIO_MACROLOTES.find((m) => m.id === cotizadorLotId) || INVENTARIO_MACROLOTES[0];
  const cotizadorEnganche = cotizadorPlan === 'A' ? selectedCotizadorLot.precioTotal * 0.3 : 0;
  const cotizadorMensualidades = cotizadorPlan === 'A' ? 36 : 24;
  const cotizadorMontoFinanciar = selectedCotizadorLot.precioTotal - cotizadorEnganche;
  const cotizadorMensualidadFija = cotizadorMontoFinanciar / cotizadorMensualidades;

  return (
    <div className="bg-[#0b140d] font-sans antialiased text-[#b5b0a3] selection:bg-[#253426] selection:text-[#e7e2d6] overflow-x-hidden min-h-screen">
      
      {/* ========================================================
          NAVBAR (Exact match with user attachment 57d75863-4aad-4e0e-a75a-04f03a83ab79_dea39260.png)
          Emblem + LIAH VALLADOLID | Stacked nav items + Advisor Headset & Contact Send pills
          ======================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-5 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex items-center justify-between pointer-events-auto border-b border-[#a8905b]/40 ${
          scrolled
            ? 'bg-[#0a120c]/98 backdrop-blur-md shadow-[0_6px_35px_rgba(0,0,0,0.85)]'
            : 'bg-[#09110b]/92 backdrop-blur-sm shadow-[0_4px_25px_rgba(0,0,0,0.65)]'
        }`}
      >
        <div className="w-full max-w-[1760px] mx-auto flex items-center justify-between">
          {/* Left Brand Area: Botanical Arch Emblem + Logo + Divider + Navigation */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-7 xl:gap-8">
            {/* LIAH VALLADOLID Brand with Botanical Emblem */}
            <a href="#hero" onClick={() => setActiveNav('inicio')} className="flex items-center gap-3 sm:gap-3.5 group">
              {/* Botanical Leaf Arch Emblem */}
              <div className="w-6 sm:w-7 h-8 sm:h-9 flex items-center justify-center shrink-0">
                <svg
                  className="w-full h-full text-[#cbb279] group-hover:text-[#dec795] transition-colors"
                  viewBox="0 0 28 36"
                  fill="none"
                >
                  {/* Outer Arch */}
                  <path
                    d="M14 2 C6 2 2 7 2 17 C2 27 6 34 14 34 C22 34 26 27 26 17 C26 7 22 2 14 2 Z"
                    stroke="#cbb279"
                    strokeWidth="1.3"
                  />
                  {/* Central Spine */}
                  <line x1="14" y1="5" x2="14" y2="31" stroke="#cbb279" strokeWidth="1.2" />
                  {/* Right Veins */}
                  <path d="M14 11 C18 9 21 11 23 13" stroke="#cbb279" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M14 17 C18 15 22 17 25 20" stroke="#cbb279" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M14 23 C18 21 21 23 23 26" stroke="#cbb279" strokeWidth="1.1" strokeLinecap="round" />
                  {/* Left Veins */}
                  <path d="M14 11 C10 9 7 11 5 13" stroke="#cbb279" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M14 17 C10 15 6 17 3 20" stroke="#cbb279" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M14 23 C10 21 7 23 5 26" stroke="#cbb279" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              </div>

              {/* Text Typography */}
              <div className="flex flex-col text-left">
                <span className="font-serif text-[17px] sm:text-[19px] tracking-[0.38em] font-normal text-[#ece7dc] uppercase leading-none group-hover:text-white transition-colors">
                  L I A H
                </span>
                <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.3em] font-normal text-[#b5b0a3] uppercase leading-none mt-1">
                  V A L L A D O L I D
                </span>
              </div>
            </a>

            {/* Vertical Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-[#ded8cb]/25 mx-1 xl:mx-2"></div>

            {/* Main Navigation Links: INICIO, EL PROYECTO, UBICACIÓN, RESERVA LIAH, CERTEZA JURÍDICA */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9 2xl:gap-11 font-sans text-[10px] tracking-[0.2em] uppercase">
              {/* 1. INICIO */}
              <a
                href="#hero"
                onClick={() => setActiveNav('inicio')}
                className={`flex flex-col items-center transition-colors duration-200 py-1 ${
                  activeNav === 'inicio' ? 'text-white font-semibold' : 'text-[#ded8cb]/80 hover:text-white'
                }`}
              >
                <span>INICIO</span>
                {activeNav === 'inicio' && <span className="w-5 h-[2px] bg-[#cbb279] mt-1 rounded-full"></span>}
              </a>

              {/* 2. EL PROYECTO (Stacked) */}
              <a
                href="#proyecto"
                onClick={() => setActiveNav('proyecto')}
                className={`flex flex-col items-center text-center leading-[1.2] transition-colors duration-200 py-1 ${
                  activeNav === 'proyecto' ? 'text-white font-semibold' : 'text-[#ded8cb]/80 hover:text-white'
                }`}
              >
                <span>EL</span>
                <span>PROYECTO</span>
                {activeNav === 'proyecto' && <span className="w-6 h-[2px] bg-[#cbb279] mt-1 rounded-full"></span>}
              </a>

              {/* 3. UBICACIÓN */}
              <a
                href="#ubicacion"
                onClick={() => setActiveNav('ubicacion')}
                className={`flex flex-col items-center transition-colors duration-200 py-1 ${
                  activeNav === 'ubicacion' ? 'text-white font-semibold' : 'text-[#ded8cb]/80 hover:text-white'
                }`}
              >
                <span>UBICACIÓN</span>
                {activeNav === 'ubicacion' && (
                  <span className="w-7 h-[2.5px] bg-[#cbb279] mt-1 rounded-full shadow-[0_0_8px_rgba(203,178,121,0.7)]"></span>
                )}
              </a>

              {/* 4. RESERVA LIAH (Stacked) */}
              <a
                href="#reserva-liah"
                onClick={() => setActiveNav('reserva')}
                className={`flex flex-col items-center text-center leading-[1.2] transition-colors duration-200 py-1 ${
                  activeNav === 'reserva' ? 'text-white font-semibold' : 'text-[#ded8cb]/80 hover:text-white'
                }`}
              >
                <span>RESERVA</span>
                <span>LIAH</span>
                {activeNav === 'reserva' && <span className="w-6 h-[2px] bg-[#cbb279] mt-1 rounded-full"></span>}
              </a>

              {/* 5. CERTEZA JURÍDICA (Stacked) */}
              <a
                href="#certeza"
                onClick={() => setActiveNav('certeza')}
                className={`flex flex-col items-center text-center leading-[1.2] transition-colors duration-200 py-1 ${
                  activeNav === 'certeza' ? 'text-white font-semibold' : 'text-[#ded8cb]/80 hover:text-white'
                }`}
              >
                <span>CERTEZA</span>
                <span>JURÍDICA</span>
                {activeNav === 'certeza' && <span className="w-6 h-[2px] bg-[#cbb279] mt-1 rounded-full"></span>}
              </a>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* HERRAMIENTAS ASESOR (With advisor icon & stacked text) */}
            <button
              onClick={() => setIsAsesorModalOpen(true)}
              className="hidden md:inline-flex items-center gap-3 border border-[#ded8cb]/45 hover:border-[#cbb279] bg-[#0c160f]/60 hover:bg-[#ded8cb]/10 text-[#ded8cb] hover:text-white px-4 sm:px-5 py-2 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
            >
              {/* Headset/Support agent icon */}
              <svg className="w-4 h-4 text-[#ded8cb] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="3.5" />
                <path d="M5.5 21v-2a4.5 4.5 0 0 1 7.8 -3.1" />
                <path d="M4 11a8 8 0 0 1 16 0" />
                <rect x="2.5" y="10" width="3" height="4.5" rx="1.5" fill="currentColor" />
                <rect x="18.5" y="10" width="3" height="4.5" rx="1.5" fill="currentColor" />
                <path d="M19 14.5v1.5a2 2 0 0 1-2 2h-2" />
                <circle cx="14" cy="18" r="1" fill="currentColor" />
              </svg>

              <div className="flex flex-col text-left font-sans text-[8.5px] uppercase tracking-[0.2em] leading-[1.2] font-medium">
                <span>HERRAMIENTAS</span>
                <span>ASESOR</span>
              </div>
            </button>

            {/* CONTACTO (Parchment pill with paper airplane icon) */}
            <a
              href="#contacto"
              className="bg-[#f4ebd9] hover:bg-[#eae0cc] text-[#111a12] px-5 sm:px-6 py-2.5 rounded-full flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {/* Send / Paper airplane icon */}
              <svg className="w-3.5 h-3.5 text-[#111a12] -rotate-12 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" fillOpacity="0.15" />
              </svg>
              <span>CONTACTO</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#ded8cb] hover:text-white transition-colors ml-1 cursor-pointer"
              aria-label="Abrir navegación móvil"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#09100a]/98 border-b border-[#e7e2d6]/15 backdrop-blur-xl px-6 py-8 shadow-2xl flex flex-col space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col space-y-4 font-sans text-xs tracking-[0.25em] uppercase text-[#ded8cb]">
              <a
                onClick={() => {
                  setActiveNav('inicio');
                  setMobileMenuOpen(false);
                }}
                className={`py-1 transition-colors ${activeNav === 'inicio' ? 'text-white font-semibold' : 'hover:text-white'}`}
                href="#hero"
              >
                INICIO
              </a>
              <a
                onClick={() => {
                  setActiveNav('proyecto');
                  setMobileMenuOpen(false);
                }}
                className={`py-1 transition-colors ${activeNav === 'proyecto' ? 'text-white font-semibold' : 'hover:text-white'}`}
                href="#proyecto"
              >
                EL PROYECTO
              </a>
              <a
                onClick={() => {
                  setActiveNav('ubicacion');
                  setMobileMenuOpen(false);
                }}
                className={`py-1 transition-colors ${activeNav === 'ubicacion' ? 'text-white font-semibold' : 'hover:text-white'}`}
                href="#ubicacion"
              >
                UBICACIÓN
              </a>
              <a
                onClick={() => {
                  setActiveNav('reserva');
                  setMobileMenuOpen(false);
                }}
                className={`py-1 transition-colors ${activeNav === 'reserva' ? 'text-white font-semibold' : 'hover:text-white'}`}
                href="#reserva-liah"
              >
                RESERVA LIAH
              </a>
              <a
                onClick={() => {
                  setActiveNav('certeza');
                  setMobileMenuOpen(false);
                }}
                className={`py-1 transition-colors ${activeNav === 'certeza' ? 'text-white font-semibold' : 'hover:text-white'}`}
                href="#certeza"
              >
                CERTEZA JURÍDICA
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-white transition-colors"
                href="#contacto"
              >
                CONTACTO
              </a>
            </nav>

            <div className="pt-4 border-t border-[#e7e2d6]/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAsesorModalOpen(true);
                }}
                className="w-full text-center border border-[#ded8cb]/40 text-[#ded8cb] py-3 rounded-full font-sans text-[10px] uppercase tracking-[0.22em] font-medium"
              >
                HERRAMIENTAS ASESOR
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          HERO SECTION (With subtle jungle background photography & leaf silhouettes)
          Santuario Botánico · Terrenos amplios en Valladolid
          ======================================================== */}
      <section
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0d1710] pt-32 sm:pt-36 pb-8"
        id="hero"
      >
        {/* Subtle authentic Yucatecan jungle photograph background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=85"
            alt="Selva de Valladolid Yucatán"
            className="w-full h-full object-cover object-center opacity-25 filter brightness-[0.52] contrast-[1.25] saturate-[1.1] scale-105"
          />
          {/* Subtle mist and nocturnal vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b140d] via-[#0d1710]/70 to-[#070e08]/85"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_38%,_rgba(21,41,27,0.7)_0%,_rgba(13,23,16,0.82)_55%,_#070d08_100%)]"></div>
        </div>

        {/* Organic Palm & Tropical Canopy Shadow Silhouettes (Top-Left Corner) */}
        <div className="absolute -top-12 -left-12 sm:-top-8 sm:-left-8 w-[450px] sm:w-[650px] lg:w-[780px] h-[450px] sm:h-[650px] lg:h-[780px] pointer-events-none z-[2] opacity-40 overflow-hidden">
          <svg
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter blur-[14px] sm:blur-[20px] transform -rotate-12 scale-110"
          >
            <defs>
              <linearGradient id="leafShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#030804" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#061208" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0a180e" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g fill="url(#leafShadow)">
              {/* Main Tropical Fronds */}
              <path d="M-30 -30 Q140 90 380 230 Q280 180 200 110 Z" />
              <path d="M50 20 Q120 90 190 190 Q150 120 90 50 Z" />
              <path d="M90 50 Q180 130 270 240 Q210 160 140 90 Z" />
              <path d="M140 90 Q240 180 340 290 Q270 200 190 130 Z" />
              <path d="M190 130 Q300 220 420 340 Q330 240 240 170 Z" />
              <path d="M240 180 Q350 270 480 380 Q380 280 290 210 Z" />

              {/* Counter fronds mimicking lush canopy */}
              <path d="M70 10 Q160 30 240 60 Q160 40 90 20 Z" />
              <path d="M120 40 Q230 70 330 120 Q230 85 150 50 Z" />
              <path d="M180 80 Q290 120 400 180 Q290 135 210 95 Z" />
              <path d="M230 130 Q350 180 470 250 Q350 195 260 145 Z" />

              {/* Lower secondary branch */}
              <path d="M-10 80 Q90 180 280 380 Q200 280 130 190 Z" />
              <path d="M30 130 Q100 230 190 350 Q140 260 80 170 Z" />
              <path d="M80 190 Q160 290 250 410 Q190 310 120 220 Z" />
              <path d="M20 90 Q120 150 210 250 Q130 170 60 110 Z" />
              <path d="M60 150 Q170 230 270 350 Q180 250 100 180 Z" />
            </g>
          </svg>
        </div>

        {/* Ambient subtle vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d1710]/40 to-[#070e08]/85 pointer-events-none"></div>

        {/* Main Center Content */}
        <div className="relative z-10 px-6 sm:px-12 max-w-4xl mx-auto w-full my-auto flex flex-col items-center text-center">
          
          {/* Golden accent bar */}
          <div className="w-14 sm:w-16 h-[1.5px] bg-[#cbb279] mb-8"></div>

          {/* Main Headline */}
          <h1 className="font-serif text-[46px] sm:text-[66px] md:text-[78px] lg:text-[88px] font-normal text-[#ece7dc] leading-[1.06] tracking-[-0.015em] mb-7">
            Macrolotes en<br />
            Valladolid
          </h1>

          {/* Editorial Subtitle */}
          <p className="font-serif italic text-lg sm:text-[21px] md:text-[23px] text-[#ded8cb]/90 font-light max-w-2xl mx-auto leading-[1.5] mb-10">
            Conoce una alternativa de inversión patrimonial en terrenos sin urbanización,<br className="hidden sm:inline" />
            con distintas superficies, ubicaciones y opciones de pago.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-6 sm:gap-9 mb-12 sm:mb-14">
            <a
              href="#proyecto"
              className="inline-flex items-center gap-3 bg-[#e8dfcf] hover:bg-[#ded1bd] text-[#111a12] px-8 sm:px-9 py-3.5 sm:py-4 rounded-full font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:translate-y-[-1px]"
            >
              <span>VER MACROLOTES</span>
              <span className="text-sm font-normal">→</span>
            </a>

            <a
              href="#proyecto"
              className="inline-block text-[#ded8cb]/85 hover:text-white border-b border-[#ded8cb]/45 hover:border-[#ded8cb] pb-1 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-medium transition-all duration-300"
            >
              CONOCER EL PROYECTO
            </a>
          </div>

          {/* Bottom Specifications Tag */}
          <div className="text-center mt-6 sm:mt-10 mb-4">
            <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#8e988b] leading-relaxed">
              MACROLOTES CAMPESTRES DESDE 2,500 M² HASTA 25,000 M² (2.5 HAS)<br />
              CONSERVACIÓN PATRIMONIAL
            </p>
          </div>
        </div>

        {/* Downward Scroll Indicator */}
        <div className="relative z-10 pb-4 text-center flex flex-col items-center">
          <a
            href="#ubicacion"
            aria-label="Descender a la sección de ubicación"
            className="group flex flex-col items-center cursor-pointer text-[#ded8cb]/50 hover:text-[#ded8cb] transition-colors"
          >
            <span className="w-[1px] h-7 bg-[#ded8cb]/35 group-hover:h-9 group-hover:bg-[#cbb279] transition-all duration-300 mb-2"></span>
            <span className="material-symbols-outlined text-[14px] text-[#dec795] group-hover:translate-y-0.5 transition-transform duration-300">
              keyboard_arrow_down
            </span>
          </a>
        </div>
      </section>

      {/* ========================================================
          02 & 03 — UBICACIÓN & EL TERRITORIO
          Diseño exacto de la referencia con textos oficiales de Valladolid
          ======================================================== */}
      {/* ========================================================
          01 — UBICACIÓN (Exact match with user attachment image_3d15420e.png)
          Designed to fit comfortably in a single screen (lg:h-screen)
          ======================================================== */}
      <section
        className="relative bg-[#09110b] min-h-screen lg:h-screen lg:max-h-[1080px] py-8 lg:py-10 px-6 sm:px-12 lg:px-16 overflow-hidden flex flex-col justify-between border-t border-[#cbb279]/20"
        id="ubicacion"
      >
        {/* Subtle background ambient gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,_rgba(20,38,25,0.35)_0%,_rgba(10,18,12,0.85)_60%,_#09110b_100%)] pointer-events-none"></div>

        {/* Top-Left Tropical Leaf Shadows */}
        <div className="absolute -top-16 -left-16 w-80 h-80 pointer-events-none opacity-30 z-0">
          <svg viewBox="0 0 400 400" fill="none" className="w-full h-full filter blur-[12px]">
            <path d="M-20 -20 Q100 80 260 180 Q180 140 120 80 Z" fill="#040905" />
            <path d="M40 20 Q120 80 180 160 Q130 110 70 50 Z" fill="#040905" />
            <path d="M80 50 Q160 120 230 200 Q170 140 110 80 Z" fill="#040905" />
          </svg>
        </div>

        {/* Bottom-Right Tropical Foliage Accent */}
        <div className="absolute -bottom-10 -right-10 w-72 sm:w-88 h-72 sm:h-88 pointer-events-none opacity-45 z-0">
          <svg viewBox="0 0 350 350" fill="none" className="w-full h-full filter blur-[2px]">
            <path d="M350 350 Q240 220 120 180 Q190 250 250 350 Z" fill="#0c1d12" />
            <path d="M350 280 Q200 160 80 130 Q160 210 260 290 Z" fill="#08150c" />
            <path d="M280 350 Q170 240 90 220 Q170 280 230 350 Z" fill="#112517" />
          </svg>
        </div>

        {/* Main Content Container */}
        <div className="w-full max-w-[1680px] mx-auto h-full flex flex-col justify-between relative z-10 space-y-6 lg:space-y-0">
          
          {/* Top metadata bar with extended gold hairline */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase w-full">
            <div className="flex items-center gap-3 text-[#dec795] font-sans font-semibold shrink-0">
              <span>01 — UBICACIÓN</span>
            </div>
            <div className="h-[1px] bg-[#cbb279]/35 grow mx-6 sm:mx-8 hidden sm:block"></div>
            <div className="tracking-[0.28em] text-[#ded8cb]/80 font-sans font-light shrink-0">
              VALLADOLID · YUCATÁN
            </div>
          </div>

          {/* Main 2-Column Grid: Left Typography + Right Pavilion Photography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
            
            {/* Left Column: Headlines & Connection Card */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
              <h2 className="font-serif text-5xl sm:text-6xl xl:text-[68px] font-normal text-[#ece7dc] leading-[1.02] tracking-tight mb-2 sm:mb-3">
                Valladolid.
              </h2>
              
              {/* Italic Subtitle with Golden Vertical Bar */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="w-[1.5px] h-6 sm:h-7 bg-[#cbb279] shrink-0"></span>
                <p className="font-serif italic text-2xl sm:text-[27px] text-[#dec795] font-light leading-snug">
                  Donde la naturaleza encuentra su origen.
                </p>
              </div>

              {/* Official Descriptive Paragraph */}
              <p className="font-sans text-xs sm:text-[13px] text-[#ded8cb]/85 font-light leading-relaxed max-w-xl mb-5 sm:mb-6">
                El proyecto se encuentra en el entorno de la carretera Pisté–Valladolid, cercano a referencias como Oriundo y Selva Maya. Consulta su ubicación y conoce los accesos de la fracción que estás evaluando.
              </p>

              {/* Conexión con Valladolid Tourist Context Card with San Bernardino Icon */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0c160f]/80 border border-[#253426] flex items-center gap-4 max-w-lg shadow-lg">
                <div className="w-11 h-11 rounded-xl bg-[#142318] border border-[#cbb279]/45 flex items-center justify-center shrink-0">
                  {/* San Bernardino de Siena Convent Arch & Bell Icon */}
                  <svg className="w-6 h-6 text-[#cbb279]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M12 2v4M10 4h4" />
                    <path d="M9 6h6v4H9z" />
                    <circle cx="12" cy="8" r="0.8" fill="currentColor" />
                    <path d="M6 10l6-3 6 3" />
                    <path d="M5 10v12h14V10" />
                    <path d="M10 22v-6a2 2 0 0 1 4 0v6" />
                    <path d="M7 14v2M17 14v2" />
                  </svg>
                </div>
                <div className="flex flex-col text-left space-y-0.5">
                  <span className="font-sans text-[12px] sm:text-[12.5px] font-semibold text-[#ece7dc] leading-tight">
                    Conexión con Valladolid y su entorno turístico
                  </span>
                  <span className="font-sans text-[11px] text-[#8e988b] leading-snug">
                    A solo 10 minutos del convento de San Bernardino de Siena y rodeado de cenotes y reservas boutique.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Jungle Pavilion Photo */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#253426]/70 aspect-[16/10] sm:aspect-[16/10.5] max-w-2xl ml-auto w-full">
                <img
                  alt="Pabellón arquitectónico inmerso en la selva de Valladolid Yucatán"
                  className="w-full h-full object-cover filter contrast-[1.06] brightness-95"
                  src="/assets/aistudio/valladolid_pavilion.jpg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = heroImg;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a120c]/35 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

          </div>

          {/* Bottom 3 Highlight Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 py-4 sm:py-5 border-t border-[#253426]/70 text-left">
            
            {/* Card 1: REGIÓN */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl border border-[#cbb279]/50 bg-[#121c13] flex items-center justify-center text-[#dec795] shrink-0">
                <svg className="w-5 h-5 text-[#cbb279]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[#8b9487] font-semibold">REGIÓN</span>
                <h3 className="font-serif text-[22px] sm:text-[23px] text-[#ece7dc] font-normal leading-tight">Valladolid</h3>
                <p className="font-sans text-[11px] text-[#8b9487] font-light">Oriente de Yucatán · Tierra ancestral</p>
              </div>
            </div>

            {/* Card 2: CONECTIVIDAD */}
            <div className="flex items-center gap-4 md:border-l md:border-[#253426]/70 md:pl-8">
              <div className="w-11 h-11 rounded-xl border border-[#cbb279]/50 bg-[#121c13] flex items-center justify-center text-[#dec795] shrink-0">
                <svg className="w-5 h-5 text-[#cbb279]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[#8b9487] font-semibold">CONECTIVIDAD</span>
                <h3 className="font-serif text-[22px] sm:text-[23px] text-[#ece7dc] font-normal leading-tight">Cerca de todo</h3>
                <p className="font-sans text-[11px] text-[#8b9487] font-light">Conectividad con Valladolid y su entorno</p>
              </div>
            </div>

            {/* Card 3: ENTORNO */}
            <div className="flex items-center gap-4 md:border-l md:border-[#253426]/70 md:pl-8">
              <div className="w-11 h-11 rounded-xl border border-[#cbb279]/50 bg-[#121c13] flex items-center justify-center text-[#dec795] shrink-0">
                <svg className="w-5 h-5 text-[#cbb279]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-[#8b9487] font-semibold">ENTORNO</span>
                <h3 className="font-serif text-[22px] sm:text-[23px] text-[#ece7dc] font-normal leading-tight">Naturaleza viva</h3>
                <p className="font-sans text-[11px] text-[#8b9487] font-light">Un paisaje que conserva la esencia de Yucatán</p>
              </div>
            </div>

          </div>

          {/* Bottom Action Button: EXPLORAR MACROLOTES ↗ */}
          <div className="pt-2 text-left">
            <a
              href="#proyecto"
              className="inline-flex items-center gap-3 bg-[#f4ebd9] hover:bg-[#eae0cc] text-[#111a12] font-sans text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-bold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:translate-y-[-1px] group"
            >
              <span>EXPLORAR MACROLOTES</span>
              <span className="text-sm font-semibold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                ↗
              </span>
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          02 QUÉ ES EL PROYECTO: ESPACIO PARA UNA INVERSIÓN PATRIMONIAL
          ======================================================== */}
      <section
        className="relative bg-[#0d170f] py-28 md:py-36 px-6 sm:px-12 lg:px-16 border-b border-[#e7e2d6]/10 overflow-hidden"
        id="proyecto"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-8 border-b border-[#253426]/70 text-left">
            <div>
              <div className="flex items-center gap-3 text-[#8b9487] font-sans text-[10px] tracking-ultra uppercase mb-3">
                <span className="text-[#cbb279] font-medium">02</span>
                <span>—</span>
                <span className="tracking-widest text-[#e7e2d6]/80">El Proyecto</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#e7e2d6] leading-tight">
                Espacio para una inversión patrimonial
              </h2>
            </div>
            
            <div className="space-y-3 max-w-md">
              <p className="font-sans text-xs sm:text-[13px] text-[#b5b0a3]/85 font-light leading-relaxed">
                El proyecto ofrece fracciones de terreno en Valladolid, con opciones interiores, en esquina y de carretera. La compra corresponde al terreno sin urbanización; cada ficha presenta su superficie, precio y condiciones particulares.
              </p>
              <div className="text-[11px] font-sans tracking-wide text-[#dec795] font-semibold border-l-2 border-[#cbb279] pl-3 py-1">
                Venta de terrenos sin urbanización incluida.
              </div>
            </div>
          </div>

          {/* Curated Editorial Photo Duo matching screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 text-left">
            
            <div className="md:col-span-7 relative rounded-xl overflow-hidden shadow-2xl border border-[#e7e2d6]/10">
              <img
                alt="Santuario de arquitectura orgánica inmerso en la selva maya"
                className="w-full h-[400px] md:h-[480px] object-cover filter brightness-90 contrast-[1.05]"
                src={heroImg}
                onError={() => setHeroImg(IMG_HERO_BACKUP)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b140d]/90 via-[#0b140d]/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-serif italic text-xl sm:text-2xl text-[#e7e2d6] font-light drop-shadow-md">
                  “Una forma de habitar en simbiosis: baja densidad, silencio botánico y respeto reverente por la flora nativa.”
                </p>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between space-y-6">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#e7e2d6]/10 h-[300px] md:h-[340px]">
                <img
                  alt="Detalle botánico y muro de piedra caliza con monsteras"
                  className="w-full h-full object-cover filter brightness-95"
                  src={detailImg}
                  onError={() => setDetailImg(IMG_DETAIL_BACKUP)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b140d]/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="font-sans text-[9px] tracking-ultra uppercase text-[#e7e2d6]/80">
                    Muro de caliza & flora endémica
                  </span>
                </div>
              </div>

              <div className="bg-[#121c13] border border-[#e7e2d6]/15 p-6 rounded-xl">
                <span className="text-[9px] font-sans tracking-ultra uppercase text-[#cbb279] block mb-2">
                  Preservación Activa
                </span>
                <p className="font-sans text-xs text-[#b5b0a3]/80 font-light leading-relaxed">
                  Los predios no introducen elementos discordantes. La preservación es la amenidad principal, asegurando un patrimonio inalterable en el tiempo.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>



      {/* ========================================================
          05 VENTAJAS DEL PRODUCTO: TRES COLUMNAS
          Aspectos para evaluar tu compra
          ======================================================== */}
      <section className="py-24 md:py-32 bg-[#0d170f] px-6 sm:px-12 lg:px-16 border-b border-[#e7e2d6]/10 text-left">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 text-[#8b9487] font-sans text-[10px] tracking-ultra uppercase mb-3">
              <span className="text-[#cbb279] font-medium">05</span>
              <span>—</span>
              <span className="tracking-widest text-[#e7e2d6]/80">Ventajas del Producto</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#e7e2d6] leading-tight mb-3">
              Aspectos para evaluar tu compra
            </h2>
            <p className="font-sans text-xs sm:text-[13px] text-[#b5b0a3]/85 font-light leading-relaxed">
              La superficie, la ubicación y la forma de pago permiten comparar las fracciones desde distintas necesidades de inversión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#121c13] border border-[#e7e2d6]/15 p-8 rounded-2xl space-y-4">
              <span className="w-10 h-10 rounded-xl bg-[#253426] border border-[#cbb279]/40 text-[#dec795] flex items-center justify-center font-bold text-sm">
                01
              </span>
              <h3 className="font-serif text-2xl text-[#e7e2d6] font-light">
                Superficie
              </h3>
              <p className="font-sans text-xs text-[#b5b0a3]/80 font-light leading-relaxed">
                Opciones de terreno con distintas extensiones para comparar de acuerdo con tu presupuesto.
              </p>
              <div className="text-[11px] text-[#dec795] font-sans tracking-wide pt-2">
                Fracciones campestres desde 2,500 m² hasta macrolotes de 25,000 m².
              </div>
            </div>

            <div className="bg-[#121c13] border border-[#e7e2d6]/15 p-8 rounded-2xl space-y-4">
              <span className="w-10 h-10 rounded-xl bg-[#253426] border border-[#cbb279]/40 text-[#dec795] flex items-center justify-center font-bold text-sm">
                02
              </span>
              <h3 className="font-serif text-2xl text-[#e7e2d6] font-light">
                Ubicación
              </h3>
              <p className="font-sans text-xs text-[#b5b0a3]/80 font-light leading-relaxed">
                Fracciones interiores, en esquina y de carretera, con precios diferenciados.
              </p>
              <div className="text-[11px] text-[#dec795] font-sans tracking-wide pt-2">
                Acceso vehicular directo sobre carretera Pisté-Valladolid.
              </div>
            </div>

            <div className="bg-[#121c13] border border-[#e7e2d6]/15 p-8 rounded-2xl space-y-4">
              <span className="w-10 h-10 rounded-xl bg-[#253426] border border-[#cbb279]/40 text-[#dec795] flex items-center justify-center font-bold text-sm">
                03
              </span>
              <h3 className="font-serif text-2xl text-[#e7e2d6] font-light">
                Forma de pago
              </h3>
              <p className="font-sans text-xs text-[#b5b0a3]/80 font-light leading-relaxed">
                Dos planes individuales para distribuir el importe de la compra.
              </p>
              <div className="text-[11px] text-[#dec795] font-sans tracking-wide pt-2">
                Plan A (30% + 36 MSI) o Plan B (Sin enganche + 24 MSI).
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          06 LAS SIETE HECTÁREAS DE LIAH: RESERVA PATRIMONIAL CONTIGUA
          ======================================================== */}
      <section
        className="py-24 md:py-32 bg-[#090f0a] px-6 sm:px-12 lg:px-16 border-b border-[#e7e2d6]/10 text-left"
        id="reserva-liah"
      >
        <div id="reserva-ticmac" className="sr-only"></div>
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3 text-[#8b9487] font-sans text-[10px] tracking-ultra uppercase">
                <span className="text-[#cbb279] font-medium">06</span>
                <span>—</span>
                <span className="tracking-widest text-[#e7e2d6]/80">Reserva LIAH</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#e7e2d6] leading-tight">
                Una reserva patrimonial contigua
              </h2>

              <p className="font-sans text-xs sm:text-[13px] text-[#b5b0a3]/85 font-light leading-relaxed">
                LIAH mantiene un patrimonio de siete hectáreas a un lado del proyecto, destinado a la consolidación de futuros proyectos patrimoniales, turísticos y de inversión.
              </p>

              <div className="p-5 rounded-xl bg-[#121c13] border border-[#cbb279]/40 text-xs text-[#dec795] leading-relaxed">
                Esta reserva se presenta por separado de los terrenos en venta. Los alcances de los proyectos futuros se comunicarán de manera específica.
              </div>

              <p className="text-[11px] text-[#8b9487] font-sans leading-relaxed">
                * La afirmación sobre extensión, ubicación y derecho de la reserva conserva su respaldo documental ante notario.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#e7e2d6]/15">
                <img
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85"
                  alt="Fotografía aérea real de las 7 hectáreas de reserva de LIAH"
                  className="w-full h-[380px] sm:h-[440px] object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090f0a]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-sans text-[#e7e2d6]">
                  <span className="font-light">7 Hectáreas de Reserva Botánica Contigua</span>
                  <span className="text-[#cbb279] font-mono">70,000 m²</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          07 PRECIOS Y FORMAS DE PAGO: PLAN A & PLAN B
          ======================================================== */}
      <section
        className="py-24 md:py-32 bg-[#0d170f] px-6 sm:px-12 lg:px-16 border-b border-[#e7e2d6]/10 text-left"
        id="formas-pago"
      >
        <div className="max-w-7xl mx-auto">
          
          <div className="bg-[#121c13]/90 border border-[#e7e2d6]/15 rounded-2xl p-8 sm:p-12 shadow-2xl">
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-[#e7e2d6]/10">
              <div>
                <span className="text-[9px] font-sans tracking-ultra uppercase text-[#dec795] block mb-2">
                  07 · Adquisición Directa
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#e7e2d6]">
                  Dos planes para adquirir tu terreno
                </h3>
              </div>
              <p className="font-sans text-xs text-[#b5b0a3]/80 font-light max-w-md leading-relaxed">
                El precio de cada fracción depende de su superficie y categoría. Consulta el importe del terreno que te interesa y compara las dos formas de pago individuales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Plan A */}
              <div className="border border-[#e7e2d6]/15 bg-[#0d140e] p-6 sm:p-8 rounded-xl flex flex-col justify-between space-y-4 hover:border-[#cbb279]/50 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-sans tracking-ultra uppercase text-[#cbb279]">Plan A</span>
                    <span className="text-[10px] font-sans tracking-widest uppercase text-[#8b9487]">Preferencial</span>
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#e7e2d6] font-light mb-2">
                    30% de enganche · 36 MSI
                  </h4>
                  <p className="font-sans text-xs text-[#b5b0a3]/70 font-light leading-relaxed">
                    Saldo a 36 mensualidades sin intereses con enganche inicial facilitado para fijar precio por m².
                  </p>
                </div>
              </div>

              {/* Plan B */}
              <div className="border border-[#e7e2d6]/15 bg-[#0d140e] p-6 sm:p-8 rounded-xl flex flex-col justify-between space-y-4 hover:border-[#cbb279]/50 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-sans tracking-ultra uppercase text-[#cbb279]">Plan B</span>
                    <span className="text-[10px] font-sans tracking-widest uppercase text-[#8b9487]">Directo</span>
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#e7e2d6] font-light mb-2">
                    Sin enganche · 24 MSI
                  </h4>
                  <p className="font-sans text-xs text-[#b5b0a3]/70 font-light leading-relaxed">
                    Total a 24 mensualidades sin intereses. Acceso inmediato sin desembolso inicial.
                  </p>
                </div>
              </div>

            </div>

            <div className="p-4 bg-[#0d140e] rounded-xl border border-[#253426] mb-8 text-xs text-[#b5b0a3] leading-relaxed">
              <strong className="text-[#dec795]">Nota junto a los planes:</strong> Las combinaciones de fracciones y las condiciones especiales requieren una cotización aprobada. No anunciar desde $500/m²: aplica a 10,000 m², no a una fracción individual del inventario recibido.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="font-sans text-[11px] text-[#8b9487] tracking-wider text-center sm:text-left">
                Predios campestres desde 2,500 m² hasta macrolotes de 25,000 m²
              </span>
              <button
                onClick={() => setIsAsesorModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-[#cbb279]/60 hover:border-[#cbb279] bg-[#1a261b] hover:bg-[#253426] text-[#dec795] font-sans text-[10px] tracking-ultra uppercase font-medium px-8 py-3 rounded-full transition-all duration-300 cursor-pointer"
              >
                <span>Consultar precio de un macrolote</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          08 CERTEZA JURÍDICA: INFORMACIÓN JURÍDICA PARA DECIDIR
          ======================================================== */}
      <section
        className="bg-[#0b140d] py-24 sm:py-32 px-6 sm:px-12 border-b border-[#e7e2d6]/10"
        id="certeza"
      >
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="flex items-center justify-center gap-3 text-[#8b9487] font-sans text-[10px] tracking-ultra uppercase mb-4">
            <span className="text-[#cbb279] font-medium">08</span>
            <span>—</span>
            <span className="tracking-widest text-[#e7e2d6]/80">Certeza Jurídica</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl font-light text-[#e7e2d6] tracking-wide mb-4">
            Certeza Jurídica Inquebrantable
          </h3>

          <p className="font-sans text-xs sm:text-[13px] text-[#b5b0a3]/80 font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Conoce la situación actual del terreno, los documentos que respaldan la operación y las condiciones para su escrituración. Consulta también los trámites pendientes y su alcance para la compra.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 px-4 border-y border-[#253426]/80 text-left mb-8">
            
            <div className="space-y-2 p-5 rounded-xl bg-[#121c13]/50 border border-[#e7e2d6]/10">
              <div className="text-[#cbb279] flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-lg">verified_user</span>
                <span className="font-sans text-[10px] tracking-ultra uppercase text-[#8b9487]">Propiedad Privada</span>
              </div>
              <p className="font-serif text-xl text-[#e7e2d6] font-light">Tracto Notarial Validado</p>
              <p className="font-sans text-[11px] text-[#b5b0a3]/70 font-light leading-relaxed">
                Titulado e inscrito en Registro Público de la Propiedad del Estado de Yucatán.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-xl bg-[#121c13]/50 border border-[#e7e2d6]/10">
              <div className="text-[#cbb279] flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-lg">gavel</span>
                <span className="font-sans text-[10px] tracking-ultra uppercase text-[#8b9487]">Régimen Pleno</span>
              </div>
              <p className="font-serif text-xl text-[#e7e2d6] font-light">Sin Régimen Ejidal</p>
              <p className="font-sans text-[11px] text-[#b5b0a3]/70 font-light leading-relaxed">
                Libre de controversias agrarias. Transmisión directa de dominio en escritura pública.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-xl bg-[#121c13]/50 border border-[#e7e2d6]/10">
              <div className="text-[#cbb279] flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-lg">pin_drop</span>
                <span className="font-sans text-[10px] tracking-ultra uppercase text-[#8b9487]">Delimitación</span>
              </div>
              <p className="font-serif text-xl text-[#e7e2d6] font-light">Mojoneras Georreferenciadas</p>
              <p className="font-sans text-[11px] text-[#b5b0a3]/70 font-light leading-relaxed">
                Límites físicos y coordenadas UTM topográficas entregadas con total precisión.
              </p>
            </div>

          </div>

          {/* 4 Apartados oficiales del texto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left font-sans text-xs text-[#b5b0a3]">
            <div className="p-3 bg-[#121c13] rounded-lg border border-[#253426]">
              <strong className="text-[#e7e2d6] block mb-1">Titularidad y facultades</strong>
              <span>Acreditación notarial de derecho de enajenación.</span>
            </div>
            <div className="p-3 bg-[#121c13] rounded-lg border border-[#253426]">
              <strong className="text-[#e7e2d6] block mb-1">Sucesión y usufructo</strong>
              <span>Tracto sucesorio regularizado sin gravámenes.</span>
            </div>
            <div className="p-3 bg-[#121c13] rounded-lg border border-[#253426]">
              <strong className="text-[#e7e2d6] block mb-1">División de fracciones</strong>
              <span>Cédulas catastrales individualizadas por lote.</span>
            </div>
            <div className="p-3 bg-[#121c13] rounded-lg border border-[#253426]">
              <strong className="text-[#e7e2d6] block mb-1">Contratación y escritura</strong>
              <span>Formalización ante notario público colegiado.</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          10 PROCESO DE COMPRA: 5 PASOS COMUNES
          Conoce el proceso de compra
          ======================================================== */}
      <section className="py-24 md:py-32 bg-[#0d170f] px-6 sm:px-12 lg:px-16 border-b border-[#e7e2d6]/10 text-left">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 text-[#8b9487] font-sans text-[10px] tracking-ultra uppercase mb-3">
              <span className="text-[#cbb279] font-medium">10</span>
              <span>—</span>
              <span className="tracking-widest text-[#e7e2d6]/80">Proceso de Compra</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#e7e2d6] leading-tight mb-3">
              Conoce el proceso de compra
            </h2>
            <p className="font-sans text-xs sm:text-[13px] text-[#b5b0a3]/85 font-light leading-relaxed">
              Identifica los pasos para elegir tu terreno, revisar la propuesta y conocer las condiciones que corresponden a tu operación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '1',
                titulo: 'Consulta el inventario',
                desc: 'Identifica las fracciones que te interesan.',
              },
              {
                num: '2',
                titulo: 'Conoce el terreno',
                desc: 'Solicita una visita o información adicional.',
              },
              {
                num: '3',
                titulo: 'Revisa tu cotización',
                desc: 'Compara el precio y los planes de pago.',
              },
            ].map((paso) => (
              <div
                key={paso.num}
                className="bg-[#121c13] border border-[#253426] p-6 rounded-xl flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="w-8 h-8 rounded-full bg-[#253426] border border-[#cbb279]/40 text-[#dec795] flex items-center justify-center font-bold text-xs mb-3">
                    {paso.num}
                  </span>
                  <h4 className="font-serif text-lg text-[#e7e2d6] font-light mb-1">
                    {paso.titulo}
                  </h4>
                  <p className="font-sans text-[11px] text-[#b5b0a3]/70 font-light leading-relaxed">
                    {paso.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          11 PREGUNTAS FRECUENTES: RESUELVE TUS DUDAS ANTES DE ELEGIR
          ======================================================== */}
      <section className="py-24 md:py-32 bg-[#0b140d] px-6 sm:px-12 border-b border-[#e7e2d6]/10 text-left" id="faq">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-12">
            <div className="flex items-center gap-3 text-[#8b9487] font-sans text-[10px] tracking-ultra uppercase mb-3">
              <span className="text-[#cbb279] font-medium">11</span>
              <span>—</span>
              <span className="tracking-widest text-[#e7e2d6]/80">Preguntas Frecuentes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#e7e2d6] leading-tight">
              Resuelve tus dudas antes de elegir
            </h2>
          </div>

          <div className="border border-[#253426] bg-[#121c13]/60 rounded-2xl divide-y divide-[#253426] overflow-hidden">
            {[
              {
                q: '¿Qué incluye la compra?',
                a: 'La compra corresponde a la fracción de terreno identificada en la operación. La oferta base no incluye urbanización; revisa en su ficha las condiciones de entrega.',
              },
              {
                q: '¿Todos los terrenos tienen el mismo precio por m²?',
                a: 'No. La tarifa considera la superficie y la categoría del terreno: interior, esquina o carretera. La ficha muestra el precio aplicable a cada fracción.',
              },
              {
                q: '¿Qué opciones de pago existen?',
                a: 'La lista contempla 30% de enganche y saldo a 36 mensualidades sin intereses, o el total a 24 mensualidades sin intereses, sin enganche.',
              },
              {
                q: '¿Cuándo puede escriturarse?',
                a: 'Las condiciones y el plazo aplicable deben confirmarse mediante la revisión del expediente del terreno y quedar establecidos en la documentación de la operación.',
              },
              {
                q: '¿Puedo construir en el terreno?',
                a: 'El uso que deseas darle debe revisarse conforme a las características de la fracción, el uso de suelo y los permisos aplicables.',
              },
              {
                q: '¿La compra incluye los proyectos futuros de las siete hectáreas?',
                a: 'Esa reserva patrimonial se presenta por separado. Cualquier derecho o prestación relacionada debe estar expresamente contemplado en la operación.',
              },
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index}>
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl text-[#e7e2d6] hover:text-[#dec795] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#cbb279] shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-[13px] font-sans text-[#b5b0a3] leading-relaxed border-t border-[#253426]/60 bg-[#0d140e]/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          13 CIERRE Y CONTACTO: ATENCIÓN PERSONALIZADA
          Formulario con línea inferior exactamente como la referencia
          ======================================================== */}
      <section
        className="relative bg-[#0d170f] py-28 md:py-36 px-6 sm:px-12 overflow-hidden"
        id="contacto"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0b140d]/40 to-[#0b140d]/90 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 text-[#8b9487] font-sans text-[10px] tracking-ultra uppercase mb-3">
            <span className="text-[#cbb279] font-medium">13</span>
            <span>—</span>
            <span className="tracking-widest text-[#e7e2d6]/80">Cierre y Contacto</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#e7e2d6] leading-tight mb-4">
            Conoce el terreno antes de elegir
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#b5b0a3]/80 font-light max-w-md mb-8 leading-relaxed">
            Solicita información de la fracción que te interesa o una visita para conocer sus características y revisar las condiciones de compra.
          </p>

          {/* Selector de modo */}
          <div className="flex gap-2 p-1 rounded-full bg-[#121c13] border border-[#253426] mb-8">
            <button
              type="button"
              onClick={() => {
                setContactMode('informacion');
                setContactSubmitted(false);
              }}
              className={`px-6 py-2 text-[10px] font-sans uppercase tracking-ultra rounded-full transition-all cursor-pointer ${
                contactMode === 'informacion'
                  ? 'bg-[#cbb279] text-[#111a12] font-semibold'
                  : 'text-[#b5b0a3] hover:text-[#e7e2d6]'
              }`}
            >
              Solicitar información
            </button>
            <button
              type="button"
              onClick={() => {
                setContactMode('visita');
                setContactSubmitted(false);
              }}
              className={`px-6 py-2 text-[10px] font-sans uppercase tracking-ultra rounded-full transition-all cursor-pointer ${
                contactMode === 'visita'
                  ? 'bg-[#cbb279] text-[#111a12] font-semibold'
                  : 'text-[#b5b0a3] hover:text-[#e7e2d6]'
              }`}
            >
              Solicitar visita
            </button>
          </div>

          <form className="w-full flex flex-col space-y-7 text-left" onSubmit={handleContactSubmit}>
            
            <div className="flex flex-col space-y-2">
              <label className="font-sans text-[9px] uppercase tracking-ultra text-[#8b9487]">
                Nombre completo *
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-[#253426] focus:border-[#cbb279] px-0 py-2.5 font-sans text-xs text-[#e7e2d6] placeholder-[#b5b0a3]/30 focus:ring-0 transition-colors"
                placeholder="Su nombre"
                required
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-sans text-[9px] uppercase tracking-ultra text-[#8b9487]">
                Teléfono o Correo Electrónico *
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-[#253426] focus:border-[#cbb279] px-0 py-2.5 font-sans text-xs text-[#e7e2d6] placeholder-[#b5b0a3]/30 focus:ring-0 transition-colors"
                placeholder="contacto@correo.com o teléfono"
                required
                type="text"
                value={contactContact}
                onChange={(e) => setContactContact(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-sans text-[9px] uppercase tracking-ultra text-[#8b9487]">
                Macrolote de interés
              </label>
              <select
                value={contactLotInterest}
                onChange={(e) => setContactLotInterest(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#253426] focus:border-[#cbb279] px-0 py-2.5 font-sans text-xs text-[#e7e2d6] focus:ring-0 cursor-pointer"
              >
                <option value="" className="bg-[#0b140d]">Aún explorando / Macrolotes desde 2,500 m² a 25,000 m²</option>
                {INVENTARIO_MACROLOTES.map((m) => (
                  <option key={m.id} value={m.lote} className="bg-[#0b140d]">
                    {m.lote} — {m.superficieM2.toLocaleString()} m² (${m.precioTotal.toLocaleString()} MXN)
                  </option>
                ))}
              </select>
            </div>

            {contactMode === 'visita' && (
              <div className="flex flex-col space-y-2">
                <label className="font-sans text-[9px] uppercase tracking-ultra text-[#8b9487]">
                  Fecha tentativa para visita en Valladolid
                </label>
                <input
                  type="date"
                  className="w-full bg-transparent border-0 border-b border-[#253426] focus:border-[#cbb279] px-0 py-2.5 font-sans text-xs text-[#e7e2d6] focus:ring-0 cursor-pointer"
                />
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                className="w-full sm:w-auto px-10 py-3.5 bg-[#e8dfcf] hover:bg-[#dec795] text-[#111a12] transition-all duration-300 font-sans text-[10px] tracking-ultra uppercase font-medium rounded-full shadow-md cursor-pointer"
                type="submit"
              >
                {contactMode === 'visita' ? 'Solicitar visita' : 'Solicitar información'}
              </button>

              <button
                type="button"
                onClick={() => setIsAsesorModalOpen(true)}
                className="font-sans text-[10px] tracking-widest text-[#dec795]/80 hover:text-[#e7e2d6] uppercase transition-colors cursor-pointer"
              >
                Acceso para comerciales →
              </button>
            </div>

            {contactSubmitted && (
              <div className="p-5 rounded-xl border border-[#cbb279]/40 bg-[#121c13] text-center space-y-2 animate-fadeIn">
                <span className="material-symbols-outlined text-[#cbb279] text-2xl">check_circle</span>
                <p className="text-xs font-sans text-[#dec795] tracking-wider italic font-light">
                  {contactMode === 'visita'
                    ? 'Tu visita está solicitada. La fecha y el horario quedan pendientes de confirmación.'
                    : 'Recibimos tu solicitud. Conserva este folio para dar seguimiento.'}
                </p>
                <p className="text-[10px] text-[#8b9487] font-mono">
                  Folio Oficial: <strong>{assignedFolio}</strong>
                </p>
              </div>
            )}

          </form>

        </div>
      </section>

      {/* ========================================================
          ULTRA-REFINED SILENT FOOTER
          ======================================================== */}
      <footer className="bg-[#090f0a] text-[#b5b0a3]/60 border-t border-[#e7e2d6]/10 py-16 px-8 sm:px-14 font-sans text-[9px] tracking-ultra uppercase">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[#e7e2d6] font-serif text-sm tracking-ultra font-light">
              LIAH VALLADOLID
            </span>
            <span className="text-[#e7e2d6]/20">|</span>
            <span className="text-[#8b9487]">Valladolid, Yucatán, México</span>
          </div>

          <div className="flex items-center gap-8 text-[#b5b0a3]/60">
            <a className="hover:text-[#e7e2d6] transition-colors duration-300" href="#certeza">
              Aviso Jurídico
            </a>
            <a className="hover:text-[#e7e2d6] transition-colors duration-300" href="#contacto">
              Contacto
            </a>
            <button
              onClick={() => setIsAsesorModalOpen(true)}
              className="hover:text-[#e7e2d6] transition-colors duration-300 cursor-pointer"
            >
              Acceso para comerciales
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-[#e7e2d6]/5 text-[9px] text-[#8b9487]/60 font-sans leading-relaxed text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>Terrenos rústicos de conservación patrimonial sin servicios de urbanización incluidos.</span>
          <span>© 2026 LIAH Valladolid.</span>
        </div>
      </footer>

      {/* ========================================================
          12 MODAL: HERRAMIENTAS DEL ASESOR Y COTIZADOR
          ======================================================== */}
      {isAsesorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#090f0a]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#0d140e] border border-[#e7e2d6]/20 rounded-2xl my-8 text-[#e7e2d6] flex flex-col max-h-[92vh] overflow-hidden shadow-2xl text-left">
            
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#253426] bg-[#090f0a]">
              <div>
                <span className="text-[9px] font-sans tracking-ultra uppercase text-[#cbb279] block mb-1">
                  12 · Herramientas del asesor y cotizador
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#e7e2d6]">
                  Prepara tu presentación del proyecto
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAsesorModalOpen(false);
                  setCotizacionEmitida(false);
                }}
                className="w-9 h-9 rounded-full border border-[#e7e2d6]/20 flex items-center justify-center text-[#b5b0a3] hover:text-white hover:border-[#e7e2d6] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              <div>
                <h4 className="font-serif text-xl text-[#dec795] font-light">
                  Prepara una propuesta para tu cliente
                </h4>
                <p className="font-sans text-xs text-[#b5b0a3] font-light mt-1">
                  Selecciona el terreno, elige el plan de pago y revisa los importes antes de emitir la cotización.
                </p>
              </div>

              {cotizacionEmitida ? (
                <div className="p-6 bg-[#121c13] border border-[#cbb279]/50 rounded-xl space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-[#cbb279] font-medium text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#cbb279]" />
                    <span>Confirmación: Cotización emitida. Ya puedes descargar el PDF.</span>
                  </div>

                  <div className="bg-[#0b140d] p-5 rounded-xl border border-[#253426] text-xs font-sans space-y-2">
                    <div><strong>Cliente:</strong> {clienteNombre || 'Inversionista Patrimonial'}</div>
                    <div><strong>Macrolote elegido:</strong> {selectedCotizadorLot.lote} ({selectedCotizadorLot.superficieM2.toLocaleString()} m²)</div>
                    <div><strong>Precio total:</strong> ${selectedCotizadorLot.precioTotal.toLocaleString()} MXN</div>
                    <div className="text-[#dec795]">
                      <strong>Plan de pago:</strong>{' '}
                      {cotizadorPlan === 'A'
                        ? `Plan A · Enganche 30% ($${cotizadorEnganche.toLocaleString()} MXN) + 36 mensualidades de $${Math.round(cotizadorMensualidadFija).toLocaleString()} MXN`
                        : `Plan B · Sin enganche ($0 MXN) + 24 mensualidades de $${Math.round(cotizadorMensualidadFija).toLocaleString()} MXN`}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-2.5 bg-[#e8dfcf] text-[#111a12] text-[10px] font-sans uppercase tracking-ultra font-medium rounded-full cursor-pointer hover:bg-[#dec795]"
                    >
                      Descargar PDF
                    </button>
                    <button
                      onClick={() => setCotizacionEmitida(false)}
                      className="px-6 py-2.5 border border-[#e7e2d6]/30 text-[#e7e2d6] text-[10px] font-sans uppercase tracking-ultra rounded-full cursor-pointer hover:bg-[#253426]"
                    >
                      Volver a editar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121c13]/50 p-6 rounded-xl border border-[#253426]">
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-sans uppercase tracking-ultra text-[#8b9487] block mb-1">
                        Nombre del cliente
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        value={clienteNombre}
                        onChange={(e) => setClienteNombre(e.target.value)}
                        className="w-full bg-[#0d140e] border border-[#253426] rounded-lg p-2.5 text-xs text-[#e7e2d6] focus:border-[#cbb279]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-sans uppercase tracking-ultra text-[#8b9487] block mb-1">
                        Seleccionar Macrolote
                      </label>
                      <select
                        value={cotizadorLotId}
                        onChange={(e) => setCotizadorLotId(e.target.value)}
                        className="w-full bg-[#0d140e] border border-[#253426] rounded-lg p-2.5 text-xs text-[#e7e2d6] focus:border-[#cbb279] cursor-pointer"
                      >
                        {INVENTARIO_MACROLOTES.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.lote} — {m.superficieM2.toLocaleString()} m² (${m.precioTotal.toLocaleString()} MXN)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-sans uppercase tracking-ultra text-[#8b9487] block mb-1">
                        Plan de pago
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setCotizadorPlan('A')}
                          className={`p-3 text-[10px] font-sans uppercase tracking-wider rounded-lg border cursor-pointer transition-colors ${
                            cotizadorPlan === 'A'
                              ? 'bg-[#253426] text-[#dec795] border-[#cbb279]'
                              : 'bg-[#0d140e] text-[#b5b0a3] border-[#253426]'
                          }`}
                        >
                          Plan A (30% + 36 MSI)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCotizadorPlan('B')}
                          className={`p-3 text-[10px] font-sans uppercase tracking-wider rounded-lg border cursor-pointer transition-colors ${
                            cotizadorPlan === 'B'
                              ? 'bg-[#253426] text-[#dec795] border-[#cbb279]'
                              : 'bg-[#0d140e] text-[#b5b0a3] border-[#253426]'
                          }`}
                        >
                          Plan B (Sin eng · 24 MSI)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0d140e] p-5 rounded-xl border border-[#253426] flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-sans tracking-ultra text-[#dec795] block mb-2">
                        Resumen de importes
                      </span>
                      <div className="text-xs font-sans space-y-2 text-[#b5b0a3]">
                        <div className="flex justify-between py-1 border-b border-[#253426]">
                          <span>Superficie:</span>
                          <span className="font-mono text-[#e7e2d6]">{selectedCotizadorLot.superficieM2.toLocaleString()} m² ({selectedCotizadorLot.superficieHectareas} Has)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#253426]">
                          <span>Precio por m²:</span>
                          <span className="font-mono text-[#dec795]">${selectedCotizadorLot.precioM2}.00 MXN</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#253426]">
                          <span>Precio total:</span>
                          <span className="font-mono font-bold text-[#e7e2d6]">${selectedCotizadorLot.precioTotal.toLocaleString()} MXN</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#253426]">
                          <span>Enganche ({cotizadorPlan === 'A' ? '30%' : '0%'}):</span>
                          <span className="font-mono text-[#e7e2d6]">${cotizadorEnganche.toLocaleString()} MXN</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>{cotizadorMensualidades} mensualidades:</span>
                          <span className="font-mono text-sm text-[#dec795] font-semibold">
                            ${Math.round(cotizadorMensualidadFija).toLocaleString()} MXN/mes
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCotizacionEmitida(true)}
                      className="w-full py-3 bg-[#e8dfcf] hover:bg-[#dec795] text-[#111a12] text-[10px] font-sans uppercase tracking-ultra font-medium rounded-full cursor-pointer shadow-md"
                    >
                      Emitir cotización
                    </button>
                  </div>

                </div>
              )}

            </div>

            <div className="px-6 sm:px-8 py-4 border-t border-[#253426] bg-[#090f0a] flex items-center justify-between text-xs text-[#8b9487]">
              <span>LIAH Valladolid · Macrolotes Campestres</span>
              <button
                onClick={() => setIsAsesorModalOpen(false)}
                className="px-5 py-2 border border-[#e7e2d6]/20 text-[#e7e2d6] text-[10px] tracking-ultra uppercase rounded-full cursor-pointer hover:bg-[#253426]"
              >
                Cerrar panel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: FICHA TÉCNICA DEL MACROLOTE
          ======================================================== */}
      {selectedMacroloteForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#090f0a]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0d140e] border border-[#e7e2d6]/20 rounded-2xl my-8 p-6 sm:p-8 text-[#e7e2d6] space-y-6 text-left shadow-2xl">
            
            <div className="flex justify-between items-start border-b border-[#253426] pb-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-ultra text-[#cbb279] block mb-1">
                  Ficha Técnica Catastral · {selectedMacroloteForDetail.categoria}
                </span>
                <h3 className="font-serif text-3xl font-light text-[#e7e2d6]">
                  {selectedMacroloteForDetail.lote}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMacroloteForDetail(null)}
                className="w-8 h-8 rounded-full border border-[#e7e2d6]/20 flex items-center justify-center text-[#b5b0a3] hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-[#253426]">
                <img
                  src={selectedMacroloteForDetail.imagen}
                  alt={selectedMacroloteForDetail.lote}
                  className="w-full h-56 object-cover"
                />
              </div>

              <div className="space-y-2.5 bg-[#121c13] p-4 rounded-xl border border-[#253426] text-xs font-sans text-[#b5b0a3]">
                <div className="flex justify-between py-1 border-b border-[#253426]">
                  <span>Superficie cotizada:</span>
                  <span className="font-mono text-[#e7e2d6] font-semibold">{selectedMacroloteForDetail.superficieM2.toLocaleString()} m² ({selectedMacroloteForDetail.superficieHectareas} Has)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#253426]">
                  <span>Precio por m²:</span>
                  <span className="font-mono text-[#dec795] font-semibold">${selectedMacroloteForDetail.precioM2}.00 MXN</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#253426]">
                  <span>Precio total:</span>
                  <span className="font-mono text-base text-[#e7e2d6] font-bold">${selectedMacroloteForDetail.precioTotal.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#253426]">
                  <span>Frente aproximado:</span>
                  <span>{selectedMacroloteForDetail.frente} metros</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#253426]">
                  <span>Fondo promedio:</span>
                  <span>{selectedMacroloteForDetail.fondo} metros</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Vegetación censada:</span>
                  <span className="text-[#e7e2d6] text-right">{selectedMacroloteForDetail.vegetacion}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#b5b0a3]/80 leading-relaxed border-t border-[#253426] pt-4 font-sans font-light">
              {selectedMacroloteForDetail.detalles} La compra corresponde al terreno sin urbanización; cada ficha presenta su superficie, precio y condiciones particulares.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedMacroloteForDetail(null)}
                className="px-6 py-2.5 border border-[#e7e2d6]/20 text-[10px] font-sans uppercase tracking-ultra text-[#e7e2d6] rounded-full hover:bg-[#253426]"
              >
                Cerrar
              </button>
              <a
                href="#contacto"
                onClick={() => {
                  setContactLotInterest(selectedMacroloteForDetail.lote);
                  setSelectedMacroloteForDetail(null);
                }}
                className="px-8 py-2.5 bg-[#e8dfcf] text-[#111a12] text-[10px] font-sans uppercase tracking-ultra font-medium rounded-full hover:bg-[#dec795]"
              >
                Solicitar este macrolote
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: COMPARADOR DE MACROLOTES (HASTA 3)
          ======================================================== */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#090f0a]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-[#0d140e] border border-[#e7e2d6]/20 rounded-2xl my-8 p-6 sm:p-8 text-[#e7e2d6] space-y-6 text-left shadow-2xl">
            
            <div className="flex justify-between items-start border-b border-[#253426] pb-4">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-ultra text-[#cbb279] block mb-1">
                  Compara antes de elegir
                </span>
                <h3 className="font-serif text-3xl font-light text-[#e7e2d6]">
                  Comparativa de Macrolotes Seleccionados
                </h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="w-8 h-8 rounded-full border border-[#e7e2d6]/20 flex items-center justify-center text-[#b5b0a3] hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-sans border border-[#253426]">
                <thead>
                  <tr className="bg-[#121c13] border-b border-[#253426]">
                    <th className="p-3 text-left text-[#cbb279] font-medium">Parámetro</th>
                    {comparedLots.map((m) => (
                      <th key={m.id} className="p-3 text-left text-[#e7e2d6] font-serif text-base">
                        {m.lote}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#253426] bg-[#0b140d]">
                  <tr>
                    <td className="p-3 text-[#8b9487]">Categoría</td>
                    {comparedLots.map((m) => (
                      <td key={m.id} className="p-3 text-[#e7e2d6]">{m.categoria}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b9487]">Superficie</td>
                    {comparedLots.map((m) => (
                      <td key={m.id} className="p-3 font-mono text-[#e7e2d6]">{m.superficieM2.toLocaleString()} m² ({m.superficieHectareas} Has)</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b9487]">Precio por m²</td>
                    {comparedLots.map((m) => (
                      <td key={m.id} className="p-3 font-mono text-[#dec795]">${m.precioM2}.00 MXN</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b9487]">Precio total</td>
                    {comparedLots.map((m) => (
                      <td key={m.id} className="p-3 font-mono text-base text-[#e7e2d6] font-semibold">${m.precioTotal.toLocaleString()} MXN</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b9487]">Plan A (30% eng / 36 MSI)</td>
                    {comparedLots.map((m) => (
                      <td key={m.id} className="p-3 font-mono text-xs">
                        Eng: ${(m.precioTotal * 0.3).toLocaleString()} MXN<br />
                        Mes: ${Math.round((m.precioTotal * 0.7) / 36).toLocaleString()}/m
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-[#8b9487]">Plan B (Sin eng / 24 MSI)</td>
                    {comparedLots.map((m) => (
                      <td key={m.id} className="p-3 font-mono text-xs">
                        $0 eng<br />
                        Mes: ${Math.round(m.precioTotal / 24).toLocaleString()}/m
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setComparedLots([])}
                className="px-5 py-2 border border-[#253426] text-[10px] uppercase font-sans tracking-ultra text-[#b5b0a3] rounded-full hover:bg-[#253426]"
              >
                Limpiar lista
              </button>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-6 py-2 bg-[#e8dfcf] text-[#111a12] text-[10px] uppercase font-sans tracking-ultra font-medium rounded-full"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
