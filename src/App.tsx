import {type MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import {
  ArrowDown,
  ArrowRight,
  Crosshair,
  Layers3,
  Map as MapIcon,
  Maximize2,
  Menu,
  MessageCircle,
  Minimize2,
  Minus,
  Mountain,
  Plus,
  RotateCcw,
  Satellite,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {motion, useReducedMotion, useScroll, useSpring} from 'motion/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {LOT_PRICING} from './data/lotPricing';
import {PROJECT_PARCELS, type ProjectParcel} from './data/projectParcels';

const NAV_ITEMS = [
  {label: 'Proyecto', href: '#proyecto'},
  {label: 'Ubicación', href: '#ubicacion'},
  {label: 'Potencial', href: '#potencial'},
  {label: 'Masterplan', href: '#masterplan'},
];

const SCENE_TRANSITIONS: Record<string, string> = {
  inicio: 'inicio',
  proyecto: 'proyecto',
  ubicacion: 'ubicacion',
  potencial: 'potencial',
  masterplan: 'masterplan',
  contacto: 'contacto',
};

const LOCATION_STORIES = [
  {
    label: 'Valladolid',
    image: '/images/calzada-frailes-v4.webp',
    alt: 'Calzada de los Frailes en Valladolid durante la mañana',
  },
  {
    label: 'Chichén Itzá',
    image: '/images/chichen-itza.webp',
    alt: 'El Castillo en Chichén Itzá rodeado por vegetación',
  },
  {
    label: 'Cenotes',
    image: '/images/cenote-selva-v4.webp',
    alt: 'Cenote abierto entre piedra caliza y vegetación',
  },
  {
    label: 'San Bernardino',
    image: '/images/san-bernardino-v3.webp',
    alt: 'Convento de San Bernardino de Siena en Valladolid',
  },
  {
    label: 'Ek’ Balam',
    image: '/images/ek-balam-v3.webp',
    alt: 'La Acrópolis de Ek Balam entre la selva maya',
  },
  {
    label: 'Gastronomía',
    image: '/images/gastronomia-yucateca-v1.webp',
    alt: 'Platillo tradicional yucateco con tortillas y cebolla morada',
  },
  {
    label: 'Tradición',
    image: '/images/mestiza-torteando-v1.webp',
    alt: 'Mujer yucateca preparando tortillas a mano sobre un comal',
  },
  {
    label: 'Fauna',
    image: '/images/pajaro-toh-v1.webp',
    alt: 'Pájaro toh posado sobre piedra caliza en el entorno de Valladolid',
  },
] as const;

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=20.6708204526%2C-88.2481880729';
const WHATSAPP_URL = 'https://wa.me/15557239897';

const PROJECT_BOUNDS: L.LatLngBoundsExpression = [
  [20.66857724917716, -88.25145348732555],
  [20.67313169095599, -88.24511916004622],
];
const PROJECT_BOUNDARY: L.LatLngExpression[] = [
  [20.66952481837471, -88.24658499599549],
  [20.67012518036843, -88.24577799526699],
  [20.67167239674321, -88.24528660400576],
  [20.6730920688689, -88.24879418311929],
  [20.67190267515007, -88.25069222050269],
  [20.66968993468079, -88.25108954188663],
  [20.6685488363788, -88.24960864752667],
  [20.66923571279347, -88.24883488288729],
  [20.67015867106321, -88.24822338529071],
  [20.67075318917989, -88.24790089102835],
];
const AREA_EXACT_FORMATTER = new Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const CURRENCY_FORMATTER = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});
const CURRENCY_EXACT_FORMATTER = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function getParcelNumber(parcel: Pick<ProjectParcel, 'id' | 'label'>) {
  const explicitFraction = parcel.id.match(/^fraction-(\d+)$/)?.[1];
  if (explicitFraction) return Number(explicitFraction);

  const cartographicIndex = Number(parcel.id.match(/^parcel-(\d+)$/)?.[1]);
  if (Number.isFinite(cartographicIndex)) {
    return cartographicIndex <= 22 ? cartographicIndex - 1 : cartographicIndex;
  }

  return Number(parcel.label.match(/\d+/)?.[0]) || 0;
}

function getParcelDisplayLabel(parcel: Pick<ProjectParcel, 'id' | 'label'>) {
  return `Fracción ${getParcelNumber(parcel)}`;
}

