import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { asset } from '../data/assets';
import { whatsappUrl } from '../data/contact';
import { generateOrderNumber, saveOrder, type StoredOrder } from '../data/orders';
import { formatCurrency } from '../data/pricing';
import {
  calculateShipping,
  countries,
  isValidPostalCode,
  normalizePostalCode,
  parcelWeight,
  provinces,
  shippingSettings,
} from '../data/shipping';

function countryName(code: string): string {
  return countries.find((country) => country.code === code)?.name ?? code;
}

function buildOrderMessage(order: StoredOrder): string {
  const { customer } = order;
  const apartment = customer.apartment ? ` (${customer.apartment})` : '';
  const international = customer.countryCode !== 'AR';

  return [
    `Hola Cosmo! Quiero hacer este pedido (${order.number}):`,
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
    `${customer.city}, ${customer.province} — CP ${customer.postalCode}${international ? ` — ${countryName(customer.countryCode)}` : ''}`,
    `Tel: ${customer.phone}`,
    `Email: ${customer.email}`,
  ].join('\n');
}

export default function CartPage() {
  const { items, itemCount, storageError, removeItem, setQuantity, clearCart } = useCart();
  const [country, setCountry] = useState('AR');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalError, setPostalError] = useState('');
  const [formError, setFormError] = useState('');
  const [summary, setSummary] = useState<StoredOrder | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [copied, setCopied] = useState(false);
  const postalCodeInput = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  const isArgentina = country === 'AR';
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const parcelGrams = parcelWeight(items);
  const onlyBonusItems = items.length > 0 && items.every((item) => item.requiresPurchase);
  const validPostalCode = isValidPostalCode(country, postalCode);
  const quote = validPostalCode
    ? calculateShipping({
        countryCode: country,
        province: isArgentina ? province : undefined,
        weightGrams: parcelGrams,
        subtotal,
      })
    : null;
  const shipping = quote?.cost ?? null;
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

  function postalErrorFor(countryCode: string, value: string): string {
    if (!value || isValidPostalCode(countryCode, value)) return '';
    return countryCode === 'AR'
      ? 'Ingresá un CP de 4 dígitos o un CPA válido (por ejemplo, C1000ABC).'
      : 'Ingresá un código postal válido (3 a 12 letras, números o guiones).';
  }

  function handlePostalCodeChange(value: string) {
    const normalized = isArgentina ? normalizePostalCode(value) : value.toUpperCase();
    setPostalCode(normalized);
    setPostalError(postalErrorFor(country, normalized));
    setSummary(null);
  }

  function handleCountryChange(code: string) {
    setCountry(code);
    setProvince('');
    setPostalError(postalErrorFor(code, postalCode));
    setSummary(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');

    if (onlyBonusItems) {
      setFormError('El set de descanso se suma a una compra: agregá otro producto para continuar.');
      return;
    }
    if (!validPostalCode || !quote) {
      setPostalError(
        !validPostalCode
          ? 'Ingresá un código postal válido para calcular el envío.'
          : 'Elegí tu provincia para calcular el envío.',
      );
      postalCodeInput.current?.focus();
      return;
    }

    const formData = new FormData(event.currentTarget);
    const order: StoredOrder = {
      number: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      customer: {
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        street: String(formData.get('street') ?? ''),
        streetNumber: String(formData.get('streetNumber') ?? ''),
        apartment: String(formData.get('apartment') ?? ''),
        city: String(formData.get('city') ?? ''),
        province: isArgentina ? province : String(formData.get('province') ?? ''),
        countryCode: country,
        postalCode,
      },
      items: [...items],
      subtotal,
      shipping: quote.cost,
      total: subtotal + quote.cost,
    };
    saveOrder(order);
    setSummary(order);
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

  const statusText = postalError
    || (isArgentina && !province
      ? 'Elegí tu provincia para calcular el envío.'
      : !validPostalCode
        ? 'Ingresá tu código postal para calcular el envío.'
        : quote
          ? `${quote.zoneLabel} · paquete de ${quote.parcelGrams} g: ${quote.free ? 'envío gratis' : formatCurrency(quote.cost)}`
          : 'No pudimos calcular el envío para este destino.');

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
            {isArgentina ? (
              <>
                <p>
                  {missingForFreeShipping > 0
                    ? `Te faltan ${formatCurrency(missingForFreeShipping)} para el envío gratis.`
                    : '¡Tenés envío gratis!'}
                </p>
                <div className="free-shipping__bar" aria-hidden="true">
                  <span style={{ width: `${freeShippingProgress}%` }} />
                </div>
              </>
            ) : (
              <p>El envío gratis aplica solo a compras dentro de Argentina.</p>
            )}
          </div>
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={asset(`photos/${item.image}`)} alt="" />
              <div className="cart-item__details">
                <h2>{item.name}</h2>
                <p>{formatCurrency(item.unitPrice)} c/u</p>
                <div className="cart-item__controls">
                  <div className="quantity-control" role="group" aria-label={`Cantidad de ${item.name}`}>
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
              <p className="cart-item__total">{formatCurrency(item.unitPrice * item.quantity)}</p>
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
            Origen del despacho: {shippingSettings.originLabel} (CP {shippingSettings.originPostalCode}).
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
            <label>
              País
              <select
                name="country"
                autoComplete="country"
                value={country}
                onChange={(event) => handleCountryChange(event.target.value)}
                required
              >
                {countries.map((item) => (
                  <option key={item.code} value={item.code}>{item.name}</option>
                ))}
              </select>
            </label>
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
              <span className="label-text">Piso, departamento u otra referencia <em>(opcional)</em></span>
              <input name="apartment" autoComplete="address-line2" />
            </label>
            <div className="delivery-form__row">
              <label>
                Localidad
                <input name="city" autoComplete="address-level2" required />
              </label>
              {isArgentina ? (
                <label>
                  Provincia
                  <select
                    name="province"
                    autoComplete="address-level1"
                    value={province}
                    onChange={(event) => {
                      setProvince(event.target.value);
                      setPostalError('');
                    }}
                    required
                  >
                    <option value="" disabled>Elegí una provincia</option>
                    {provinces.map((item) => (
                      <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </label>
              ) : (
                <label>
                  Estado / región
                  <input name="province" autoComplete="address-level1" required />
                </label>
              )}
            </div>
            <label className="postal-code-field">
              Código postal
              <input
                ref={postalCodeInput}
                name="postalCode"
                autoComplete="postal-code"
                value={postalCode}
                maxLength={isArgentina ? 9 : 12}
                aria-describedby="postal-code-help postal-code-error"
                onChange={(event) => handlePostalCodeChange(event.target.value)}
                required
              />
            </label>
            <p className="postal-code-help" id="postal-code-help">
              {isArgentina
                ? 'Aceptamos CP de 4 dígitos o CPA alfanumérico.'
                : 'Ingresá el código postal de tu país.'}
            </p>
            <p
              className={`postal-code-status${postalError ? ' has-error' : ''}`}
              id="postal-code-error"
              role="status"
              aria-live="polite"
            >
              {statusText}
            </p>

            <div className="cart-totals" aria-live="polite">
              <p><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></p>
              <p>
                <span>Envío{quote ? ` (${quote.zoneLabel})` : ''}</span>
                <strong>{shipping === null ? 'A calcular' : shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</strong>
              </p>
              <p className="cart-totals__grand">
                <span>Total</span>
                <strong>{shipping === null ? 'A calcular' : formatCurrency(subtotal + shipping)}</strong>
              </p>
            </div>

            <p className="shipping-rate-notice">
              El costo depende del destino y del peso del paquete ({parcelGrams} g con embalaje).
              {isArgentina
                ? ` Gratis en Argentina desde ${formatCurrency(shippingSettings.freeShippingFrom)}.`
                : ' Los envíos internacionales no incluyen impuestos ni aranceles de aduana del país de destino.'}
            </p>
            {(formError || onlyBonusItems) && (
              <p className="form-error" role="alert">
                {formError || 'El set de descanso se suma a una compra: agregá otro producto para continuar.'}
              </p>
            )}
            <button className="btn btn--primary" type="submit">
              Generar resumen del pedido
            </button>
          </form>

          {summary && (
            <section className="order-summary" aria-live="polite" ref={summaryRef} tabIndex={-1}>
              <h2>Resumen del pedido</h2>
              <p className="order-number">
                Número de pedido <strong>{summary.number}</strong>
              </p>
              <p className="order-summary__notice">
                Guardá este número: lo vas a necesitar si querés{' '}
                <Link to="/devoluciones">pedir una devolución</Link>. Enviá el pedido por WhatsApp: se
                abre la conversación con todo ya escrito. El pedido no queda confirmado hasta que Cosmo
                te responda.
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
                CP {summary.customer.postalCode} · {countryName(summary.customer.countryCode)}<br />
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
