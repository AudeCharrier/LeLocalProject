import type { RequestHandler } from "express";
import dashboardAdminRepository from "./dashboardAdminRepository";

const browseAdminBookings: RequestHandler = async (_req, res, next) => {
  try {
    const bookings = await dashboardAdminRepository.readAdminBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export default {
  browseAdminBookings,
};
