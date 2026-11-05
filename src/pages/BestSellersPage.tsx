import BrandMark from '../components/BrandMark';
import ProductCard from '../components/ProductCard';
import { bestSellers } from '../data/site';
import { asset } from '../data/assets';

export default function BestSellersPage() {
  return (
    <main className="page best-sellers-page">
      <img
        className="best-sellers-banner"
        src={asset('photos/0a375a3b1fffa8b596019527a156fdf7.jpg')}
        alt="Accesorios dorados de la colección Cosmo"
      />
      <section className="catalog-section">
        <div className="catalog-heading">
          <BrandMark large />
          <h1>Más vendidos</h1>
        </div>
        <div className="best-seller-feature">
          <ProductCard product={bestSellers[0]} compact />
        </div>
        <div className="best-seller-rest">
          {bestSellers.slice(1).map((product) => (
            <ProductCard key={product.name} product={product} compact />
          ))}
        </div>
      </section>
    </main>
  );
}
