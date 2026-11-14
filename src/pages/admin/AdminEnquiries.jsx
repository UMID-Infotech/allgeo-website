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
    </div>
  );
}

export default AdminEnquiries;
