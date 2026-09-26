<<<<<<< HEAD
// The production Express app serves the frontend and API on the same origin.
const API_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000")
  : "";
=======
import api from "./api";
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)

// POST /api/enquiries
// Public — used by CTASection's enquiry form on the website.
export async function submitEnquiry(enquiryData) {
  const { data } = await api.post("/api/enquiries", enquiryData);
  return data;
}

<<<<<<< HEAD
export async function getAdminEnquiries(page = 1) {
  const response = await fetch(`${API_BASE_URL}/api/enquiries?page=${page}`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Unable to load enquiries.");
  return data;
}
=======
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
>>>>>>> 6fb0d21 (enquiry form is connected to admin dashboard, email is integrated, clients page's json data removed, created the modle for client and imported in database and in admin dashboard admin can add these clients, and the image stores in imagekit)
