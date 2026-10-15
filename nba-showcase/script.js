const toggleScores = document.querySelector("#toggleScores");
const scorePanel = document.querySelector(".score-panel");
const cheerButton = document.querySelector("#cheerButton");
const cheerMessage = document.querySelector("#cheerMessage");

toggleScores.addEventListener("click", () => {
  const isVisible = scorePanel.classList.toggle("visible");
  toggleScores.textContent = isVisible ? "收起比分" : "展开比分";
  toggleScores.setAttribute("aria-expanded", String(isVisible));
});

const cheers = [
  "全场一起：防守！防守！",
  "下一回合，拿下关键分！",
  "把主场的声浪传到场上！",
  "就是现在，冲击篮筐！",
];

cheerButton.addEventListener("click", () => {
  const nextCheer = cheers[Math.floor(Math.random() * cheers.length)];
  cheerMessage.textContent = nextCheer;
  cheerButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.06)" },
      { transform: "scale(1)" },
    ],
    { duration: 280, easing: "ease-out" }
  );
});
