/**
 * Lógica de costos de envío.
 *
 * Así se arma el precio en la práctica (Correo Argentino, Andreani, DHL, etc.):
 *   1. PESO FACTURABLE: el mayor entre el peso real y el volumétrico (largo × ancho × alto ÷ 5000).
 *   2. ZONA: distancia entre el CP de origen y el de destino (nacional) o país (internacional).
 *   3. SERVICIO: clásico, expreso, a domicilio o a sucursal.
 *
 * Acá se modela con 1 y 2: una tabla "zona × tramo de peso".
 *
 * ⚠️ LOS IMPORTES DE ABAJO SON DE EJEMPLO. Reemplazalos por los de tu cotizador
 *    (MiCorreo / Paq.ar, Andreani, etc.). Solo hay que editar `domesticRates` e `internationalRates`.
 */

export const shippingSettings = {
  originPostalCode: '2657',
  originLabel: 'Laborde, Córdoba',
  /** Subtotal (ARS) desde el cual el envío es gratis. Aplica solo a Argentina. */
  freeShippingFrom: 50000,
  /** Peso del embalaje (caja o sobre + relleno), en gramos. */
  packagingGrams: 80,
  /** Peso que se asume para un producto sin `weightGrams`. */
  defaultItemGrams: 100,
} as const;

/**
 * Política de devoluciones.
 * `customerPaysFor`: motivos en los que el envío de la devolución corre por cuenta del cliente.
 * Vacío = lo cubre siempre Cosmo (así figura hoy en la web). Valores posibles:
 * 'defectuoso' | 'distinto' | 'arrepentimiento' | 'otro'.
 */
export const returnPolicy = {
  windowDays: 10,
  customerPaysFor: [] as string[],
};

/** Tramos de peso facturable (gramos): hasta 500 g, 1 kg, 2 kg y 5 kg. */
export const weightBands = [500, 1000, 2000, 5000] as const;

type DomesticZone = 1 | 2 | 3 | 4;
type InternationalZone = 'I1' | 'I2' | 'I3' | 'I4';

/** ARS con IVA, uno por tramo de `weightBands`. EJEMPLO: reemplazar por tarifas reales. */
const domesticRates: Record<DomesticZone, readonly number[]> = {
  1: [3200, 3900, 4800, 6800],
  2: [4200, 5200, 7000, 9500],
  3: [5200, 6500, 8800, 12000],
  4: [6400, 8000, 11000, 15000],
};

/** ARS, uno por tramo de `weightBands`. EJEMPLO: reemplazar por tarifas reales. */
const internationalRates: Record<InternationalZone, readonly number[]> = {
  I1: [14000, 18000, 26000, 42000],
  I2: [24000, 30000, 44000, 72000],
  I3: [28000, 36000, 52000, 86000],
  I4: [32000, 42000, 60000, 98000],
};

const domesticZoneNames: Record<DomesticZone, string> = {
  1: 'Provincial',
  2: 'Cercana',
  3: 'Intermedia',
  4: 'Lejana',
};

const internationalZoneNames: Record<InternationalZone, string> = {
  I1: 'Países limítrofes y región',
  I2: 'Resto de América',
  I3: 'Europa',
  I4: 'Asia y Oceanía',
};

/** Zona de cada provincia respecto del origen (Córdoba). */
export const provinces: { name: string; zone: DomesticZone }[] = [
  { name: 'Buenos Aires', zone: 2 },
  { name: 'Catamarca', zone: 2 },
  { name: 'Chaco', zone: 3 },
  { name: 'Chubut', zone: 4 },
  { name: 'Ciudad Autónoma de Buenos Aires', zone: 2 },
  { name: 'Córdoba', zone: 1 },
  { name: 'Corrientes', zone: 3 },
  { name: 'Entre Ríos', zone: 2 },
  { name: 'Formosa', zone: 4 },
  { name: 'Jujuy', zone: 4 },
  { name: 'La Pampa', zone: 2 },
  { name: 'La Rioja', zone: 2 },
  { name: 'Mendoza', zone: 3 },
  { name: 'Misiones', zone: 3 },
  { name: 'Neuquén', zone: 3 },
  { name: 'Río Negro', zone: 3 },
  { name: 'Salta', zone: 4 },
  { name: 'San Juan', zone: 3 },
  { name: 'San Luis', zone: 2 },
  { name: 'Santa Cruz', zone: 4 },
  { name: 'Santa Fe', zone: 2 },
  { name: 'Santiago del Estero', zone: 2 },
  { name: 'Tierra del Fuego', zone: 4 },
  { name: 'Tucumán', zone: 3 },
];