function parcelStyle(selected: boolean, hovered = false, sold = false): L.PathOptions {
  if (sold) {
    return {
      color: selected ? '#fff7d8' : hovered ? '#e1b69d' : 'rgba(202,143,108,.9)',
      dashArray: selected ? undefined : '6 5',
      fillColor: selected ? '#d7c48f' : '#9b6049',
      fillOpacity: selected ? 0.68 : hovered ? 0.42 : 0.25,
      weight: selected ? 2.8 : hovered ? 2.2 : 1.4,
    };
  }

  return {
    color: selected ? '#fff7d8' : hovered ? '#ead99f' : 'rgba(255,247,216,.78)',
    fillColor: selected ? '#d7c48f' : '#cbb878',
    fillOpacity: selected ? 0.68 : hovered ? 0.34 : 0.1,
    weight: selected ? 2.8 : hovered ? 2 : 1,
  };
}

function ProjectMap({activeParcel, onSelect}: {activeParcel: string; onSelect: (parcel: string) => void}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const parcelLayersRef = useRef<Record<string, L.Polygon>>({});
  const parcelLabelsRef = useRef<Record<string, L.Marker>>({});
  const baseLayersRef = useRef<Partial<Record<'satellite' | 'terrain' | 'plan', L.TileLayer>>>({});
  const planOverlayRef = useRef<L.ImageOverlay | null>(null);
  const locationMarkerRef = useRef<L.CircleMarker | null>(null);
  const activeParcelRef = useRef(activeParcel);
  const [mapView, setMapView] = useState<'satellite' | 'terrain' | 'plan'>('satellite');
  const [interactionActive, setInteractionActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [mapMessage, setMapMessage] = useState('Haz clic en el mapa para activar el zoom con la rueda.');
  const [currentZoom, setCurrentZoom] = useState(16);
  const [paymentPlan, setPaymentPlan] = useState<'A' | 'B'>('A');
  activeParcelRef.current = activeParcel;
  const selectedParcel = activeParcel === 'general'
    ? null
    : PROJECT_PARCELS.find((parcel) => parcel.id === activeParcel) ?? null;
  const selectedParcelNumber = selectedParcel ? getParcelNumber(selectedParcel) : 0;
  const selectedPricing = selectedParcel ? LOT_PRICING[selectedParcelNumber] : null;
  const selectedArea = selectedPricing?.areaM2 ?? selectedParcel?.areaM2 ?? 0;
  const selectedRate = selectedPricing?.pricePerM2 ?? 0;
  const referenceTotal = selectedPricing?.total ?? 0;
  const activePlan = selectedPricing
    ? paymentPlan === 'A' ? selectedPricing.planA : selectedPricing.planB
    : null;
  const downPayment = activePlan?.downPayment ?? 0;
  const financedAmount = referenceTotal - downPayment;
  const termMonths = activePlan?.months ?? (paymentPlan === 'A' ? 36 : 24);
  const monthlyPayment = activePlan?.monthly ?? 0;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      attributionControl: true,
      scrollWheelZoom: false,
      zoomControl: false,
      preferCanvas: true,
    });
    mapRef.current = map;

    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics and the GIS User Community',
        maxNativeZoom: 17,
        maxZoom: 19,
        keepBuffer: 4,
      },
    );
    const terrainLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri',
        maxNativeZoom: 18,
        maxZoom: 19,
        keepBuffer: 4,
      },
    );
    const planLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxNativeZoom: 19,
      maxZoom: 19,
      keepBuffer: 4,
    });
    baseLayersRef.current = {
      satellite: satelliteLayer,
      terrain: terrainLayer,
      plan: planLayer,
    };
    satelliteLayer.addTo(map);

    const planOverlay = L.imageOverlay('/images/masterplan-overlay.webp', PROJECT_BOUNDS, {
      alt: 'Plano de subdivisión incluido en el archivo KMZ',
      opacity: 0,
      interactive: false,
    }).addTo(map);
    planOverlayRef.current = planOverlay;

    L.polygon(PROJECT_BOUNDARY, {
      color: '#d7c48f',
      fillColor: '#26382c',
      fillOpacity: 0.08,
      weight: 2,
    }).addTo(map);

    PROJECT_PARCELS.forEach((parcel) => {
      const parcelNumber = getParcelNumber(parcel);
      const pricing = LOT_PRICING[parcelNumber];
      const displayArea = pricing?.areaM2 ?? parcel.areaM2;
      const layer = L.polygon(parcel.coordinates as L.LatLngExpression[], parcelStyle(false, false, parcel.sold))
        .bindTooltip(`${getParcelDisplayLabel(parcel)}${parcel.sold ? ' · Vendida' : ''} · ${AREA_EXACT_FORMATTER.format(displayArea)} m²`, {
          className: 'plan-tooltip',
          direction: 'top',
          sticky: true,
        })
        .on('mouseover', () => layer.setStyle(parcelStyle(activeParcelRef.current === parcel.id, true, parcel.sold)))
        .on('mouseout', () => layer.setStyle(parcelStyle(activeParcelRef.current === parcel.id, false, parcel.sold)))
        .on('click', () => {
          onSelect(parcel.id);
          layer.bringToFront();
        })
        .addTo(map);
      parcelLayersRef.current[parcel.id] = layer;

      const numberLabel = L.marker(layer.getBounds().getCenter(), {
        interactive: false,
        keyboard: false,
        icon: L.divIcon({
          className: `parcel-number-marker${parcel.sold ? ' is-sold' : ''}`,
          html: `<span>${parcelNumber}</span>${parcel.sold ? '<small>Vendida</small>' : ''}`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        }),
      }).addTo(map);
      parcelLabelsRef.current[parcel.id] = numberLabel;
    });

    map.fitBounds(PROJECT_BOUNDS, {padding: [28, 28]});
    map.on('click', () => {
      setInteractionActive(true);
      setMapMessage('Zoom con rueda activo. Pulsa “Salir del mapa” para continuar la página.');
    });
    map.on('zoomend', () => setCurrentZoom(map.getZoom()));
    map.on('locationfound', (event: L.LocationEvent) => {
      locationMarkerRef.current?.remove();
      locationMarkerRef.current = L.circleMarker(event.latlng, {
        color: '#fff7d8',
        fillColor: '#d7c48f',
        fillOpacity: 1,
        radius: 7,
        weight: 3,
      }).bindTooltip('Tu ubicación', {direction: 'top'}).addTo(map);
      map.setView(event.latlng, Math.max(map.getZoom(), 16));
      setIsLocating(false);
      setMapMessage('Ubicación encontrada. Usa “Volver al proyecto” para regresar al masterplan.');
    });
    map.on('locationerror', () => {
      setIsLocating(false);
      setMapMessage('No fue posible obtener tu ubicación. Revisa los permisos del navegador.');
    });

    const refreshMapLayout = (refit = false) => {
      window.requestAnimationFrame(() => {
        map.invalidateSize({pan: false});
        if (refit && activeParcelRef.current === 'general') {
          map.fitBounds(PROJECT_BOUNDS, {padding: [34, 34]});
          setCurrentZoom(map.getZoom());
        }
      });
    };

    const resizeObserver = new ResizeObserver(() => refreshMapLayout());
    resizeObserver.observe(containerRef.current);

    const masterplanSection = shellRef.current?.closest('.masterplan-section');
    const sceneObserver = new MutationObserver(() => {
      if (!masterplanSection?.classList.contains('is-active')) return;
      refreshMapLayout(true);
      window.setTimeout(() => refreshMapLayout(true), 420);
    });
    if (masterplanSection) sceneObserver.observe(masterplanSection, {attributes: true, attributeFilter: ['class']});

    const handleWindowResize = () => refreshMapLayout();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') refreshMapLayout();
    };
    window.addEventListener('resize', handleWindowResize, {passive: true});
    window.addEventListener('orientationchange', handleWindowResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const settleTimers = [120, 520, 1050].map((delay) => (
      window.setTimeout(() => refreshMapLayout(true), delay)
    ));

    return () => {
      settleTimers.forEach((timer) => window.clearTimeout(timer));
      resizeObserver.disconnect();
      sceneObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('orientationchange', handleWindowResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      locationMarkerRef.current?.remove();
      map.remove();
      mapRef.current = null;
      parcelLayersRef.current = {};
      parcelLabelsRef.current = {};
      baseLayersRef.current = {};
      planOverlayRef.current = null;
    };
  }, [onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    const nextLayer = baseLayersRef.current[mapView];
    if (!map || !nextLayer) return;

    Object.values(baseLayersRef.current).forEach((layer) => {
      if (layer && map.hasLayer(layer)) map.removeLayer(layer);
    });
    nextLayer.addTo(map);
    planOverlayRef.current?.setOpacity(mapView === 'plan' ? 0.9 : 0);
    planOverlayRef.current?.bringToFront();
    Object.values(parcelLayersRef.current).forEach((layer) => layer.bringToFront());
    Object.values(parcelLabelsRef.current).forEach((label) => {
      if (mapView === 'satellite') {
        if (!map.hasLayer(label)) label.addTo(map);
      } else if (map.hasLayer(label)) {
        map.removeLayer(label);
      }
    });
  }, [mapView]);

  useEffect(() => {
    const map = mapRef.current;
    const container = containerRef.current;
    if (!map || !container) return;

    const stopPageScroll = (event: WheelEvent) => event.stopPropagation();
    if (interactionActive) {
      map.scrollWheelZoom.enable();
      container.addEventListener('wheel', stopPageScroll, {passive: true});
      container.focus({preventScroll: true});
    } else {
      map.scrollWheelZoom.disable();
    }

    return () => container.removeEventListener('wheel', stopPageScroll);
  }, [interactionActive]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const fullscreen = document.fullscreenElement === shellRef.current;
      setIsFullscreen(fullscreen);
      window.setTimeout(() => mapRef.current?.invalidateSize({pan: false}), 80);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setInteractionActive(false);
        if (activeParcelRef.current !== 'general') onSelect('general');
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onSelect]);

  useEffect(() => {
    if (selectedParcel) setPaymentPlan('A');
  }, [selectedParcel]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.entries(parcelLayersRef.current).forEach(([id, layer]) => {
      const parcel = PROJECT_PARCELS.find((item) => item.id === id);
      layer.setStyle(parcelStyle(activeParcel === id, false, parcel?.sold));
    });

    if (activeParcel === 'general') {
      map.fitBounds(PROJECT_BOUNDS, {padding: [32, 32]});
    } else {
      const layer = parcelLayersRef.current[activeParcel];
      if (layer) {
        layer.bringToFront();
      }
    }
  }, [activeParcel, mapView]);

  const resetMap = () => {
    onSelect('general');
    mapRef.current?.fitBounds(PROJECT_BOUNDS, {padding: [36, 36]});
    setMapMessage('Vista completa del proyecto.');
  };

  const locateUser = () => {
    setIsLocating(true);
    setMapMessage('Buscando tu ubicación…');
    mapRef.current?.locate({enableHighAccuracy: true, setView: false, timeout: 10000});
  };

  const toggleFullscreen = async () => {
    if (!shellRef.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await shellRef.current.requestFullscreen();
  };

  return (
    <div ref={shellRef} className={`project-map-shell ${interactionActive ? 'is-interacting' : ''}`}>
      <div
        ref={containerRef}
        className="project-map"
        role="application"
        tabIndex={0}
        aria-label="Mapa interactivo del proyecto con vistas satelital, relieve y plano"
      />

      <div className="map-view-tabs masterplan-ui" role="tablist" aria-label="Vista del mapa">
        <button className={mapView === 'satellite' ? 'is-active' : ''} type="button" role="tab" aria-selected={mapView === 'satellite'} onClick={() => setMapView('satellite')}>
          <Satellite aria-hidden="true" /> Satélite
        </button>
        <button className={mapView === 'terrain' ? 'is-active' : ''} type="button" role="tab" aria-selected={mapView === 'terrain'} onClick={() => setMapView('terrain')}>
          <Mountain aria-hidden="true" /> Relieve
        </button>
        <button className={mapView === 'plan' ? 'is-active' : ''} type="button" role="tab" aria-selected={mapView === 'plan'} onClick={() => setMapView('plan')}>
          <MapIcon aria-hidden="true" /> Plano
        </button>
      </div>

      <div className="map-toolbox masterplan-ui" aria-label="Controles del mapa">
        <button type="button" onClick={() => mapRef.current?.zoomIn()} aria-label="Acercar mapa"><Plus aria-hidden="true" /></button>
        <span aria-live="polite">{currentZoom}</span>
        <button type="button" onClick={() => mapRef.current?.zoomOut()} aria-label="Alejar mapa"><Minus aria-hidden="true" /></button>
        <button type="button" onClick={resetMap} aria-label="Volver al proyecto"><RotateCcw aria-hidden="true" /></button>
        <button type="button" onClick={locateUser} aria-label="Mostrar mi ubicación" disabled={isLocating}><Crosshair aria-hidden="true" /></button>
        <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}>
          {isFullscreen ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
        </button>
      </div>

      {selectedParcel && (
        <aside
          className="parcel-side-panel masterplan-ui"
          role="dialog"
          aria-modal="false"
          aria-labelledby="parcel-panel-title"
          aria-live="polite"
        >
          <header className="parcel-panel-head">
            <div>
              <p>Selección activa</p>
              <span>Selecciona otra fracción para comparar</span>
            </div>
            <button type="button" onClick={resetMap} aria-label="Cerrar información de la fracción"><X aria-hidden="true" /></button>
          </header>

          <div className="parcel-panel-title">
            <div>
              <span>{selectedParcel.sold ? 'No disponible' : 'Disponible'}</span>
              <h3 id="parcel-panel-title">{getParcelDisplayLabel(selectedParcel)}</h3>
            </div>
            {selectedParcel.sold && <span className="parcel-sale-badge">Vendida</span>}
          </div>

          <dl className="parcel-summary-grid">
            <div>
              <dt>Superficie</dt>
              <dd>{AREA_EXACT_FORMATTER.format(selectedArea)} <small>m²</small></dd>
            </div>
            <div>
              <dt>Ubicación</dt>
              <dd>{selectedPricing?.location ?? 'Por confirmar'}</dd>
            </div>
            <div>
              <dt>Precio por m²</dt>
              <dd>{selectedParcel.sold ? '—' : CURRENCY_FORMATTER.format(selectedRate)}</dd>
            </div>
          </dl>

          {selectedParcel.sold ? (
            <div className="parcel-sold-note parcel-panel-sold">
              <strong>Esta fracción ya fue vendida.</strong>
              <p>El mapa permanece activo: selecciona otra fracción para consultar sus datos y formas de pago.</p>
            </div>
          ) : (
            <section className="parcel-finance-card" aria-label="Cotización y financiamiento">
              <div className="parcel-price-block">
                <span>Precio de lista</span>
                <strong>{CURRENCY_EXACT_FORMATTER.format(referenceTotal)}</strong>
                <small>Importe de la lista vigente · sujeto a confirmación</small>
              </div>

              <div className="payment-plan-tabs parcel-plan-tabs" role="tablist" aria-label="Alternativa de pago">
                <button type="button" role="tab" aria-selected={paymentPlan === 'A'} className={paymentPlan === 'A' ? 'is-active' : ''} onClick={() => setPaymentPlan('A')}>
                  <span>Plan A</span>
                  <strong>30% de enganche</strong>
                  <small>Saldo en 36 meses</small>
                </button>
                <button type="button" role="tab" aria-selected={paymentPlan === 'B'} className={paymentPlan === 'B' ? 'is-active' : ''} onClick={() => setPaymentPlan('B')}>
                  <span>Plan B</span>
                  <strong>Sin enganche</strong>
                  <small>Total en 24 meses</small>
                </button>
              </div>

              <div className="parcel-monthly-highlight">
                <span>Mensualidad sin intereses</span>
                <strong>{CURRENCY_EXACT_FORMATTER.format(monthlyPayment)}</strong>
                <small>durante {termMonths} meses</small>
              </div>

              <dl className="parcel-payment-breakdown">
                <div>
                  <dt>Enganche</dt>
                  <dd>{CURRENCY_EXACT_FORMATTER.format(downPayment)}</dd>
                </div>
                <div>
                  <dt>Saldo financiado</dt>
                  <dd>{CURRENCY_EXACT_FORMATTER.format(financedAmount)}</dd>
                </div>
              </dl>
            </section>
          )}

          <footer className="parcel-panel-actions">
            <small>Datos tomados de la lista de precios proporcionada. Disponibilidad y vigencia se confirman con un asesor.</small>
            {!selectedParcel.sold && (
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, me interesa la ${getParcelDisplayLabel(selectedParcel)} de ${AREA_EXACT_FORMATTER.format(selectedArea)} m². Quisiera confirmar disponibilidad y la cotización de ${CURRENCY_EXACT_FORMATTER.format(referenceTotal)}.`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Consultar por WhatsApp <ArrowRight aria-hidden="true" />
              </a>
            )}
          </footer>
        </aside>
      )}

      <button
        className={`map-interaction-toggle masterplan-ui ${interactionActive ? 'is-active' : ''}`}
        type="button"
        onClick={() => {
          setInteractionActive((active) => !active);
          setMapMessage(interactionActive
            ? 'Zoom con rueda desactivado. Ya puedes continuar la página.'
            : 'Zoom con rueda activo. Pulsa “Salir del mapa” para continuar la página.');
        }}
      >
        <Layers3 aria-hidden="true" />
        {interactionActive ? 'Salir del mapa' : 'Activar zoom con rueda'}
      </button>

      <div className="project-map-status masterplan-ui"><span /> {mapMessage}</div>
    </div>
  );
}

function BrandMark({className = 'brand-mark'}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <circle className="brand-frame" cx="24" cy="24" r="20.25" />
      <path className="brand-portal" d="M14.5 35.5V21.25C14.5 14.35 18.75 9 24 9s9.5 5.35 9.5 12.25V35.5" />
      <circle className="brand-sun" cx="24" cy="19.25" r="2.25" />
      <path className="brand-horizon" d="M15.5 28.5c3.1-2.15 5.9-3.2 8.5-3.2s5.4 1.05 8.5 3.2M15.5 33.25c2.8-1.35 5.65-2.05 8.5-2.05s5.7.7 8.5 2.05M18 37.25h12" />
    </svg>
  );
}

function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="LIAH Valladolid, ir al inicio">
      <BrandMark />
      <span className="brand-copy">
        <strong>LIAH</strong>
        <small>Valladolid · Yucatán</small>
      </span>
    </a>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeParcel, setActiveParcel] = useState('general');
  const [sceneChanging, setSceneChanging] = useState(false);
  const [sceneTransition, setSceneTransition] = useState('proyecto');
  const [heroMuted, setHeroMuted] = useState(true);
  const [activeLocationStory, setActiveLocationStory] = useState(0);
  const [locationInView, setLocationInView] = useState(false);
  const sceneLockRef = useRef(false);
  const sceneTimersRef = useRef<number[]>([]);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const locationSectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const revealEase = [0.2, 0.75, 0.2, 1] as const;

  const {scrollYProgress: pageScrollProgress} = useScroll();
  const smoothPageProgress = useSpring(pageScrollProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.25,
  });

  const toggleHeroSound = async () => {
    const video = heroVideoRef.current;
    if (!video) return;

    const nextMuted = !heroMuted;
    video.muted = nextMuted;
    setHeroMuted(nextMuted);

    if (!nextMuted) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        setHeroMuted(true);
      }
    }
  };

  const runSceneTransition = useCallback((target: HTMLElement) => {
    if (sceneLockRef.current) return;

    sceneTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    sceneTimersRef.current = [];
    sceneLockRef.current = true;
    setSceneTransition(SCENE_TRANSITIONS[target.id] ?? 'proyecto');
    setSceneChanging(true);

    sceneTimersRef.current.push(window.setTimeout(() => {
      target.scrollIntoView({behavior: 'auto', block: 'start'});
    }, 440));
    sceneTimersRef.current.push(window.setTimeout(() => {
      setSceneChanging(false);
    }, 590));
    sceneTimersRef.current.push(window.setTimeout(() => {
      sceneLockRef.current = false;
    }, 1080));
  }, []);

  const handleSceneNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false,
  ) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target || sceneLockRef.current) return;
    event.preventDefault();
    if (closeMenu) setMenuOpen(false);
    runSceneTransition(target);
  };

  useEffect(() => () => {
    sceneTimersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    const section = locationSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setLocationInView(entry.isIntersecting),
      {threshold: 0.48},
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!locationInView || prefersReducedMotion) return;

    const timer = window.setTimeout(() => {
      setActiveLocationStory((current) => (current + 1) % LOCATION_STORIES.length);
    }, 4600);
    return () => window.clearTimeout(timer);
  }, [activeLocationStory, locationInView, prefersReducedMotion]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
      },
      {threshold: 0.16},
    );

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting));
      },
      {threshold: 0.52},
    );

    document.querySelectorAll('.reveal, .scroll-reveal').forEach((element) => observer.observe(element));
    document.querySelectorAll('[data-scroll-scene]').forEach((element) => sceneObserver.observe(element));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      sceneObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const precisePointer = window.matchMedia('(pointer: fine) and (min-width: 861px)');
    if (!precisePointer.matches || prefersReducedMotion) return;

    const onWheel = (event: WheelEvent) => {
      if (menuOpen || activeParcel !== 'general' || Math.abs(event.deltaY) < 10 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      if (sceneLockRef.current) {
        event.preventDefault();
        return;
      }

      const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-scene]'));
      if (!scenes.length) return;

      const currentIndex = scenes.reduce((closestIndex, scene, index) => (
        Math.abs(scene.getBoundingClientRect().top) < Math.abs(scenes[closestIndex].getBoundingClientRect().top)
          ? index
          : closestIndex
      ), 0);
      const nextIndex = Math.min(
        scenes.length - 1,
        Math.max(0, currentIndex + (event.deltaY > 0 ? 1 : -1)),
      );
      if (nextIndex === currentIndex) return;

      event.preventDefault();
      runSceneTransition(scenes[nextIndex]);
    };

    window.addEventListener('wheel', onWheel, {passive: false});
    return () => {
      window.removeEventListener('wheel', onWheel);
    };
  }, [activeParcel, menuOpen, prefersReducedMotion, runSceneTransition]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <main>
      <header className={`site-nav ${scrolled || menuOpen ? 'is-scrolled' : ''}`}>
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={(event) => handleSceneNavigation(event, item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-contact" href="#contacto" onClick={(event) => handleSceneNavigation(event, '#contacto')}>Contacto</a>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <div id="mobile-navigation" className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Navegación móvil">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={(event) => handleSceneNavigation(event, item.href, true)}>
              {item.label}
            </a>
          ))}
          <a href="#contacto" onClick={(event) => handleSceneNavigation(event, '#contacto', true)}>Contacto</a>
        </nav>
        <p>Valladolid · Yucatán · México</p>
      </div>

      <motion.div
        aria-hidden="true"
        className="page-progress"
        style={prefersReducedMotion ? {scaleX: 0} : {scaleX: smoothPageProgress}}
      />

      <div className={`scene-curtain transition-${sceneTransition} ${sceneChanging ? 'is-active' : ''}`} aria-hidden="true">
        <div className="scene-transition-brand">
          <BrandMark className="scene-logo-mark" />
          <span>LIAH</span>
          <small>Valladolid · Yucatán</small>
        </div>
      </div>

      <section className="hero-scene" id="inicio" data-scroll-scene aria-labelledby="hero-title">
        <div className="hero">
          <div className="hero-image-wrap hero-primary">
            <video
              ref={heroVideoRef}
              className="hero-image hero-video"
              autoPlay
              muted={heroMuted}
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              poster="/images/liah-selva-hero.webp"
              aria-label="Recorrido visual por el entorno natural de LIAH en Valladolid"
            >
              <source src="/videos/lv_0_20261104124324.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-shade" />
          <button
            className="hero-sound-toggle"
            type="button"
            onClick={toggleHeroSound}
            aria-label={heroMuted ? 'Activar el sonido del video' : 'Silenciar el video'}
            aria-pressed={!heroMuted}
          >
            {heroMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
            <span>{heroMuted ? 'Activar sonido' : 'Silenciar'}</span>
          </button>
          <motion.div className="hero-content">
            <motion.p
              className="eyebrow hero-eyebrow"
              initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.75, delay: 0.14, ease: revealEase}}
            >
              LIAH · Valladolid
            </motion.p>
            <h1 id="hero-title">
              <span className="hero-title-line">
                {['Macrolotes', 'en'].map((word, index) => (
                  <motion.span
                    className="hero-title-word"
                    key={word}
                    initial={prefersReducedMotion ? false : {opacity: 0, y: '0.7em', filter: 'blur(8px)'}}
                    animate={{opacity: 1, y: 0, filter: 'blur(0px)'}}
                    transition={{duration: 0.9, delay: 0.22 + index * 0.12, ease: revealEase}}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.em
                initial={prefersReducedMotion ? false : {clipPath: 'inset(0 100% 0 0)', opacity: 0}}
                animate={{clipPath: 'inset(0 0% 0 0)', opacity: 1}}
                transition={{duration: 1.25, delay: 0.55, ease: revealEase}}
              >
                la selva <span className="hero-maya-word">maya.</span>
                <svg className="hero-ink-stroke" viewBox="0 0 520 30" preserveAspectRatio="none" aria-hidden="true">
                  <motion.path
                    d="M4 18 C 110 3, 210 25, 330 12 S 450 7, 516 16"
                    initial={prefersReducedMotion ? false : {pathLength: 0, opacity: 0}}
                    animate={{pathLength: 1, opacity: 0.75}}
                    transition={{duration: 1.4, delay: 1.05, ease: 'easeInOut'}}
                  />
                </svg>
              </motion.em>
            </h1>
            <motion.div
              className="hero-bottom"
              initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.85, delay: 0.92, ease: revealEase}}
            >
              <p>Macrolotes desde 2,500 m².</p>
              <a className="text-link light hero-project-link" href="#proyecto" onClick={(event) => handleSceneNavigation(event, '#proyecto')}>
                Conocer el proyecto <ArrowDown aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
          <p className="image-credit">Video conceptual · Valladolid, Yucatán</p>
        </div>
      </section>

      <section className="project-section" id="proyecto" data-scroll-scene>
        <div className="project-stage">
          <div className="project-intro reveal">
            <p className="eyebrow">El proyecto</p>
            <h2><span>Espacio para crecer.</span><em>Libertad para construir.</em></h2>
            <div className="project-intro-bottom">
              <p>
                Macrolotes campestres sin urbanización desde 2,500 m² sobre la carretera
                Pisté–Valladolid, en una zona turística consolidada.
              </p>
              <a className="text-link dark" href="#masterplan">
                Ver proyecto <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="project-collage reveal" id="proyecto-imagenes">
            <figure className="project-landscape">
              <img src="/images/chichen-itza.webp" alt="El Castillo de Chichén Itzá rodeado por el paisaje de Yucatán" loading="lazy" />
              <div className="project-image-shade" />
              <figcaption>Chichén Itzá</figcaption>
            </figure>
            <figure className="project-detail project-detail-path">
              <img src="/images/valladolid-centro.webp" alt="Calle histórica del centro de Valladolid, Yucatán" loading="lazy" />
              <figcaption>Valladolid</figcaption>
            </figure>
            <figure className="project-detail project-detail-roots">
              <img src="/images/cenote-samula-concept-v1.png" alt="Cenote Saamal con agua turquesa y raíces bajo una abertura natural" loading="lazy" />
              <figcaption>Cenote Saamal</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section ref={locationSectionRef} className="location-section" id="ubicacion" data-scroll-scene aria-labelledby="location-title">
        <div className="location-stage">
          <div className="location-gallery" aria-live="polite">
            {LOCATION_STORIES.map((story, index) => (
              <figure
                className={`location-story-image ${index === activeLocationStory ? 'is-active' : ''}`}
                key={story.label}
                aria-hidden={index !== activeLocationStory}
              >
                <img src={story.image} alt={index === activeLocationStory ? story.alt : ''} loading={index === 0 ? 'eager' : 'lazy'} />
              </figure>
            ))}
            <div className="location-image-shade" />
          </div>

          <div className="location-copy reveal">
            <p className="eyebrow">Ubicación</p>
            <h2 id="location-title"><span>A minutos de Valladolid.</span><em>En la ruta de Chichén Itzá.</em></h2>
            <p>
              Sobre la carretera federal 180, Costera del Golfo, el proyecto es colindante con Oriundo y Selva Maya, y se encuentra frente a Villas del Ángel: un entorno con proyectos hoteleros y turísticos ya consolidados.
            </p>
            <p>
              A aproximadamente <strong>10 minutos del centro de Valladolid</strong> y <strong>45 minutos de Chichén Itzá</strong>, su ubicación reúne cercanía a la ciudad, conexión por carretera y un entorno turístico que ya forma parte de la zona.
            </p>
            <a className="map-button" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
              Conoce la ubicación <ArrowRight aria-hidden="true" />
            </a>
            <div className="location-montage-progress" aria-live="polite" aria-label={`Imagen ${activeLocationStory + 1} de ${LOCATION_STORIES.length}: ${LOCATION_STORIES[activeLocationStory].label}`}>
              <span>{String(activeLocationStory + 1).padStart(2, '0')} · {LOCATION_STORIES[activeLocationStory].label}</span>
              <i><b key={activeLocationStory} /></i>
              <span>{String(LOCATION_STORIES.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="potential-section" id="potencial" data-scroll-scene aria-labelledby="potential-title">
        <div className="potential-heading reveal">
          <p className="eyebrow">Potencial</p>
          <h2 id="potential-title"><span>Terreno para</span><em>un proyecto propio.</em></h2>
          <p>Una escala flexible para imaginar un proyecto turístico, comercial o residencial vinculado al paisaje.</p>
        </div>

        <figure className="potential-visual reveal">
          <img src="/images/potencial-hospitalidad-laguna-v1.webp" alt="Visualización conceptual de un pabellón de hospitalidad en piedra con un pequeño espejo de agua" loading="lazy" />
          <div className="potential-shade" />
          <figcaption>Visualización conceptual · Construcción no incluida</figcaption>
        </figure>

        <div className="potential-use-notes">
          <article>
            <span>01</span>
            <h3>Turístico</h3>
            <p>Hospedaje, experiencias y servicios vinculados con el corredor turístico regional.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Comercio</h3>
            <p>Gastronomía, servicios y locales conectados con la actividad del corredor.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Residencial</h3>
            <p>Una casa o refugio inmerso en la naturaleza.</p>
          </article>
        </div>

        <p className="potential-disclaimer">
          Cualquier desarrollo, construcción o subdivisión está sujeto a uso de suelo, factibilidad y autorizaciones aplicables.
        </p>
      </section>

      <section className="masterplan-section" id="masterplan" data-scroll-scene aria-label="Masterplan interactivo">
        <div className="masterplan-frame reveal">
          <ProjectMap activeParcel={activeParcel} onSelect={setActiveParcel} />
        </div>
      </section>

      <section className="whatsapp-section" id="contacto" data-scroll-scene>
        <img src="/images/sendero-calizo-v2.webp" alt="Sendero natural entre la selva yucateca" loading="lazy" />
        <div className="whatsapp-shade" />
        <div className="whatsapp-content reveal">
          <p className="eyebrow">Conoce LIAH</p>
          <h2><span>La conversación</span><em>empieza aquí.</em></h2>
          <a
            className="whatsapp-button"
            href={`${WHATSAPP_URL}?text=Hola%2C%20me%20interesa%20recibir%20informaci%C3%B3n%20sobre%20los%20macrolotes%20LIAH%20en%20Valladolid.`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle aria-hidden="true" />
            Hablar por WhatsApp
            <ArrowRight aria-hidden="true" />
          </a>
        </div>

        <footer className="site-footer">
          <Brand />
          <p>Macrolotes campestres en Valladolid, Yucatán.</p>
          <div><a href="#inicio">Volver arriba</a><span>© 2026 LIAH</span></div>
        </footer>
      </section>
    </main>
  );
}
