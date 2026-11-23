import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCart, type CartItem } from '../context/CartContext';
import { asset } from '../data/assets';
import { whatsappUrl } from '../data/contact';
import { formatCurrency } from '../data/pricing';
import {
  isValidArgentinePostalCode,
  normalizePostalCode,
  shippingCost,
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

function buildOrderMessage(order: OrderSummary): string {
  const { customer } = order;
  const apartment = customer.apartment ? ` (${customer.apartment})` : '';

  return [
    'Hola Cosmo! Quiero hacer este pedido:',
    '',
    ...order.items.map(
      (item) => `• ${item.name} × ${item.quantity} — ${formatCurrency(item.unitPrice * item.quantity)}`,
    ),
    '',
    `Subtotal: ${formatCurrency(order.subtotal)}`,
    `Envío: ${order.shipping === 0 ? 'Gratis' : formatCurrency(order.shipping)}`,
    `Total: ${formatCurrency(order.total)}`,
    '',
    'Datos de entrega:',
    customer.name,
    `${customer.street} ${customer.streetNumber}${apartment}`,
    `${customer.city}, ${customer.province} — CP ${customer.postalCode}`,
    `Tel: ${customer.phone}`,
    `Email: ${customer.email}`,
  ].join('\n');
}

export default function CartPage() {
  const { items, itemCount, storageError, removeItem, setQuantity, clearCart } =
    useCart();
  const [postalCode, setPostalCode] = useState('');
  const [postalError, setPostalError] = useState('');
  const [summary, setSummary] = useState<OrderSummary | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [copied, setCopied] = useState(false);
  const postalCodeInput = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  const subtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  const validPostalCode = isValidArgentinePostalCode(postalCode);
  const shipping = validPostalCode ? shippingCost(subtotal) : null;
  const missingForFreeShipping = Math.max(0, shippingSettings.freeShippingFrom - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / shippingSettings.freeShippingFrom) * 100);

  useEffect(() => {
    if (summary) summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [summary]);

  useEffect(() => {
    if (!confirmClear) return;
    const timer = window.setTimeout(() => setConfirmClear(false), 4000);
    return () => window.clearTimeout(timer);
  }, [confirmClear]);

  async function copySummary() {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(buildOrderMessage(summary));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

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
      <div className="page cart-page">
        <header className="cart-heading">
          <h1>Tu carrito</h1>
          <p>Tu carrito está vacío.</p>
        </header>
        {storageError && <p className="cart-storage-error" role="alert">{storageError}</p>}
        <Link className="btn btn--primary cart-continue-link" to="/hechos-para-ti">
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <header className="cart-heading">
        <h1>Tu carrito</h1>
        <p>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
      </header>

      {storageError && <p className="cart-storage-error" role="alert">{storageError}</p>}

      <div className="cart-layout">
        <section className="cart-items" aria-label="Productos en el carrito">
          <div className="free-shipping">
            <p>
              {missingForFreeShipping > 0
                ? `Te faltan ${formatCurrency(missingForFreeShipping)} para el envío gratis.`
                : '¡Tenés envío gratis!'}
            </p>
            <div className="free-shipping__bar" aria-hidden="true">
              <span style={{ width: `${freeShippingProgress}%` }} />
            </div>
          </div>
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
            onClick={() => {
              if (!confirmClear) {
                setConfirmClear(true);
                return;
              }
              clearCart();
              setConfirmClear(false);
              setSummary(null);
            }}
          >
            {confirmClear ? '¿Seguro? Tocá de nuevo para vaciar' : 'Vaciar carrito'}
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
                  ? shipping === 0
                    ? 'Envío gratis en este pedido.'
                    : `Envío a todo el país: ${formatCurrency(shippingSettings.flatRate)}`
                  : 'Ingresá tu CP para calcular el envío.')}
            </p>

            <div className="cart-totals" aria-live="polite">
              <p><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></p>
              <p>
                <span>Envío</span>
                <strong>{shipping === null ? 'A calcular' : shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</strong>
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
              El envío tiene una tarifa fija de {formatCurrency(shippingSettings.flatRate)} a todo el país
              {' '}y es gratis desde {formatCurrency(shippingSettings.freeShippingFrom)}.
            </p>
            <button className="btn btn--primary" type="submit">
              Generar resumen del pedido
            </button>
          </form>

          {summary && (
            <section className="order-summary" aria-live="polite" ref={summaryRef} tabIndex={-1}>
              <h2>Resumen del pedido</h2>
              <p className="order-summary__notice">
                Revisá los datos y enviá el pedido por WhatsApp: se abre la conversación con el pedido
                ya escrito. El pedido no queda confirmado hasta que Cosmo te responda.
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
                <div><dt>Envío</dt><dd>{summary.shipping === 0 ? 'Gratis' : formatCurrency(summary.shipping)}</dd></div>
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
              <div className="order-actions">
                <a
                  className="btn btn--primary"
                  href={whatsappUrl(buildOrderMessage(summary))}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enviar pedido por WhatsApp
                </a>
                <button className="btn btn--ghost" type="button" onClick={copySummary}>
                  {copied ? 'Copiado ✓' : 'Copiar resumen'}
                </button>
              </div>
            </section>
          )}
        </section>
      </div>

      <Link className="cart-continue-link" to="/hechos-para-ti">
        Seguir viendo productos
      </Link>
    </div>
  );
}
