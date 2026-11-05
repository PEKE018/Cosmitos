import type { SiteProduct } from '../data/site';
import { toCartProduct } from '../data/pricing';
import { useCart } from '../context/CartContext';

type AddToCartButtonProps = {
  product: SiteProduct;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const cartProduct = toCartProduct(product);
  const { addItem } = useCart();

  if (!cartProduct) return null;

  return (
    <button
      className="product-card__add"
      type="button"
      onClick={() => addItem(cartProduct)}
    >
      Agregar al carrito
    </button>
  );
}
