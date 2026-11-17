// src/pages/admin/AdminBlogAdd.jsx
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Loader2, Plus, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BlogEditor from "@/components/admin/BlogEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { uploadImageToImageKit } from "@/lib/imagekitUpload";
import {
  createBlog,
  createBlogCategory,
  getBlogCategories,
} from "@/services/blogService";

// Removes tags so we can tell whether the editor really has any text.
const hasContent = (html) =>
  /<img\b/i.test(html) ||
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim().length > 0;

function AdminBlogAdd() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // Featured image (uploaded to ImageKit when the blog is saved)
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Categories
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [categoryMode, setCategoryMode] = useState("existing"); // "existing" | "new"
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categoryMessage, setCategoryMessage] = useState({ type: "", text: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getBlogCategories()
      .then((data) => {
        if (isMounted) setCategories(data);
      })
      .catch((error) => {
        if (isMounted) {
          setCategoriesError(error.message || "Unable to load categories.");
        }
      })
      .finally(() => {
        if (isMounted) setCategoriesLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Free the temporary preview URL when it changes / on unmount.
  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const handleCoverChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setCoverFile(null);
      setCoverPreview("");
      return;
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setFormError("");
  };

  const toggleCategory = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Creates the category right here, then selects it automatically.
  const handleCreateCategory = async () => {
    const name = newCategoryName.trim();
    setCategoryMessage({ type: "", text: "" });

    if (!name) {
      setCategoryMessage({ type: "error", text: "Enter a category name." });
      return;
    }

    setIsCreatingCategory(true);

    try {
      const created = await createBlogCategory(name);

      setCategories((prev) =>
        [...prev, created].sort((a, b) => a.name.localeCompare(b.name)),
      );
      setSelectedIds((prev) =>
        prev.includes(created._id) ? prev : [...prev, created._id],
      );
      setNewCategoryName("");
      setCategoryMode("existing");
      setCategoryMessage({
        type: "success",
        text: `"${created.name}" was created and selected.`,
      });
    } catch (error) {
      setCategoryMessage({
        type: "error",
        text: error.message || "Unable to create category.",
      });
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Blog title is required.");
      return;
    }
    if (!coverFile) {
      setFormError("Please select a featured image.");
      return;
    }
    if (!hasContent(content)) {
      setFormError("Blog content is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      let coverImage;
      try {
        coverImage = await uploadImageToImageKit(coverFile, {
          folder: "/allgeo-solutions/blogs/covers",
          onProgress: setUploadProgress,
        });
      } finally {
        setIsUploading(false);
      }

      await createBlog({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        coverImage,
        categoryIds: selectedIds,
        isPublished,
      });

      navigate("/admin/blogs");
    } catch (error) {
      setFormError(error.message || "Unable to add blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = isUploading || isSubmitting;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/blogs")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Button>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">Add Blog</h1>
        <p className="mt-1 text-muted-foreground">
          Write a new blog post. It appears on the home page and the blog
          section of the website.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* ---------------- Basic details ---------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter blog title"
                value={title}
                maxLength={200}
                onChange={(event) => setTitle(event.target.value)}
                disabled={isBusy}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Short Summary (optional)</Label>
              <textarea
                id="excerpt"
                rows={3}
                maxLength={300}
                placeholder="Shown on the blog card. Leave blank to use the first lines of the content."
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
                disabled={isBusy}
                className="w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover">Featured Image</Label>
              <input
                id="cover"
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                disabled={isBusy}
                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700"
              />

              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Featured image preview"
                  className="mt-3 aspect-[16/9] w-full max-w-md rounded-lg border border-slate-200 object-cover"
                />
              )}

              {isUploading && (
                <div className="mt-2 max-w-md">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full bg-slate-900 transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Uploading to ImageKit... {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ---------------- Categories ---------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div
              className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1"
              role="tablist"
              aria-label="Category source"
            >
              {[
                { value: "existing", label: "Select Existing" },
                { value: "new", label: "New" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={categoryMode === option.value}
                  disabled={isBusy}
                  onClick={() => {
                    setCategoryMode(option.value);
                    setCategoryMessage({ type: "", text: "" });
                  }}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    categoryMode === option.value
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {categoryMode === "existing" && (
              <div className="space-y-3">
                {categoriesLoading && (
                  <p className="text-sm text-muted-foreground">
                    Loading categories...
                  </p>
                )}

                {!categoriesLoading && categoriesError && (
                  <p className="text-sm text-red-600">{categoriesError}</p>
                )}

                {!categoriesLoading &&
                  !categoriesError &&
                  categories.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No categories yet. Switch to <strong>New</strong> to
                      create one.
                    </p>
                  )}

                {categories.length > 0 && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      You can select more than one category.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => {
                        const isSelected = selectedIds.includes(category._id);

                        return (
                          <label
                            key={category._id}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              isSelected
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={isSelected}
                              disabled={isBusy}
                              onChange={() => toggleCategory(category._id)}
                            />
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                            {category.name}
                          </label>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {categoryMode === "new" && (
              <div className="space-y-2">
                <Label htmlFor="new-category">New Category Name</Label>

                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    id="new-category"
                    className="max-w-sm"
                    placeholder="e.g. Hydrogeology"
                    value={newCategoryName}
                    maxLength={80}
                    disabled={isCreatingCategory || isBusy}
                    onChange={(event) => setNewCategoryName(event.target.value)}
                    onKeyDown={(event) => {
                      // Enter must create the category, not submit the blog.
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleCreateCategory();
                      }
                    }}
                  />

                  <Button
                    type="button"
                    disabled={isCreatingCategory || isBusy}
                    onClick={handleCreateCategory}
                  >
                    {isCreatingCategory ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    Create Category
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  The new category is selected automatically for this blog.
                </p>
              </div>
            )}

            {categoryMessage.text && (
              <p
                className={`text-sm ${
                  categoryMessage.type === "error"
                    ? "text-red-600"
                    : "text-green-700"
                }`}
              >
                {categoryMessage.text}
              </p>
            )}

            {selectedIds.length > 0 && (
              <p className="text-sm text-slate-600">
                <span className="font-medium">Selected:</span>{" "}
                {categories
                  .filter((category) => selectedIds.includes(category._id))
                  .map((category) => category.name)
                  .join(", ")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* ---------------- Content ---------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <BlogEditor onChange={setContent} disabled={isBusy} />
            <p className="text-xs text-muted-foreground">
              Use the image button in the toolbar (or paste / drag an image) —
              it is uploaded to ImageKit automatically.
            </p>
          </CardContent>
        </Card>

        {/* ---------------- Publish + submit ---------------- */}
        <div className="flex items-center gap-2">
          <input
            id="isPublished"
            type="checkbox"
            checked={isPublished}
            onChange={(event) => setIsPublished(event.target.checked)}
            disabled={isBusy}
            className="h-4 w-4 rounded border-slate-300"
          />
          <Label htmlFor="isPublished">
            Publish on website (uncheck to save as draft)
          </Label>
        </div>

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isBusy}>
            {isBusy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isUploading ? "Uploading..." : "Saving..."}
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                Save Blog
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isBusy}
            onClick={() => navigate("/admin/blogs")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminBlogAdd;