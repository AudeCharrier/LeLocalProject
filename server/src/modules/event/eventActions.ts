import type { RequestHandler } from "express";

import eventRepository from "./eventRepository";

const browseUpcomingEvents: RequestHandler = async (req, res, next) => {
  try {
    const upcomingEvents = await eventRepository.readAllUpcomingEvents();

    res.status(200).json(upcomingEvents);
  } catch (err) {
    next(err);
  }
};
const browseParticipantsToEvent: RequestHandler = async (req, res, next) => {
  try {
    const participants = await eventRepository.browseParticipantsToEvent();

    res.status(200).json(participants);
  } catch (err) {
    next(err);
  }
};

const readEventsOfTheDay: RequestHandler = async (req, res, next) => {
  try {
    const eventsOfTheDay = await eventRepository.browseEventsOfTheDay(
      req.params.date as string,
    );

    res.status(200).json(eventsOfTheDay);
  } catch (err) {
    next(err);
  }
};

export default {
  browseUpcomingEvents,
  browseParticipantsToEvent,
  readEventsOfTheDay,
};
