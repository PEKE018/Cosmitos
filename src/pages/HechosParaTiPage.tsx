import ProductCard from '../components/ProductCard';
import {
  cosmoComplements,
  cosmoEssentials,
  madeForYou,
} from '../data/site';

export default function HechosParaTiPage() {
  return (
    <main className="page made-page">
      <header className="section-heading">
        <h1>Hechos para ti</h1>
        <p>Diseños pensados para elevar tu día a día</p>
      </header>
      <div className="product-grid">
        {madeForYou.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
      <section className="product-collection">
        <header className="collection-heading">
          <h2>Complementos Cosmo</h2>
          <p>Pequeños accesorios para tu rutina diaria ✧</p>
        </header>
        <div className="product-grid">
          {cosmoComplements.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>
      <section className="product-collection">
        <header className="collection-heading">
          <h2>Cosmo Essentials ✧</h2>
          <p>Diseño y funcionalidad para todos los días</p>
        </header>
        <div className="product-grid">
          {cosmoEssentials.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
