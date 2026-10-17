export default function Card({ title, description, tag, color, onSelect }) {
  return (
    <article className="card" style={{ "--card-color": color }}>
      <span className="card-tag">{tag}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <button type="button" onClick={onSelect}>
        学习这个概念 →
      </button>
    </article>
  );
}
