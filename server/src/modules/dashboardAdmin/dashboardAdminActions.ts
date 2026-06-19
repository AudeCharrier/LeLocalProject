import type { RequestHandler } from "express";
import dashboardAdminRepository from "./dashboardAdminRepository";

const browseAdminStats: RequestHandler = async (_req, res, next) => {
  try {
    const stats = await dashboardAdminRepository.readAdminStats();
    res.json(stats);
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

export default {
  browseAdminStats,
  browseAdminClaimNotifications,
  browseAdminBookings,
  browseClaims,
};
