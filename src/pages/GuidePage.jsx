import { useState } from "react";
import { guideSteps, siteContent } from "../data/content";

export default function GuidePage() {
  const { guide } = siteContent;
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "情感分析失败");
      }

      setResult(data);
    } catch (requestError) {
      setError(requestError.message || "暂时无法连接后端");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="guide-page">
      <p className="eyebrow">{guide.eyebrow}</p>
      <h1>{guide.title}<span>{guide.highlight}</span></h1>
      <p className="guide-intro">{guide.description}</p>

      <section className="sentiment-tool" aria-labelledby="sentiment-title">
        <div>
          <p className="eyebrow">POST API DEMO</p>
          <h2 id="sentiment-title">输入文字，获取情感值</h2>
          <p className="tool-description">
            后端会返回 -1 到 1 的分数，以及积极、中性或消极的判断。
          </p>
        </div>

        <form className="sentiment-form" onSubmit={handleSubmit}>
          <label htmlFor="sentiment-text">想分析的文字</label>
          <textarea
            id="sentiment-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="例如：今天的学习很开心，收获很大。"
            maxLength={2000}
            required
          />
          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "分析中..." : "开始分析"}
          </button>
        </form>

        {error && <p className="sentiment-error">{error}</p>}
        {result && (
          <div className="sentiment-result" role="status">
            <span className="result-label">{result.label}</span>
            <strong>{result.score.toFixed(2)}</strong>
            <span>
              积极词 {result.positive_count} 个，消极词 {result.negative_count} 个
            </span>
          </div>
        )}
      </section>

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
