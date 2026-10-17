import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GuidePage from "../pages/GuidePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
