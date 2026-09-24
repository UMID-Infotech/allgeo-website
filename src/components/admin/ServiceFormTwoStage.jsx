import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addServiceFaq, createService } from "@/services/servicesRelatedService";

const emptyServiceForm = {
  slug: "",
  title: "",
  shortDescription: "",
  longDescription: "",
  image: "",
};

const emptyFaqDraft = {
  faqId: "",
  title: "",
  description: "",
  images: "",
};

function ServiceFormTwoStage({ onCancel, onSaved }) {
  const [step, setStep] = useState(1);

  const [serviceForm, setServiceForm] = useState(emptyServiceForm);
  const [faqItems, setFaqItems] = useState([]);
  const [faqDraft, setFaqDraft] = useState(emptyFaqDraft);

  const [stepOneError, setStepOneError] = useState("");
  const [faqDraftError, setFaqDraftError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceFieldChange = (field) => (event) => {
    setServiceForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleFaqDraftChange = (field) => (event) => {
    setFaqDraft((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const goToStepTwo = () => {
    const { slug, title, shortDescription, longDescription, image } =
      serviceForm;

    if (!slug || !title || !shortDescription || !longDescription || !image) {
      setStepOneError("Please fill in all service fields before continuing.");
      return;
    }

    setStepOneError("");
    setStep(2);
  };

  const handleAddFaqItem = () => {
    const { faqId, title, description } = faqDraft;

    if (!faqId || !title || !description) {
      setFaqDraftError("faqId, title and description are required.");
      return;
    }

    if (faqItems.some((item) => item.faqId === faqId)) {
      setFaqDraftError("An item with this faqId has already been added.");
      return;
    }

    const images = faqDraft.images
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    setFaqItems((prev) => [...prev, { ...faqDraft, images }]);
    setFaqDraft(emptyFaqDraft);
    setFaqDraftError("");
  };

  const handleRemoveFaqItem = (faqId) => {
    setFaqItems((prev) => prev.filter((item) => item.faqId !== faqId));
  };

  const resetForm = () => {
    setServiceForm(emptyServiceForm);
    setFaqItems([]);
    setFaqDraft(emptyFaqDraft);
    setStep(1);
    setStepOneError("");
    setFaqDraftError("");
    setSubmitError("");
  };

  const handleSubmit = async () => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const createdService = await createService(serviceForm);

      for (const item of faqItems) {
        // eslint-disable-next-line no-await-in-loop
        await addServiceFaq(createdService.slug, {
          faqId: item.faqId,
          title: item.title,
          description: item.description,
          images: item.images,
        });
      }

      resetForm();
      onSaved();
    } catch (error) {
      setSubmitError(error.message || "Unable to save service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Add Service</CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Step {step} of 2 —{" "}
            {step === 1 ? "Service details" : "Expertise / accordion items"}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            resetForm();
            onCancel();
          }}
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
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="geophysical-surveys"
                  value={serviceForm.slug}
                  onChange={handleServiceFieldChange("slug")}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Geophysical Surveys"
                  value={serviceForm.title}
                  onChange={handleServiceFieldChange("title")}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                placeholder="One-line summary shown on cards"
                value={serviceForm.shortDescription}
                onChange={handleServiceFieldChange("shortDescription")}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="longDescription">Long Description</Label>
              <textarea
                id="longDescription"
                rows={4}
                placeholder="Full description shown on the service detail page"
                value={serviceForm.longDescription}
                onChange={handleServiceFieldChange("longDescription")}
                className="w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="image">Image Path</Label>
              <Input
                id="image"
                placeholder="/allgeo-solutions/services/geophysical-surveys.png"
                value={serviceForm.image}
                onChange={handleServiceFieldChange("image")}
              />
            </div>

            {stepOneError && (
              <p className="text-sm text-red-600">{stepOneError}</p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  onCancel();
                }}
              >
                Cancel
              </Button>

              <Button type="button" onClick={goToStepTwo}>
                Next: Add Expertise Items
              </Button>
            </div>
          </div>
        )}

        {/* ---- Step 2: FAQ / accordion items ---- */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-lg border border-dashed border-slate-300 p-4">
              <p className="mb-3 text-sm font-medium text-slate-700">
                Add an expertise / accordion item
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="faqId">Item ID</Label>
                  <Input
                    id="faqId"
                    placeholder="electrical-resistivity-tomography"
                    value={faqDraft.faqId}
                    onChange={handleFaqDraftChange("faqId")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="faqTitle">Title</Label>
                  <Input
                    id="faqTitle"
                    placeholder="Electrical Resistivity Tomography (ERT) Survey"
                    value={faqDraft.title}
                    onChange={handleFaqDraftChange("title")}
                  />
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                <Label htmlFor="faqDescription">Description</Label>
                <textarea
                  id="faqDescription"
                  rows={3}
                  value={faqDraft.description}
                  onChange={handleFaqDraftChange("description")}
                  className="w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>

              <div className="mt-3 space-y-1.5">
                <Label htmlFor="faqImages">Images (comma separated, optional)</Label>
                <Input
                  id="faqImages"
                  placeholder="/allgeo-solutions/services/ert-1.png, /allgeo-solutions/services/ert-2.png"
                  value={faqDraft.images}
                  onChange={handleFaqDraftChange("images")}
                />
              </div>

              {faqDraftError && (
                <p className="mt-2 text-sm text-red-600">{faqDraftError}</p>
              )}

              <div className="mt-3 flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddFaqItem}
                >
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </div>

            {/* Added items preview */}
            {faqItems.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">
                  {faqItems.length} item(s) added
                </p>

                {faqItems.map((item) => (
                  <div
                    key={item.faqId}
                    className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleRemoveFaqItem(item.faqId)}
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}

            <div className="flex justify-between gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    onCancel();
                  }}
                >
                  Cancel
                </Button>

                <Button type="button" disabled={isSubmitting} onClick={handleSubmit}>
                  {isSubmitting ? "Saving..." : "Save Service"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ServiceFormTwoStage;