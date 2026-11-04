import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Check, Send, Phone, Mail, User, Compass, ArrowRight } from 'lucide-react';
import { Lot, TourBookingData } from '../types';

interface PrivateTourBookingProps {
  lots: Lot[];
  initialSelectedLot?: Lot | null;
  onClose?: () => void;
  isModal?: boolean;
}

export const PrivateTourBooking: React.FC<PrivateTourBookingProps> = ({
  lots,
  initialSelectedLot,
  onClose,
  isModal = false,
}) => {
  const [formData, setFormData] = useState<TourBookingData>({
    fullName: '',
    email: '',
    phone: '',
    modality: 'in-situ',
    preferredDate: '',
    preferredTime: '10:00 AM (Luz del Sotobosque)',
    selectedLotId: initialSelectedLot?.id || '',
    investmentHorizon: 'Inmediato (1 a 3 meses)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedLot = lots.find((l) => l.id === formData.selectedLotId) || initialSelectedLot;

  return (
    <section id="recorrido" className={`py-16 sm:py-24 bg-[#FCF9F1] ${isModal ? 'p-0' : 'border-b border-[#C9C2B6]'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#526352] block mb-2">
            Atención Personalizada • Concierge Editorial
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#101F12] font-normal tracking-[-0.015em] mb-4">
            Agendar Recorrido Privado en Terreno
          </h2>
          <p className="font-sans text-base text-[#434842] font-light leading-relaxed">
            Las visitas a la reserva se conducen de manera estrictamente individual y en silencio acústico,
            acompañados por el equipo de arquitectura y biología del proyecto.
          </p>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="border border-[#253426] bg-[#F2EFE7] p-8 sm:p-12 text-[#1C1C17] space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 text-[#253426]">
              <div className="w-8 h-8 bg-[#253426] text-[#F2EFE7] flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em]">
                Cita Registrada en Cédula Oficial
              </span>
            </div>

            <h3 className="font-serif text-3xl text-[#101F12] font-normal">
              Gracias, {formData.fullName}.
            </h3>

            <p className="font-sans text-sm text-[#434842] leading-relaxed max-w-xl">
              Hemos reservado el espacio de agenda para la modalidad:{' '}
              <strong className="text-[#101F12]">
                {formData.modality === 'in-situ'
                  ? 'Recorrido Físico en Terreno (Valladolid, Yucatán)'
                  : formData.modality === 'virtual'
                  ? 'Sesión Privada por Teleconferencia con el Arquitecto'
                  : 'Envío de Portafolio Impreso de Colección'}
              </strong>
              {formData.preferredDate && ` para la fecha ${formData.preferredDate} a las ${formData.preferredTime}`}.
              {selectedLot && ` con interés específico en el Lote 0${selectedLot.number} — ${selectedLot.name}`}.
            </p>

            <div className="border-t border-[#C9C2B6] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-[#645E52]">
              <div>
                <span className="text-[#747872] block uppercase tracking-wider text-[10px]">
                  Confirmación enviada a
                </span>
                <span className="font-mono text-[#101F12]">{formData.email}</span>
              </div>
              <div>
                <span className="text-[#747872] block uppercase tracking-wider text-[10px]">
                  Coordinación Telefónica
                </span>
                <span className="font-mono text-[#101F12]">{formData.phone || '+52 (985) 856-2210'}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 border border-[#C9C2B6] text-[#30271F] font-sans text-[10px] uppercase tracking-[0.16em] hover:bg-[#D9D0C1] transition-colors cursor-pointer"
              >
                Modificar Solicitud
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-[#253426] text-[#F2EFE7] font-sans text-[10px] uppercase tracking-[0.16em] hover:bg-[#18251C] transition-colors cursor-pointer"
                >
                  Regresar a la Navegación
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Main Form matching the Design Spec strictly:
             "Estructura lineal y minimalista: línea inferior de 1px (#C9C2B6) sin caja envolvente completa.
              Etiqueta flotante superior en label-caps (#30271F).
              Al foco (focus), la línea inferior pasa a Verde Selva (#253426) con un grosor de 1.5px.
              Tipografía de entrada fluida en body-default." */
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Modality Chips Selector */}
            <div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30271F] block mb-3">
                1. Selecciona la Modalidad de Contacto
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'in-situ',
                    title: 'Recorrido Físico en Valladolid',
                    desc: 'Caminata botánica guiada, cata de miel melipona y acceso a cenote.',
                  },
                  {
                    id: 'virtual',
                    title: 'Sesión Virtual con el Taller',
                    desc: 'Videoconferencia de 45 min con el arquitecto proyectista y modelos 3D.',
                  },
                  {
                    id: 'dossier',
                    title: 'Dossier Impreso de Colección',
                    desc: 'Envío de carpeta editorial encuadernada en tela con planos catastrales.',
                  },
                ].map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, modality: mod.id as any })}
                    className={`p-4 text-left border transition-all cursor-pointer ${
                      formData.modality === mod.id
                        ? 'bg-[#253426] text-[#F2EFE7] border-[#253426]'
                        : 'bg-[#F2EFE7] text-[#30271F] border-[#C9C2B6] hover:bg-[#D9D0C1]'
                    }`}
                  >
                    <span className="font-serif text-base block mb-1 font-medium">
                      {mod.title}
                    </span>
                    <span className={`text-[11px] font-sans leading-relaxed block ${
                      formData.modality === mod.id ? 'text-[#BACBB7]' : 'text-[#645E52]'
                    }`}>
                      {mod.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs: 2-column Grid with Strictly 1px Underline inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              
              {/* Full Name */}
              <div className="yucatan-input-wrap pb-2">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30271F] block mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sofía Martínez de la Vega"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-transparent border-none p-0 text-base font-sans text-[#1C1C17] focus:outline-none placeholder-[#747872]/60"
                />
              </div>

              {/* Email */}
              <div className="yucatan-input-wrap pb-2">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30271F] block mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sofia@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-none p-0 text-base font-sans text-[#1C1C17] focus:outline-none placeholder-[#747872]/60"
                />
              </div>

              {/* Phone */}
              <div className="yucatan-input-wrap pb-2">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30271F] block mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+52 55 1234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-none p-0 text-base font-sans text-[#1C1C17] focus:outline-none placeholder-[#747872]/60"
                />
              </div>

              {/* Lot of Interest */}
              <div className="yucatan-input-wrap pb-2">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30271F] block mb-1">
                  Predio de Interés Específico
                </label>
                <select
                  value={formData.selectedLotId}
                  onChange={(e) => setFormData({ ...formData, selectedLotId: e.target.value })}
                  className="w-full bg-transparent border-none p-0 text-sm font-sans text-[#1C1C17] focus:outline-none cursor-pointer"
                >
                  <option value="">Aún explorando / Asesoría general</option>
                  {lots.map((l) => (
                    <option key={l.id} value={l.id}>
                      Lote {l.number < 10 ? `0${l.number}` : l.number} — {l.name} ({l.areaM2} m²)
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div className="yucatan-input-wrap pb-2">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30271F] block mb-1">
                  Fecha Tentativa Deseada
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-transparent border-none p-0 text-sm font-sans text-[#1C1C17] focus:outline-none cursor-pointer"
                />
              </div>

              {/* Preferred Time Window */}
              <div className="yucatan-input-wrap pb-2">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30271F] block mb-1">
                  Horario de Preferencia
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-transparent border-none p-0 text-sm font-sans text-[#1C1C17] focus:outline-none cursor-pointer"
                >
                  <option value="09:00 AM (Amanecer & Vientos Frescos)">09:00 AM (Amanecer & Vientos Frescos)</option>
                  <option value="11:30 AM (Luz Cenital en Cantera)">11:30 AM (Luz Cenital en Cantera)</option>
                  <option value="04:30 PM (Atardecer Dorado en Selva)">04:30 PM (Atardecer Dorado en Selva)</option>
                </select>
              </div>

              {/* Investment Horizon */}
              <div className="yucatan-input-wrap pb-2 sm:col-span-2">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30271F] block mb-1">
                  Horizonte de Inversión Previsto
                </label>
                <select
                  value={formData.investmentHorizon}
                  onChange={(e) => setFormData({ ...formData, investmentHorizon: e.target.value })}
                  className="w-full bg-transparent border-none p-0 text-sm font-sans text-[#1C1C17] focus:outline-none cursor-pointer"
                >
                  <option value="Inmediato (1 a 3 meses)">Inmediato (1 a 3 meses)</option>
                  <option value="Mediano plazo (3 a 6 meses)">Mediano plazo (3 a 6 meses)</option>
                  <option value="Planificación patrimonial (6 a 12 meses)">Planificación patrimonial (6 a 12 meses)</option>
                  <option value="Inversionista institucional / Desarrollador boutique">Inversionista institucional / Desarrollador boutique</option>
                </select>
              </div>

              {/* Notes / Special requirements */}
              <div className="yucatan-input-wrap pb-2 sm:col-span-2">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#30271F] block mb-1">
                  Notas Particulares o Requerimientos de Viaje
                </label>
                <textarea
                  rows={2}
                  placeholder="Por favor indícanos si requieres transporte desde el aeropuerto de Mérida/Tulum o si tienes interés en bioclimatismo específico."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-transparent border-none p-0 text-sm font-sans text-[#1C1C17] focus:outline-none placeholder-[#747872]/60 resize-none"
                />
              </div>

            </div>

            {/* Submit Button per spec:
                "Primario: Fondo Verde Selva (#253426), texto en Blanco Cálido (#F2EFE7),
                 padding 1.25rem 2.25rem, forma de arista viva (0px), tipografía label-caps." */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C9C2B6]/40">
              <span className="font-sans text-[11px] text-[#747872]">
                * Tu información se conserva bajo estricta confidencialidad patrimonial.
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-5 bg-[#253426] text-[#F2EFE7] font-sans text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#18251C] transition-all transform hover:translate-x-1 duration-200 cursor-pointer flex items-center justify-center gap-3"
              >
                <span>Solicitar Coordinación de Recorrido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
