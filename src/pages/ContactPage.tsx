import { Link } from 'react-router-dom';
import { asset } from '../data/assets';
import { contact, whatsappUrl } from '../data/contact';

export default function ContactPage() {
  return (
    <div className="page contact-page">
      <header className="page-head">
        <h1>Contactanos</h1>
        <p>Atención personalizada, de persona a persona.</p>
      </header>
      <div className="container contact-layout">
        <dl className="contact-list">
          <div>
            <dt>WhatsApp</dt>
            <dd>
              <a href={whatsappUrl('Hola Cosmo!')} target="_blank" rel="noreferrer">
                {contact.phoneLabel}
              </a>
            </dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd>
              <a href={contact.instagramUrl} target="_blank" rel="noreferrer">
                @{contact.instagramHandle}
              </a>
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </dd>
          </div>
          <div>
            <dt>Horario de atención</dt>
            <dd>{contact.hours}</dd>
          </div>
          <div>
            <dt>¿Tenés dudas?</dt>
            <dd>
              <Link to="/preguntas-frecuentes">Mirá las preguntas frecuentes</Link>
            </dd>
          </div>
        </dl>
        <img
          className="contact-photo"
          src={asset('photos/e4ab176a233cadd0fa278c394b58ce53.webp')}
          alt="Detalle de aros dorados"
          loading="lazy"
        />
      </div>
    </div>
  );
}
