export type ProjectLocation = {
  id: string;
  label: string;
  coordinates: [number, number];
  scope: 'nearby' | 'regional';
};

// Puntos tomados de "Proyecto Div. Valladolid - 4-11-26 Ubicaciones.kmz".
export const PROJECT_LOCATIONS: ProjectLocation[] = [
  {
    id: 'oriundo',
    label: 'Oriundo Luxury Nature Villas',
    coordinates: [20.67396076704818, -88.24288681758478],
    scope: 'nearby',
  },
  {
    id: 'cenote-saamal',
    label: 'Cenote Saamal',
    coordinates: [20.67688434508255, -88.24196014912613],
    scope: 'nearby',
  },
  {
    id: 'villas-del-angel',
    label: 'Villas del Ángel',
    coordinates: [20.67723191212875, -88.24296403754211],
    scope: 'nearby',
  },
  {
    id: 'cenote-selva-maya',
    label: 'Cenote Selva Maya',
    coordinates: [20.67639479147891, -88.24261961453942],
    scope: 'nearby',
  },
  {
    id: 'aeropuerto-chichen-itza',
    label: 'Aeropuerto Internacional de Chichén Itzá',
    coordinates: [20.63832478467296, -88.44916747575051],
    scope: 'regional',
  },
  {
    id: 'chichen-itza',
    label: 'Chichén Itzá',
    coordinates: [20.68334898753497, -88.56848774802505],
    scope: 'regional',
  },
  {
    id: 'cancun',
    label: 'Cancún',
    coordinates: [21.16427382922949, -86.85545378426485],
    scope: 'regional',
  },
];
