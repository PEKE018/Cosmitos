import type { SiteProduct } from '../data/site';
import { asset } from '../data/assets';
import { whatsappUrl } from '../data/contact';
import { formatCurrency } from '../data/pricing';
import AddToCartButton from './AddToCartButton';

type ProductCardProps = {
  product: SiteProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
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
