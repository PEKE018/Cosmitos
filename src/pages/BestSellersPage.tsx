import ProductCard from '../components/ProductCard';
import { asset } from '../data/assets';
import { bestSellers } from '../data/site';

export default function BestSellersPage() {
  return (
    <div className="page best-sellers-page">
      <img
        className="page-banner"
        src={asset('photos/banner-mas-vendidos.webp')}
        alt="Cadenas doradas con un dije sobre una base color arena"
      />
      <header className="page-head">
        <h1>Más vendidos</h1>
        <p>Los favoritos de Cosmo.</p>
      </header>
      <div className="container">
        <div className="product-grid product-grid--four">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
