import { NavLink, useLocation } from "react-router-dom";
import AppRoutes from "./router";
import { siteContent } from "./data/content";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname !== "/guide";
  const { brand, navigation } = siteContent;

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="logo" to="/">{brand.slice(0, 1)}<span>{brand.slice(1)}</span></NavLink>
        <nav aria-label="页面导航">
          <NavLink end to="/">{navigation.home}</NavLink>
          <NavLink to="/guide">{navigation.guide}</NavLink>
        </nav>
        <span className="page-count">0{isHome ? "1" : "2"} / 02</span>
      </header>

      <main>
        <AppRoutes />
      </main>
    </div>
  );
}
