import type { RequestHandler } from "express";
import dashboardAdminRepository from "./dashboardAdminRepository";

const browseAdminStats: RequestHandler = async (req, res, next) => {
  try {
    const selectedDate =
      typeof req.query.date === "string"
        ? req.query.date
        : new Date().toISOString().slice(0, 10);
    const stats = await dashboardAdminRepository.readAdminStats(selectedDate);
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

const browseAdminOccupancyTrend: RequestHandler = async (req, res, next) => {
  try {
    const selectedDate =
      typeof req.query.date === "string"
        ? req.query.date
        : new Date().toISOString().slice(0, 10);
    const trend =
      await dashboardAdminRepository.readAdminOccupancyTrend(selectedDate);
    res.json(trend);
  } catch (err) {
    next(err);
  }
};

const browseAdminClaimNotifications: RequestHandler = async (
  _req,
  res,
  next,
) => {
  try {
    const notifications =
      await dashboardAdminRepository.readAdminClaimNotifications();
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

const browseAdminBookings: RequestHandler = async (_req, res, next) => {
  try {
    const bookings = await dashboardAdminRepository.readAdminBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

const browseClaims: RequestHandler = async (_req, res, next) => {
  try {
    const claims = await dashboardAdminRepository.readAllClaims();
    res.json(claims);
  } catch (err) {
    next(err);
  }
};

const browseAdminEventRequests: RequestHandler = async (_req, res, next) => {
  try {
    const requests = await dashboardAdminRepository.readAllEventRequests();
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

const updateEventRequest: RequestHandler = async (req, res, next) => {
  try {
    const activityId = Number(req.params.activityId);
    const { status } = req.body;

    if (!["approved", "refused"].includes(status)) {
      return res.status(400).json({ message: "Statut invalide." });
    }

    const updated = await dashboardAdminRepository.handleEventRequest(
      activityId,
      status,
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Demande d'événement introuvable." });
    }

    return res.status(200).json({
      message:
        status === "approved"
          ? "Événement approuvé et réservation créée."
          : "Événement refusé.",
    });
  } catch (err) {
    console.error(err);
    // Au lieu de next(err), tu renvoies directement le statut 500 au front
    return res
      .status(500)
      .json({ message: "Erreur lors du traitement de la demande." });
  }
};

export default {
  browseAdminStats,
  browseAdminOccupancyTrend,
  browseAdminClaimNotifications,
  browseAdminBookings,
  browseClaims,
  browseAdminEventRequests,
  updateEventRequest,
};
