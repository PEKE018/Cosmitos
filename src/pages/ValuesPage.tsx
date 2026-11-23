import { asset } from '../data/assets';
import { brandPromises } from '../data/site';

export default function ValuesPage() {
  return (
    <div className="page values-page">
      <header className="page-head">
        <h1>Lo que nos define</h1>
      </header>
      <div className="container values-grid">
        {brandPromises.map((promise) => (
          <article className="value-card" key={promise.title}>
            <img src={asset(`icons/${promise.icon}`)} alt="" loading="lazy" />
            <h2>{promise.title}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}
