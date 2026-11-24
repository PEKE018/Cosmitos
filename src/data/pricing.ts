import type { SiteProduct } from './site';
import { shippingSettings } from './shipping';

export type CartProduct = {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  weightGrams: number;
  /** Producto que solo se vende junto con otra compra (por ejemplo, el set de cross-selling). */
  requiresPurchase?: boolean;
};

export function toCartProduct(product: SiteProduct): CartProduct | null {
  const { price } = product;
  if (!price || !Number.isSafeInteger(price) || price <= 0) return null;

  return {
    id: product.id,
    name: product.name,
    image: product.image,
    unitPrice: price,
    weightGrams: product.weightGrams ?? shippingSettings.defaultItemGrams,
    ...(product.requiresPurchase ? { requiresPurchase: true } : {}),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}
