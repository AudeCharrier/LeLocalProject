import type { RequestHandler } from "express";

import eventRepository from "./eventRepository";

const browseUpcomingEvents: RequestHandler = async (req, res, next) => {
  try {
    const upcomingEvents = await eventRepository.readAllUpcomingEvents();

    res.json(upcomingEvents);
  } catch (err) {
    next(err);
  }
};
const browseParticipantsToEvent: RequestHandler = async (req, res, next) => {
  try {
    const participants = await eventRepository.browseParticipantsToEvent();

    res.json(participants);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const itemId = Number(req.params.id);
    const item = await eventRepository.read(itemId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browseUpcomingEvents, browseParticipantsToEvent, read };
