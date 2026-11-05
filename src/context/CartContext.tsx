import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { CartProduct } from '../data/pricing';

export type CartItem = CartProduct & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  storageError: string | null;
  addItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const storageKey = 'cosmo-cart-v1';
const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;

  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.image === 'string' &&
    typeof item.unitPrice === 'number' &&
    Number.isSafeInteger(item.unitPrice) &&
    item.unitPrice > 0 &&
    typeof item.quantity === 'number' &&
    Number.isSafeInteger(item.quantity) &&
    item.quantity > 0
  );
}

function readStoredCart(): { items: CartItem[]; error: string | null } {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return { items: [], error: null };

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isCartItem)) {
      return {
        items: [],
        error: 'El carrito guardado no tenía un formato válido y se inició uno nuevo.',
      };
    }

    return { items: parsed, error: null };
  } catch {
    return {
      items: [],
      error: 'No se pudo leer el carrito guardado en este navegador.',
    };
  }
}

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [storedCart] = useState(readStoredCart);
  const [items, setItems] = useState(storedCart.items);
  const [storageError, setStorageError] = useState(storedCart.error);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      setStorageError('No se pudo guardar el carrito en este navegador.');
    }
  }, [items]);

  function addItem(product: CartProduct) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function setQuantity(id: string, quantity: number) {
    if (!Number.isSafeInteger(quantity) || quantity < 1) return;
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value: CartContextValue = {
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    storageError,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}
