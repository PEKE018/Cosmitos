import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { SiteProduct } from '../data/site';
import { asset } from '../data/assets';
import { whatsappUrl } from '../data/contact';
import { formatCurrency } from '../data/pricing';
import AddToCartButton from './AddToCartButton';

type ProductCardProps = {
  product: SiteProduct;
  /** Posición dentro de la grilla: escalona la animación de entrada. */
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`product-card${visible ? ' is-visible' : ''}`}
      style={{ '--delay': `${(index % 6) * 80}ms` } as CSSProperties}
    >
      <div className="product-card__media">
        <img src={asset(`photos/${product.image}`)} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__body">
        <h3>{product.name}</h3>
        <ul className="product-card__details">
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className="product-card__foot">
          {product.price ? (
            <>
              <p className="product-card__price">{formatCurrency(product.price)}</p>
              <AddToCartButton product={product} />
            </>
          ) : (
            <a
              className="btn btn--ghost"
              href={whatsappUrl(`Hola Cosmo! Quiero consultar por: ${product.name}`)}
              target="_blank"
              rel="noreferrer"
            >
              Consultar por WhatsApp
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
