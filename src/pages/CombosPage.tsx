import AddToCartButton from '../components/AddToCartButton';
import { asset } from '../data/assets';
import { whatsappUrl } from '../data/contact';
import { formatCurrency } from '../data/pricing';
import { adjusterPack, adjusterPackRegularPrice, restSet } from '../data/site';

const variantImages = [
  '098c19d6337d9d02c2f545097a810f20.webp',
  'ec326ef008b90008d99b9c66dde42621.webp',
  'e79089c3fa271559e4d5e1258b61d6ca.webp',
];

export default function CombosPage() {
  const packPrice = adjusterPack.price ?? 0;
  const saving = adjusterPackRegularPrice - packPrice;

  return (
    <div className="page combos-page">
      <header className="page-head">
        <h1>Combos</h1>
        <p>¿Querés un conjunto más completo?</p>
      </header>

      <div className="container combos-layout">
        <article className="combo-card">
          <h2>Pack de 2 clips de ajuste</h2>
          <p className="combo-card__lede">
            Llevate el pack de 2 ajustadores y adaptá fácilmente distintos pantalones sin necesidad de
            coserlos.
          </p>
          <img
            className="combo-card__photo"
            src={asset('photos/db72809dd5a67c9ba8809f1c27208460.webp')}
            alt="Clips de ajuste colocados en los pantalones"
          />
          <ul className="swatches" aria-hidden="true">
            {variantImages.map((image) => (
              <li key={image}>
                <img src={asset(`photos/${image}`)} alt="" />
              </li>
            ))}
          </ul>
          <ul className="combo-card__details">
            {adjusterPack.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div className="combo-card__prices">
            <p className="combo-card__old">
              <span className="sr-only">Precio por separado: </span>
              {formatCurrency(adjusterPackRegularPrice)}
            </p>
            <p className="combo-card__price">{formatCurrency(packPrice)}</p>
            {saving > 0 && <p className="combo-card__saving">Ahorrás {formatCurrency(saving)}</p>}
          </div>
          <AddToCartButton product={adjusterPack} />
        </article>

        <article className="combo-card combo-card--bonus">
          <h2>Sumá el set de descanso por {formatCurrency(restSet.price)}</h2>
          <p className="combo-card__lede">
            Con tu compra, llevate un antifaz con scrunchie de seda anti-frizz a tono y bolsita de tela
            protectora. Completá tu rutina de descanso.
          </p>
          <div className="combo-gift-images">
            <img
              src={asset('photos/a5c1db9044ae518d77d36ca48c5b2c2b.webp')}
              alt="Antifaz rosa de seda"
              loading="lazy"
            />
            <img
              src={asset('photos/dec6f4d9b88c41d63b55e2dabc366c9d.webp')}
              alt="Scrunchie de seda rosa"
              loading="lazy"
            />
          </div>
          <a
            className="btn btn--ghost"
            href={whatsappUrl('Hola Cosmo! Quiero sumar el set de descanso (antifaz + scrunchie + bolsita) a mi compra.')}
            target="_blank"
            rel="noreferrer"
          >
            Pedir el set por WhatsApp
          </a>
        </article>
      </div>
    </div>
  );
}
