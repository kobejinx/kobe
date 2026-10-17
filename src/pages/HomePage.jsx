import { Link, useNavigate } from "react-router-dom";
import Card from "../Card";
import { concepts, siteContent } from "../data/content";

export default function HomePage() {
  const navigate = useNavigate();
  const { home } = siteContent;

  return (
    <section className="home-page">
      <div className="hero">
        <p className="eyebrow">{home.eyebrow}</p>
        <h1>{home.title}<br /><span>{home.highlight}</span></h1>
        <p>{home.description}</p>
        <Link className="primary-button" to="/guide">
          {home.button} <span>→</span>
        </Link>
      </div>

      <section className="card-grid" aria-label={home.cardsLabel}>
        {concepts.map((concept) => (
          <Card
            key={concept.title}
            {...concept}
            buttonLabel={home.cardButton}
            onSelect={() => navigate("/guide")}
          />
        ))}
      </section>
    </section>
  );
}
