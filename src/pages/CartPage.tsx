import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCart, type CartItem } from '../context/CartContext';
import { asset } from '../data/assets';
import { formatCurrency } from '../data/pricing';
import {
  isValidArgentinePostalCode,
  normalizePostalCode,
  shippingSettings,
} from '../data/shipping';

type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  street: string;
  streetNumber: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
};

type OrderSummary = {
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const provinces = [
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Ciudad Autónoma de Buenos Aires',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
];

export default function CartPage() {
  const { items, itemCount, storageError, removeItem, setQuantity, clearCart } =
    useCart();
  const [postalCode, setPostalCode] = useState('');
  const [postalError, setPostalError] = useState('');
  const [summary, setSummary] = useState<OrderSummary | null>(null);
  const postalCodeInput = useRef<HTMLInputElement>(null);

  const subtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  const validPostalCode = isValidArgentinePostalCode(postalCode);
  const shipping = validPostalCode ? shippingSettings.flatRate : null;

  function handlePostalCodeChange(value: string) {
    const normalized = normalizePostalCode(value);
    setPostalCode(normalized);
    setPostalError(
      normalized && !isValidArgentinePostalCode(normalized)
        ? 'Ingresá un CP de 4 dígitos o un CPA válido (por ejemplo, C1000ABC).'
        : '',
    );
    setSummary(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validPostalCode || shipping === null) {
      setPostalError('Ingresá un código postal válido para calcular el envío.');
      postalCodeInput.current?.focus();
      return;
    }

    const formData = new FormData(event.currentTarget);
    setSummary({
      customer: {
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        street: String(formData.get('street') ?? ''),
        streetNumber: String(formData.get('streetNumber') ?? ''),
        apartment: String(formData.get('apartment') ?? ''),
        city: String(formData.get('city') ?? ''),
        province: String(formData.get('province') ?? ''),
        postalCode,
      },
      items: [...items],
      subtotal,
      shipping,
      total: subtotal + shipping,
    });
  }

  if (items.length === 0) {
    return (
      <main className="page cart-page">
        <header className="cart-heading">
          <h1>Tu carrito</h1>
          <p>Tu carrito está vacío.</p>
        </header>
        {storageError && <p className="cart-storage-error" role="alert">{storageError}</p>}
        <Link className="cart-continue-link" to="/precios">
          Explorar productos
        </Link>
      </main>
    );
  }

  return (
    <main className="page cart-page">
      <header className="cart-heading">
        <h1>Tu carrito</h1>
        <p>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
      </header>

      {storageError && <p className="cart-storage-error" role="alert">{storageError}</p>}

      <div className="cart-layout">
        <section className="cart-items" aria-label="Productos en el carrito">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={asset(`photos/${item.image}`)} alt="" />
              <div className="cart-item__details">
                <h2>{item.name}</h2>
                <p>{formatCurrency(item.unitPrice)} c/u</p>
                <div className="cart-item__controls">
                  <div
                    className="quantity-control"
                    role="group"
                    aria-label={`Cantidad de ${item.name}`}
                  >
                    <button
                      type="button"
                      aria-label={`Quitar una unidad de ${item.name}`}
                      disabled={item.quantity === 1}
                      onClick={() => {
                        setQuantity(item.id, item.quantity - 1);
                        setSummary(null);
                      }}
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Agregar una unidad de ${item.name}`}
                      onClick={() => {
                        setQuantity(item.id, item.quantity + 1);
                        setSummary(null);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-remove-button"
                    type="button"
                    onClick={() => {
                      removeItem(item.id);
                      setSummary(null);
                    }}
                  >
                    Quitar
                  </button>
                </div>
              </div>
              <p className="cart-item__total">
                {formatCurrency(item.unitPrice * item.quantity)}
              </p>
            </article>
          ))}
          <button
            className="cart-clear-button"
            type="button"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </section>

        <section className="delivery-panel">
          <h2>Datos de envío</h2>
          <p className="delivery-origin">
            Origen del despacho: Laborde, Córdoba (CP {shippingSettings.originPostalCode}).
          </p>

          <form className="delivery-form" onSubmit={handleSubmit} onChange={() => setSummary(null)}>
            <label>
              Nombre y apellido
              <input name="name" autoComplete="name" required />
            </label>
            <div className="delivery-form__row">
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Teléfono
                <input name="phone" type="tel" autoComplete="tel" required />
              </label>
            </div>
            <div className="delivery-form__row delivery-form__address">
              <label>
                Calle
                <input name="street" autoComplete="address-line1" required />
              </label>
              <label>
                Número
                <input name="streetNumber" required />
              </label>
            </div>
            <label>
              Piso, departamento u otra referencia <span>(opcional)</span>
              <input name="apartment" autoComplete="address-line2" />
            </label>
            <div className="delivery-form__row">
              <label>
                Localidad
                <input name="city" autoComplete="address-level2" required />
              </label>
              <label>
                Provincia
                <select name="province" autoComplete="address-level1" defaultValue="" required>
                  <option value="" disabled>Elegí una provincia</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="postal-code-field">
              Código postal
              <input
                ref={postalCodeInput}
                name="postalCode"
                autoComplete="postal-code"
                value={postalCode}
                maxLength={9}
                pattern="(?:[0-9]{4}|[A-Za-z][0-9]{4}[A-Za-z]{3})"
                aria-describedby="postal-code-help postal-code-error"
                onChange={(event) => handlePostalCodeChange(event.target.value)}
                required
              />
            </label>
            <p className="postal-code-help" id="postal-code-help">
              Aceptamos CP de 4 dígitos o CPA alfanumérico.
            </p>
            <p
              className={`postal-code-status${postalError ? ' has-error' : ''}`}
              id="postal-code-error"
              role="status"
              aria-live="polite"
            >
              {postalError ||
                (validPostalCode
                  ? `Envío configurado: ${formatCurrency(shippingSettings.flatRate)}`
                  : 'Ingresá tu CP para calcular el envío.')}
            </p>

            <div className="cart-totals" aria-live="polite">
              <p><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></p>
              <p>
                <span>Envío</span>
                <strong>{shipping === null ? 'A calcular' : formatCurrency(shipping)}</strong>
              </p>
              <p className="cart-totals__grand">
                <span>Total</span>
                <strong>
                  {shipping === null
                    ? 'A calcular'
                    : formatCurrency(subtotal + shipping)}
                </strong>
              </p>
            </div>

            <p className="shipping-rate-notice">
              El envío usa la tarifa fija configurada de {formatCurrency(shippingSettings.flatRate)}
              {' '}para todos los destinos; no consulta tarifas de un correo.
            </p>
            <button className="order-summary-button" type="submit">
              Generar resumen del pedido
            </button>
          </form>

          {summary && (
            <section className="order-summary" aria-live="polite">
              <h2>Resumen del pedido</h2>
              <p className="order-summary__notice">
                Este resumen queda en esta página: no envía el pedido ni procesa un pago.
              </p>
              <ul>
                {summary.items.map((item) => (
                  <li key={item.id}>
                    <span>{item.name} × {item.quantity}</span>
                    <strong>{formatCurrency(item.unitPrice * item.quantity)}</strong>
                  </li>
                ))}
              </ul>
              <dl>
                <div><dt>Subtotal</dt><dd>{formatCurrency(summary.subtotal)}</dd></div>
                <div><dt>Envío</dt><dd>{formatCurrency(summary.shipping)}</dd></div>
                <div className="order-summary__total">
                  <dt>Total</dt><dd>{formatCurrency(summary.total)}</dd>
                </div>
              </dl>
              <h3>Entrega</h3>
              <address>
                {summary.customer.name}<br />
                {summary.customer.street} {summary.customer.streetNumber}
                {summary.customer.apartment && <><br />{summary.customer.apartment}</>}<br />
                {summary.customer.city}, {summary.customer.province}<br />
                CP {summary.customer.postalCode}<br />
                {summary.customer.phone}<br />
                {summary.customer.email}
              </address>
            </section>
          )}
        </section>
      </div>

      <Link className="cart-continue-link" to="/precios">
        Seguir viendo productos
      </Link>
    </main>
  );
}
