//src/pages/admin/AdminEnquiries.jsx
import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  getAllEnquiries,
  updateEnquiryFollowUp,
} from "@/services/enquiryService";

// Small helper: build the editable draft state for one enquiry row.
function draftFromEnquiry(enquiry) {
  return {
    followUpType: enquiry.followUpType || "none",
    isConnected: Boolean(enquiry.isConnected),
    remarks: enquiry.remarks || "",
  };
}

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState("");

  // Editable draft values per enquiry id: { [id]: { followUpType, isConnected, remarks } }
  const [drafts, setDrafts] = useState({});

  // Which enquiry id is currently being saved.
  const [savingId, setSavingId] = useState(null);

  // Which enquiry id just showed a "Saved" confirmation.
  const [savedId, setSavedId] = useState(null);

  const loadEnquiries = async () => {
    setIsLoading(true);
    setListError("");

    try {
      const data = await getAllEnquiries();
      setEnquiries(data);

      const nextDrafts = {};
      data.forEach((enquiry) => {
        nextDrafts[enquiry._id] = draftFromEnquiry(enquiry);
      });
      setDrafts(nextDrafts);
    } catch (error) {
      setListError(error.message || "Unable to load enquiries.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleDraftChange = (id, field, value) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));

    if (savedId === id) {
      setSavedId(null);
    }
  };

  const handleSave = async (id) => {
    setSavingId(id);

    try {
      const updated = await updateEnquiryFollowUp(id, drafts[id]);

      setEnquiries((prev) =>
        prev.map((enquiry) => (enquiry._id === id ? updated : enquiry))
      );
      setDrafts((prev) => ({ ...prev, [id]: draftFromEnquiry(updated) }));

      setSavedId(id);
      setTimeout(() => {
        setSavedId((current) => (current === id ? null : current));
      }, 2000);
    } catch (error) {
      window.alert(error.message || "Unable to save follow-up.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Enquiries</h1>
        <p className="mt-1 text-muted-foreground">
          Enquiries submitted through the website's contact form.
        </p>
      </div>

      <Card>
        <CardContent>
          {isLoading && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Loading enquiries...
            </p>
          )}

          {!isLoading && listError && (
            <p className="py-6 text-center text-sm text-red-600">
              {listError}
            </p>
          )}

          {!isLoading && !listError && enquiries.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No enquiries received yet.
            </p>
          )}

          {!isLoading && !listError && enquiries.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Contact</th>
                    <th className="px-3 py-3">Message</th>
                    <th className="px-3 py-3">Received</th>
                    <th className="px-3 py-3">Follow-up</th>
                    <th className="px-3 py-3">Connected</th>
                    <th className="px-3 py-3">Remarks</th>
                    <th className="px-3 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.map((enquiry) => {
                    const draft = drafts[enquiry._id] || draftFromEnquiry(enquiry);
                    const isSaving = savingId === enquiry._id;
                    const isSaved = savedId === enquiry._id;

                    return (
                      <tr
                        key={enquiry._id}
                        className="border-b border-slate-100 align-top"
                      >
                        <td className="px-3 py-3 font-medium text-slate-900">
                          {enquiry.name}
                        </td>

                        <td className="px-3 py-3 text-slate-600">
                          <div>{enquiry.email}</div>
                          <div className="text-slate-400">
                            {enquiry.contactNumber}
                          </div>
                        </td>

                        <td className="max-w-xs px-3 py-3 text-slate-600">
                          <span className="line-clamp-3">
                            {enquiry.message}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-slate-500">
                          {enquiry.createdAt
                            ? new Date(enquiry.createdAt).toLocaleString()
                            : "-"}
                        </td>

                        <td className="px-3 py-3">
                          <select
                            value={draft.followUpType}
                            onChange={(event) =>
                              handleDraftChange(
                                enquiry._id,
                                "followUpType",
                                event.target.value
                              )
                            }
                            disabled={isSaving}
                            className="w-28 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-slate-400"
                          >
                            <option value="none">None</option>
                            <option value="call">Call</option>
                            <option value="email">Email</option>
                          </select>
                        </td>

                        <td className="px-3 py-3">
                          <select
                            value={draft.isConnected ? "yes" : "no"}
                            onChange={(event) =>
                              handleDraftChange(
                                enquiry._id,
                                "isConnected",
                                event.target.value === "yes"
                              )
                            }
                            disabled={isSaving}
                            className="w-24 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-slate-400"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                          </select>
                        </td>

                        <td className="px-3 py-3">
                          <textarea
                            value={draft.remarks}
                            onChange={(event) =>
                              handleDraftChange(
                                enquiry._id,
                                "remarks",
                                event.target.value
                              )
                            }
                            disabled={isSaving}
                            rows={2}
                            placeholder="Add a note..."
                            className="w-48 resize-y rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-slate-400"
                          />
                        </td>

                        <td className="px-3 py-3 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <Button
                              type="button"
                              size="sm"
                              disabled={isSaving}
                              onClick={() => handleSave(enquiry._id)}
                            >
                              {isSaving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="h-4 w-4" />
                              )}
                              Save
                            </Button>

                            {isSaved && (
                              <Badge variant="outline" className="text-green-700">
                                Saved
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
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

export default AdminEnquiries;