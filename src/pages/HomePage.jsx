import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../Card";
import { concepts, siteContent } from "../data/content";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

export default function HomePage() {
  const navigate = useNavigate();
  const { home } = siteContent;
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiBaseUrl}/profile`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("请求个人资料失败");
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError("暂时无法连接后端，请确认 FastAPI 正在运行。");
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="home-page">
      <div className="hero">
        <p className="eyebrow">{home.eyebrow}</p>
        <h1>
          {profile ? profile.heroTitle : "正在加载..."}
          <br />
          <span>{home.highlight}</span>
        </h1>
        <p>{error || profile?.heroSubtitle || "正在从 FastAPI 获取主页信息..."}</p>
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
