import {
  Mail,
  Package,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminEnquiries } from "@/services/enquiryService";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
