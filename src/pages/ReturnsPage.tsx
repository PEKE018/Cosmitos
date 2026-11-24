import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { whatsappUrl } from '../data/contact';
import { findOrder, normalizeOrderNumber } from '../data/orders';
import { formatCurrency } from '../data/pricing';
import {
  calculateShipping,
  countries,
  provinces,
  returnPolicy,
  shippingSettings,
} from '../data/shipping';

const reasons = [
  { value: 'defectuoso', label: 'Llegó con un defecto' },
  { value: 'distinto', label: 'Es distinto a lo que pedí' },
  { value: 'arrepentimiento', label: 'Me arrepentí de la compra' },
  { value: 'otro', label: 'Otro motivo' },
];

const solutions = ['Cambio por otro producto', 'Reintegro del dinero', 'Cupón para una próxima compra'];

const returnsKey = 'cosmo-returns-v1';

type Errors = Partial<Record<string, string>>;

type Result = {
  code: string;
  message: string;
  cost: number | null;
  zoneLabel: string;
};

function saveReturn(entry: Record<string, unknown>) {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(returnsKey) ?? '[]');
    const list = Array.isArray(parsed) ? parsed : [];
    window.localStorage.setItem(returnsKey, JSON.stringify([entry, ...list].slice(0, 30)));
  } catch {
    // Sin almacenamiento: la solicitud igual se puede enviar por WhatsApp.
  }
}

