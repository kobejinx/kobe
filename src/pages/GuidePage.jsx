import { guideSteps, siteContent } from "../data/content";

export default function GuidePage() {
  const { guide } = siteContent;

  return (
    <section className="guide-page">
      <p className="eyebrow">{guide.eyebrow}</p>
      <h1>{guide.title}<span>{guide.highlight}</span></h1>
      <p className="guide-intro">{guide.description}</p>

      <div className="code-panel" aria-label="Card 组件调用示例">
        <span className="code-label">{guide.codeLabel}</span>
        <pre>{guide.codeExample}</pre>
      </div>

      <ol className="steps">
        {guideSteps.map((step) => (
          <li key={step.title}><strong>{step.title}</strong><span>{step.description}</span></li>
        ))}
      </ol>
    </section>
  );
}
