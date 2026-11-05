import type { SiteProduct } from '../data/site';
import { asset } from '../data/assets';
import AddToCartButton from './AddToCartButton';

type ProductCardProps = {
  product: SiteProduct;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <article className={`product-card${compact ? ' product-card--compact' : ''}`}>
      <h3>{product.name}</h3>
      <img src={asset(`photos/${product.image}`)} alt={product.name} loading="lazy" />
      <div className="product-card__details">
        {product.details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>
      {product.price && <p className="product-card__price">{product.price}</p>}
      {!compact && product.price && <AddToCartButton product={product} />}
    </article>
  );
}
