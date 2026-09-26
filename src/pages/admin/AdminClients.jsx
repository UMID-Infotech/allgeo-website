//src/pages/admin/AdminClients.jsx
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getAllClientsForAdmin } from "@/services/clientService";

function AdminClients() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState("");

  const loadClients = async () => {
    setIsLoading(true);
    setListError("");

    try {
      const data = await getAllClientsForAdmin();
      setClients(data);
    } catch (error) {
      setListError(error.message || "Unable to load clients.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the client logos shown on the public website.
          </p>
        </div>

        <Button type="button" onClick={() => navigate("/admin/clients/add")}>
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardContent>
          {isLoading && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Loading clients...
            </p>
          )}

          {!isLoading && listError && (
            <p className="py-6 text-center text-sm text-red-600">
              {listError}
            </p>
          )}

          {!isLoading && !listError && clients.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No clients added yet.
            </p>
          )}

          {!isLoading && !listError && clients.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-3">Logo</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Order</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Added On</th>
                  </tr>
                </thead>

                <tbody>
                  {clients.map((client) => (
                    <tr
                      key={client._id}
                      className="border-b border-slate-100 align-middle"
                    >
                      <td className="px-3 py-3">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="h-10 w-24 object-contain"
                        />
                      </td>

                      <td className="px-3 py-3 font-medium text-slate-900">
                        {client.name}
                      </td>

                      <td className="px-3 py-3 text-slate-500">
                        {client.order}
                      </td>

                      <td className="px-3 py-3">
                        <Badge variant={client.isActive ? "default" : "outline"}>
                          {client.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>

                      <td className="px-3 py-3 text-slate-500">
                        {client.createdAt
                          ? new Date(client.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminClients;