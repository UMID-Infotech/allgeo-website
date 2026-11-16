// server/controllers/serviceController.js
import Service from "../models/Service.js";
import ServiceFaq from "../models/ServiceFaq.js";

// GET /api/services
// Public — list all active services, ordered for the ServicesSection grid.
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get all services error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch services.",
    });
  }
};

// GET /api/services/:slug
// Public — single service with its accordion (FAQ) items, for ServiceDetailPage.
export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const service = await Service.findOne({
      slug: slug.toLowerCase().trim(),
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    const faqs = await ServiceFaq.find({ service: service._id }).sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      service,
      faqs,
    });
  } catch (error) {
    console.error("Get service by slug error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch service.",
    });
  }
};

// POST /api/services
// Admin only — create a new service from the admin dashboard.
export const createService = async (req, res) => {
  try {
    const {
      slug,
      title,
      shortDescription,
      longDescription,
      image,
      order,
      isActive,
    } = req.body;

    if (!slug || !title || !shortDescription || !longDescription || !image) {
      return res.status(400).json({
        success: false,
        message:
          "slug, title, shortDescription, longDescription and image are required.",
      });
    }

    const normalizedSlug = slug.toLowerCase().trim();

    const existingService = await Service.findOne({ slug: normalizedSlug });

    if (existingService) {
      return res.status(409).json({
        success: false,
        message: `A service with slug "${normalizedSlug}" already exists.`,
      });
    }

    const service = await Service.create({
      slug: normalizedSlug,
      title,
      shortDescription,
      longDescription,
      image,
      order: typeof order === "number" ? order : 0,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully.",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create service.",
    });
  }
};

// PUT /api/services/:slug
// Admin only — edit an existing service's fields from the admin dashboard.
export const updateService = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      slug: newSlug,
      title,
      shortDescription,
      longDescription,
      image,
      order,
      isActive,
    } = req.body;

    if (!title || !shortDescription || !longDescription || !image) {
      return res.status(400).json({
        success: false,
        message:
          "title, shortDescription, longDescription and image are required.",
      });
    }

    const service = await Service.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // Allow changing the slug, but make sure it doesn't collide with
    // another service's slug.
    if (newSlug) {
      const normalizedNewSlug = newSlug.toLowerCase().trim();

      if (normalizedNewSlug !== service.slug) {
        const slugTaken = await Service.findOne({
          slug: normalizedNewSlug,
          _id: { $ne: service._id },
        });

        if (slugTaken) {
          return res.status(409).json({
            success: false,
            message: `A service with slug "${normalizedNewSlug}" already exists.`,
          });
        }

        // Keep FAQ items' denormalized serviceSlug in sync.
        await ServiceFaq.updateMany(
          { service: service._id },
          { $set: { serviceSlug: normalizedNewSlug } }
        );

        service.slug = normalizedNewSlug;
      }
    }

    service.title = title;
    service.shortDescription = shortDescription;
    service.longDescription = longDescription;
    service.image = image;

    if (typeof order === "number") {
      service.order = order;
    }

    if (typeof isActive === "boolean") {
      service.isActive = isActive;
    }

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update service.",
    });
  }
};

// DELETE /api/services/:slug
// Admin only — delete a service and its accordion (FAQ) items.
export const deleteService = async (req, res) => {
  try {
    const { slug } = req.params;

    const service = await Service.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    await ServiceFaq.deleteMany({ service: service._id });
    await service.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete service.",
    });
  }
};

// POST /api/services/:slug/faqs
// Admin only — add an accordion / expertise item to an existing service.
export const addServiceFaq = async (req, res) => {
  try {
    const { slug } = req.params;
    const { faqId, title, description, images, order } = req.body;

    if (!faqId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "faqId, title and description are required.",
      });
    }

    const service = await Service.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    const existingFaq = await ServiceFaq.findOne({
      service: service._id,
      faqId,
    });

    if (existingFaq) {
      return res.status(409).json({
        success: false,
        message: `A FAQ item with faqId "${faqId}" already exists for this service.`,
      });
    }

    const faqCount = await ServiceFaq.countDocuments({
      service: service._id,
    });

    const faq = await ServiceFaq.create({
      service: service._id,
      serviceSlug: service.slug,
      faqId,
      title,
      description,
      images: Array.isArray(images) ? images : [],
      order: typeof order === "number" ? order : faqCount,
    });

    return res.status(201).json({
      success: true,
      message: "Service FAQ item added successfully.",
      faq,
    });
  } catch (error) {
    console.error("Add service FAQ error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add service FAQ item.",
    });
  }
};

// PUT /api/services/:slug/faqs/:faqId
// Admin only — edit an existing accordion / expertise item.
export const updateServiceFaq = async (req, res) => {
  try {
    const { slug, faqId } = req.params;
    const { title, description, images, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "title and description are required.",
      });
    }

    const service = await Service.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    const faq = await ServiceFaq.findOne({
      service: service._id,
      faqId,
    });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ item not found.",
      });
    }

    faq.title = title;
    faq.description = description;
    faq.images = Array.isArray(images) ? images : [];

    if (typeof order === "number") {
      faq.order = order;
    }

    await faq.save();

    return res.status(200).json({
      success: true,
      message: "Service FAQ item updated successfully.",
      faq,
    });
  } catch (error) {
    console.error("Update service FAQ error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update service FAQ item.",
    });
  }
};

// DELETE /api/services/:slug/faqs/:faqId
// Admin only — delete an accordion / expertise item.
export const deleteServiceFaq = async (req, res) => {
  try {
    const { slug, faqId } = req.params;

    const service = await Service.findOne({
      slug: slug.toLowerCase().trim(),
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    const faq = await ServiceFaq.findOneAndDelete({
      service: service._id,
      faqId,
    });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service FAQ item deleted successfully.",
    });
  } catch (error) {
    console.error("Delete service FAQ error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete service FAQ item.",
    });
  }
};