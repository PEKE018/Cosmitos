import { asset } from '../data/assets';

export default function ShippingPage() {
  return (
    <main className="page shipping-page">
      <section className="shipping-header">
        <img src={asset('icons/shipping-01.svg')} alt="" />
        <h1>Envios y devoluciones</h1>
      </section>
      <div className="shipping-details">
        <section>
          <h2>Envios</h2>
          <ul>
            <li>Enviamos a todo el país, tu pedido llega en 3 a 7 días hábiles.</li>
            <li>El costo se calcula al finalizar la compra según tu código postal.</li>
            <li>Te enviamos el número de seguimiento para que sepas dónde está tu pedido.</li>
            <li>Envio gratis desde 50.000</li>
          </ul>
        </section>
        <section>
          <h2>Devolución</h2>
          <div className="return-points">
            <p>
              <img src={asset('icons/shipping-02.svg')} alt="" />
              Tenés 30 días para devolver tu pedido
            </p>
            <p>
              <img src={asset('icons/shipping-03.svg')} alt="" />
              El producto debe estar sin uso y en su paquete original
            </p>
            <p>
              <img src={asset('icons/shipping-04.svg')} alt="" />
              La devolución de la compra la pagamos nosotros
            </p>
            <p>
              <img src={asset('icons/shipping-05.svg')} alt="" />
              Te devolvemos el dinero 5 días hábiles
            </p>
            <p>
              <img src={asset('icons/shipping-06.svg')} alt="" />
              Contactános por whatsapp o mail para gestionarlo
            </p>
          </div>
        </section>
      </div>
      <p className="shipping-start">Iniciar envio</p>
    </main>
  );
}
