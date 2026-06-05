import type { RequestHandler } from "express";
import dashboardRepository from "./dashboardRepository";

// The B of BREAD - Browse (Read All) operation

// Permet de récupérer les données des évènements passés en lisant la requête "readPastEvents"
// du fichier "readPastEvents"
const browsePastEvents: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const events = await dashboardRepository.readPastEvents(userId);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

// Permet de récupérer les données des évènements futurs en lisant la requête "readUpcomingEvents"
// du fichier "readPastEvents"
const browseUpcomingEvents: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const events = await dashboardRepository.readUpcomingEvents(userId);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const browseUpcomingBookings: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const bookings = await dashboardRepository.readUpcomingBookings(userId);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

const browseAdminBookings: RequestHandler = async (_req, res, next) => {
  try {
    const bookings = await dashboardRepository.readAdminBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export default {
  browsePastEvents,
  browseUpcomingEvents,
  browseUpcomingBookings,
  browseAdminBookings,
};
