import { asset } from '../data/assets';
import { adjusterPack } from '../data/site';
import AddToCartButton from '../components/AddToCartButton';

export default function CombosPage() {
  return (
    <main className="page combos-page">
      <section className="combo-intro">
        <h1>Combos</h1>
        <p className="combo-question">¿Queres un conjunto mas completo?</p>
        <p className="combo-description">
          Llévate el pack de 2 ajustadores y adapta fácilmente distintos pantalones sin
          necesidad de coserlos.
        </p>
        <article className="combo-product">
          <h2>Clip de ajuste</h2>
          <img
            src={asset('photos/db72809dd5a67c9ba8809f1c27208460.png')}
            alt="Clips de ajuste colocados en los pantalones"
          />
          <div className="combo-variants" aria-hidden="true">
            <img src={asset('photos/098c19d6337d9d02c2f545097a810f20.png')} alt="" />
            <img src={asset('photos/ec326ef008b90008d99b9c66dde42621.png')} alt="" />
            <img src={asset('photos/e79089c3fa271559e4d5e1258b61d6ca.png')} alt="" />
          </div>
          <p className="combo-count">2 x $2,500</p>
          <ul>
            <li>Material de poliéster</li>
            <li>Color: rosa, negro,champán</li>
          </ul>
          <p className="combo-old-price">$5,000</p>
          <p className="combo-price">{adjusterPack.price}</p>
          <AddToCartButton product={adjusterPack} />
        </article>
        <p className="combo-bonus">Con 1 compra + $3,000 te llevas</p>
        <article className="combo-bonus-card">
          <div className="combo-gift-images">
            <img
              src={asset('photos/dec6f4d9b88c41d63b55e2dabc366c9d.png')}
              alt="Scrunchie de seda"
              loading="lazy"
            />
            <img
              src={asset('photos/a5c1db9044ae518d77d36ca48c5b2c2b.png')}
              alt="Antifaz"
              loading="lazy"
            />
          </div>
          <div>
            <h2>Antifaz</h2>
            <p>Scrunchie de seda anti-frizz a tono +bolsita de tela protectora</p>
            <h3>Complementos Cosmo</h3>
            <p>Completá tu rutina de descanso!!!</p>
          </div>
        </article>
        <div className="combo-options" aria-label="Opciones de pack">
          <p>Llevar pack➔</p>
          <p>Producto actual</p>
          <p>1 par de ajustadores</p>
          <p>Mejor opción</p>
          <p>Pack de 2 pares</p>
        </div>
        <p className="combo-more">ficha de producto</p>
      </section>
    </main>
  );
}
