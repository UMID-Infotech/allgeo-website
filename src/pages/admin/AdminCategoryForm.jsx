// src/pages/admin/AdminCategoryForm.jsx
//
// One page used for both:
//   /admin/categories/add          -> create a category
//   /admin/categories/edit/:id     -> edit a category
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createBlogCategory,
  getBlogCategory,
  updateBlogCategory,
} from "@/services/blogService";

function AdminCategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isEdit) return undefined;

    let isMounted = true;

    getBlogCategory(id)
      .then((category) => {
        if (isMounted) setName(category.name);
      })
      .catch((error) => {
        if (isMounted) setFormError(error.message || "Unable to load category.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, isEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Category name is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEdit) {
        await updateBlogCategory(id, name.trim());
      } else {
        await createBlogCategory(name.trim());
      }
      navigate("/admin/categories");
    } catch (error) {
      setFormError(error.message || "Unable to save category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/categories")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Button>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {isEdit ? "Edit Category" : "Add Category"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {isEdit
            ? "Rename this category."
            : "Create a new category for your blogs."}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="py-4 text-sm text-muted-foreground">
              Loading category...
            </p>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  placeholder="e.g. Geophysics"
                  value={name}
                  maxLength={80}
                  onChange={(event) => setName(event.target.value)}
                  disabled={isSubmitting}
                  autoFocus
                />
              </div>

              {formError && <p className="text-sm text-red-600">{formError}</p>}

              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {isEdit ? "Update Category" : "Save Category"}
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => navigate("/admin/categories")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminCategoryForm;