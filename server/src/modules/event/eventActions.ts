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

const readRemainingSlotsByEvent: RequestHandler = async (req, res, next) => {
  const eventId = Number(req.params.id);

  if (Number.isNaN(eventId)) {
    res.sendStatus(400);
    return;
  }

  try {
    const remaining = await eventRepository.readRemainingSlotsByEvent(eventId);

    if (remaining === null) {
      res.sendStatus(404);
      return;
    }

    res.json({ remaining_slots: remaining });
  } catch (err) {
    next(err);
  }
};

const browseEventsOfTheDay: RequestHandler = async (req, res, next) => {
  try {
    const eventsOfTheDay = await eventRepository.browseEventsOfTheDay(
      req.params.date, //as string
    );
    res.json(eventsOfTheDay);
  } catch (err) {
    next(err);
  }
};

export default {
  browseUpcomingEvents,
  browseParticipantsToEvent,
  readRemainingSlotsByEvent,
  browseEventsOfTheDay,
};
