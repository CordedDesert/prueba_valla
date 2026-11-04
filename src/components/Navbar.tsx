import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, ArrowUpRight, Scale, SlidersHorizontal, Sun } from 'lucide-react';
import { Lot } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currency: 'MXN' | 'USD';
  setCurrency: (c: 'MXN' | 'USD') => void;
  comparedLots: Lot[];
  onOpenComparison: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currency,
  setCurrency,
  comparedLots,
  onOpenComparison,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeYucatan, setTimeYucatan] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeYucatan(
        now.toLocaleTimeString('es-MX', {
          timeZone: 'America/Merida',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { id: 'portada', label: 'Portada & Manifiesto' },
    { id: 'masterplan', label: 'Masterplan Cartográfico' },
    { id: 'lotes', label: 'Colección de Lotes' },
    { id: 'calculadora', label: 'Calculadora de Inversión' },
    { id: 'cronicas', label: 'Cuaderno Editorial' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F2EFE7]/90 backdrop-blur-md border-b border-[#C9C2B6]/50 py-3 shadow-none'
          : 'bg-[#F2EFE7]/95 border-b border-[#C9C2B6]/30 py-4'
      }`}
    >
      {/* Top micro-bar: Cadastre & Coordinates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-2 border-b border-[#C9C2B6]/30 text-[#434842] text-[10px] sm:text-[11px] font-sans tracking-[0.16em] uppercase">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#253426] font-semibold">
              <span className="w-1.5 h-1.5 bg-[#253426] inline-block"></span>
              Valladolid, Yuc.
            </span>
            <span className="hidden md:inline text-[#747872]">|</span>
            <span className="hidden md:inline font-mono">20°41'22"N 88°12'06"W</span>
            <span className="hidden lg:inline text-[#747872]">|</span>
            <span className="hidden lg:inline">Elevación: 24m MSNM</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#253426]">
              <Sun className="w-3.5 h-3.5 text-[#526352]" />
              <span>28°C • Alisios ESE</span>
            </div>
            <span className="text-[#747872]">•</span>
            <span>{timeYucatan || '12:00 PM'} (GMT-6)</span>
            <span className="text-[#747872]">•</span>
            {/* Currency Switcher */}
            <div className="flex items-center border border-[#C9C2B6] p-0.5">
              <button
                type="button"
                onClick={() => setCurrency('MXN')}
                className={`px-1.5 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
                  currency === 'MXN'
                    ? 'bg-[#253426] text-[#F2EFE7]'
                    : 'text-[#30271F] hover:bg-[#D9D0C1]/50'
                }`}
              >
                MXN
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#253426] text-[#F2EFE7]'
                    : 'text-[#30271F] hover:bg-[#D9D0C1]/50'
                }`}
              >
                USD
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex items-center justify-between pt-3">
          {/* Masthead / Brand */}
          <button
            onClick={() => handleNavClick('portada')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#253426] block leading-none font-medium">
              Editorial Yucateco
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#645e52] block mt-0.5">
              Arquitectura de Autor • Selva Valladolid
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-7 text-[12px] uppercase tracking-[0.14em] font-medium text-[#30271F]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentTab === link.id
                    ? 'text-[#253426] font-semibold'
                    : 'text-[#434842] hover:text-[#253426]'
                }`}
              >
                {link.label}
                {currentTab === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#253426]" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions: Comparison Drawer & Private Tour CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {comparedLots.length > 0 && (
              <button
                onClick={onOpenComparison}
                className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-sans uppercase tracking-[0.14em] border border-[#253426] text-[#253426] hover:bg-[#253426] hover:text-[#F2EFE7] transition-all cursor-pointer"
                title="Comparar lotes seleccionados"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Comparar ({comparedLots.length})</span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#253426] text-[#F2EFE7] text-[11px] font-sans font-medium uppercase tracking-[0.16em] hover:bg-[#18251C] transition-all cursor-pointer"
            >
              <span>Agendar Recorrido</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            {comparedLots.length > 0 && (
              <button
                onClick={onOpenComparison}
                className="p-2 border border-[#C9C2B6] text-[#253426]"
              >
                <Scale className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#C9C2B6] text-[#30271F] hover:bg-[#D9D0C1]"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#F2EFE7] border-b border-[#C9C2B6] px-6 py-6 space-y-4">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left py-2 text-[13px] uppercase tracking-[0.16em] border-b border-[#C9C2B6]/30 ${
                  currentTab === link.id
                    ? 'text-[#253426] font-semibold'
                    : 'text-[#434842]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-3 bg-[#253426] text-[#F2EFE7] text-[11px] uppercase tracking-[0.16em] font-medium"
            >
              Agendar Recorrido Privado
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
