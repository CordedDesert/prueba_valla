export type LotStatus = 'disponible' | 'reservado' | 'adquirido';

export type LotCategory = 'cenote' | 'hacienda' | 'botanico' | 'retiro';

export interface Lot {
  id: string;
  number: number;
  name: string;
  category: LotCategory;
  categoryLabel: string;
  status: LotStatus;
  areaM2: number;
  areaSqFt: number;
  dimensions: {
    front: number;
    depth: number;
  };
  orientation: 'Nororiente' | 'Oriente' | 'Suroriente' | 'Norte' | 'Poniente';
  windDirection: 'Alisio ESE' | 'Brisa NE';
  canopyRetentionPercent: number; // e.g. 82%
  maxFootprintM2: number; // COS 18-20%
  priceMxn: number;
  priceUsd: number;
  featuredTrees: string[];
  description: string;
  architecturalNote: string;
  heroImage: string;
  detailImages: string[];
  renderCad: string;
  // Map positioning on SVG viewBox (0 0 1000 650)
  svgCoords: {
    polygon: string;
    center: [number, number];
    labelPos: [number, number];
  };
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  coverImage: string;
  summary: string;
  body: string[];
  pullQuote?: string;
  pullQuoteAuthor?: string;
}

export interface TourBookingData {
  fullName: string;
  email: string;
  phone: string;
  modality: 'in-situ' | 'virtual' | 'dossier';
  preferredDate: string;
  preferredTime: string;
  selectedLotId?: string;
  investmentHorizon: string;
  notes: string;
}
