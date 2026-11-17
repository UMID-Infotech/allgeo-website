// src/pages/admin/AdminBlogs.jsx
import { useEffect, useState } from "react";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { deleteBlog, getBlogsForAdmin } from "@/services/blogService";
import { resolveImageUrl } from "@/lib/imagekitUpload";

function AdminBlogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    getBlogsForAdmin()
      .then((data) => {
        if (isMounted) {
          setBlogs(data);
          setListError("");
        }
      })
      .catch((error) => {
        if (isMounted) setListError(error.message || "Unable to load blogs.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(
      `Delete "${blog.title}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(blog._id);

    try {
      await deleteBlog(blog._id);
      reload();
    } catch (error) {
      window.alert(error.message || "Unable to delete blog.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the blogs shown on the public website.
          </p>
        </div>

        <Button type="button" onClick={() => navigate("/admin/blogs/add")}>
          <Plus className="h-4 w-4" />
          Add Blog
        </Button>
      </div>

      <Card>
        <CardContent>
          {isLoading && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Loading blogs...
            </p>
          )}

          {!isLoading && listError && (
            <p className="py-6 text-center text-sm text-red-600">{listError}</p>
          )}

          {!isLoading && !listError && blogs.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No blogs added yet.
            </p>
          )}

          {!isLoading && !listError && blogs.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-3">Image</th>
                    <th className="px-3 py-3">Title</th>
                    <th className="px-3 py-3">Categories</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Added On</th>
                    <th className="px-3 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {blogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="border-b border-slate-100 align-middle"
                    >
                      <td className="px-3 py-3">
                        <img
                          src={resolveImageUrl(blog.coverImage)}
                          alt={blog.title}
                          className="h-12 w-20 rounded-md object-cover"
                        />
                      </td>

                      <td className="max-w-xs px-3 py-3 font-medium text-slate-900">
                        {blog.title}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {blog.categories.length === 0 && (
                            <span className="text-slate-400">-</span>
                          )}
                          {blog.categories.map((category) => (
                            <Badge key={category._id} variant="outline">
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        <Badge variant={blog.isPublished ? "default" : "outline"}>
                          {blog.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </td>

                      <td className="px-3 py-3 text-slate-500">
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {blog.isPublished && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(`/blog/${blog.slug}`, "_blank")
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
                            disabled={deletingId === blog._id}
                            onClick={() => handleDelete(blog)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {deletingId === blog._id ? "Deleting..." : "Delete"}
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

export default AdminBlogs;