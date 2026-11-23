import { useEffect, useRef, useState } from 'react';
import type { SiteProduct } from '../data/site';
import { toCartProduct } from '../data/pricing';
import { useCart } from '../context/CartContext';

type AddToCartButtonProps = {
  product: SiteProduct;
  className?: string;
};

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const cartProduct = toCartProduct(product);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (!cartProduct) return null;

  function handleClick() {
    if (!cartProduct) return;
    addItem(cartProduct);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <>
      <button
        className={`btn btn--primary${added ? ' is-added' : ''} ${className}`.trim()}
        type="button"
        onClick={handleClick}
      >
        {added ? 'Agregado ✓' : 'Agregar al carrito'}
      </button>
      <span className="sr-only" role="status">
        {added ? `${product.name} agregado al carrito` : ''}
      </span>
    </>
  );
}
