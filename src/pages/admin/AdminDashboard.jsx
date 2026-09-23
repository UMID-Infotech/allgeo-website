import {
  Mail,
  MessageSquare,
  Package,
  Settings,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dashboardCards = [
  {
    title: "Total Enquiries",
    value: "0",
    icon: Mail,
  },
  {
    title: "New Enquiries",
    value: "0",
    icon: MessageSquare,
  },
  {
    title: "Services",
    value: "0",
    icon: Settings,
  },
  {
    title: "Products",
    value: "0",
    icon: Package,
  },
];

function AdminDashboard() {
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
          <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              No enquiries available yet.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;