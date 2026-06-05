import type { RequestHandler } from "express";
import dashboardRepository from "./dashboardRepository";

// The B of BREAD - Browse (Read All) operation

// Retrieve past events the user attended
const browsePastEvents: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const events = await dashboardRepository.readPastEvents(userId);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

// Retrieve upcoming events the user is registered for
const browseUpcomingEvents: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const events = await dashboardRepository.readUpcomingEvents(userId);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

// Retrieve upcoming space bookings for a specific user
const browseUpcomingBookings: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const bookings = await dashboardRepository.readUpcomingBookings(userId);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// Retrieve full billing history for a specific user
const browseBookingHistory: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const bookings = await dashboardRepository.readBookingHistory(userId);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// Retrieve past space bookings for a specific user
const browseOldBookings: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const bookings = await dashboardRepository.readOldBookings(userId);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export default {
  browsePastEvents,
  browseUpcomingEvents,
  browseUpcomingBookings,
  browseBookingHistory,
  browseOldBookings,
};
