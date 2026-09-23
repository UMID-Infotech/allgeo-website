import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getAdminProfile } from "@/services/adminAuthService";

function ProtectedAdminRoute() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    const verifyAdmin = async () => {
      try {
        await getAdminProfile();

        if (active) {
          setStatus("authenticated");
        }
      } catch {
        if (active) {
          setStatus("unauthenticated");
        }
      }
    };

    verifyAdmin();

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-white" />

          <p className="mt-4 text-sm text-slate-300">
            Verifying admin session...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;