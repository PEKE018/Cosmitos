import BrandMark from '../components/BrandMark';
import { asset } from '../data/assets';

export default function IntroPage() {
  return (
    <main className="page intro-page">
      <BrandMark className="intro-logo" />
      <section className="intro-copy">
        <h1>Accesorios que hablan por vos.</h1>
        <p>Accesorios con estética urbana. Diseñadas para que no pases desapercibid@.</p>
      </section>
      <div className="intro-gallery">
        <img
          src={asset('photos/77026350e3d6deeaeb38a1c00f46b6f9.jpg')}
          alt="Anillos dorados sobre una superficie clara"
        />
        <img
          src={asset('photos/a8ef635df10c8937e3ef9bcb750ee248.jpg')}
          alt="Accesorios dorados de la colección Cosmo"
          loading="lazy"
        />
      </div>
    </main>
  );
}
