import type { SiteProduct } from './site';

export type CartProduct = {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
};

export function toCartProduct(product: SiteProduct): CartProduct | null {
  const { price } = product;
  if (!price || !Number.isSafeInteger(price) || price <= 0) return null;

  return { id: product.id, name: product.name, image: product.image, unitPrice: price };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}
