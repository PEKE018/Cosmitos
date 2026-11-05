import { Link } from 'react-router-dom';
import { asset } from '../data/assets';

export default function ContactPage() {
  return (
    <main className="page contact-page">
      <h1>Contáctanos</h1>
      <div className="contact-details">
        <section>
          <a href="https://www.instagram.com/cosmo.street/" target="_blank" rel="noreferrer">
            @COSMO.STREET
          </a>
          <p>Instagram</p>
        </section>
        <section>
          <p>HELLO@COSMO.COM</p>
          <p>Email</p>
        </section>
        <section>
          <p>(+54 9) 3537590606</p>
          <p>Numero de telefono</p>
        </section>
        <section className="contact-hours">
          <p>LUNES A VIERNES · 9 A 18 HS</p>
          <p>Atencion personalizada</p>
        </section>
      </div>
      <Link className="contact-faq" to="/preguntas-frecuentes" aria-label="Preguntas frecuentes">
        <img src={asset('icons/contact-01.svg')} alt="FAQ" />
      </Link>
      <img
        className="contact-editorial"
        src={asset('photos/e4ab176a233cadd0fa278c394b58ce53.jpg')}
        alt="Detalle de aros dorados"
        loading="lazy"
      />
    </main>
  );
}
