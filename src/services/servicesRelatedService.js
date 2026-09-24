import api from "./api";
 
// GET /api/services
// Used by ServicesSection (home page grid), OtherServices and Footer.
export async function getAllServices() {
  const { data } = await api.get("/api/services");
  return data.services;
}
 
// GET /api/services/:slug
// Used by ServiceDetailPage. Returns both the service and its
// accordion/expertise items (formerly src/data/serviceFaqs.js).
export async function getServiceBySlug(slug) {
  const { data } = await api.get(`/api/services/${slug}`);
  return {
    service: data.service,
    faqs: data.faqs,
  };
}
 
// POST /api/services
// Admin only — used from the admin dashboard "Add Service" form.
// payload: { slug, title, shortDescription, longDescription, image, order?, isActive? }
export async function createService(payload) {
  const { data } = await api.post("/api/services", payload);
  return data.service;
}
 
// PUT /api/services/:slug
// Admin only — used from the admin dashboard "Edit Service" form.
// payload: { slug?, title, shortDescription, longDescription, image, order?, isActive? }
export async function updateService(slug, payload) {
  const { data } = await api.put(`/api/services/${slug}`, payload);
  return data.service;
}
 
// DELETE /api/services/:slug
// Admin only — used from the admin dashboard "Delete" action.
export async function deleteService(slug) {
  const { data } = await api.delete(`/api/services/${slug}`);
  return data;
}
 
// POST /api/services/:slug/faqs
// Admin only — used from the admin dashboard to add an accordion/expertise
// item to an existing service.
// payload: { faqId, title, description, images?, order? }
export async function addServiceFaq(slug, payload) {
  const { data } = await api.post(`/api/services/${slug}/faqs`, payload);
  return data.faq;
}
 
// PUT /api/services/:slug/faqs/:faqId
// Admin only — used from the admin dashboard to edit an existing
// accordion/expertise item.
// payload: { title, description, images?, order? }
export async function updateServiceFaq(slug, faqId, payload) {
  const { data } = await api.put(
    `/api/services/${slug}/faqs/${faqId}`,
    payload
  );
  return data.faq;
}
 
// DELETE /api/services/:slug/faqs/:faqId
// Admin only — used from the admin dashboard to delete an accordion/expertise
// item.
export async function deleteServiceFaq(slug, faqId) {
  const { data } = await api.delete(`/api/services/${slug}/faqs/${faqId}`);
  return data;
}