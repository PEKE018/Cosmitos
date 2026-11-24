import { Link } from 'react-router-dom';
import { asset } from '../data/assets';
import { contact } from '../data/contact';
import { formatCurrency } from '../data/pricing';
import { countries, shippingSettings } from '../data/shipping';

const returnPoints = [
  { icon: 'shipping-02.svg', text: 'Tenés 30 días para devolver tu pedido' },
  { icon: 'shipping-03.svg', text: 'El producto debe estar sin uso y en su paquete original' },
  { icon: 'shipping-04.svg', text: 'La devolución de la compra la pagamos nosotros' },
  { icon: 'shipping-05.svg', text: 'Te devolvemos el dinero en 5 días hábiles' },
  { icon: 'shipping-06.svg', text: 'Pedila con el formulario de devolución y tu número de pedido' },
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
              El costo depende del destino y del peso del paquete: lo ves en el carrito al elegir tu
              provincia y código postal.{' '}
              <strong>Envío gratis en Argentina desde {formatCurrency(shippingSettings.freeShippingFrom)}.</strong>
            </li>
            <li>
              También enviamos a {countries.length - 1} países. El costo depende de la región e
              incluye solo el transporte: impuestos y aranceles de aduana corren por cuenta del
              destinatario.
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
            <Link className="btn btn--light" to="/devoluciones">
              Pedir una devolución
            </Link>
            <a className="btn btn--outline-light" href={`mailto:${contact.email}`}>
              Enviar un mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
