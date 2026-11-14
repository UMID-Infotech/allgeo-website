import { randomUUID } from "node:crypto";
import {
  listActiveServices, findServiceBySlug, createServiceRecord,
  updateServiceRecord, deleteServiceRecord,
} from "../models/Service.js";
import {
  listServiceFaqs, findServiceFaq, countServiceFaqs,
  createServiceFaqRecord, updateServiceFaqRecord, deleteServiceFaqRecord,
} from "../models/ServiceFaq.js";

const normalizeSlug = (value) => value.toLowerCase().trim();
const failure = (res, message, error) => {
  console.error(message, error);
  return res.status(500).json({ success: false, message });
};

export const getAllServices = async (req, res) => {
  try {
    const services = await listActiveServices();
    return res.status(200).json({ success: true, count: services.length, services });
  } catch (error) { return failure(res, "Unable to fetch services.", error); }
};

export const getServiceBySlug = async (req, res) => {
  try {
    const service = await findServiceBySlug(normalizeSlug(req.params.slug), true);
    if (!service) return res.status(404).json({ success: false, message: "Service not found." });
    const faqs = await listServiceFaqs(service._id);
    return res.status(200).json({ success: true, service, faqs });
  } catch (error) { return failure(res, "Unable to fetch service.", error); }
};

export const createService = async (req, res) => {
  try {
    const { slug, title, shortDescription, longDescription, image, order, isActive } = req.body;
    if (!slug || !title || !shortDescription || !longDescription || !image) {
      return res.status(400).json({ success: false, message: "slug, title, shortDescription, longDescription and image are required." });
    }
    const normalizedSlug = normalizeSlug(slug);
    if (await findServiceBySlug(normalizedSlug)) {
      return res.status(409).json({ success: false, message: `A service with slug "${normalizedSlug}" already exists.` });
    }
    const service = await createServiceRecord({
      _id: randomUUID(), slug: normalizedSlug, title, shortDescription, longDescription,
      image, order: typeof order === "number" ? order : 0,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });
    return res.status(201).json({ success: true, message: "Service created successfully.", service });
  } catch (error) {
    if (error.code === "23505") return res.status(409).json({ success: false, message: "A service with this slug already exists." });
    return failure(res, "Unable to create service.", error);
  }
};

export const updateService = async (req, res) => {
  try {
    const { slug: newSlug, title, shortDescription, longDescription, image, order, isActive } = req.body;
    if (!title || !shortDescription || !longDescription || !image) {
      return res.status(400).json({ success: false, message: "title, shortDescription, longDescription and image are required." });
    }
    const current = await findServiceBySlug(normalizeSlug(req.params.slug));
    if (!current) return res.status(404).json({ success: false, message: "Service not found." });
    const slug = newSlug ? normalizeSlug(newSlug) : current.slug;
    const service = await updateServiceRecord(current._id, {
      slug, title, shortDescription, longDescription, image,
      order: typeof order === "number" ? order : current.order,
      isActive: typeof isActive === "boolean" ? isActive : current.isActive,
    });
    if (!service) return res.status(404).json({ success: false, message: "Service not found." });
    return res.status(200).json({ success: true, message: "Service updated successfully.", service });
  } catch (error) {
    if (error.code === "23505") return res.status(409).json({ success: false, message: "A service with this slug already exists." });
    return failure(res, "Unable to update service.", error);
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await findServiceBySlug(normalizeSlug(req.params.slug));
    if (!service) return res.status(404).json({ success: false, message: "Service not found." });
    await deleteServiceRecord(service._id);
    return res.status(200).json({ success: true, message: "Service deleted successfully." });
  } catch (error) { return failure(res, "Unable to delete service.", error); }
};

export const addServiceFaq = async (req, res) => {
  try {
    const { faqId, title, description, images, order } = req.body;
    if (!faqId || !title || !description) {
      return res.status(400).json({ success: false, message: "faqId, title and description are required." });
    }
    const service = await findServiceBySlug(normalizeSlug(req.params.slug));
    if (!service) return res.status(404).json({ success: false, message: "Service not found." });
    if (await findServiceFaq(service._id, faqId)) {
      return res.status(409).json({ success: false, message: `A FAQ item with faqId "${faqId}" already exists for this service.` });
    }
    const faq = await createServiceFaqRecord({
      _id: randomUUID(), service: service._id, serviceSlug: service.slug,
      faqId, title, description, images: Array.isArray(images) ? images : [],
      order: typeof order === "number" ? order : await countServiceFaqs(service._id),
    });
    return res.status(201).json({ success: true, message: "Service FAQ item added successfully.", faq });
  } catch (error) {
    if (error.code === "23505") return res.status(409).json({ success: false, message: "A FAQ item with this ID already exists for this service." });
    return failure(res, "Unable to add service FAQ item.", error);
  }
};

export const updateServiceFaq = async (req, res) => {
  try {
    const { title, description, images, order } = req.body;
    if (!title || !description) return res.status(400).json({ success: false, message: "title and description are required." });
    const service = await findServiceBySlug(normalizeSlug(req.params.slug));
    if (!service) return res.status(404).json({ success: false, message: "Service not found." });
    const current = await findServiceFaq(service._id, req.params.faqId);
    if (!current) return res.status(404).json({ success: false, message: "FAQ item not found." });
    const faq = await updateServiceFaqRecord(current._id, {
      title, description, images: Array.isArray(images) ? images : [],
      order: typeof order === "number" ? order : current.order,
    });
    return res.status(200).json({ success: true, message: "Service FAQ item updated successfully.", faq });
  } catch (error) { return failure(res, "Unable to update service FAQ item.", error); }
};

export const deleteServiceFaq = async (req, res) => {
  try {
    const service = await findServiceBySlug(normalizeSlug(req.params.slug));
    if (!service) return res.status(404).json({ success: false, message: "Service not found." });
    const faq = await findServiceFaq(service._id, req.params.faqId);
    if (!faq) return res.status(404).json({ success: false, message: "FAQ item not found." });
    await deleteServiceFaqRecord(faq._id);
    return res.status(200).json({ success: true, message: "Service FAQ item deleted successfully." });
  } catch (error) { return failure(res, "Unable to delete service FAQ item.", error); }
};
