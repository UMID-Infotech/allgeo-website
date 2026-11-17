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
import AdminBlogs from "@/pages/admin/AdminBlogs";
import AdminBlogAdd from "@/pages/admin/AdminBlogAdd";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminCategoryForm from "@/pages/admin/AdminCategoryForm";
import BlogListPage from "@/pages/public/BlogListPage";
import BlogDetailPage from "@/pages/public/BlogDetailPage";

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
        <Route path="clients" element={<AdminClients />} />
        <Route path="clients/add" element={<AdminClientAdd />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="blogs/add" element={<AdminBlogAdd />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="categories/add" element={<AdminCategoryForm />} />
        <Route path="categories/edit/:id" element={<AdminCategoryForm />} />
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

        <Route
          path="/blog"
          element={<BlogListPage />}
        />

        <Route
          path="/blog/:slug"
          element={<BlogDetailPage />}
        />

        {/* Future Routes

        <Route
          path="/projects"
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