//src/pages/admin/AdminClientAdd.jsx
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createClient, getClientImageKitAuth } from "@/services/clientService";

const emptyForm = {
  name: "",
  order: "",
  isActive: true,
};

function AdminClientAdd() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(emptyForm);

  // Selected file + local preview, before it's uploaded to ImageKit.
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleFieldChange = (field) => (event) => {
    const value =
      field === "isActive" ? event.target.checked : event.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFormError("");
  };

  // Fetches short-lived credentials from our backend, then uploads the
  // file directly to ImageKit from the browser using those credentials.
  const uploadLogoToImageKit = async (file) => {
    const authParams = await getClientImageKitAuth();

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await upload({
        file,
        fileName: file.name,
        token: authParams.token,
        expire: authParams.expire,
        signature: authParams.signature,
        publicKey: authParams.publicKey,
        urlEndpoint: authParams.urlEndpoint,
        folder: "/allgeo-solutions/clients",
        useUniqueFileName: true,
        onProgress: (event) => {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        },
      });

      return result.url;
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        throw new Error("Upload was cancelled.");
      }
      if (error instanceof ImageKitInvalidRequestError) {
        throw new Error(`Invalid upload request: ${error.message}`);
      }
      if (error instanceof ImageKitUploadNetworkError) {
        throw new Error("Network error while uploading. Please try again.");
      }
      if (error instanceof ImageKitServerError) {
        throw new Error(`ImageKit server error: ${error.message}`);
      }
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!form.name.trim()) {
      setFormError("Client name is required.");
      return;
    }

    if (!selectedFile) {
      setFormError("Please select a logo image to upload.");
      return;
    }

    setIsSubmitting(true);

    try {
      const logoUrl = await uploadLogoToImageKit(selectedFile);

      await createClient({
        name: form.name.trim(),
        logo: logoUrl,
        order: form.order === "" ? undefined : Number(form.order),
        isActive: form.isActive,
      });

      navigate("/admin/clients");
    } catch (error) {
      setFormError(error.message || "Unable to add client.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = isUploading || isSubmitting;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/clients")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Button>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">Add Client</h1>
        <p className="mt-1 text-muted-foreground">
          Upload a client logo and it will appear in the "Our Clients" slider
          on the website.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Client Name</Label>
              <Input
                id="name"
                placeholder="e.g. Acme Corporation"
                value={form.name}
                onChange={handleFieldChange("name")}
                disabled={isBusy}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo Image</Label>
              <input
                ref={fileInputRef}
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isBusy}
                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700"
              />

              {previewUrl && (
                <div className="mt-3 flex h-24 w-48 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <img
                    src={previewUrl}
                    alt="Selected logo preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              {isUploading && (
                <div className="mt-2">
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

            <div className="space-y-2">
              <Label htmlFor="order">Display Order (optional)</Label>
              <Input
                id="order"
                type="number"
                placeholder="Leave blank to add at the end"
                value={form.order}
                onChange={handleFieldChange("order")}
                disabled={isBusy}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isActive"
                type="checkbox"
                checked={form.isActive}
                onChange={handleFieldChange("isActive")}
                disabled={isBusy}
                className="h-4 w-4 rounded border-slate-300"
              />
              <Label htmlFor="isActive" className="!mt-0">
                Show on website (active)
              </Label>
            </div>

            {formError && (
              <p className="text-sm text-red-600">{formError}</p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isBusy}>
                {isBusy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isUploading ? "Uploading..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4" />
                    Save Client
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={isBusy}
                onClick={() => navigate("/admin/clients")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminClientAdd;