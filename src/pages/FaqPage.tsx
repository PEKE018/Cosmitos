import { frequentlyAsked } from '../data/site';
import { asset } from '../data/assets';

export default function FaqPage() {
  return (
    <main className="page faq-page">
      <header className="faq-heading">
        <img src={asset('icons/faq-01.svg')} alt="" />
        <h1>PREGUNTAS FRECUENTES</h1>
      </header>
      <div className="faq-list">
        {frequentlyAsked.map((item) => (
          <article className="faq-item" key={item.question}>
            <img src={asset(`icons/${item.icon}`)} alt="" loading="lazy" />
            <div>
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
