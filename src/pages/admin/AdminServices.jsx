import { Fragment, useEffect, useState } from "react";
import { ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  deleteService,
  getAllServices,
  getServiceBySlug,
} from "@/services/servicesRelatedService";
import ServiceFormTwoStage from "@/components/admin/ServiceFormTwoStage";
import ServiceEditForm from "@/components/admin/ServiceEditForm";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [listError, setListError] = useState("");

  const [showForm, setShowForm] = useState(false);

  // The service currently being edited (null when not editing).
  const [editingService, setEditingService] = useState(null);

  // Slug currently being deleted (shows a disabled state on that row's button).
  const [deletingSlug, setDeletingSlug] = useState(null);

  // Which service's detail row is currently expanded.
  const [expandedSlug, setExpandedSlug] = useState(null);

  // Cache of fetched detail data, keyed by slug:
  // { [slug]: { loading, error, service, faqs } }
  const [detailsBySlug, setDetailsBySlug] = useState({});

  const loadServices = async () => {
    setIsLoadingList(true);
    setListError("");

    try {
      const data = await getAllServices();
      setServices(data);
    } catch (error) {
      setListError(error.message || "Unable to load services.");
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleViewDetails = async (slug) => {
    // Toggle closed if the same row is already open.
    if (expandedSlug === slug) {
      setExpandedSlug(null);
      return;
    }

    setExpandedSlug(slug);

    // Already fetched — no need to hit the API again.
    if (detailsBySlug[slug] && !detailsBySlug[slug].error) {
      return;
    }

    setDetailsBySlug((prev) => ({
      ...prev,
      [slug]: { loading: true, error: "", service: null, faqs: [] },
    }));

    try {
      const data = await getServiceBySlug(slug);

      setDetailsBySlug((prev) => ({
        ...prev,
        [slug]: {
          loading: false,
          error: "",
          service: data.service,
          faqs: data.faqs,
        },
      }));
    } catch (error) {
      setDetailsBySlug((prev) => ({
        ...prev,
        [slug]: {
          loading: false,
          error: error.message || "Unable to load details.",
          service: null,
          faqs: [],
        },
      }));
    }
  };

  const handleServiceSaved = () => {
    setShowForm(false);
    loadServices();
  };

  const handleEditClick = (service) => {
    setShowForm(false);
    setEditingService(service);
  };

  const handleEditSaved = () => {
    setEditingService(null);

    // Clear any cached detail data for the old slug so a re-open refetches
    // fresh data (the slug itself may have changed).
    setDetailsBySlug({});
    setExpandedSlug(null);

    loadServices();
  };

  const handleDelete = async (slug) => {
    const confirmed = window.confirm(
      `Delete "${slug}"? This will also remove its expertise/accordion items. This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingSlug(slug);

    try {
      await deleteService(slug);

      if (expandedSlug === slug) {
        setExpandedSlug(null);
      }

      setDetailsBySlug((prev) => {
        const next = { ...prev };
        delete next[slug];
        return next;
      });

      await loadServices();
    } catch (error) {
      window.alert(error.message || "Unable to delete service.");
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the services shown on the public website.
          </p>
        </div>

        {!showForm && !editingService && (
          <Button type="button" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        )}
      </div>

      {showForm && (
        <ServiceFormTwoStage
          onCancel={() => setShowForm(false)}
          onSaved={handleServiceSaved}
        />
      )}

      {editingService && (
        <ServiceEditForm
          service={editingService}
          onCancel={() => setEditingService(null)}
          onSaved={handleEditSaved}
        />
      )}

      <Card>
        <CardContent>
          {isLoadingList && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Loading services...
            </p>
          )}

          {!isLoadingList && listError && (
            <p className="py-6 text-center text-sm text-red-600">{listError}</p>
          )}

          {!isLoadingList && !listError && services.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No services added yet.
            </p>
          )}

          {!isLoadingList && !listError && services.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-3">Title</th>
                    <th className="px-3 py-3">Slug</th>
                    <th className="px-3 py-3">Short Description</th>
                    <th className="px-3 py-3">Image</th>
                    <th className="px-3 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((service) => {
                    const isExpanded = expandedSlug === service.slug;
                    const detail = detailsBySlug[service.slug];
                    const isDeleting = deletingSlug === service.slug;

                    return (
                      <Fragment key={service._id ?? service.slug}>
                        <tr className="border-b border-slate-100 align-top">
                          <td className="px-3 py-3 font-medium text-slate-900">
                            {service.title}
                          </td>

                          <td className="px-3 py-3 text-slate-500">
                            {service.slug}
                          </td>

                          <td className="max-w-xs px-3 py-3 text-slate-600">
                            <span className="line-clamp-2">
                              {service.shortDescription}
                            </span>
                          </td>

                          <td className="px-3 py-3 text-slate-500">
                            <span className="line-clamp-1 max-w-[180px] block">
                              {service.image}
                            </span>
                          </td>

                          <td className="px-3 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(service.slug)}
                              >
                                View Details
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${
                                    isExpanded ? "rotate-180" : ""
                                  }`}
                                />
                              </Button>

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditClick(service)}
                              >
                                <Pencil className="h-4 w-4" />
                                Edit
                              </Button>

                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                disabled={isDeleting}
                                onClick={() => handleDelete(service.slug)}
                              >
                                <Trash2 className="h-4 w-4" />
                                {isDeleting ? "Deleting..." : "Delete"}
                              </Button>
                            </div>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr className="border-b border-slate-100 bg-slate-50">
                            <td colSpan={5} className="px-3 py-5">
                              {detail?.loading && (
                                <p className="text-sm text-muted-foreground">
                                  Loading details...
                                </p>
                              )}

                              {detail?.error && (
                                <p className="text-sm text-red-600">
                                  {detail.error}
                                </p>
                              )}

                              {detail?.service && (
                                <div className="space-y-5">
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                      Long Description
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-slate-700">
                                      {detail.service.longDescription}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                      Expertise / Accordion Items (
                                      {detail.faqs.length})
                                    </p>

                                    {detail.faqs.length === 0 && (
                                      <p className="mt-1 text-sm text-muted-foreground">
                                        No items added for this service yet.
                                      </p>
                                    )}

                                    <div className="mt-2 space-y-2">
                                      {detail.faqs.map((faq) => (
                                        <div
                                          key={faq._id ?? faq.faqId}
                                          className="rounded-lg border border-slate-200 bg-white p-3"
                                        >
                                          <p className="text-sm font-semibold text-slate-900">
                                            {faq.title}
                                          </p>
                                          <p className="mt-1 text-sm text-slate-600">
                                            {faq.description}
                                          </p>

                                          {faq.images?.length > 0 && (
                                            <p className="mt-2 text-xs text-slate-400">
                                              Images: {faq.images.join(", ")}
                                            </p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminServices;
