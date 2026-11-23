import { asset } from '../data/assets';
import { contact, whatsappUrl } from '../data/contact';
import { formatCurrency } from '../data/pricing';
import { shippingSettings } from '../data/shipping';

const returnPoints = [
  { icon: 'shipping-02.svg', text: 'Tenés 30 días para devolver tu pedido' },
  { icon: 'shipping-03.svg', text: 'El producto debe estar sin uso y en su paquete original' },
  { icon: 'shipping-04.svg', text: 'La devolución de la compra la pagamos nosotros' },
  { icon: 'shipping-05.svg', text: 'Te devolvemos el dinero en 5 días hábiles' },
  { icon: 'shipping-06.svg', text: 'Contactanos por WhatsApp o mail para gestionarlo' },
];

export default function ShippingPage() {
  return (
    <div className="page shipping-page">
      <header className="page-head">
        <img className="page-head__icon" src={asset('icons/shipping-01.svg')} alt="" />
        <h1>Envíos y devoluciones</h1>
      </header>

      <div className="container shipping-grid">
        <section className="info-card">
          <h2>Envíos</h2>
          <ul className="info-list">
            <li>Enviamos a todo el país, tu pedido llega en 3 a 7 días hábiles.</li>
            <li>
              Tarifa fija de {formatCurrency(shippingSettings.flatRate)} a todo el país.{' '}
              <strong>Envío gratis desde {formatCurrency(shippingSettings.freeShippingFrom)}.</strong>
            </li>
            <li>Te enviamos el número de seguimiento para que sepas dónde está tu pedido.</li>
          </ul>
        </section>

        <section className="info-card">
          <h2>Devoluciones</h2>
          <ul className="return-points">
            {returnPoints.map((point) => (
              <li key={point.icon}>
                <img src={asset(`icons/${point.icon}`)} alt="" />
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="container">
        <div className="cta-band">
          <p>¿Necesitás gestionar una devolución?</p>
          <div className="cta-band__actions">
            <a
              className="btn btn--light"
              href={whatsappUrl('Hola Cosmo! Quiero gestionar una devolución de mi pedido.')}
              target="_blank"
              rel="noreferrer"
            >
              Escribir por WhatsApp
            </a>
            <a className="btn btn--outline-light" href={`mailto:${contact.email}`}>
              Enviar un mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
