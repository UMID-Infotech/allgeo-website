// src/pages/admin/AdminProjects.jsx
import { useEffect, useState } from "react";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { resolveImageUrl } from "@/lib/imagekitUpload";
import { deleteProject, getProjectsForAdmin } from "@/services/projectService";

function AdminProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    getProjectsForAdmin()
      .then((data) => {
        if (isMounted) {
          setProjects(data);
          setListError("");
        }
      })
      .catch((error) => {
        if (isMounted) setListError(error.message || "Unable to load projects.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(project._id);

    try {
      await deleteProject(project._id);
      reload();
    } catch (error) {
      window.alert(error.message || "Unable to delete project.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the projects shown on the public website.
          </p>
        </div>

        <Button type="button" onClick={() => navigate("/admin/projects/add")}>
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      <Card>
        <CardContent>
          {isLoading && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Loading projects...
            </p>
          )}

          {!isLoading && listError && (
            <p className="py-6 text-center text-sm text-red-600">{listError}</p>
          )}

          {!isLoading && !listError && projects.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No projects added yet.
            </p>
          )}

          {!isLoading && !listError && projects.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-3">Image</th>
                    <th className="px-3 py-3">Title</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Added On</th>
                    <th className="px-3 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project._id}
                      className="border-b border-slate-100 align-middle"
                    >
                      <td className="px-3 py-3">
                        <img
                          src={resolveImageUrl(project.coverImage)}
                          alt={project.title}
                          className="h-12 w-20 rounded-md object-cover"
                        />
                      </td>

                      <td className="max-w-xs px-3 py-3 font-medium text-slate-900">
                        {project.title}
                      </td>

                      <td className="px-3 py-3">
                        <Badge
                          variant={project.isPublished ? "default" : "outline"}
                        >
                          {project.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </td>

                      <td className="px-3 py-3 text-slate-500">
                        {project.createdAt
                          ? new Date(project.createdAt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {project.isPublished && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(`/projects/${project.slug}`, "_blank")
                              }
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              View
                            </Button>
                          )}

                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            disabled={deletingId === project._id}
                            onClick={() => handleDelete(project)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {deletingId === project._id
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </div>
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

export default AdminProjects;