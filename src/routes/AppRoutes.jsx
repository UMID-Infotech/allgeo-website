import { Route, Routes } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";
import HomePage from "../pages/public/HomePage";
import ComingSoonPage from "../pages/public/ComingSoonPage";
import ServiceDetailPage from "../pages/public/ServiceDetailPage";
import ProductPage from "../pages/public/ProductPage";
import ContactPage from "../pages/public/ContactPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<ComingSoonPage />} />

        <Route
          path="/services/:slug"
          element={<ServiceDetailPage />}
        />

        <Route path="/product" element={<ProductPage />} />
        <Route path="/projects" element={<ComingSoonPage />} />

        <Route path="/blog" element={<ComingSoonPage />} />
        <Route path="/blog/:slug" element={<ComingSoonPage />} />

        <Route path="/gallery" element={<ComingSoonPage />} />
       <Route path="/contact" element={<ContactPage />} />

        <Route path="*" element={<ComingSoonPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

// import { Route, Routes } from "react-router-dom";
// import HomePage from "../pages/public/HomePage";
// import ComingSoonPage from "../pages/public/ComingSoonPage";
// import ServiceDetailPage from "../pages/public/ServiceDetailPage";
// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />

//       <Route path="/about" element={<ComingSoonPage />} />
// <Route path="/services/:slug" element={<ServiceDetailPage />} />
//       <Route path="/products" element={<ComingSoonPage />} />
//       <Route path="/products/:slug" element={<ComingSoonPage />} />
//       <Route path="/projects" element={<ComingSoonPage />} />
//       <Route path="/blog" element={<ComingSoonPage />} />
//       <Route path="/blog/:slug" element={<ComingSoonPage />} />
//       <Route path="/gallery" element={<ComingSoonPage />} />
//       <Route path="/contact" element={<ComingSoonPage />} />

//       <Route path="*" element={<ComingSoonPage />} />
//     </Routes>
//   );
// }

// export default AppRoutes;