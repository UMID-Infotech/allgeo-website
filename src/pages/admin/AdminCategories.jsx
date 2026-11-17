// src/pages/admin/AdminCategories.jsx
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  deleteBlogCategory,
  getBlogCategories,
} from "@/services/blogService";

function AdminCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    getBlogCategories()
      .then((data) => {
        if (isMounted) {
          setCategories(data);
          setListError("");
        }
      })
      .catch((error) => {
        if (isMounted) setListError(error.message || "Unable to load categories.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Delete category "${category.name}"? Blogs in this category will NOT be deleted, they will just lose this category.`,
    );
    if (!confirmed) return;

    setDeletingId(category._id);

    try {
      await deleteBlogCategory(category._id);
      reload();
    } catch (error) {
      window.alert(error.message || "Unable to delete category.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the categories used to organise your blogs.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => navigate("/admin/categories/add")}
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardContent>
          {isLoading && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Loading categories...
            </p>
          )}

          {!isLoading && listError && (
            <p className="py-6 text-center text-sm text-red-600">
              {listError}
            </p>
          )}

          {!isLoading && !listError && categories.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No categories added yet.
            </p>
          )}

          {!isLoading && !listError && categories.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-3">#</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Slug</th>
                    <th className="px-3 py-3">Blogs</th>
                    <th className="px-3 py-3">Added On</th>
                    <th className="px-3 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category, index) => (
                    <tr
                      key={category._id}
                      className="border-b border-slate-100 align-middle"
                    >
                      <td className="px-3 py-3 text-slate-500">{index + 1}</td>

                      <td className="px-3 py-3 font-medium text-slate-900">
                        {category.name}
                      </td>

                      <td className="px-3 py-3 text-slate-500">
                        {category.slug}
                      </td>

                      <td className="px-3 py-3 text-slate-500">
                        {category.blogCount}
                      </td>

                      <td className="px-3 py-3 text-slate-500">
                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/categories/edit/${category._id}`)
                            }
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Button>

                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            disabled={deletingId === category._id}
                            onClick={() => handleDelete(category)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {deletingId === category._id
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

export default AdminCategories;