import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {
  adjusterPack,
  bestSellers,
  cosmoComplements,
  cosmoEssentials,
  madeForYou,
  restSet,
} from '../data/site';

const catalog = [
  ...madeForYou,
  ...cosmoComplements,
  ...cosmoEssentials,
  ...bestSellers,
  adjusterPack,
  restSet,
];

/** Minúsculas y sin tildes, para que "corazon" encuentre "corazón". */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export default function HechosParaTiPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (params.has('buscar')) inputRef.current?.focus();
    // Solo al entrar desde el ícono de búsqueda del encabezado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const results = useMemo(
    () =>
      searching
        ? catalog.filter((product) => {
            const haystack = normalize([product.name, ...product.details].join(' '));
            return terms.every((term) => haystack.includes(term));
          })
        : [],
    // `terms` se deriva de `query`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query],
  );

  function updateQuery(value: string) {
    setParams(value ? { q: value } : {}, { replace: true });
  }

  return (
    <div className="page made-page">
      <header className="page-head">
        <h1>Hechos para ti</h1>
        <p>Diseños pensados para elevar tu día a día</p>
      </header>

      <div className="container">
        <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="buscador">
            Buscar productos
          </label>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="buscador"
            ref={inputRef}
            type="search"
            placeholder="Buscar en todo el catálogo: aros, anillo, pulsera…"
            value={query}
            autoComplete="off"
            onChange={(event) => updateQuery(event.target.value)}
          />
        </form>
        <p className="search-status" role="status" aria-live="polite">
          {searching
            ? `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'} para “${query.trim()}”`
            : ''}
        </p>

        {searching ? (
          results.length > 0 ? (
            <div className="product-grid">
              {results.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="search-empty">
              <p>No encontramos productos con esa búsqueda. Probá con otra palabra.</p>
              <button className="btn btn--ghost" type="button" onClick={() => updateQuery('')}>
                Ver todo el catálogo
              </button>
            </div>
          )
        ) : (
          <>
            <div className="product-grid">
              {madeForYou.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <section className="collection" aria-labelledby="complementos">
              <header className="collection__head">
                <h2 id="complementos">Complementos Cosmo</h2>
                <p>Pequeños accesorios para tu rutina diaria ✧</p>
              </header>
              <div className="product-grid">
                {cosmoComplements.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </section>

            <section className="collection" aria-labelledby="essentials">
              <header className="collection__head">
                <h2 id="essentials">Cosmo Essentials ✧</h2>
                <p>Diseño y funcionalidad para todos los días</p>
              </header>
              <div className="product-grid">
                {cosmoEssentials.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
