export const shippingSettings = {
  originPostalCode: '2657',
  flatRate: 2000,
} as const;

export function normalizePostalCode(value: string): string {
  return value.toUpperCase().replace(/\s/g, '');
}

export function isValidArgentinePostalCode(value: string): boolean {
  return /^(?:\d{4}|[A-Z]\d{4}[A-Z]{3})$/.test(normalizePostalCode(value));
}
