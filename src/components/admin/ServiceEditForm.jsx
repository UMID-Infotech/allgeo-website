//src/components/admin/ServiceEditForm.jsx
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  addServiceFaq,
  deleteServiceFaq,
  getServiceBySlug,
  updateService,
  updateServiceFaq,
} from "@/services/servicesRelatedService";

const emptyNewDraft = {
  faqId: "",
  title: "",
  description: "",
  images: "",
};

function ServiceEditForm({ service, onCancel, onSaved }) {
  // The FAQ endpoints are all called against the ORIGINAL slug throughout
  // this editing session. A slug rename (if any) is only applied to the
  // service itself when "Save Changes" is clicked at the very end.
  const originalSlug = service.slug;

  const [step, setStep] = useState(1);

  // ---- Stage 1: service fields ----
  const [form, setForm] = useState({
    slug: service.slug ?? "",
    title: service.title ?? "",
    shortDescription: service.shortDescription ?? "",
    longDescription: service.longDescription ?? "",
    image: service.image ?? "",
  });
  const [stepOneError, setStepOneError] = useState("");

  // ---- Stage 2: existing FAQ items ----
  const [faqs, setFaqs] = useState([]);
  const [faqsLoading, setFaqsLoading] = useState(true);
  const [faqsError, setFaqsError] = useState("");

  const [editingFaqId, setEditingFaqId] = useState(null);
  const [editDraft, setEditDraft] = useState({
    title: "",
    description: "",
    images: "",
  });
  const [editError, setEditError] = useState("");
  const [savingFaqId, setSavingFaqId] = useState(null);
  const [deletingFaqId, setDeletingFaqId] = useState(null);

  // ---- Stage 2: add a new FAQ item ----
  const [newDraft, setNewDraft] = useState(emptyNewDraft);
  const [newDraftError, setNewDraftError] = useState("");
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  // ---- Final submit (stage 1 fields) ----
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFaqs = async () => {
      setFaqsLoading(true);
      setFaqsError("");

      try {
        const data = await getServiceBySlug(originalSlug);

        if (isMounted) {
          setFaqs(data.faqs);
        }
      } catch (error) {
        if (isMounted) {
          setFaqsError(error.message || "Unable to load expertise items.");
        }
      } finally {
        if (isMounted) {
          setFaqsLoading(false);
        }
      }
    };

    loadFaqs();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Stage 1 handlers ----
  const handleFieldChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const goToStepTwo = () => {
    const { slug, title, shortDescription, longDescription, image } = form;

    if (!slug || !title || !shortDescription || !longDescription || !image) {
      setStepOneError("Please fill in all service fields before continuing.");
      return;
    }

    setStepOneError("");
    setStep(2);
  };

  // ---- Stage 2: edit existing item ----
  const handleStartEdit = (faq) => {
    setEditingFaqId(faq.faqId);
    setEditDraft({
      title: faq.title,
      description: faq.description,
      images: (faq.images ?? []).join(", "),
    });
    setEditError("");
  };

  const handleCancelEdit = () => {
    setEditingFaqId(null);
    setEditError("");
  };

  const handleEditDraftChange = (field) => (event) => {
    setEditDraft((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSaveEdit = async (faqId) => {
    if (!editDraft.title || !editDraft.description) {
      setEditError("Title and description are required.");
      return;
    }

    setSavingFaqId(faqId);
    setEditError("");

    try {
      const images = editDraft.images
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      const updatedFaq = await updateServiceFaq(originalSlug, faqId, {
        title: editDraft.title,
        description: editDraft.description,
        images,
      });

      setFaqs((prev) =>
        prev.map((item) => (item.faqId === faqId ? updatedFaq : item)),
      );
      setEditingFaqId(null);
    } catch (error) {
      setEditError(error.message || "Unable to update this item.");
    } finally {
      setSavingFaqId(null);
    }
  };

  // ---- Stage 2: delete existing item ----
  const handleDeleteFaq = async (faqId, title) => {
    const confirmed = window.confirm(
      `Delete "${title}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingFaqId(faqId);

    try {
      await deleteServiceFaq(originalSlug, faqId);
      setFaqs((prev) => prev.filter((item) => item.faqId !== faqId));

      if (editingFaqId === faqId) {
        setEditingFaqId(null);
      }
    } catch (error) {
      window.alert(error.message || "Unable to delete this item.");
    } finally {
      setDeletingFaqId(null);
    }
  };

  // ---- Stage 2: add a new item ----
  const handleNewDraftChange = (field) => (event) => {
    setNewDraft((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAddFaqItem = async () => {
    const { faqId, title, description } = newDraft;

    if (!faqId || !title || !description) {
      setNewDraftError("faqId, title and description are required.");
      return;
    }

    if (faqs.some((item) => item.faqId === faqId)) {
      setNewDraftError("An item with this faqId already exists.");
      return;
    }

    setIsAddingFaq(true);
    setNewDraftError("");

    try {
      const images = newDraft.images
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      const createdFaq = await addServiceFaq(originalSlug, {
        faqId,
        title,
        description,
        images,
      });

      setFaqs((prev) => [...prev, createdFaq]);
      setNewDraft(emptyNewDraft);
    } catch (error) {
      setNewDraftError(error.message || "Unable to add this item.");
    } finally {
      setIsAddingFaq(false);
    }
  };

  // ---- Final save (service fields only — FAQ changes are already saved) ----
  const handleFinalSave = async () => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const updatedService = await updateService(originalSlug, form);
      onSaved(updatedService);
    } catch (error) {
      setSubmitError(error.message || "Unable to update service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Edit Service</CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Step {step} of 2 —{" "}
            {step === 1 ? "Service details" : "Expertise / accordion items"}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onCancel}
          aria-label="Close form"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        {/* Step indicator */}
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
              step === 1
                ? "bg-slate-950 text-white"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            1
          </div>
          <div className="h-px flex-1 bg-slate-200" />
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
              step === 2
                ? "bg-slate-950 text-white"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            2
          </div>
        </div>

        {/* ---- Step 1: service fields ---- */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  value={form.slug}
                  onChange={handleFieldChange("slug")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={form.title}
                  onChange={handleFieldChange("title")}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-shortDescription">Short Description</Label>
              <Input
                id="edit-shortDescription"
                value={form.shortDescription}
                onChange={handleFieldChange("shortDescription")}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-longDescription">Long Description</Label>
              <textarea
                id="edit-longDescription"
                rows={4}
                value={form.longDescription}
                onChange={handleFieldChange("longDescription")}
                className="w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-image">Image Path</Label>
              <Input
                id="edit-image"
                value={form.image}
                onChange={handleFieldChange("image")}
              />
            </div>

            {stepOneError && (
              <p className="text-sm text-red-600">{stepOneError}</p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>

              <Button type="button" onClick={goToStepTwo}>
                Next: Manage Expertise Items
              </Button>
            </div>
          </div>
        )}

        {/* ---- Step 2: existing + new FAQ items ---- */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Existing items */}
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Existing items
              </p>

              {faqsLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading expertise items...
                </p>
              )}

              {!faqsLoading && faqsError && (
                <p className="text-sm text-red-600">{faqsError}</p>
              )}

              {!faqsLoading && !faqsError && faqs.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No items added for this service yet.
                </p>
              )}

              {!faqsLoading && !faqsError && faqs.length > 0 && (
                <div className="space-y-2">
                  {faqs.map((faq) => {
                    const isEditing = editingFaqId === faq.faqId;
                    const isSaving = savingFaqId === faq.faqId;
                    const isDeleting = deletingFaqId === faq.faqId;

                    return (
                      <div
                        key={faq._id ?? faq.faqId}
                        className="rounded-lg border border-slate-200 p-3"
                      >
                        {!isEditing && (
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900">
                                {faq.title}
                              </p>
                              <p className="mt-1 text-sm text-slate-600">
                                {faq.description}
                              </p>
                              {faq.images?.length > 0 && (
                                <p className="mt-1 text-xs text-slate-400">
                                  Images: {faq.images.join(", ")}
                                </p>
                              )}
                            </div>

                            <div className="flex shrink-0 items-center gap-1.5">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => handleStartEdit(faq)}
                                aria-label={`Edit ${faq.title}`}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                disabled={isDeleting}
                                onClick={() =>
                                  handleDeleteFaq(faq.faqId, faq.title)
                                }
                                aria-label={`Delete ${faq.title}`}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {isEditing && (
                          <div className="space-y-3">
                            <div className="space-y-1.5">
                              <Label htmlFor={`faq-title-${faq.faqId}`}>
                                Title
                              </Label>
                              <Input
                                id={`faq-title-${faq.faqId}`}
                                value={editDraft.title}
                                onChange={handleEditDraftChange("title")}
                              />
                            </div>

                            <div className="space-y-1.5">
                              <Label htmlFor={`faq-description-${faq.faqId}`}>
                                Description
                              </Label>
                              <textarea
                                id={`faq-description-${faq.faqId}`}
                                rows={3}
                                value={editDraft.description}
                                onChange={handleEditDraftChange("description")}
                                className="w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <Label htmlFor={`faq-images-${faq.faqId}`}>
                                Images (comma separated, optional)
                              </Label>
                              <Input
                                id={`faq-images-${faq.faqId}`}
                                value={editDraft.images}
                                onChange={handleEditDraftChange("images")}
                              />
                            </div>

                            {editError && (
                              <p className="text-sm text-red-600">
                                {editError}
                              </p>
                            )}

                            <div className="flex justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </Button>

                              <Button
                                type="button"
                                size="sm"
                                disabled={isSaving}
                                onClick={() => handleSaveEdit(faq.faqId)}
                              >
                                {isSaving ? "Saving..." : "Save Item"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Add a new item */}
            <div className="rounded-lg border border-dashed border-slate-300 p-4">
              <p className="mb-3 text-sm font-medium text-slate-700">
                Add a new expertise / accordion item
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="new-faqId">Item ID</Label>
                  <Input
                    id="new-faqId"
                    placeholder="electrical-resistivity-tomography"
                    value={newDraft.faqId}
                    onChange={handleNewDraftChange("faqId")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="new-faqTitle">Title</Label>
                  <Input
                    id="new-faqTitle"
                    value={newDraft.title}
                    onChange={handleNewDraftChange("title")}
                  />
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                <Label htmlFor="new-faqDescription">Description</Label>
                <textarea
                  id="new-faqDescription"
                  rows={3}
                  value={newDraft.description}
                  onChange={handleNewDraftChange("description")}
                  className="w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>

              <div className="mt-3 space-y-1.5">
                <Label htmlFor="new-faqImages">
                  Images (comma separated, optional)
                </Label>
                <Input
                  id="new-faqImages"
                  value={newDraft.images}
                  onChange={handleNewDraftChange("images")}
                />
              </div>

              {newDraftError && (
                <p className="mt-2 text-sm text-red-600">{newDraftError}</p>
              )}

              <div className="mt-3 flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={isAddingFaq}
                  onClick={handleAddFaqItem}
                >
                  <Plus className="h-4 w-4" />
                  {isAddingFaq ? "Adding..." : "Add Item"}
                </Button>
              </div>
            </div>

            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}

            <div className="flex justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>

                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleFinalSave}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ServiceEditForm;
