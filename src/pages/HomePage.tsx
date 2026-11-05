import { Link } from 'react-router-dom';
import { asset } from '../data/assets';

export default function HomePage() {
  return (
    <main className="page home-page">
      <section className="home-hero" aria-label="Cosmo Accesorios">
        <img
          src={asset('photos/e17daaf707017936bc170ea13476a4b7.jpg')}
          alt="Aros dorados sobre una composición de tonos cálidos"
        />
      </section>
      <section className="home-statement">
        <img
          className="home-logo"
          src={asset('photos/5b8b4a38cd132157fbb3b76bc7ad4e4c.png')}
          alt="Cosmo"
          loading="lazy"
        />
        <p>El arte de regalar sofisticación.</p>
        <p>Simple. Elegante. Especial.</p>
        <Link className="text-link" to="/mas-vendidos">
          ver catalogo
        </Link>
      </section>
    </main>
  );
}
