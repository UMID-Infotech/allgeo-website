import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Package,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminEnquiries } from "@/services/enquiryService";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<<<<<<< HEAD
function AdminDashboard() {
  const [enquiries, setEnquiries] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getAdminEnquiries(1).then((result) => {
      if (active) setEnquiries(result);
    }).catch((requestError) => {
      if (active) setError(requestError.message);
    });
    return () => { active = false; };
  }, []);

  const dashboardCards = [
    { title: "Total Enquiries", value: enquiries?.total ?? "—", icon: Mail },
    { title: "Services", value: "—", icon: Settings },
    { title: "Products", value: "—", icon: Package },
  ];
=======
import { getAllEnquiries } from "@/services/enquiryService";
import { getAllServices } from "@/services/servicesRelatedService";

const followUpLabel = {
  none: "Not followed up",
  call: "Call",
  email: "Email",
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [servicesCount, setServicesCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      setIsLoading(true);
      setLoadError("");

      try {
        // Services is a public endpoint, so it loads even if the
        // enquiries call below fails for some reason.
        const [enquiriesResult, servicesResult] = await Promise.allSettled([
          getAllEnquiries(),
          getAllServices(),
        ]);

        if (!isMounted) return;

        if (enquiriesResult.status === "fulfilled") {
          setEnquiries(enquiriesResult.value);
        } else {
          setLoadError(
            enquiriesResult.reason?.message || "Unable to load enquiries."
          );
        }

        if (servicesResult.status === "fulfilled") {
          setServicesCount(servicesResult.value.length);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalEnquiries = enquiries.length;

  // An enquiry counts as "new" until the admin has logged a follow-up
  // action (call/email) against it.
  const newEnquiriesCount = enquiries.filter(
    (enquiry) => (enquiry.followUpType || "none") === "none"
  ).length;

  const recentEnquiries = enquiries.slice(0, 5);

  const dashboardCards = [
    {
      title: "Total Enquiries",
      value: isLoading ? "-" : String(totalEnquiries),
      icon: Mail,
    },
    {
      title: "New Enquiries",
      value: isLoading ? "-" : String(newEnquiriesCount),
      icon: MessageSquare,
    },
    {
      title: "Services",
      value: isLoading ? "-" : String(servicesCount),
      icon: Settings,
    },
    {
      title: "Products",
      value: "0",
      icon: Package,
    },
  ];

>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Welcome to AllGeo Solutions administration.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>

                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">
                  {item.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Enquiries</CardTitle>
        </CardHeader>

        <CardContent>
<<<<<<< HEAD
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          {!enquiries && !error && <p className="text-sm text-muted-foreground">Loading enquiries...</p>}
          {enquiries?.enquiries.length === 0 && <p className="text-sm text-muted-foreground">No enquiries available yet.</p>}
          {enquiries?.enquiries.slice(0, 5).map((enquiry) => (
            <div key={enquiry.id} className="flex flex-wrap justify-between gap-2 border-b py-3 text-sm">
              <span>{enquiry.name} · {enquiry.email}</span>
              <time dateTime={enquiry.createdAt} className="text-muted-foreground">{new Date(enquiry.createdAt).toLocaleString()}</time>
            </div>
          ))}
          {enquiries?.total > 0 && <Link to="/admin/enquiries" className="mt-4 inline-block text-sm text-blue-700 underline">View all enquiries</Link>}
=======
          {isLoading && (
            <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground">
                Loading enquiries...
              </p>
            </div>
          )}

          {!isLoading && loadError && (
            <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed">
              <p className="text-sm text-red-600">{loadError}</p>
            </div>
          )}

          {!isLoading && !loadError && recentEnquiries.length === 0 && (
            <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground">
                No enquiries available yet.
              </p>
            </div>
          )}

          {!isLoading && !loadError && recentEnquiries.length > 0 && (
            <div className="space-y-3">
              {recentEnquiries.map((enquiry) => (
                <button
                  key={enquiry._id}
                  type="button"
                  onClick={() => navigate("/admin/enquiries")}
                  className="flex w-full flex-col gap-2 rounded-lg border border-slate-200 p-4 text-left transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900">
                      {enquiry.name}{" "}
                      <span className="font-normal text-slate-400">
                        &middot; {enquiry.email}
                      </span>
                    </p>

                    <p className="mt-1 line-clamp-1 text-sm text-slate-600">
                      {enquiry.message}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                    <Badge variant={enquiry.isConnected ? "default" : "outline"}>
                      {enquiry.isConnected
                        ? "Connected"
                        : followUpLabel[enquiry.followUpType || "none"]}
                    </Badge>

                    <span className="text-xs text-slate-400">
                      {enquiry.createdAt
                        ? new Date(enquiry.createdAt).toLocaleString()
                        : ""}
                    </span>
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={() => navigate("/admin/enquiries")}
                className="w-full rounded-lg border border-dashed border-slate-300 py-2.5 text-center text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                View all enquiries
              </button>
            </div>
          )}
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
