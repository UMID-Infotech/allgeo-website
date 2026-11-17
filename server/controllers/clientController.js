// server/controllers/clientController.js
import {
  createClientRecord,
  findActiveClients,
  findAllClients,
  getNextClientOrder,
} from "../models/Client.js";
import { getImageKitAuthParams } from "../config/imagekit.js";

// GET /api/clients
// Public — active clients only, for the ClientsSection slider on the website.
export const getAllClients = async (req, res) => {
  try {
    const clients = await findActiveClients();

    return res.status(200).json({
      success: true,
      count: clients.length,
      clients,
    });
  } catch (error) {
    console.error("Get all clients error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch clients.",
    });
  }
};

// GET /api/clients/admin
// Admin only — returns every client (active + inactive) for the admin
// dashboard listing/management view.
export const getAllClientsForAdmin = async (req, res) => {
  try {
    const clients = await findAllClients();

    return res.status(200).json({
      success: true,
      count: clients.length,
      clients,
    });
  } catch (error) {
    console.error("Get all clients (admin) error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch clients.",
    });
  }
};

// GET /api/clients/imagekit-auth
// Admin only — returns short-lived ImageKit upload credentials so the
// admin dashboard's "Add Client" form can upload the logo directly to
// ImageKit from the browser before saving the client record.
export const getClientImageKitAuth = async (req, res) => {
  try {
    const authParams = getImageKitAuthParams();

    return res.status(200).json({
      success: true,
      ...authParams,
    });
  } catch (error) {
    console.error("Get ImageKit auth params error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate upload credentials.",
    });
  }
};

// POST /api/clients
// Admin only — add a new client from the admin dashboard "Add Client" form.
export const createClient = async (req, res) => {
  try {
    const { name, logo, order, isActive } = req.body ?? {};

    if (
      typeof name !== "string" ||
      typeof logo !== "string" ||
      !name.trim() ||
      !logo.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "name and logo are required.",
      });
    }

    // Default new clients to the end of the list unless an explicit
    // order value is provided.
    const resolvedOrder = Number.isInteger(order)
      ? order
      : await getNextClientOrder();

    const client = await createClientRecord({
      name: name.trim(),
      logo: logo.trim(),
      order: resolvedOrder,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      message: "Client created successfully.",
      client,
    });
  } catch (error) {
    // 23505 = PostgreSQL unique_violation (client name already exists)
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A client with this name already exists.",
      });
    }

    console.error("Create client error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create client.",
    });
  }
};