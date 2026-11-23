import ProductCard from '../components/ProductCard';
import { cosmoComplements, cosmoEssentials, madeForYou } from '../data/site';

export default function HechosParaTiPage() {
  return (
    <div className="page made-page">
      <header className="page-head">
        <h1>Hechos para ti</h1>
        <p>Diseños pensados para elevar tu día a día</p>
      </header>
      <div className="container">
        <div className="product-grid">
          {madeForYou.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <section className="collection" aria-labelledby="complementos">
          <header className="collection__head">
            <h2 id="complementos">Complementos Cosmo</h2>
            <p>Pequeños accesorios para tu rutina diaria ✧</p>
          </header>
          <div className="product-grid">
            {cosmoComplements.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="collection" aria-labelledby="essentials">
          <header className="collection__head">
            <h2 id="essentials">Cosmo Essentials ✧</h2>
            <p>Diseño y funcionalidad para todos los días</p>
          </header>
          <div className="product-grid">
            {cosmoEssentials.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
