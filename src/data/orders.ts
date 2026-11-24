import type { CartItem } from '../context/CartContext';

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  street: string;
  streetNumber: string;
  apartment: string;
  city: string;
  /** Provincia (Argentina) o estado/región (otros países). */
  province: string;
  countryCode: string;
  postalCode: string;
};

export type StoredOrder = {
  number: string;
  createdAt: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const ordersKey = 'cosmo-orders-v1';
const maxOrders = 30;

function readOrders(): StoredOrder[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(ordersKey) ?? '[]');
    return Array.isArray(parsed) ? (parsed as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

/** Convierte "cs1042", "CS-1042" o "1042" en "CS-1042". Devuelve null si el formato no es válido. */
export function normalizeOrderNumber(value: string): string | null {
  const match = value.trim().toUpperCase().match(/^([A-Z]{0,3})-?(\d{3,8})$/);
  return match ? `${match[1] || 'CS'}-${match[2]}` : null;
}

export function generateOrderNumber(): string {
  const used = new Set(readOrders().map((order) => order.number));
  let number = '';
  do {
    number = `CS-${100000 + Math.floor(Math.random() * 900000)}`;
  } while (used.has(number));
  return number;
}

export function saveOrder(order: StoredOrder): void {
  try {
    const others = readOrders().filter((item) => item.number !== order.number);
    window.localStorage.setItem(ordersKey, JSON.stringify([order, ...others].slice(0, maxOrders)));
  } catch {
    // Sin almacenamiento disponible: el pedido igual se puede enviar por WhatsApp.
  }
}

export function findOrder(value: string): StoredOrder | null {
  const number = normalizeOrderNumber(value);
  if (!number) return null;
  return readOrders().find((order) => order.number === number) ?? null;
}
