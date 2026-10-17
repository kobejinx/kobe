import { useState } from "react";
import Card from "./Card";

const concepts = [
  {
    title: "组件",
    description: "把重复的界面封装成一个可复用的函数。",
    tag: "Component",
    color: "#2563eb",
  },
  {
    title: "Props",
    description: "通过属性，把不同的数据传给同一个组件。",
    tag: "Data",
    color: "#7c3aed",
  },
  {
    title: "State",
    description: "使用状态保存会变化的数据，让界面随之更新。",
    tag: "Interaction",
    color: "#db2777",
  },
];

function HomePage({ openGuide }) {
  return (
    <section className="home-page">
      <div className="hero">
        <p className="eyebrow">REACT PLAYGROUND</p>
        <h1>把界面拆成<br /><span>小而清晰的组件。</span></h1>
        <p>这是一个由 React 管理的双页面小站。点击下方卡片，可以切到学习页。</p>
        <button className="primary-button" type="button" onClick={openGuide}>
          打开组件学习页 <span>→</span>
        </button>
      </div>

      <section className="card-grid" aria-label="React 核心概念">
        {concepts.map((concept) => (
          <Card key={concept.title} {...concept} onSelect={openGuide} />
        ))}
      </section>
    </section>
  );
}

function GuidePage() {
  return (
    <section className="guide-page">
      <p className="eyebrow">PAGE 02 · COMPONENT GUIDE</p>
      <h1>一个组件，<span>多次使用。</span></h1>
      <p className="guide-intro">这三张卡片来自同一个 <code>Card</code> 组件，只是传入的 props 不同。</p>

      <div className="code-panel" aria-label="Card 组件调用示例">
        <span className="code-label">App.jsx</span>
        <pre>{`<Card
  title="组件"
  description="可复用的界面函数"
  color="#2563eb"
  onSelect={openGuide}
/>`}</pre>
      </div>

      <ol className="steps">
        <li><strong>定义组件</strong><span>在 <code>Card.jsx</code> 中写一个接收 props 的函数。</span></li>
        <li><strong>导入组件</strong><span>在 <code>App.jsx</code> 中用 import 引入它。</span></li>
        <li><strong>传入数据</strong><span>每次使用时传不同的 title、color 等属性。</span></li>
      </ol>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const isHome = page === "home";

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="logo" type="button" onClick={() => setPage("home")}>R<span>.</span></button>
        <nav aria-label="页面导航">
          <button className={isHome ? "active" : ""} type="button" onClick={() => setPage("home")}>组件卡片</button>
          <button className={!isHome ? "active" : ""} type="button" onClick={() => setPage("guide")}>学习页</button>
        </nav>
        <span className="page-count">0{isHome ? "1" : "2"} / 02</span>
      </header>

      <main>{isHome ? <HomePage openGuide={() => setPage("guide")} /> : <GuidePage />}</main>
    </div>
  );
}
