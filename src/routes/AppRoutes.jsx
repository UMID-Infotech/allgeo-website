import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";
import HomePage from "../pages/public/HomePage";
import ComingSoonPage from "../pages/public/ComingSoonPage";
import ServiceDetailPage from "../pages/public/ServiceDetailPage";
import ProductPage from "../pages/public/ProductPage";
import ContactPage from "../pages/public/ContactPage";
import AboutPage from "../pages/public/AboutPage";
import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage";
import TermsConditionsPage from "../pages/public/TermsConditionsPage";

// Admin
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminEnquiries from "../pages/admin/AdminEnquiries";
import ProtectedAdminRoute from "../components/admin/ProtectedAdminRoute";
import AdminServices from "@/pages/admin/AdminServices";
import AdminClients from "@/pages/admin/AdminClients";
import AdminClientAdd from "@/pages/admin/AdminClientAdd";
import AdminEnquiries from "@/pages/admin/AdminEnquiries";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= ADMIN ================= */}

      {/* Public Admin Login */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* Protected Admin Area */}
      <Route element={<ProtectedAdminRoute />}>
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />
        <Route path="services" element={<AdminServices />} />
<<<<<<< HEAD
=======
        <Route path="clients" element={<AdminClients />} />
        <Route path="clients/add" element={<AdminClientAdd />} />
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
        <Route path="enquiries" element={<AdminEnquiries />} />
        </Route>
      </Route>

      {/* ============== PUBLIC WEBSITE ============== */}

      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/services/:slug"
          element={<ServiceDetailPage />}
        />

        <Route
          path="/product"
          element={<ProductPage />}
        />

        {/* Future Routes

        <Route
          path="/projects"
          element={<ComingSoonPage />}
        />

        <Route
          path="/blog"
          element={<ComingSoonPage />}
        />

        <Route
          path="/blog/:slug"
          element={<ComingSoonPage />}
        />

        <Route
          path="/gallery"
          element={<ComingSoonPage />}
        />

        */}

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicyPage />}
        />

        <Route
          path="/terms-and-conditions"
          element={<TermsConditionsPage />}
        />

        <Route
          path="*"
          element={<ComingSoonPage />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

// import { Navigate, Route, Routes } from "react-router-dom";

// import PublicLayout from "../components/layout/PublicLayout";
// import HomePage from "../pages/public/HomePage";
// import ComingSoonPage from "../pages/public/ComingSoonPage";
// import ServiceDetailPage from "../pages/public/ServiceDetailPage";
// import ProductPage from "../pages/public/ProductPage";
// import ContactPage from "../pages/public/ContactPage";
// import AboutPage from "../pages/public/AboutPage";
// import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage";
// import TermsConditionsPage from "../pages/public/TermsConditionsPage";

// // Admin
// import AdminLayout from "../layouts/AdminLayout";
// import AdminLogin from "../pages/admin/AdminLogin";
// import AdminDashboard from "../pages/admin/AdminDashboard";

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* ================= ADMIN ================= */}

//       <Route path="/admin/login" element={<AdminLogin />} />

//       <Route path="/admin" element={<AdminLayout />}>
//         <Route
//           index
//           element={<Navigate to="/admin/dashboard" replace />}
//         />

//         <Route
//           path="dashboard"
//           element={<AdminDashboard />}
//         />
//       </Route>

//       {/* ============== PUBLIC WEBSITE ============== */}

//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<HomePage />} />

//         <Route path="/about" element={<AboutPage />} />

//         <Route
//           path="/services/:slug"
//           element={<ServiceDetailPage />}
//         />

//         <Route path="/product" element={<ProductPage />} />

//         {/* Future Routes

//         <Route path="/projects" element={<ComingSoonPage />} />

//         <Route path="/blog" element={<ComingSoonPage />} />
//         <Route path="/blog/:slug" element={<ComingSoonPage />} />

//         <Route path="/gallery" element={<ComingSoonPage />} />

//         */}

//         <Route path="/contact" element={<ContactPage />} />

//         <Route
//           path="/privacy-policy"
//           element={<PrivacyPolicyPage />}
//         />

//         <Route
//           path="/terms-and-conditions"
//           element={<TermsConditionsPage />}
//         />

//         <Route path="*" element={<ComingSoonPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default AppRoutes;