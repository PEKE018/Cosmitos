import { reviews } from '../data/site';
import { asset } from '../data/assets';

export default function ClientsPage() {
  return (
    <main className="page clients-page">
      <h1>Client Reviews</h1>
      <div className="reviews-list">
        {reviews.map((review) => (
          <article className="review" key={review.name}>
            <img src={asset(`photos/${review.image}`)} alt="" loading="lazy" />
            <div>
              <h2>{review.name}</h2>
              <p>{review.quote}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
