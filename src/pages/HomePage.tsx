import { Link } from 'react-router-dom';
import BrandMark from '../components/BrandMark';
import { asset } from '../data/assets';

const tiles = [
  { to: '/mas-vendidos', label: 'Más vendidos', image: 'ddcb710297f2e382f86d45679a309417.webp', alt: 'Aros colgantes de perla' },
  { to: '/hechos-para-ti', label: 'Hechos para ti', image: '930c240553efa69158624d6e8ffce7ab.webp', alt: 'Anillo de corazón dorado' },
  { to: '/combos', label: 'Combos', image: 'db72809dd5a67c9ba8809f1c27208460.webp', alt: 'Clips de ajuste en un pantalón' },
];

export default function HomePage() {
  return (
    <div className="page home-page">
      <section className="home-hero" aria-label="Cosmo Accesorios">
        <img
          src={asset('photos/e17daaf707017936bc170ea13476a4b7.webp')}
          alt="Aros dorados sobre una composición de tonos cálidos"
        />
      </section>

      <section className="home-band">
        <div className="home-band__inner">
          <BrandMark className="home-band__logo" />
          <div className="home-band__copy">
            <h1>El arte de regalar sofisticación.</h1>
            <p>Simple. Elegante. Especial.</p>
            <div className="home-band__actions">
              <Link className="btn btn--light" to="/hechos-para-ti">
                Ver catálogo
              </Link>
              <Link className="btn btn--outline-light" to="/mas-vendidos">
                Más vendidos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-tiles" aria-label="Explorar la tienda">
        {tiles.map((tile) => (
          <Link className="tile" to={tile.to} key={tile.to}>
            <img src={asset(`photos/${tile.image}`)} alt={tile.alt} loading="lazy" />
            <span>{tile.label}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
