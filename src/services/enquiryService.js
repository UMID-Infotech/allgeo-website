import api from "./api";

// POST /api/enquiries
// Public — used by CTASection's enquiry form on the website.
export async function submitEnquiry(enquiryData) {
  const { data } = await api.post("/api/enquiries", enquiryData);
  return data;
}

// GET /api/enquiries
// Admin only — used by the /admin/enquiries dashboard page.
export async function getAllEnquiries() {
  const { data } = await api.get("/api/enquiries");
  return data.enquiries;
}

// PUT /api/enquiries/:id/follow-up
// Admin only — used by the /admin/enquiries dashboard page to save the
// follow-up type (call/email), connected status and remarks for a row.
// payload: { followUpType?, isConnected?, remarks? }
export async function updateEnquiryFollowUp(id, payload) {
  const { data } = await api.put(`/api/enquiries/${id}/follow-up`, payload);
  return data.enquiry;
}
