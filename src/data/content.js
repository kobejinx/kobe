export const siteContent = {
  brand: "R.",
  navigation: {
    home: "组件卡片",
    guide: "学习页",
  },
  home: {
    eyebrow: "REACT PLAYGROUND",
    title: "把界面拆成",
    highlight: "小而清晰的组件。",
    description: "这是一个由 React 管理的双页面小站。点击下方卡片，可以切到学习页。",
    button: "打开组件学习页",
    cardsLabel: "React 核心概念",
    cardButton: "学习这个概念",
  },
  guide: {
    eyebrow: "PAGE 02 · COMPONENT GUIDE",
    title: "一个组件，",
    highlight: "多次使用。",
    description: "这三张卡片来自同一个 Card 组件，只是传入的 props 不同。",
    codeLabel: "App.jsx",
    codeExample: `<Card\n  title="组件"\n  description="可复用的界面函数"\n  color="#2563eb"\n  onSelect={openGuide}\n/>`,
  },
};

export const concepts = [
  { title: "组件", description: "把重复的界面封装成一个可复用的函数。", tag: "Component", color: "#2563eb" },
  { title: "Props", description: "通过属性，把不同的数据传给同一个组件。", tag: "Data", color: "#7c3aed" },
  { title: "State", description: "使用状态保存会变化的数据，让界面随之更新。", tag: "Interaction", color: "#db2777" },
];

export const guideSteps = [
  { title: "定义组件", description: "在 Card.jsx 中写一个接收 props 的函数。" },
  { title: "导入组件", description: "在 App.jsx 中用 import 引入它。" },
  { title: "传入数据", description: "每次使用时传不同的 title、color 等属性。" },
];
