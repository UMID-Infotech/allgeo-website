<<<<<<< HEAD
import { useEffect, useState } from "react";
import { getAdminEnquiries } from "@/services/enquiryService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminEnquiries() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    getAdminEnquiries(page).then((result) => {
      if (active) { setData(result); setError(""); }
    }).catch((requestError) => {
      if (active) setError(requestError.message);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [page, reload]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enquiries</h1>
          <p className="mt-1 text-muted-foreground">Website enquiries saved in the database, including email delivery status.</p>
        </div>
        <Button variant="outline" onClick={() => { setLoading(true); setReload((value) => value + 1); }}>Refresh</Button>
      </div>
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
      {loading && <p>Loading enquiries...</p>}
      {!loading && data?.enquiries.length === 0 && <p>No enquiries received yet.</p>}
      {!loading && data?.enquiries.map((enquiry) => (
        <Card key={enquiry.id}>
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <CardTitle className="text-lg">{enquiry.name}</CardTitle>
              <time className="text-sm text-muted-foreground" dateTime={enquiry.createdAt}>
                {new Date(enquiry.createdAt).toLocaleString()}
              </time>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a className="break-all text-blue-700 underline" href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
              <a className="text-blue-700 underline" href={`tel:${enquiry.contactNumber}`}>{enquiry.contactNumber}</a>
              <span className="text-muted-foreground">Email: {enquiry.emailStatus}</span>
            </div>
            <p className="whitespace-pre-wrap break-words">{enquiry.message}</p>
          </CardContent>
        </Card>
      ))}
      {!loading && data && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{data.total} total enquiries · Page {page} of {Math.max(1, Math.ceil(data.total / data.limit))}</p>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page === 1} onClick={() => { setLoading(true); setPage(page - 1); }}>Previous</Button>
            <Button variant="outline" disabled={page * data.limit >= data.total} onClick={() => { setLoading(true); setPage(page + 1); }}>Next</Button>
          </div>
        </div>
      )}
=======
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
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
    </div>
  );
}

<<<<<<< HEAD
export default AdminEnquiries;
=======
export default AdminEnquiries;
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
