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

const browseEventsOfTheDay: RequestHandler = async (req, res, next) => {
  try {
    const eventsOfTheDay = await eventRepository.browseEventsOfTheDay(
      req.params.date as string,
    );
    res.json(eventsOfTheDay);
  } catch (err) {
    next(err);
  }
};

export default {
  browseUpcomingEvents,
  browseParticipantsToEvent,
  browseEventsOfTheDay,
};
