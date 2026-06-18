import type { RequestHandler } from "express";
import dashboardClientRepository from "./dashboardClientRepository";

// The B of BREAD - Browse (Read All) operation

// Retrieve past events the user attended
const browsePastEvents: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const events = await dashboardClientRepository.readPastEvents(userId);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

// Retrieve upcoming events the user is registered for
const browseUpcomingEvents: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const events = await dashboardClientRepository.readUpcomingEvents(userId);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

// Retrieve upcoming space bookings for a specific user
const browseUpcomingBookings: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const bookings =
      await dashboardClientRepository.readUpcomingBookings(userId);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// Retrieve full billing history for a specific user
const browseBookingHistory: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const bookings = await dashboardClientRepository.readBookingHistory(userId);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// Retrieve past space bookings for a specific user
const browseOldBookings: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const bookings = await dashboardClientRepository.readOldBookings(userId);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};
// Retrieve client stats
const browseStats: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const stats = await dashboardClientRepository.readStats(userId);
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

// Create claim client
const addClaim: RequestHandler = async (req, res, next) => {
  try {
    const claim = {
      title: req.body.title,
      category: req.body.category,
      message: req.body.message,
      users_id: Number(req.params.userId),
      activity_id: Number(req.body.activity_id),
    };
    const insertId = await dashboardClientRepository.createClaim(claim);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// Read booking for crete Invoice for client
const readInvoice: RequestHandler = async (req, res, next) => {
  try {
    const bookingId = Number(req.params.bookingId);
    const invoice = await dashboardClientRepository.readInvoiceById(bookingId);
    res.json(invoice);
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
  browseStats,
  addClaim,
  readInvoice,
};
