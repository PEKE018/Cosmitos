import { brandPromises } from '../data/site';
import { asset } from '../data/assets';

export default function ValuesPage() {
  return (
    <main className="page values-page">
      <h1>Lo que nos define</h1>
      <div className="values-grid">
        {brandPromises.map((promise) => (
          <article className="value-card" key={promise.title}>
            <img src={asset(`icons/${promise.icon}`)} alt="" loading="lazy" />
            <p>{promise.title}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
