import type { SiteProduct } from './site';

export type CartProduct = {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
};

export function parsePrice(price?: string): number | undefined {
  if (!price) return undefined;

  const amount = Number(price.replace(/\D/g, ''));
  return Number.isSafeInteger(amount) && amount > 0 ? amount : undefined;
}

export function toCartProduct(product: SiteProduct): CartProduct | null {
  const unitPrice = parsePrice(product.price);
  if (!unitPrice) return null;

  return {
    id: `${product.name}::${product.image}`,
    name: product.name,
    image: product.image,
    unitPrice,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}
