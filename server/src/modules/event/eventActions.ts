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

const processTotalPrice: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const quantity = Number(req.body.quantity);

    const processPrice = await eventRepository.processTotalPrice(quantity, id);
    if (processPrice === null) {
      res.status(404).json({ error: "Évènement introuvable" });
      return;
    }

    res.status(200).json(processPrice);
  } catch (err) {
    next(err);
  }
};

export default {
  browseUpcomingEvents,
  browseParticipantsToEvent,
  readEventsOfTheDay,
  processTotalPrice,
};
