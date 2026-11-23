import { Link } from 'react-router-dom';
import { asset } from '../data/assets';

export default function IntroPage() {
  return (
    <div className="page intro-page">
      <section className="intro-copy">
        <h1>Accesorios que hablan por vos.</h1>
        <p>Accesorios con estética urbana. Diseñados para que no pases desapercibid@.</p>
        <Link className="btn btn--primary" to="/hechos-para-ti">
          Ver catálogo
        </Link>
      </section>
      <div className="intro-gallery">
        <img
          src={asset('photos/77026350e3d6deeaeb38a1c00f46b6f9.webp')}
          alt="Anillos dorados sobre una superficie clara"
        />
        <img
          src={asset('photos/a8ef635df10c8937e3ef9bcb750ee248.webp')}
          alt="Accesorios dorados de la colección Cosmo"
          loading="lazy"
        />
      </div>
    </div>
  );
}
