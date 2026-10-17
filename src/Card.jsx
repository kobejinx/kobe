export default function Card({ title, description, tag, color, buttonLabel, onSelect }) {
  return (
    <article className="card" style={{ "--card-color": color }}>
      <span className="card-tag">{tag}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <button type="button" onClick={onSelect}>
        {buttonLabel} →
      </button>
    </article>
  );
}
