import { asset } from '../data/assets';
import { reviews } from '../data/site';

export default function ClientsPage() {
  return (
    <div className="page clients-page">
      <header className="page-head">
        <h1>Opiniones de clientes</h1>
      </header>
      <div className="container reviews-list">
        {reviews.map((review) => (
          <figure className="review" key={review.name}>
            <img src={asset(`photos/${review.image}`)} alt="" loading="lazy" />
            <blockquote>{review.quote}</blockquote>
            <figcaption>{review.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
