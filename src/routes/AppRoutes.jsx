import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import ComingSoonPage from "../pages/public/ComingSoonPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/about" element={<ComingSoonPage />} />
      <Route path="/services" element={<ComingSoonPage />} />
      <Route path="/services/:slug" element={<ComingSoonPage />} />
      <Route path="/products" element={<ComingSoonPage />} />
      <Route path="/products/:slug" element={<ComingSoonPage />} />
      <Route path="/projects" element={<ComingSoonPage />} />
      <Route path="/blog" element={<ComingSoonPage />} />
      <Route path="/blog/:slug" element={<ComingSoonPage />} />
      <Route path="/gallery" element={<ComingSoonPage />} />
      <Route path="/contact" element={<ComingSoonPage />} />

      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  );
}

export default AppRoutes;