export default function ReturnsPage() {
  const [orderInput, setOrderInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [product, setProduct] = useState('');
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [solution, setSolution] = useState('');
  const [country, setCountry] = useState('AR');
  const [province, setProvince] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Result | null>(null);

  const orderNumber = normalizeOrderNumber(orderInput);
  const order = useMemo(() => (orderNumber ? findOrder(orderNumber) : null), [orderNumber]);

  // Al reconocer el pedido se completan los datos que el cliente todavía no escribió.
  useEffect(() => {
    if (!order) return;
    setName((current) => current || order.customer.name);
    setEmail((current) => current || order.customer.email);
    setWhatsapp((current) => current || order.customer.phone);
    setProduct('');
  }, [order]);

  const destinationCountry = order ? order.customer.countryCode : country;
  const destinationProvince = order ? order.customer.province : province;
  const selectedItem = order?.items.find((item) => item.id === product);
  const productGrams = selectedItem?.weightGrams ?? shippingSettings.defaultItemGrams;
  const quote = calculateShipping({
    countryCode: destinationCountry,
    province: destinationProvince,
    weightGrams: productGrams + shippingSettings.packagingGrams,
  });
  const customerPays = returnPolicy.customerPaysFor.includes(reason);

  function clearError(field: string) {
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }

  function validate(): Errors {
    const found: Errors = {};
    if (name.trim().length < 3) found.name = 'Escribí tu nombre y apellido.';
    if (!orderNumber) found.order = 'Ingresá un número de pedido válido, por ejemplo CS-104213.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) found.email = 'Ingresá un email válido.';
    const wa = whatsapp.trim();
    if (wa !== '' && !/^[\d\s()+-]{8,}$/.test(wa)) found.whatsapp = 'Revisá el número de WhatsApp.';
    if (order ? !selectedItem : product.trim().length < 2) found.product = 'Indicá qué producto querés devolver.';
    if (!reason) found.reason = 'Elegí un motivo.';
    if (details.trim().length < 10) found.details = 'Contanos un poco más (mínimo 10 caracteres).';
    if (!solution) found.solution = 'Elegí qué preferís.';
    if (!order && country === 'AR' && !province) found.destination = 'Elegí tu provincia para calcular el envío.';
    return found;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    const firstKey = Object.keys(found).find((key) => found[key]);
    if (firstKey) {
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    const code = `DEV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const productName = selectedItem?.name ?? product.trim();
    const reasonLabel = reasons.find((item) => item.value === reason)?.label ?? reason;
    const countryLabel = countries.find((item) => item.code === destinationCountry)?.name ?? destinationCountry;
    const shippingLine = quote
      ? `Envío de la devolución: ${formatCurrency(quote.cost)} (${quote.zoneLabel}) — ${customerPays ? 'a cargo del cliente' : 'a cargo de Cosmo'}`
      : 'Envío de la devolución: a calcular';

    const message = [
      `Hola Cosmo! Quiero pedir una devolución (${code}).`,
      '',
      `Pedido: ${orderNumber}`,
      `Producto: ${productName}`,
      `Motivo: ${reasonLabel}`,
      `Detalle: ${details.trim()}`,
      `Prefiero: ${solution}`,
      '',
      shippingLine,
      '',
      `Nombre: ${name.trim()}`,
      `Email: ${email.trim()}`,
      whatsapp.trim() ? `WhatsApp: ${whatsapp.trim()}` : '',
      `Destino: ${destinationProvince ? `${destinationProvince}, ` : ''}${countryLabel}`,
      reason === 'defectuoso' ? '\n(Te adjunto una foto del defecto en este chat.)' : '',
    ]
      .filter((line, index, all) => line !== '' || (index > 0 && all[index - 1] !== ''))
      .join('\n');

    saveReturn({
      code,
      createdAt: new Date().toISOString(),
      order: orderNumber,
      product: productName,
      reason,
      solution,
      shipping: quote?.cost ?? null,
    });
    setResult({ code, message, cost: quote?.cost ?? null, zoneLabel: quote?.zoneLabel ?? '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    setOrderInput('');
    setName('');
    setEmail('');
    setWhatsapp('');
    setProduct('');
    setReason('');
    setDetails('');
    setSolution('');
    setCountry('AR');
    setProvince('');
    setErrors({});
    setResult(null);
  }

  if (result) {
    return (
      <div className="page returns-page">
        <header className="page-head">
          <h1>Solicitud lista</h1>
          <p>Un último paso: enviála por WhatsApp para que Cosmo la reciba.</p>
        </header>
        <div className="container returns-container">
          <section className="return-done" aria-live="polite">
            <p>Guardá tu código de seguimiento:</p>
            <p className="return-code">{result.code}</p>
            {result.cost !== null && (
              <p className="return-done__cost">
                Envío de la devolución: <strong>{formatCurrency(result.cost)}</strong> ({result.zoneLabel}){' '}
                {customerPays ? '· a tu cargo' : '· lo cubre Cosmo'}
              </p>
            )}
            <p className="hint">Respondemos en 48 horas hábiles.</p>
            <div className="order-actions">
              <a className="btn btn--primary" href={whatsappUrl(result.message)} target="_blank" rel="noreferrer">
                Enviar solicitud por WhatsApp
              </a>
              <button className="btn btn--ghost" type="button" onClick={reset}>
                Hacer otra solicitud
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const describedBy = (field: string) => (errors[field] ? `err-${field}` : undefined);
  const orderIsKnownFormat = Boolean(orderNumber);

  return (
    <div className="page returns-page">
      <header className="page-head">
        <h1>Devolver un producto</h1>
        <p>
          Completá el formulario y te respondemos en 48 horas hábiles. Tenés {returnPolicy.windowDays} días
          desde la entrega para pedir la devolución.
        </p>
      </header>

      <div className="container returns-container">
        <form className="delivery-form returns-form" onSubmit={handleSubmit} noValidate>
          <div className="delivery-form__row">
            <label htmlFor="field-name">
              Nombre y apellido
              <input
                id="field-name"
                value={name}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={describedBy('name')}
                onChange={(event) => { setName(event.target.value); clearError('name'); }}
              />
              <span className="field-error" id="err-name">{errors.name}</span>
            </label>
            <label htmlFor="field-order">
              Número de pedido
              <input
                id="field-order"
                value={orderInput}
                placeholder="Ej: CS-104213"
                aria-invalid={Boolean(errors.order)}
                aria-describedby={`hint-order${errors.order ? ' err-order' : ''}`}
                onChange={(event) => { setOrderInput(event.target.value); clearError('order'); }}
              />
              <span className="field-error" id="err-order">{errors.order}</span>
            </label>
          </div>
          <p className={`field-hint${order ? ' is-ok' : ''}`} id="hint-order" role="status">
            {order
              ? `Pedido encontrado: ${new Date(order.createdAt).toLocaleDateString('es-AR')} · ${order.items.length} ${order.items.length === 1 ? 'producto' : 'productos'}.`
              : orderIsKnownFormat
                ? 'No encontramos este pedido en este dispositivo. Completá el destino más abajo.'
                : 'Lo encontrás en el resumen de tu compra y en el mensaje que nos enviaste.'}
          </p>

          <div className="delivery-form__row">
            <label htmlFor="field-email">
              Email
              <input
                id="field-email"
                type="email"
                value={email}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy('email')}
                onChange={(event) => { setEmail(event.target.value); clearError('email'); }}
              />
              <span className="field-error" id="err-email">{errors.email}</span>
            </label>
            <label htmlFor="field-whatsapp">
              <span className="label-text">WhatsApp <em>(opcional)</em></span>
              <input
                id="field-whatsapp"
                type="tel"
                value={whatsapp}
                autoComplete="tel"
                placeholder="351 555 1234"
                aria-invalid={Boolean(errors.whatsapp)}
                aria-describedby={describedBy('whatsapp')}
                onChange={(event) => { setWhatsapp(event.target.value); clearError('whatsapp'); }}
              />
              <span className="field-error" id="err-whatsapp">{errors.whatsapp}</span>
            </label>
          </div>

          <label htmlFor="field-product">
            Producto a devolver
            {order ? (
              <select
                id="field-product"
                value={product}
                aria-invalid={Boolean(errors.product)}
                aria-describedby={describedBy('product')}
                onChange={(event) => { setProduct(event.target.value); clearError('product'); }}
              >
                <option value="">Elegí un producto de tu pedido</option>
                {order.items.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            ) : (
              <input
                id="field-product"
                value={product}
                placeholder="Ej: Pulsera"
                aria-invalid={Boolean(errors.product)}
                aria-describedby={describedBy('product')}
                onChange={(event) => { setProduct(event.target.value); clearError('product'); }}
              />
            )}
            <span className="field-error" id="err-product">{errors.product}</span>
          </label>

          {!order && (
            <div className="delivery-form__row">
              <label htmlFor="field-country">
                País de la devolución
                <select
                  id="field-country"
                  value={country}
                  onChange={(event) => { setCountry(event.target.value); setProvince(''); }}
                >
                  {countries.map((item) => (
                    <option key={item.code} value={item.code}>{item.name}</option>
                  ))}
                </select>
              </label>
              {country === 'AR' && (
                <label htmlFor="field-destination">
                  Provincia
                  <select
                    id="field-destination"
                    value={province}
                    aria-invalid={Boolean(errors.destination)}
                    aria-describedby={describedBy('destination')}
                    onChange={(event) => { setProvince(event.target.value); clearError('destination'); }}
                  >
                    <option value="">Elegí una provincia</option>
                    {provinces.map((item) => (
                      <option key={item.name} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                  <span className="field-error" id="err-destination">{errors.destination}</span>
                </label>
              )}
            </div>
          )}

          <fieldset className="opts-group" aria-describedby={describedBy('reason')}>
            <legend>Motivo de la devolución</legend>
            <div className="opts" id="field-reason" tabIndex={-1}>
              {reasons.map((item) => (
                <label className="opt" key={item.value}>
                  <input
                    type="radio"
                    name="motivo"
                    value={item.value}
                    checked={reason === item.value}
                    onChange={() => { setReason(item.value); clearError('reason'); }}
                  />
                  {item.label}
                </label>
              ))}
            </div>
            <span className="field-error" id="err-reason">{errors.reason}</span>
          </fieldset>

          <label htmlFor="field-details">
            Contanos qué pasó
            <textarea
              id="field-details"
              value={details}
              maxLength={500}
              aria-invalid={Boolean(errors.details)}
              aria-describedby={`count-details${errors.details ? ' err-details' : ''}`}
              onChange={(event) => { setDetails(event.target.value); clearError('details'); }}
            />
            <span className="field-hint" id="count-details">{details.length}/500 caracteres</span>
            <span className="field-error" id="err-details">{errors.details}</span>
          </label>

          <label htmlFor="field-solution">
            ¿Qué preferís?
            <select
              id="field-solution"
              value={solution}
              aria-invalid={Boolean(errors.solution)}
              aria-describedby={describedBy('solution')}
              onChange={(event) => { setSolution(event.target.value); clearError('solution'); }}
            >
              <option value="">Elegí una opción</option>
              {solutions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <span className="field-error" id="err-solution">{errors.solution}</span>
          </label>

          <div className="return-quote" aria-live="polite">
            <p className="return-quote__title">Costo del envío de la devolución</p>
            {quote ? (
              <>
                <p className="return-quote__amount">
                  {formatCurrency(quote.cost)} <span>· {quote.zoneLabel}</span>
                </p>
                <p className="hint">
                  Calculado con el mismo criterio que las compras (destino y peso: {quote.parcelGrams} g con
                  embalaje).{' '}
                  {customerPays
                    ? 'En este caso corre por tu cuenta.'
                    : 'Lo cubre Cosmo, así que no pagás nada por devolver.'}
                </p>
              </>
            ) : (
              <p className="hint">
                {order
                  ? 'Elegí el producto para ver el costo.'
                  : 'Elegí el país y la provincia para ver el costo.'}
              </p>
            )}
          </div>

          <p className="hint">
            Si el producto llegó con un defecto, adjuntá una foto cuando nos escribas por WhatsApp: ayuda
            mucho.
          </p>
          <button className="btn btn--primary" type="submit">
            Preparar solicitud
          </button>
        </form>
        <p className="returns-footnote">
          ¿Todavía no tenés número de pedido? Se genera al armar tu compra en el{' '}
          <Link to="/carrito">carrito</Link>.
        </p>
      </div>
    </div>
  );
}
