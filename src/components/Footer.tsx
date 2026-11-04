import React from 'react';
import { Compass, ArrowUp, Mail, Phone, MapPin, TreePine, Droplets } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#18251C] text-[#F2EFE7] border-t border-[#F2EFE7]/20 relative overflow-hidden">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#F2EFE7]/20 pb-16">
          
          {/* Brand & Manifesto Column (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="font-serif text-3xl sm:text-4xl tracking-tight text-[#FCF9F1] block leading-none font-medium mb-2">
                Editorial Yucateco
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#BACBB7] block">
                Arquitectura de Autor & Territorio • Valladolid, Yucatán
              </span>
            </div>

            <p className="font-sans text-sm text-[#D9D0C1] font-light leading-relaxed max-w-md">
              Una publicación territorial y reserva residencial que salvaguarda la selva viva del oriente maya.
              Veintiocho predios de baja densidad concebidos para dialogar con el estuco de chukum,
              la cantera caliza y el silencio atemporal.
            </p>

            <div className="pt-2 font-mono text-xs text-[#8C9D8A] space-y-1">
              <div>Polígono de Conservación: 20°41'22"N 88°12'06"W</div>
              <div>Cota de Elevación: 24m MSNM • Valladolid Oriental</div>
            </div>
          </div>

          {/* Quick Index Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.2em] text-[#BACBB7] block">
              Índice Editorial
            </span>
            <ul className="space-y-2.5 font-sans text-xs tracking-wider uppercase text-[#D9D0C1]">
              <li>
                <button
                  onClick={() => onNavigate('portada')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portada & Manifiesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('masterplan')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Masterplan Cartográfico
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lotes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Colección de Lotes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculadora')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Simulador de Inversión
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cronicas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Crónicas del Territorio
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Visit Column (4 cols) */}
          <div className="md:col-span-4 space-y-5">
            <span className="font-sans text-[10px] uppercase font-semibold tracking-[0.2em] text-[#BACBB7] block">
              Atención & Visitas Privadas
            </span>
            <p className="font-sans text-xs text-[#D9D0C1] leading-relaxed">
              Recorridos in situ en Valladolid y sesiones virtuales con el taller de arquitectura bajo cita previa coordinada.
            </p>

            <div className="space-y-2 text-xs font-sans text-[#E5E2DA]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#BACBB7]" />
                <span>Calzada de los Frailes #42, Sisal, Valladolid, Yuc.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#BACBB7]" />
                <span>+52 (985) 856-2210 • Concierge</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#BACBB7]" />
                <span>concierge@editorialyucateco.mx</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 bg-[#253426] text-[#F2EFE7] border border-[#BACBB7]/40 font-sans text-[10px] uppercase font-semibold tracking-[0.18em] hover:bg-[#101F12] transition-colors cursor-pointer text-center"
              >
                Solicitar Cita de Recorrido
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-[#8C9D8A] gap-4">
          <div>
            © MMXXVI Editorial Yucateco. Todos los derechos reservados.
            <span className="mx-2">•</span>
            Régimen de Propiedad Privada en Condominio.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#D9D0C1] hover:text-white uppercase tracking-[0.14em] text-[10px] cursor-pointer"
          >
            <span>Volver al Inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </footer>
  );
};
