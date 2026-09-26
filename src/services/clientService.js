import api from "./api";

// GET /api/clients
// Public — used by ClientsSection (home page slider).
export async function getAllClients() {
  const { data } = await api.get("/api/clients");
  return data.clients;
}

// GET /api/clients/admin
// Admin only — used by the admin dashboard to view all clients
// (including inactive ones).
export async function getAllClientsForAdmin() {
  const { data } = await api.get("/api/clients/admin");
  return data.clients;
}

// GET /api/clients/imagekit-auth
// Admin only — short-lived ImageKit credentials (token, expire, signature,
// publicKey, urlEndpoint) used by the "Add Client" form to upload the logo
// directly to ImageKit from the browser via @imagekit/react's upload().
export async function getClientImageKitAuth() {
  const { data } = await api.get("/api/clients/imagekit-auth");
  return data;
}

// POST /api/clients
// Admin only — used from the admin dashboard "Add Client" form.
// payload: { name, logo, order?, isActive? }
export async function createClient(payload) {
  const { data } = await api.post("/api/clients", payload);
  return data.client;
}