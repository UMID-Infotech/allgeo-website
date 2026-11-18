// src/pages/admin/AdminProjectAdd.jsx
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BlogEditor from "@/components/admin/BlogEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { uploadImageToImageKit } from "@/lib/imagekitUpload";
import { createProject } from "@/services/projectService";

// Removes tags so we can tell whether the editor really has any text.
const hasContent = (html) =>
  /<img\b/i.test(html) ||
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim().length > 0;

function AdminProjectAdd() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // Featured image (uploaded to ImageKit when the project is saved)
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Project title is required.");
      return;
    }
    if (!coverFile) {
      setFormError("Please select a featured image.");
      return;
    }
    if (!hasContent(content)) {
      setFormError("Project content is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      let coverImage;
      try {
        coverImage = await uploadImageToImageKit(coverFile, {
          folder: "/allgeo-solutions/projects/covers",
          onProgress: setUploadProgress,
        });
      } finally {
        setIsUploading(false);
      }

      await createProject({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        coverImage,
        isPublished,
      });

      navigate("/admin/projects");
    } catch (error) {
      setFormError(error.message || "Unable to add project.");
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
          onClick={() => navigate("/admin/projects")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">Add Project</h1>
        <p className="mt-1 text-muted-foreground">
          Add a new project. It appears in the Projects section of the website.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter project title"
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
                placeholder="Shown on the project card. Leave blank to use the first lines of the content."
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

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <BlogEditor
              onChange={setContent}
              disabled={isBusy}
              uploadFolder="/allgeo-solutions/projects/content"
              placeholder="Write the project details here..."
            />
            <p className="text-xs text-muted-foreground">
              Use the image button in the toolbar (or paste / drag an image) —
              it is uploaded to ImageKit automatically.
            </p>
          </CardContent>
        </Card>

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
                Save Project
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isBusy}
            onClick={() => navigate("/admin/projects")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminProjectAdd;