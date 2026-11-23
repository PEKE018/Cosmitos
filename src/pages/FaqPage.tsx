import { asset } from '../data/assets';
import { frequentlyAsked } from '../data/site';

export default function FaqPage() {
  return (
    <div className="page faq-page">
      <header className="page-head">
        <img className="page-head__icon" src={asset('icons/faq-01.svg')} alt="" />
        <h1>Preguntas frecuentes</h1>
      </header>
      <div className="container faq-list">
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
    </div>
  );
}