export const countries: { code: string; name: string; zone: InternationalZone | null }[] = [
  { code: 'AR', name: 'Argentina', zone: null },
  { code: 'UY', name: 'Uruguay', zone: 'I1' },
  { code: 'CL', name: 'Chile', zone: 'I1' },
  { code: 'PY', name: 'Paraguay', zone: 'I1' },
  { code: 'BO', name: 'Bolivia', zone: 'I1' },
  { code: 'BR', name: 'Brasil', zone: 'I1' },
  { code: 'PE', name: 'Perú', zone: 'I2' },
  { code: 'CO', name: 'Colombia', zone: 'I2' },
  { code: 'EC', name: 'Ecuador', zone: 'I2' },
  { code: 'MX', name: 'México', zone: 'I2' },
  { code: 'US', name: 'Estados Unidos', zone: 'I2' },
  { code: 'CA', name: 'Canadá', zone: 'I2' },
  { code: 'ES', name: 'España', zone: 'I3' },
  { code: 'PT', name: 'Portugal', zone: 'I3' },
  { code: 'IT', name: 'Italia', zone: 'I3' },
  { code: 'FR', name: 'Francia', zone: 'I3' },
  { code: 'DE', name: 'Alemania', zone: 'I3' },
  { code: 'GB', name: 'Reino Unido', zone: 'I3' },
  { code: 'AU', name: 'Australia', zone: 'I4' },
  { code: 'JP', name: 'Japón', zone: 'I4' },
];

export type ShippingQuote = {
  /** Costo en ARS (0 si es gratis). */
  cost: number;
  free: boolean;
  international: boolean;
  /** Ej.: "Zona 2 · Cercana" o "Europa". */
  zoneLabel: string;
  /** Peso del paquete usado para cotizar, en gramos. */
  parcelGrams: number;
};

/** Peso del paquete: suma de los productos más el embalaje. */
export function parcelWeight(items: { weightGrams: number; quantity: number }[]): number {
  const products = items.reduce((total, item) => total + item.weightGrams * item.quantity, 0);
  return products + shippingSettings.packagingGrams;
}

function priceForWeight(rates: readonly number[], grams: number): number {
  const index = weightBands.findIndex((band) => grams <= band);
  if (index >= 0) return rates[index];
  // Por encima del último tramo: se repite el último por cada 5 kg adicionales.
  return rates[rates.length - 1] * Math.ceil(grams / weightBands[weightBands.length - 1]);
}

type QuoteInput = {
  countryCode: string;
  province?: string;
  weightGrams: number;
  /** Subtotal del pedido. Si se omite (por ejemplo en devoluciones) no se aplica envío gratis. */
  subtotal?: number;
};

/** Cotiza un envío. Devuelve `null` si falta el destino (país o provincia). */
export function calculateShipping({
  countryCode,
  province,
  weightGrams,
  subtotal,
}: QuoteInput): ShippingQuote | null {
  if (countryCode === 'AR') {
    const match = provinces.find((item) => item.name === province);
    if (!match) return null;

    const free = subtotal !== undefined && subtotal >= shippingSettings.freeShippingFrom;
    return {
      cost: free ? 0 : priceForWeight(domesticRates[match.zone], weightGrams),
      free,
      international: false,
      zoneLabel: `Zona ${match.zone} · ${domesticZoneNames[match.zone]}`,
      parcelGrams: weightGrams,
    };
  }

  const country = countries.find((item) => item.code === countryCode);
  if (!country?.zone) return null;

  return {
    cost: priceForWeight(internationalRates[country.zone], weightGrams),
    free: false,
    international: true,
    zoneLabel: internationalZoneNames[country.zone],
    parcelGrams: weightGrams,
  };
}

export function normalizePostalCode(value: string): string {
  return value.toUpperCase().replace(/\s/g, '');
}

export function isValidArgentinePostalCode(value: string): boolean {
  return /^(?:\d{4}|[A-Z]\d{4}[A-Z]{3})$/.test(normalizePostalCode(value));
}

export function isValidPostalCode(countryCode: string, value: string): boolean {
  if (countryCode === 'AR') return isValidArgentinePostalCode(value);
  return /^[A-Z0-9][A-Z0-9 -]{2,11}$/i.test(value.trim());
}
